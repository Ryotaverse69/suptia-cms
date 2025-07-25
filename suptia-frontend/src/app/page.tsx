// src/app/page.tsx

// Sanity clientのインポートパスはご自身の環境に合わせてください
import { client } from '@/lib/sanity.client';
import Link from 'next/link';

// Sanityから記事データを取得する非同期関数
async function getArticles() {
  // ingredientGuideタイプの全ドCュメントを取得するクエリ
  const query = `*[_type == "ingredientGuide"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current
  }`;
  const articles = await client.fetch(query);
  return articles;
}

// ページコンポーネント (これが default export)
export default async function HomePage() {
  // ページコンポーネント内で直接データを取得
  const articles = await getArticles();

  // 取得したデータを使ってJSXを返す
  return (
    <div>
      <h1>記事一覧</h1>
      <ul>
        {/* Sanityから渡される型が不明なため、一時的にanyを使います */}
        {articles.map((article: any) => (
          <li key={article._id}>
            <Link href={`/articles/${article.slug}`}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}