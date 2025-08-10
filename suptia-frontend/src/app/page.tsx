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
    <main className="mx-auto max-w-6xl px-4 py-12 space-y-10">
      <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(ldJson)}</Script>

      <section className="flex flex-col items-center gap-4 text-center">
        <Image src="/ogp.png" alt="Suptia" width={96} height={96} />
        <h1 className="text-3xl font-bold">自分に合うサプリをやさしく探す</h1>
        <p className="text-gray-600">目的に合わせた比較・検討をサポートします。</p>
      </section>

      <section className="mx-auto max-w-xl space-y-4">
        <form action="/search" method="get" className="flex items-center gap-2">
          <input
            type="search"
            name="q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="製品名・成分名で検索"
            className="w-full rounded border px-3 py-2"
            aria-label="検索バー"
          />
          <button type="submit" className="rounded bg-black px-4 py-2 text-white" aria-label="検索を実行">
            検索
          </button>
        </form>

        <div className="text-center">
          <Link href="/diagnosis" className="inline-block rounded border px-4 py-2" aria-label="診断をはじめるCTA">
            かんたん診断をはじめる
          </Link>
        </div>
      </section>
    </main>
  )
}
