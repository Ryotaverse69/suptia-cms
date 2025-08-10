import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  use: {
    baseURL: process.env.NEXT_BASE_URL || 'http://localhost:3000',
    headless: true,
  },
  webServer: {
    command: 'NEXT_PUBLIC_E2E=1 next dev',
    port: 3000,
    reuseExistingServer: false,
  },
})


