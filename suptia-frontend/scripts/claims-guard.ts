/*
  薬機法ガード: /content 配下の MD/JSON を走査し、断定的表現を検出します。
  使い方: npm run yakuji:check
*/
/* eslint no-console: 0 */

import {promises as fs} from 'fs'
import path from 'path'

type Violation = {
  file: string
  line: number
  column: number
  match: string
  suggestion: string
}

type NgPattern = {
  label: string
  regex: RegExp
  suggestion: string
}

const NG_PATTERNS: NgPattern[] = [
  {label: '治る', regex: /治る/g, suggestion: '改善が示唆される'},
  {label: '予防できる', regex: /予防できる/g, suggestion: '予防に役立つ可能性'},
  {label: '確実に', regex: /確実に/g, suggestion: '一定の可能性で'},
  // 「効く（断定）」: 弱い表現を伴わない「効く」を検出（例: "効く可能性/示唆/一部研究" は除外）
  {
    label: '効く(断定)',
    regex: /効く(?!可能性|ことが示唆|と示唆|とされる|一部研究で)/g,
    suggestion: '効く可能性／一部研究で示唆',
  },
]

const CONTENT_DIR = path.resolve(process.cwd(), 'content')

async function pathExists(p: string): Promise<boolean> {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function collectFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, {withFileTypes: true})
  const files: string[] = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      files.push(...(await collectFiles(full)))
    } else if (/\.(md|mdx|markdown|json)$/i.test(e.name)) {
      files.push(full)
    }
  }
  return files
}

function scanText(file: string, text: string): Violation[] {
  const violations: Violation[] = []
  const lines = text.split(/\r?\n/)
  for (let i = 0; i < lines.length; i += 1) {
    const lineText = lines[i]
    for (const pat of NG_PATTERNS) {
      pat.regex.lastIndex = 0
      let m: RegExpExecArray | null
      // eslint-disable-next-line no-cond-assign
      while ((m = pat.regex.exec(lineText))) {
        violations.push({
          file,
          line: i + 1,
          column: (m.index ?? 0) + 1,
          match: m[0],
          suggestion: pat.suggestion,
        })
      }
    }
  }
  return violations
}

async function main() {
  const exists = await pathExists(CONTENT_DIR)
  if (!exists) {
    console.log(`[claims-guard] info: no /content directory. skipping.`)
    process.exit(0)
  }

  const files = await collectFiles(CONTENT_DIR)
  if (files.length === 0) {
    console.log(`[claims-guard] info: no target files under /content.`)
    process.exit(0)
  }

  const allViolations: Violation[] = []
  for (const f of files) {
    const buf = await fs.readFile(f, 'utf8')
    allViolations.push(...scanText(path.relative(process.cwd(), f), buf))
  }

  if (allViolations.length > 0) {
    console.error(`\n[claims-guard] NG表現が見つかりました（${allViolations.length}件）:`)
    for (const v of allViolations) {
      console.error(`- ${v.file}:${v.line}:${v.column} 「${v.match}」 → 例: 「${v.suggestion}」`)
    }
    console.error(`\n[claims-guard] 対応例: 「治る」→「改善が示唆される」、「確実に」→「一定の可能性で」など。`)
    process.exit(1)
  } else {
    console.log('[claims-guard] OK: 適切な表現です。')
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()


