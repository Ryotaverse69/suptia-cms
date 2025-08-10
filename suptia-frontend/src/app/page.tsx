import Link from 'next/link'
import Script from 'next/script'
import {track} from '@/lib/ga'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {sanityClient} from '@/data/sanityClient'

export const revalidate = 60

async function getHomeSections() {
  try {
    const cheap = await sanityClient.fetch(
      `*[_type=='product']|order(priceJPY asc)[0...8]{name,brand,slug,priceJPY}`
    )
    const attention = await sanityClient.fetch(
      `*[_type=='ingredient' && (count(contraindications)>0 || count(interactions)>0)][0...8]{name,slug}`
    )
    return {cheap, attention}
  } catch (e) {
    console.error(e)
    return {cheap: [], attention: []}
  }
}

export default async function Home() {
  const {cheap, attention} = await getHomeSections()

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
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      <Script id="ld-website" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(ldJson)}</Script>

      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold">あなたに合うサプリを、科学的に。</h1>
        <p className="text-gray-600">目的と体質に合わせて、最適な製品をやさしく提案します。</p>
        <div className="flex justify-center gap-3">
          <Link href="/diagnosis" className="rounded bg-black px-4 py-2 text-white">診断をはじめる</Link>
          <Link href="/search" className="rounded border px-4 py-2" onClick={() => track('search_performed', {query: null})}>製品をさがす</Link>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">いま安い</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cheap.length === 0 ? (
            <p className="text-gray-500">表示できる情報がありません。</p>
          ) : (
            cheap.map((p: any) => (
              <Card key={p.slug.current}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{p.name}</span>
                    <Badge>{p.brand}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <span className="text-lg font-bold">¥{p.priceJPY?.toLocaleString?.() ?? '-'}</span>
                  <Link href={`/products/${p.slug.current}`} className="text-sm underline">詳細</Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">注意が必要な成分</h2>
        <div className="flex flex-wrap gap-2">
          {attention.length === 0 ? (
            <p className="text-gray-500">表示できる情報がありません。</p>
          ) : (
            attention.map((i: any) => (
              <Badge key={i.slug.current}>{i.name}</Badge>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
