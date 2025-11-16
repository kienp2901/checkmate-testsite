/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT || 3001;
const baseURL = `http://localhost:${PORT}`;
process.env.ENVIRONMENT_URL = baseURL;

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  fullyParallel: !!process.env.CI,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  maxFailures: process.env.CI ? 10 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  webServer: {
    command: process.env.CI ? 'npm run start' : 'npm run dev',
    url: baseURL,
    timeout: 2 * 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    ...(process.env.CI
      ? [
          {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
          },
          {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
          },
        ]
      : []),
  ],
});


