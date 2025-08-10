import {sanityClient} from '@/data/sanityClient'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {evaluateAlerts} from '@/lib/alerts'
import {toMg, effectiveCostPerDay} from '@/lib/pricing'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const slugs = await sanityClient.fetch<{slug: {current: string}}[]>(
      `*[_type=='product' && defined(slug.current)]{slug}`
    )
    return slugs.map((s) => ({slug: s.slug.current}))
  } catch (e) {
    console.error(e)
    return []
  }
}

async function getProduct(slug: string) {
  try {
    return await sanityClient.fetch(
      `*[_type=='product' && slug.current==$slug][0]{
        _id, brand, name, slug, priceJPY, servingsPerContainer, urlAmazon, urlRakuten,
        ingredients[]{amount, unit, ingredientRef->{name, slug}},
        "evidences": *[_type=='evidence' && ingredientRef->slug.current in ^.ingredients[].ingredientRef->slug.current]{
          studyType, outcome, population, qualityScore, citation
        }
      }`,
      {slug}
    )
  } catch (e) {
    console.error(e)
    return null
  }
}

export default async function ProductPage({params}: {params: {slug: string}}) {
  const product = await getProduct(params.slug)
  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-gray-500">商品が見つかりませんでした。</p>
      </div>
    )
  }

  const persona = {sensitivityTags: [], medicationTags: [], pregnancyOrLactation: false}
  const alerts = evaluateAlerts(
    persona,
    (product.ingredients || []).map((i: any) => ({ingredientSlug: i.ingredientRef?.slug?.current ?? ''}))
  )

  const dosePerServingMg = (product.ingredients || [])
    .map((i: any) => toMg(i.amount ?? 0, (i.unit ?? 'mg') as any))
    .reduce((a: number, b: number) => a + b, 0)
  const costPerDay = effectiveCostPerDay({
    priceJPY: product.priceJPY ?? 0,
    servingsPerContainer: product.servingsPerContainer ?? 0,
    dosePerServingMg: dosePerServingMg || 0,
    recommendedDailyMg: dosePerServingMg || 0,
  })

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    brand: product.brand,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'JPY',
      price: product.priceJPY ?? undefined,
      url: product.urlAmazon || product.urlRakuten || undefined,
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(ldJson)}} />

      <header>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-600">{product.brand}</p>
      </header>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>配合成分</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-1">成分</th>
                  <th className="py-1">量</th>
                </tr>
              </thead>
              <tbody>
                {(product.ingredients || []).map((i: any, idx: number) => (
                  <tr key={idx} className="border-t">
                    <td className="py-1">{i.ingredientRef?.name}</td>
                    <td className="py-1">{i.amount ?? '-'} {i.unit ?? ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>正規化価格</CardTitle></CardHeader>
          <CardContent>
            <p>実効コスト/日: {Number.isFinite(costPerDay) ? `¥${Math.round(costPerDay)}` : '-'}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>相互作用・禁忌</CardTitle></CardHeader>
          <CardContent>
            <p>レベル: {alerts.level}</p>
            {alerts.reasons.length > 0 && (
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {alerts.reasons.map((r, i) => (<li key={i}>{r}</li>))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader><CardTitle>研究要約</CardTitle></CardHeader>
          <CardContent>
            {(product.evidences || []).length === 0 ? (
              <p className="text-gray-500">公開された研究情報は確認中です。</p>
            ) : (
              <ul className="list-disc pl-5 text-sm">
                {(product.evidences || []).map((e: any, idx: number) => (
                  <li key={idx}>{e.studyType}: {e.outcome}（{e.population}）</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader><CardTitle>価格履歴</CardTitle></CardHeader>
          <CardContent>
            <p className="text-gray-500">準備中（ダミー）</p>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}


