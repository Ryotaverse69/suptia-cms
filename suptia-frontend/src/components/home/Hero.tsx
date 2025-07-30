'use client'

import { motion } from 'framer-motion';

export default function Hero() {
  return (
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
  );
}
