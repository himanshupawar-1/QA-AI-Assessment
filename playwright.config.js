// @ts-check
import { defineConfig } from "@playwright/test";
require("dotenv").config();

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.js",
  retries: 1,
  workers: 1,
  timeout: 120 * 1000,
  expect: {
    timeout: 20000,
  },
  reporter: [
    ["list"],
    ["html", { outputFolder: "execution-reports/html", open: "never" }],
    ["junit", { outputFile: "execution-reports/junit/results.xml" }],
  ],
  outputDir: "test-results",
  use: {
    baseURL: process.env.BASE_URL || "https://practicesoftwaretesting.com",
    browserName: "chromium",
    headless: true,
    screenshot: "on",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    ignoreHTTPSErrors: true,
    viewport: { width: 1440, height: 900 },
    actionTimeout: 20000,
  },
  projects: [
    {
      name: "toolshop-chromium",
      use: { browserName: "chromium" },
    },
  ],
});
