import { test, expect } from '@playwright/test'

test('diagnosis flow shows results', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: '診断をはじめる' }).click()

  // 3問相当: 目的/予算/妊娠
  await page.getByText('目的').waitFor()
  await page.getByLabel('睡眠').check()
  await page.getByRole('spinbutton').fill('3000')
  await page.getByLabel('妊娠中/授乳中').uncheck()

  await page.getByRole('button', { name: '結果を見る' }).click()

  await page.waitForURL('**/results')
  // 結果カードが表示される
  await expect(page.getByText('総合')).toBeVisible({ timeout: 10_000 })
})


