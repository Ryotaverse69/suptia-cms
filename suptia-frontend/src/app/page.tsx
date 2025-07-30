
// app/page.tsx (抜粋)
import { client } from '../lib/sanity.client';  // クライアントインポート
import Head from 'next/head';
import Hero from '../components/home/Hero';

// 「Ingredient Guide」フォルダ内の記事を取得する関数
async function getIngredientGuides() {
  // スキーマに合わせて調整（例: _type == "ingredientGuide"）
  const query = `*[_type == "post"] {
    title,
    "slug": slug.current,  // スラッグで詳細ページリンク
    "mainImage": mainImage.asset->url,  // 画像URL（Canva AI生成想定）
    excerpt  // 抜粋フィールドがあれば
  } | order(_createdAt desc) [0...10]`;  // 最新10件（調整可能）
  return await client.fetch(query);
}

export default async function Home() {
  const articles = await getIngredientGuides();  // データ取得

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      <Head>
        <title>サプティア (SUPTIA)</title>
        <meta name="description" content="誰もが自分にピッタリの安くて安全なサプリメントに出会える。" />
        <meta name="keywords" content="サプリメント, 健康, AI検索, 価格比較" />
      </Head>

      {/* ヘッダー: xAI風ロゴ/ナビ */}
      <header className="fixed top-0 w-full bg-white/75 backdrop-blur py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">サプティア (SUPTIA)</h1>
        <nav className="space-x-4">
          <a href="#guide" className="text-gray-600 hover:text-black">成分ガイド</a>
          <a href="#news" className="text-gray-600 hover:text-black">ニュース</a>
          <a href="#contact" className="text-gray-600 hover:text-black">お問い合わせ</a>
        </nav>
      </header>

      <Hero />

      {/* 製品セクション: xAIのProducts風、成分ガイド */}
      <section id="guide" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl mb-8">成分ガイド (Ingredient Guide)</h2>
          {articles.length === 0 ? (
            <p>記事が見つかりません。Sanityで確認してください。</p>
          ) : (
            <ul className="list-none space-y-4">
              {articles.map((article: any) => (
                <li key={article.slug} className="border-b py-2">
                  <a href={`/guides/${article.slug}`} className="text-blue-500 hover:underline text-lg">
                    {article.title}
                  </a>
                  {article.excerpt && <p className="text-gray-600">{article.excerpt}</p>}
                  {article.mainImage && <img src={article.mainImage} alt={article.title} className="w-32 h-32 mx-auto mt-2" />}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ミッションセクション: xAIのUnderstand風 */}
      <section className="py-32 bg-gray-50 text-center">
        <h2 className="text-5xl font-light">最適なサプリを見つけよう</h2>
      </section>

      {/* ニュース: xAIのBlog風 */}
      <section id="news" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl mb-8">最新ニュース</h2>
          <div className="space-y-8">
            {/* 例 */}
            <div className="border-b pb-4">
              <h3 className="text-xl">新機能リリース</h3>
              <p className="text-gray-600">2025-07-26</p>
            </div>
          </div>
        </div>
      </section>

      {/* フッター: xAI風リンク集 */}
      <footer className="py-8 px-6 bg-gray-50 text-center text-gray-600">
        <p>© 2025 サプティア. All rights reserved.</p>
        <div className="space-x-4 mt-4">
          <a href="/privacy">プライバシーポリシー</a>
          <a href="/terms">利用規約</a>
        </div>
      </footer>
    </div>
  );
}
