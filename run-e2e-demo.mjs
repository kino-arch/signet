import { chromium } from 'playwright';

async function runDemo() {
  console.log("Launching Chromium...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 960 }
  });
  const page = await context.newPage();

  console.log("Navigating to http://localhost:5173/dashboard...");
  await page.goto('http://localhost:5173/dashboard', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // give the page time to render

  await page.screenshot({ path: 'artifacts_demo_step1_dashboard.png' });
  console.log("Screenshot taken: dashboard");

  console.log("Filling out personal info...");
  // Use generic selectors if placeholders are tricky
  await page.fill('input[placeholder="Jane Doe"]', 'Alex Morgan');
  await page.fill('input[placeholder="Senior Software Engineer"]', 'Senior Software Engineer');
  await page.fill('input[placeholder="jane@example.com"]', 'alex.morgan@email.com');
  await page.fill('input[placeholder="+1 555-0100"]', '+1 (555) 234-5678');
  await page.fill('input[placeholder="San Francisco"]', 'San Francisco');
  await page.fill('textarea[placeholder*="brief overview"]', 'A passionate builder of systems and teams.');
  
  await page.screenshot({ path: 'artifacts_demo_step2_filled_personal.png' });
  
  // Go to Experience
  console.log("Clicking Next...");
  await page.click('button:has-text("Next →")');
  await page.waitForTimeout(1000);
  
  console.log("Adding experience...");
  await page.click('button:has-text("Add")');
  await page.fill('input[placeholder="Acme Corp"]', 'TechCorp Inc');
  await page.fill('input[placeholder="Software Engineer"]', 'Software Engineer');
  await page.fill('input[placeholder="Jan 2020"]', 'Jan 2021');
  await page.fill('input[placeholder="Present"]', 'Jan 2024');
  await page.fill('textarea[placeholder*="Shipped new feature"]', 'Led checkout performance project that reduced latency by 3x.\nManaged a team of 4 engineers.\nHandled 1M+ daily API requests.');
  
  await page.screenshot({ path: 'artifacts_demo_step3_experience.png' });

  console.log("Navigating to /slates...");
  await page.goto('http://localhost:5173/slates', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'artifacts_demo_step4_slates.png' });

  // Now, in /slates, find a "Continue Editing" button or similar if it exists
  const continueBtn = await page.$('button:has-text("Continue Editing")');
  if (continueBtn) {
     console.log("Entering AI Editor...");
     await continueBtn.click();
     await page.waitForTimeout(2000);
     await page.screenshot({ path: 'artifacts_demo_step5_ai_editor.png' });
  }

  // Wait a moment for ATS score to compute
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'artifacts_demo_step6_ats_scores.png' });
  
  console.log("Demo flow complete. Check the artifacts_demo_*.png files.");
  await browser.close();
}

runDemo().catch(console.error);
