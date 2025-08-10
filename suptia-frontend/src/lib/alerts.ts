export type AlertLevel = 'RED' | 'YELLOW' | 'GREEN'

export type PersonaInput = {
  sensitivityTags: string[]
  medicationTags: string[]
  pregnancyOrLactation: boolean
}

export type ProductIngredient = {
  ingredientSlug: string
  amountMg?: number
}

export type AlertResult = {
  level: AlertLevel
  reasons: string[]
}

/**
 * 1ルール = 1成分に対して評価される述語関数で表現。
 * Rule スキーマからの拡張を想定しつつ、柔軟に外部から注入可能。
 */
export type AlertRule = {
  level: Exclude<AlertLevel, 'GREEN'>
  reason: string
  when: (ctx: {persona: PersonaInput; ingredientSlug: string}) => boolean
}

export type AlertsEngineOptions = {
  rules?: AlertRule[]
}

const defaultRules: AlertRule[] = [
  {
    level: 'RED',
    reason: '妊娠・授乳中は高用量ビタミンAは避けましょう',
    when: ({persona, ingredientSlug}) =>
      persona.pregnancyOrLactation && ingredientSlug === 'vitamin-a-highdose',
  },
  {
    level: 'YELLOW',
    reason: '抗凝固薬との併用は出血リスクに注意（イチョウ葉/ビタミンE高用量）',
    when: ({persona, ingredientSlug}) =>
      persona.medicationTags.includes('anticoagulant') &&
      (ingredientSlug === 'ginkgo' || ingredientSlug === 'vitamin-e-highdose'),
  },
]

const severityRank: Record<AlertLevel, number> = {GREEN: 0, YELLOW: 1, RED: 2}

/**
 * 危険度判定
 * - RED(禁忌) / YELLOW(注意) / GREEN(問題なし)
 * - ルールは引数から注入可能（未指定時は defaultRules）
 */
export function evaluateAlerts(
  persona: PersonaInput,
  ingredients: ProductIngredient[],
  options?: AlertsEngineOptions
): AlertResult {
  const rules = options?.rules ?? defaultRules

  let level: AlertLevel = 'GREEN'
  const reasonsSet = new Set<string>()

  for (const ing of ingredients) {
    for (const rule of rules) {
      if (rule.when({persona, ingredientSlug: ing.ingredientSlug})) {
        reasonsSet.add(rule.reason)
        // 最大の深刻度を採用
        if (severityRank[rule.level] > severityRank[level]) {
          level = rule.level
          // すでに RED なら早期終了
          if (level === 'RED') break
        }
      }
    }
    if (level === 'RED') break
  }

  return {level, reasons: Array.from(reasonsSet)}
}

export const defaultAlertRules = defaultRules


