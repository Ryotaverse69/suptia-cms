import {sanityClient} from '@/data/sanityClient'
import Script from 'next/script'

export const revalidate = 60

async function getIngredient(slug: string) {
  return sanityClient.fetch(
    `*[_type=='ingredient' && slug.current==$slug][0]{
      _id, name, slug, category, evidenceLevel,
      contraindications, interactions
    }`,
    {slug}
  )
}

export default async function IngredientPage({params}: {params: {slug: string}}) {
  const ing = await getIngredient(params.slug)
  if (!ing) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-gray-600">成分が見つかりませんでした。</p>
      </div>
    )
  }

  const faq = [
    {
      '@type': 'Question',
      name: `${ing.name}は誰に向いていますか？`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${ing.name}は目的や体質により適否が異なります。一般的な情報としてご確認ください。`,
      },
    },
  ]

  const ldJson = {
    '@context': 'https://schema.org',
    '@type': 'DietarySupplement',
    name: ing.name,
    category: ing.category,
    safetyConsideration: (ing.contraindications || []).join(', '),
  }

  const ldFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq,
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <Script id="ld-ingredient" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(ldJson)}</Script>
      <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive">{JSON.stringify(ldFaq)}</Script>

      <h1 className="text-2xl font-bold">{ing.name}</h1>
      <p className="text-gray-600">カテゴリー: {ing.category}</p>

      <section>
        <h2 className="text-xl font-semibold mb-2">注意事項</h2>
        {(ing.contraindications || []).length === 0 ? (
          <p className="text-gray-600">特記事項は見つかりませんでした。</p>
        ) : (
          <ul className="list-disc pl-5 text-gray-700">
            {(ing.contraindications || []).map((c: string, i: number) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}


