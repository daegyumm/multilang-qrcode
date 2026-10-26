import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://127.0.0.1:4173/multilang-qrcode/', ...devices['iPhone 13'], defaultBrowserType: 'chromium', channel: 'chromium' },
  webServer: { command: 'npm run preview -- --host 127.0.0.1 --port 4173', url: 'http://127.0.0.1:4173/multilang-qrcode/', reuseExistingServer: !process.env.CI },
  reporter: 'list',
});
