import { chromium } from 'playwright';

(async () => {
  console.log('Starting Playwright...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Wait for Storybook to be ready (it takes a moment for the iframe to load)
  await page.goto('http://localhost:6006/iframe.html?id=primitives-signetinput--default&viewMode=story');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshot_input.png' });
  console.log('Screenshot of SignetInput saved as screenshot_input.png');

  await page.goto('http://localhost:6006/iframe.html?id=nordic-nordiceditorsidebar--default&viewMode=story');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshot_sidebar.png' });
  console.log('Screenshot of NordicEditorSidebar saved as screenshot_sidebar.png');

  await page.goto('http://localhost:6006/iframe.html?id=nordic-profiledropdown--default&viewMode=story');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshot_profile.png' });
  console.log('Screenshot of ProfileDropdown saved as screenshot_profile.png');

  await page.goto('http://localhost:6006/iframe.html?id=primitives-signetcard--glow&viewMode=story');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshot_card.png' });
  console.log('Screenshot of SignetCard saved as screenshot_card.png');

  await browser.close();
})();
