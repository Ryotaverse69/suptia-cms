"use client";

import Head from 'next/head';
import { motion } from 'framer-motion'; // アニメーション用

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>サプティア (SUPTIA) - 最適なサプリメント</title>
        <meta name="description" content="誰もが自分にピッタリの安くて安全なサプリメントに出会える。" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-4">
        <motion.h1 
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          誰もが自分にピッタリの安くて安全なサプリメントに出会える。
        </motion.h1>
        <motion.input 
          type="text" 
          placeholder="成分を検索..." 
          className="w-full max-w-md p-2 border border-gray-300 rounded mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <iframe
            src="https://docs.google.com/forms/d/e/your-form-id/viewform?embedded=true"
            width="100%"
            height="500"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >読み込み中...</iframe>
        </motion.div>
        {/* 記事リストなどの既存コンテンツ */}
      </div>
    </>
  );
}