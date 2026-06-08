import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('landing page meets WCAG AA', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
    
  expect(results.violations).toEqual([]);
})
