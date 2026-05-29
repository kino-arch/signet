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
    await expect(page.getByText("Welcome back, Mando")).toBeVisible();
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
    const enterForgeButton = page.getByRole("button", { name: "ENTER THE FORGE" });
    await expect(enterForgeButton).toBeEnabled({ timeout: 8000 });
    
    // Audit the onboarding splash/biometrics state
    await runAxeScan(page, "Onboarding - Biometrics Step");

    // Click "ENTER THE FORGE"
    await enterForgeButton.click();

    // STEP 1: Select Guild Creed (Specialization)
    await expect(page.getByText("Choose Your Guild Creed")).toBeVisible();
    await runAxeScan(page, "Onboarding - Select Guild Creed Step");
  });

  test("Forge Editor Dashboard accessibility audit", async ({ page }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await page.goto("/login");
    
    // Log in as guest and skip to editor
    const guestButton = page.getByRole("button", { name: "Enter as Guest / Demo Mode" });
    await guestButton.click();
    
    const enterForgeButton = page.getByRole("button", { name: "ENTER THE FORGE" });
    await expect(enterForgeButton).toBeEnabled({ timeout: 8000 });
    await enterForgeButton.click();
    
    await page.getByText("The Forge", { exact: true }).click();
    await page.getByRole("button", { name: "Confirm Specialization" }).click();
    
    await page.locator("#firstName").fill("Din");
    await page.locator("#lastName").fill("Djarin");
    await page.locator("#phone").fill("555-0198");
    await page.locator("#location").fill("Mandalore Sector");
    await page.locator("#website").fill("guild.org");
    await page.getByRole("button", { name: "Proceed to the Oath" }).click();
    
    const oathCheckboxText = page.getByText("I swear the Creed. I am ready to forge my resume.");
    await expect(oathCheckboxText).toBeVisible({ timeout: 25000 });
    await oathCheckboxText.click();
    
    const igniteButton = page.getByRole("button", { name: "IGNITE THE FORGE" });
    await expect(igniteButton).toBeEnabled();
    await igniteButton.click();
    
    // Redirect to Editor Dashboard
    await expect(page).toHaveURL(/.*editor/);
    await expect(page.getByRole("heading", { name: "Bounty Analytics" })).toBeVisible();
    
    await runAxeScan(page, "Editor - Dashboard Overview");

    // Check "The Forge" tab accessibility
    const forgeTabButton = page.getByRole("button", { name: "The Forge" });
    await forgeTabButton.click();
    await expect(page.getByRole("heading", { name: "The Crucible" })).toBeVisible();
    
    await runAxeScan(page, "Editor - The Forge Form");
  });
});
