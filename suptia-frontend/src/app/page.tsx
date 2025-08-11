"use client"

import Link from 'next/link'
import Script from 'next/script'
import Image from 'next/image'
import {useState} from 'react'

export default function Home() {
  const [q, setQ] = useState('')

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Suptia',
    url: 'https://suptia.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://suptia.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <main className="relative">
      <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(ldJson)}</Script>

      {/* Hero: 近未来グラデ + グラスUI */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 hero-gradient" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 hero-grid" aria-hidden="true" />

        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:pb-20 sm:pt-28">
          <div className="flex flex-col items-center text-center text-white">
            <div className="mb-6 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs shadow-[0_0_40px_-10px_rgba(255,255,255,0.6)]">
              軽量・合法・説明可能なサプリ意思決定エンジン
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              正しい判断を、静かに支える
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-sm text-white/80 sm:text-base">
              安全性・価格・根拠のバランスから、あなたに合った選択の比較検討をお手伝いします。
            </p>

            <div className="mt-8 w-full max-w-2xl rounded-2xl border border-white/15 bg-white/8 p-2 backdrop-blur-md">
              <form action="/search" method="get" className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="search"
                    name="q"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="製品名・成分名で検索"
                    className="peer w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 outline-none transition focus:border-white/40"
                    aria-label="検索バー"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10 peer-focus:ring-white/30" />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                  aria-label="検索を実行"
                >
                  検索
                </button>
              </form>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-white/70">
                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">ビタミンC</span>
                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">マグネシウム</span>
                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">オメガ3</span>
                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1">鉄</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/diagnosis" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90" aria-label="診断をはじめるCTA">
                かんたん診断をはじめる
              </Link>
              <Link href="/ingredients" className="rounded-xl border border-white/30 bg-transparent px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition hover:border-white/60" aria-label="成分一覧へ">
                成分をさがす
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard title="安全性を最優先" desc="相互作用・禁忌の可能性を簡潔に提示し、注意のきっかけを提供します。" emoji="🛡️" />
          <FeatureCard title="価格の見える化" desc="配合量に合わせた実効コスト/日で、公平な比較をサポート。" emoji="💴" />
          <FeatureCard title="根拠に基づく選択" desc="研究情報を読みやすく要約し、判断の参考情報を提供します。" emoji="📚" />
        </div>
      </section>

      {/* Quick links */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-gray-600">すぐにためす</div>
            <div className="flex flex-wrap gap-2">
              <Link href="/results" className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50" aria-label="おすすめ結果を見る">
                おすすめを見る
              </Link>
              <Link href="/articles" className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50" aria-label="ガイドを読む">
                ガイドを読む
              </Link>
              <Link href="/products" className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50" aria-label="商品一覧へ">
                商品一覧
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function FeatureCard({title, desc, emoji}: {title: string; desc: string; emoji: string}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 transition hover:shadow-lg"
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        e.currentTarget.style.setProperty('--x', `${x}px`)
        e.currentTarget.style.setProperty('--y', `${y}px`)
      }}
    >
      <div className="pointer-events-none absolute -inset-px opacity-0 blur-lg transition group-hover:opacity-100" style={{background:
        'radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(59,130,246,0.15), transparent 40%)'}} aria-hidden="true" />
      <div className="text-2xl">{emoji}</div>
      <div className="mt-3 text-lg font-semibold">{title}</div>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
  )
}
