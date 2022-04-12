// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 120000,
  // use: {
  //   screenshot: 'only-on-failure'
  // },
  // reporter: [
  //   ['allure-playwright']
  // ],
};
export default config;