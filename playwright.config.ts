// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 0,
  use: {
    screenshot: 'only-on-failure'
  },
  reporter: [
    ['allure-playwright']
  ],
  expect: {
    timeout: 5000
  }
};
export default config;