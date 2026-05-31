import { test, expect, Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Mandalorian Forge - Accessibility Audits (Axe)", () => {
  // Common function to run axe and format results beautifully
  async function runAxeScan(page: Page, pageName: string) {
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    if (results.violations.length > 0) {
      console.log(`\n🚨 [Axe Accessibility Violations] - ${pageName} 🚨`);
      results.violations.forEach((violation, index) => {
        console.log(`\n${index + 1}. Violation: [${violation.id}] - ${violation.help}`);
        console.log(`   Impact: ${violation.impact?.toUpperCase()}`);
        console.log(`   Help URL: ${violation.helpUrl}`);
        violation.nodes.forEach((node, nodeIndex) => {
          console.log(`   Node ${nodeIndex + 1}: ${node.html}`);
          console.log(`   Selector: ${node.target.join(", ")}`);
          if (node.any.length > 0 || node.all.length > 0 || node.none.length > 0) {
            console.log(`   Failure Summary: ${node.failureSummary}`);
          }
        });
      });
    }

    expect(results.violations).toEqual([]);
  }

  test("Landing Page accessibility audit", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await page.goto("/");
    await expect(page).toHaveTitle(/Signet/i);
    // Allow any initial animations to finish
    await page.waitForTimeout(1000);
    await runAxeScan(page, "Landing Page");
  });

  test("Login Page accessibility audit", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await page.goto("/login");
    await expect(page.getByText("Access the Forge")).toBeVisible();
    await page.waitForTimeout(1000);
    await runAxeScan(page, "Login Page");
  });

  test("Onboarding Page accessibility audit", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await page.goto("/login");
    
    // Log in as guest
    const guestButton = page.getByRole("button", { name: "Enter as Guest / Demo Mode" });
    await expect(guestButton).toBeVisible();
    await guestButton.click();
    
    await expect(page).toHaveURL(/.*onboarding/);
    
    // STEP 0: Wait for Biometric Recognition scanner
    const enterForgeButton = page.getByRole("button", { name: "Enter the Forge" });
    await expect(enterForgeButton).toBeEnabled({ timeout: 15000 });
    
    // Audit the onboarding splash/biometrics state
    await runAxeScan(page, "Onboarding - Biometrics Step");

    // Click "ENTER THE FORGE"
    await enterForgeButton.click();

    // STEP 1: Select Guild Creed (Specialization)
    await expect(page.getByText("Select Your Specialization")).toBeVisible();
    await runAxeScan(page, "Onboarding - Select Guild Creed Step");
  });

  test("Forge Editor Dashboard accessibility audit", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await page.goto("/login");
    
    // Log in as guest and skip to editor
    const guestButton = page.getByRole("button", { name: "Enter as Guest / Demo Mode" });
    await guestButton.click();
    
    const enterForgeButton = page.getByRole("button", { name: "Enter the Forge" });
    await expect(enterForgeButton).toBeEnabled({ timeout: 15000 });
    await enterForgeButton.click();
    
    await page.getByText("The Forge", { exact: true }).click();
    await page.getByRole("button", { name: "Confirm Specialization" }).click();
    
    // Step 2: Target Intelligence (Skip for now)
    await expect(page.getByText("Target Intelligence")).toBeVisible();
    await page.getByRole("button", { name: "Skip for now / Continue" }).click();
    
    await page.locator("#firstName").fill("Din");
    await page.locator("#lastName").fill("Djarin");
    await page.locator("input[type='tel']").fill("+15550198000");
    await page.locator("#location").fill("Mandalore Sector");
    await page.locator("#website").fill("guild.org");
    await page.getByRole("button", { name: "Continue to Review" }).click();
    
    await expect(page.getByText("The Forge Commitment")).toBeVisible();
    const oathCheckboxText = page.getByText("I'm ready to build my resume inside the Forge editor.");
    await expect(oathCheckboxText).toBeVisible({ timeout: 25000 });
    await oathCheckboxText.click();
    
    const igniteButton = page.getByRole("button", { name: "Launch the Forge" });
    await expect(igniteButton).toBeEnabled();
    await igniteButton.click();
    
    // New flow: redirects to /slates, click empty state to enter the forge
    await expect(page).toHaveURL(/.*slates/, { timeout: 10000 });
    await page.locator("text=AWAITING INTEL").click();
    await expect(page).toHaveURL(/.*\/forge\/.+/, { timeout: 15000 });
    await expect(page.getByRole("heading", { name: /Forge Array/i })).toBeVisible({ timeout: 10000 });
    
    await runAxeScan(page, "Editor - Dashboard Overview");
  });
});
