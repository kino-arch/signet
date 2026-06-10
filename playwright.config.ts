import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  // Contract: Playwright owns *.spec.ts — unit tests (.test.ts) belong to Vitest.
  // This boundary is permanent: adding a .test.ts to ./tests/ will never pollute the E2E suite.
  testMatch: /.*\.spec\.ts/,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
    stdout: "ignore",
    stderr: "pipe",
  },
})
