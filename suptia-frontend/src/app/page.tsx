// app/page.tsx
'use client'; // クライアントコンポーネント指定（エラー回避）

import { motion } from 'framer-motion';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col items-center justify-center px-4">
      <Head>
        <title>サプティア (SUPTIA)</title>
        <meta name="description" content="誰もが自分にピッタリの安くて安全なサプリメントに出会える。" />
        <meta name="keywords" content="サプリメント, サプリ, 健康, AI検索, 価格比較, 安いサプリ, 安全サプリ" />
        <meta property="og:title" content="サプティア (SUPTIA)" />
        <meta property="og:description" content="誰もが自分にピッタリの安くて安全なサプリメントに出会える。" />
        <meta property="og:url" content="https://www.suptia.com" />
      </Head>

      {/* ヘッダー */}
      <header className="w-full py-8 text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold tracking-wide sm:text-6xl"
        >
          サプティア (SUPTIA)
        </motion.h1>
      </header>

      {/* メイン */}
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-col items-center text-center max-w-2xl"
      >
        <p className="text-xl mb-10 leading-relaxed sm:text-2xl">
          誰もが自分にピッタリの安くて安全なサプリメントに出会える。
        </p>

        {/* 検索窓 */}
        <form className="w-full max-w-md">
          <input
            type="text"
            placeholder="サプリメントを検索（例: ビタミンC, オメガ3）"
            className="w-full p-4 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-8 py-3 bg-blue-500 text-white rounded-full font-semibold"
          >
            検索
          </motion.button>
        </form>

        {/* アンケートCTA */}
        <motion.a
          href="https://forms.gle/your-google-form-link" // Google Formsリンクを挿入
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-6 px-6 py-2 bg-blue-100 text-blue-700 rounded-full"
        >
          ご意見をお聞かせください
        </motion.a>
      </motion.main>

      {/* 成分ガイド */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-12 text-center max-w-2xl"
      >
        <h2 className="text-2xl mb-4 font-semibold">成分ガイド</h2>
        <ul className="list-none space-y-2">
          <li><a href="/articles/vitamin-c" className="text-blue-500 hover:underline">ビタミンCの効果と選び方</a></li>
          <li><a href="/articles/omega-3" className="text-blue-500 hover:underline">オメガ3の健康効果</a></li>
          {/* Sanityから動的取得推奨 */}
        </ul>
      </motion.section>

      {/* フッター */}
      <footer className="w-full py-6 mt-auto text-center text-sm text-gray-500">
        © 2025 サプティア. All rights reserved. | <a href="/privacy" className="hover:underline">プライバシーポリシー</a>
      </footer>
    </div>
  );
}
