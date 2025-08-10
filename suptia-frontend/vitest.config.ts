import {defineConfig} from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    include: ['src/**/?(*.)+(test).[tj]s?(x)', 'tests/**/?(*.)+(spec).[tj]s?(x)'],
    exclude: ['tests/e2e/**'],
    environment: 'node',
  },
})


