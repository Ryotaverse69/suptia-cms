// app/guides/[slug]/page.tsx
import { client } from '../../../lib/sanity.client';
import { PortableText } from '@portabletext/react';  // 本文表示用

export async function generateStaticParams() {
  const query = `*[_type == "post" && category == "Ingredient Guide"] { "slug": slug.current }`;  // Ingredient Guideのみ
  const slugs = await client.fetch(query);
  return slugs.map((slug: any) => ({ slug: slug.slug }));
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "post" && slug.current == $slug && category == "Ingredient Guide"][0] {  // categoryフィルタ追加
    title, 
    body,  // 本文（PortableTextで表示）
    "mainImage": mainImage.asset->url
  }`;
  const article = await client.fetch(query, { slug: params.slug });

  if (!article) {
    return <div>記事が見つかりません。Ingredient Guideのカテゴリを確認してください。</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 mt-20"> {/* mt-20を追加してヘッダーとの重なりを回避 */}
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      {article.mainImage && <img src={article.mainImage} alt={article.title} className="w-full mb-4" />}
      <div className="prose lg:prose-xl">
        {article.body && <PortableText value={article.body} />}
      </div>
    </div>
  );
}
