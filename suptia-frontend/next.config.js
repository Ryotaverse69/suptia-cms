/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  eslint: {ignoreDuringBuilds: true},
  experimental: {
    optimizePackageImports: ['gsap', 'framer-motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
