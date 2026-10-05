// @ts-check
const { defineConfig } = require('@playwright/test');

const os = require('os');
const tester = process.env.TESTER_NAME || os.userInfo().username;

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright', {
      resultsDir: 'allure-results',
      environmentInfo: {
       BaseURL: 'https://www.way2automation.com/MediShopWebApp/',
    },
}],
  ],

  use: {
    baseURL: 'https://www.way2automation.com/MediShopWebApp/',
    trace: 'on-first-retry',
    headless: false
  },

  projects: [
    {
      name: 'chromium',
      use: {
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
});
