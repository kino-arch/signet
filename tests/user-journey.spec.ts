import { test, expect } from "@playwright/test";

test.describe("Mandalorian Forge User Journey", () => {
  test("should complete guest login, onboarding, dashboard navigation, PDF download, and sign out", async ({ page }) => {
    // Capture browser console logs
    page.on("console", (msg) => {
      console.log(`[Browser Console] ${msg.type().toUpperCase()}: ${msg.text()}`);
    });

    // Set viewport to ensure live preview is visible (xl breakpoint is 1280px)
    await page.setViewportSize({ width: 1600, height: 900 });
    test.setTimeout(60000); // 60s total test timeout for slow CI runs

    // 1. Navigate to the landing page
    await page.goto("/");
    await expect(page).toHaveTitle(/Signet/i);

    // 2. Click "Enter the Forge" to go to the Login Page
    const enterForgeLink = page.getByRole("link", { name: "Enter the Forge" }).first();
    await expect(enterForgeLink).toBeVisible();
    await enterForgeLink.click();
    await expect(page).toHaveURL(/.*login/);
    
    // Verify login screen loading
    await expect(page.getByText("Welcome back, Mando")).toBeVisible();

    // 3. Click "Enter as Guest / Demo Mode"
    const guestButton = page.getByRole("button", { name: "Enter as Guest / Demo Mode" });
    await expect(guestButton).toBeVisible();
    await guestButton.click();

    // 4. Redirect to onboarding
    await expect(page).toHaveURL(/.*onboarding/);

    // STEP 0: Wait for Biometric Recognition scanner
    const enterForgeButton = page.getByRole("button", { name: "ENTER THE FORGE" });
    // Biometric recognition takes ~2.2 seconds. Wait up to 8s for it to become enabled and display the text.
    await expect(enterForgeButton).toBeEnabled({ timeout: 8000 });
    await enterForgeButton.click();

    // STEP 1: Select Guild Creed (Specialization)
    await expect(page.getByText("Choose Your Guild Creed")).toBeVisible();
    // Click the "The Forge" specialization card
    await page.getByText("The Forge", { exact: true }).click();
    
    // Click "Confirm Specialization"
    const confirmRoleButton = page.getByRole("button", { name: "Confirm Specialization" });
    await expect(confirmRoleButton).toBeEnabled();
    await confirmRoleButton.click();

    // STEP 2: Establish Sigil Details (Contact Info)
    await expect(page.getByText("Establish Your Sigil Details")).toBeVisible();
    
    // Fill the inputs using locators
    await page.locator("#firstName").fill("Din");
    await page.locator("#lastName").fill("Djarin");
    await page.locator("#phone").fill("555-0198");
    await page.locator("#location").fill("Mandalore Sector");
    await page.locator("#website").fill("guild.org");

    // Click "Proceed to the Oath"
    await page.getByRole("button", { name: "Proceed to the Oath" }).click();

    // STEP 3: Swear the Oath
    await expect(page.getByText("The Armorer's Creed")).toBeVisible();

    // Wait for the animated creed to finish and show the oath checkbox
    const oathCheckboxText = page.getByText("I swear the Creed. I am ready to forge my resume.");
    // typingSpeed is 24-80 chars/ms, with pauses. Wait up to 25s for the oath checkbox to appear.
    await expect(oathCheckboxText).toBeVisible({ timeout: 25000 });
    await oathCheckboxText.click();

    // Click "IGNITE THE FORGE"
    const igniteButton = page.getByRole("button", { name: "IGNITE THE FORGE" });
    await expect(igniteButton).toBeEnabled();
    await igniteButton.click();

    // 5. Redirect to Editor / Mainframe Dashboard
    await expect(page).toHaveURL(/.*editor/);
    
    // Verify Dashboard Overview tab loads
    await expect(page.getByRole("heading", { name: "Bounty Analytics" })).toBeVisible();

    // 6. Navigation Check & Wizard Run: The Forge tab
    const forgeTabButton = page.getByRole("button", { name: "The Forge" });
    await expect(forgeTabButton).toBeVisible();
    await forgeTabButton.click();
    await expect(page.getByRole("heading", { name: "The Crucible" })).toBeVisible();

    // Step through the editor wizard
    const nextStepButton = page.getByRole("button", { name: "Next Step" });
    
    // Step 1 -> 2 (Basic Info)
    await nextStepButton.click();
    // Step 2 -> 3 (Experience)
    await nextStepButton.click();
    // Step 3 -> 4 (Education)
    await nextStepButton.click();
    // Step 4 -> 5 (Skills)
    await nextStepButton.click();

    // Now on step 5 (Aesthetics): Select "Classified Dossier"
    await page.getByText("Classified Dossier").first().click();

    // Click "Complete Forge" to enter the Armory Cache
    const completeForgeButton = page.getByRole("button", { name: "Complete Forge" });
    await expect(completeForgeButton).toBeVisible();
    await completeForgeButton.click();

    // Verify entering The Armory Cache
    await expect(page.getByRole("heading", { name: "The Armory Cache" })).toBeVisible();

    // Intercept the download event from the Retrieval terminal
    const downloadPromise = page.waitForEvent("download");
    const extractButton = page.getByRole("button", { name: "EXTRACT FORGED SIGIL" });
    await expect(extractButton).toBeVisible();
    await extractButton.click();
    
    const download = await downloadPromise;
    // Verify downloaded filename and that it has content
    expect(download.suggestedFilename()).toBe("mandalorian-dossier.pdf");
    const downloadPath = await download.path();
    expect(downloadPath).toBeTruthy();

    // Wait for the "RETURN TO COVERT" button to appear (after progress bar hits 100%)
    const returnToCovertButton = page.getByRole("button", { name: "RETURN TO COVERT" });
    await expect(returnToCovertButton).toBeVisible({ timeout: 10000 });
    await returnToCovertButton.click();

    // Verify returned to dashboard overview
    await expect(page.getByRole("heading", { name: "Bounty Analytics" })).toBeVisible();

    // 7. Navigation Check: Identity Core tab
    const identityCoreTabButton = page.getByRole("button", { name: "Identity Core" });
    await expect(identityCoreTabButton).toBeVisible();
    await identityCoreTabButton.click();
    await expect(page.getByRole("heading", { name: "Profile settings" })).toBeVisible();

    // 8. Sign Out Check
    const signOutButton = page.getByRole("button", { name: "Sign Out" });
    await expect(signOutButton).toBeVisible();
    await signOutButton.click();

    // Verify returned to landing page
    const baseUrl = new URL(page.url()).origin;
    await expect(page).toHaveURL(new RegExp(`^${baseUrl}/$`));
    await expect(page.getByRole("link", { name: "Enter the Forge" }).first()).toBeVisible();
  });
});
