import { client } from '@/lib/sanity.client';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

export async function generateStaticParams() {
  const query = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Static params error:', error);
    return [];
  }
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    body,
    category,
    "mainImage": mainImage.asset->url
  }`;
  try {
    const article = await client.fetch(query, { slug: params.slug });
    if (!article) {
      return (
        <div className="max-w-2xl mx-auto p-4">
          <p>記事が見つかりません。Sanity Studioで以下の点を確認してください：</p>
          <ul className="list-disc pl-5">
            <li>スラッグ（{params.slug}）が存在するか</li>
            <li>記事が「Publish」済みか</li>
          </ul>
        </div>
      );
    }
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <p className="text-gray-600 mb-4">カテゴリ: {article.category || '未設定'}</p>
        {article.mainImage && <img src={article.mainImage} alt={article.title} className="w-full mb-4 rounded" />}
        {article.body ? (
          <PortableText value={article.body} />
        ) : (
          <p>本文がありません。Sanity Studioで「本文」フィールドに内容を入力し、公開してください。</p>
        )}
      </div>
    );
  } catch (error: any) {
    console.error('Sanity fetch error:', error);
    return (
      <div className="max-w-2xl mx-auto p-4">
        <p>エラーが発生しました: {error.message}</p>
      </div>
    );
  }
}
