// app/page.tsx (App Router使用)
import { motion } from 'framer-motion';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4">
      <Head>
        <title>サプティア (SUPTIA)</title>
        <meta name="description" content="誰もが自分にピッタリの安くて安全なサプリメントに出会える。" />
        <meta name="keywords" content="サプリメント, サプリ, 健康, AI検索, 価格比較, 安いサプリ, 安全サプリ" /> {/* SEO/LLMO対策: キーワード追加 */}
        <meta property="og:title" content="サプティア (SUPTIA)" /> {/* OpenGraph for SNS */}
        <meta property="og:description" content="誰もが自分にピッタリの安くて安全なサプリメントに出会える。" />
      </Head>

      {/* ヘッダー: サイト名 */}
      <header className="w-full py-6 text-center">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold tracking-wide"
        >
          サプティア (SUPTIA)
        </motion.h1>
      </header>

      {/* メイン: コンセプト文と検索窓、アニメーション付き */}
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-col items-center text-center max-w-2xl"
      >
        <p className="text-xl mb-8 leading-relaxed">
          誰もが自分にピッタリの安くて安全なサプリメントに出会える。
        </p>

        {/* シンプル検索窓: 基本フォーム。将来的AI対応 */}
        <form className="w-full max-w-md">
          <input
            type="text"
            placeholder="サプリメントを検索（例: ビタミンC, オメガ3）"
            className="w-full p-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          <motion.button 
            type="submit" 
            whileHover={{ scale: 1.05 }}
            className="mt-4 px-8 py-3 bg-blue-500 text-white rounded-full font-semibold"
          >
            検索
          </motion.button>
        </form>
      </motion.main>

      {/* 追加: 成分ガイドリンク（フェーズ1の10-20本記事対応） */}
      <section className="mt-12 text-center">
        <h2 className="text-2xl mb-4">成分ガイド</h2>
        <ul className="list-none space-y-2">
          <li><a href="/articles/vitamin-c" className="text-blue-500 hover:underline">ビタミンCの効果と選び方</a></li>
          {/* 他の記事リンクを追加。Sanityから動的に取得可能 */}
        </ul>
      </section>

      {/* フッター: シンプル */}
      <footer className="w-full py-6 mt-auto text-center text-sm text-gray-500">
        © 2025 サプティア. All rights reserved.
      </footer>
    </div>
  );
}