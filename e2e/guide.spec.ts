import { test, expect } from '@playwright/test';
test('neutral QR retains destination, language changes and reload persist', async ({ page }) => {
  await page.goto('./#/guide/tasting');
  await page.getByRole('link', { name: 'English' }).click();
  await expect(page).toHaveURL(/#\/en\/guide\/tasting$/);
  await expect(page.getByRole('heading', { name: 'MAERYO tasting guide', exact: true })).toBeVisible();
  await page.getByRole('link', { name: '日本語' }).click();
  await expect(page).toHaveURL(/#\/ja\/guide\/tasting$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'MAERYO 試飲ガイド' })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/#\/en\/guide\/tasting$/);
  await page.goto('./#/guide/tasting');
  await expect(page).toHaveURL(/#\/en\/guide\/tasting$/);
});
test('explicit URL overrides remembered language and unknown or draft guides fail safely', async ({ page }) => {
  await page.goto('./#/ja');
  await page.goto('./#/zh-Hans/guide/tasting');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hans');
  await expect(page.getByRole('heading', { name: 'MAERYO 品鉴指南' })).toBeVisible();
  for (const hash of ['#/zh-Hans/guide/missing', '#/guide/jam', '#/fr/guide/tasting']) {
    await page.goto(`./${hash}`);
    await expect(page.getByRole('heading', { name: '未找到此指南。' })).toBeVisible();
  }
  await page.getByRole('link', { name: '首页', exact: true }).click();
  await expect(page).toHaveURL(/#\/zh-Hans$/);
});
test('storage blocked still allows language selection', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
  });
  await page.goto('./#/guide/tasting');
  await page.getByRole('link', { name: '한국어' }).click();
  await expect(page.getByRole('heading', { name: '매료 시음 안내' })).toBeVisible();
});
for (const locale of ['ko', 'en', 'ja', 'zh-Hans']) {
  test(`${locale} mobile home and guide fit 320px screen`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    for (const path of [`#/${locale}`, `#/${locale}/guide/tasting`]) {
      await page.goto(`./${path}`);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    }
  });
}
