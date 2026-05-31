import { test, expect } from "@playwright/test";

test("find violating button", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.waitForTimeout(2000);
  const btns = await page.$$('button[data-variant="secondary"]');
  for (const btn of btns) {
    console.log(await btn.evaluate(node => node.outerHTML));
  }
});
