'use client'; // クライアント指定（Framer Motion用）

import { motion } from 'framer-motion';
import Head from 'next/head';

export default function Home() {
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

      {/* ヒーロー: xAI風コンセプト/検索窓、白系背景 */}
      <section className="h-screen flex flex-col justify-center items-center bg-gray-50 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-light mb-8"
        >
          誰もが自分にピッタリの安くて安全なサプリメントに出会える。
        </motion.h2>
        <form className="w-full max-w-md">
          <input
            type="text"
            placeholder="サプリメントを検索（例: ビタミンC）"
            className="w-full p-4 border border-gray-300 rounded-full focus:outline-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="mt-4 px-8 py-3 bg-blue-500 text-white rounded-full"
          >
            検索
          </motion.button>
        </form>
      </section>

      {/* 製品セクション: xAIのProducts風、成分ガイド */}
      <section id="guide" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl mb-8">成分ガイド</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sanityから動的取得想定 */}
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl">ビタミンC</h3>
              <p className="text-gray-600">効果と選び方。</p>
            </div>
            {/* 追加カード */}
          </div>
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