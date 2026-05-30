const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    
    // Scroll down the page to trigger framer-motion animations
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if(totalHeight >= scrollHeight - window.innerHeight){
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
    
    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    
    // Wait for animations to settle
    await page.waitForTimeout(2000);
    
    await page.screenshot({ path: 'screenshot_scrolled.png', fullPage: true });
    console.log('Screenshot saved as screenshot_scrolled.png');
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
})();
