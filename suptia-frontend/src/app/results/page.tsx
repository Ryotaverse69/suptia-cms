import {evaluateAlerts} from '@/lib/alerts'
import {medianCostJPYPerDay, scoreProduct} from '@/lib/pricing'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {sanityClient} from '@/data/sanityClient'

export const revalidate = 60

async function getSampleProducts() {
  try {
    if (process.env.NEXT_PUBLIC_E2E === '1') {
      return [
        {
          _id: 'e2e-mock',
          brand: 'MockBrand',
          name: 'Mock Product',
          slug: {current: 'mock-product'},
          priceJPY: 1200,
          servingsPerContainer: 12,
          ingredients: [
            {amount: 250, unit: 'mg', ingredientRef: {slug: {current: 'vitamin-c'}}},
          ],
        },
      ]
    }
    return await sanityClient.fetch(`*[_type=='product'][0...12]{
      _id, brand, name, slug, priceJPY, servingsPerContainer,
      ingredients[]{amount, unit, ingredientRef->{slug}}
    }`)
  } catch (e) {
    console.error(e)
    return []
  }
}

export default async function ResultsPage() {
  // NOTE: 実装簡略化のため、直前POSTの保存は省略（実際はserver actionで一時保存）
  const products = await getSampleProducts()
  const median = medianCostJPYPerDay(
    products
      .filter((p: any) => p.priceJPY && p.servingsPerContainer)
      .map((p: any) => ({
        priceJPY: p.priceJPY,
        servingsPerContainer: p.servingsPerContainer,
        dosePerServingMg: 100,
        recommendedDailyMg: 100,
      }))
  )

  const persona = {sensitivityTags: [], medicationTags: [], pregnancyOrLactation: false}

  const scored = products.map((p: any) => {
    const cost = p.priceJPY && p.servingsPerContainer ? p.priceJPY / p.servingsPerContainer : Infinity
    const score = scoreProduct(
      {evidenceScore: 60, safetyScore: 80, costJPYPerDay: cost, practicalityScore: 70},
      {marketMedianCostJPYPerDay: Number.isFinite(median) ? median : cost}
    )
    const alerts = evaluateAlerts(
      persona,
      (p.ingredients || []).map((i: any) => ({ingredientSlug: i.ingredientRef?.slug?.current ?? ''}))
    )
    return {...p, score, alerts, costPerDay: cost}
  })

  const sorted = scored.sort((a: any, b: any) => b.score - a.score)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">おすすめ結果</h1>
      {sorted.length === 0 ? (
        <p className="text-gray-500">条件に合う製品が見つかりませんでした。</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p: any) => (
            <Card key={p._id}>
              <CardHeader className="sticky top-0 z-10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-base font-semibold">{p.name}</span>
                    <span className="text-xs text-gray-500">{p.brand}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">実効/日: {Number.isFinite(p.costPerDay) ? `¥${Math.round(p.costPerDay)}` : '-'}</span>
                    {p.alerts.level !== 'GREEN' && (
                      <Badge className={p.alerts.level === 'RED' ? 'border-red-600 text-red-700' : 'border-yellow-600 text-yellow-700'}>
                        {p.alerts.level}
                      </Badge>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">総合 {Math.round(p.score)}</span>
                </div>
                <div className="text-sm text-gray-600">実効コスト/日: {Number.isFinite(p.costPerDay) ? `¥${Math.round(p.costPerDay)}` : '-'} / 推奨理由: 安全性とコストのバランスが良好</div>
                <div className="flex gap-2 text-sm">
                  <button className="rounded border px-2 py-1">お気に入り</button>
                  <button className="rounded border px-2 py-1">価格アラート</button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}


