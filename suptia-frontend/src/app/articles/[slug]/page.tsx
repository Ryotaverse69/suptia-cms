// app/articles/[slug]/page.tsx
import { client } from '../../../lib/sanity.client';
import { PortableText } from '@portabletext/react';  // 本文表示用（npm install @portabletext/react）

export async function generateStaticParams() {
  const query = `*[_type == "post"] { "slug": slug.current }`;
  const slugs = await client.fetch(query);
  return slugs.map((slug: any) => ({ slug: slug.slug }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "post" && slug.current == $slug][0] { title, body }`;
  const article = await client.fetch(query, { slug: params.slug });

  if (!article) return <div>記事が見つかりません</div>;

  return (
    <div className="prose lg:prose-xl mx-auto p-8">
      <h1>{article.title}</h1>
      <PortableText value={article.body} />  // 本文をリッチテキストで表示
    </div>
  );
}
