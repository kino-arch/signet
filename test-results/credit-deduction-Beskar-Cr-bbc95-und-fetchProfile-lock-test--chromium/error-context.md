# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: credit-deduction.spec.ts >> Beskar Credit Deduction >> credit balance is NOT reset by simulated background fetchProfile (lock test)
- Location: tests\credit-deduction.spec.ts:121:3

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: locator.click: Test timeout of 90000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Enter as Guest / Demo Mode' })

```

# Page snapshot

```yaml
- main [ref=e3]:
  - main [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e7]: SIGNET
      - blockquote [ref=e9]:
        - paragraph [ref=e10]: “43% of resumes never reach a human. Forge yours to survive any scanner.”
        - generic [ref=e11]: ~ The FAANG Executive Protocol
      - generic [ref=e12]:
        - generic:
          - img "Background Paths"
        - generic:
          - img "Background Paths"
    - generic [ref=e13]:
      - link "Base Camp" [ref=e14] [cursor=pointer]:
        - /url: /
        - img
        - text: Base Camp
      - generic [ref=e15]:
        - generic [ref=e16]:
          - heading "Access the Forge" [level=1] [ref=e17]
          - paragraph [ref=e18]: Sign in to your account.
        - generic [ref=e19]:
          - group [ref=e20]:
            - textbox "Email address" [ref=e21]
            - group [ref=e22]:
              - img [ref=e23]
          - group [ref=e26]:
            - textbox "Password" [ref=e27]
            - group [ref=e28]:
              - button "Show password" [ref=e29]:
                - img [ref=e30]
          - button "Forgot password?" [ref=e34]
          - button "Access the Forge" [disabled]
        - generic [ref=e37]: or continue with
        - button "Google" [ref=e39]:
          - img
          - text: Google
        - paragraph [ref=e40]:
          - text: No account?
          - button "Join the Guild" [ref=e41]
        - paragraph [ref=e42]:
          - text: By continuing, you agree to the
          - link "Creed of the Mandalore" [ref=e43] [cursor=pointer]:
            - /url: "#"
          - text: and
          - link "Privacy Policy" [ref=e44] [cursor=pointer]:
            - /url: "#"
          - text: .
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | /**
  4   |  * Credit Deduction Tests
  5   |  *
  6   |  * These tests verify that Beskar Credit balance correctly decrements by 1
  7   |  * after generating a PDF, and that the balance is NOT reset by a background
  8   |  * fetchProfile call (the auth token refresh race condition).
  9   |  */
  10  | test.describe("Beskar Credit Deduction", () => {
  11  |   /**
  12  |    * Helper: navigate through guest onboarding to reach The Armory Cache.
  13  |    */
  14  |   async function reachArmoryCacheAsGuest(page: any) {
  15  |     await page.setViewportSize({ width: 1600, height: 900 });
  16  |     test.setTimeout(90000);
  17  | 
  18  |     // Log all console errors for debugging
  19  |     page.on("console", (msg: any) => {
  20  |       if (msg.type() === "error")
  21  |         console.log(`[Browser Error] ${msg.text()}`);
  22  |     });
  23  | 
  24  |     // Landing → Login
  25  |     await page.goto("/");
  26  |     await page.getByRole("link", { name: "Enter the Forge" }).first().click();
  27  |     await expect(page).toHaveURL(/.*login/);
  28  | 
  29  |     // Guest login
> 30  |     await page.getByRole("button", { name: "Enter as Guest / Demo Mode" }).click();
      |                                                                            ^ Error: locator.click: Test timeout of 90000ms exceeded.
  31  |     await expect(page).toHaveURL(/.*onboarding/);
  32  | 
  33  |     // Biometric scanner (waits ~2s to enable)
  34  |     await expect(page.getByRole("button", { name: "ENTER THE FORGE" })).toBeEnabled({ timeout: 8000 });
  35  |     await page.getByRole("button", { name: "ENTER THE FORGE" }).click();
  36  | 
  37  |     // Step 1: Guild Creed
  38  |     await page.getByText("The Forge", { exact: true }).click();
  39  |     await page.getByRole("button", { name: "Confirm Specialization" }).click();
  40  | 
  41  |     // Step 2: Sigil details
  42  |     await page.locator("#firstName").fill("Din");
  43  |     await page.locator("#lastName").fill("Djarin");
  44  |     await page.locator("#phone").fill("555-0198");
  45  |     await page.locator("#location").fill("Mandalore Sector");
  46  |     await page.locator("#website").fill("guild.org");
  47  |     await page.getByRole("button", { name: "Proceed to the Oath" }).click();
  48  | 
  49  |     // Step 3: The Oath
  50  |     const oathText = page.getByText("I swear the Creed. I am ready to forge my resume.");
  51  |     await expect(oathText).toBeVisible({ timeout: 25000 });
  52  |     await oathText.click();
  53  |     await page.getByRole("button", { name: "IGNITE THE FORGE" }).click();
  54  | 
  55  |     // Editor
  56  |     await expect(page).toHaveURL(/.*editor/);
  57  |     await expect(page.getByRole("heading", { name: "Bounty Analytics" })).toBeVisible();
  58  | 
  59  |     // Navigate to The Forge wizard
  60  |     await page.getByRole("button", { name: "The Forge" }).click();
  61  |     await expect(page.getByRole("heading", { name: "The Crucible" })).toBeVisible();
  62  | 
  63  |     // Step through wizard to the Armory Cache
  64  |     const next = page.getByRole("button", { name: "Next Step" });
  65  |     await next.click(); // step 1→2
  66  |     await next.click(); // step 2→3
  67  |     await next.click(); // step 3→4
  68  |     await next.click(); // step 4→5 (aesthetics)
  69  |     await page.getByText("Classified Dossier").first().click();
  70  |     await page.getByRole("button", { name: "Complete Forge" }).click();
  71  | 
  72  |     // Now on Armory Cache
  73  |     await expect(page.getByRole("heading", { name: "The Armory Cache" })).toBeVisible();
  74  |   }
  75  | 
  76  |   test("credit balance decrements by 1 after PDF extraction (guest mode)", async ({ page }) => {
  77  |     await reachArmoryCacheAsGuest(page);
  78  | 
  79  |     // Read the initial balance shown in the UI
  80  |     // Guest mode starts with 1 credit — text is "Costs 1 Beskar Credit · Balance: 1"
  81  |     const balanceText = page.locator("text=/Balance: \\d+/");
  82  |     await expect(balanceText).toBeVisible({ timeout: 5000 });
  83  | 
  84  |     const initialText = await balanceText.textContent() ?? "";
  85  |     const initialBalance = parseInt(initialText.match(/Balance:\s*(\d+)/)?.[1] ?? "0", 10);
  86  |     console.log(`[Test] Initial balance: ${initialBalance}`);
  87  |     expect(initialBalance).toBeGreaterThan(0);
  88  | 
  89  |     // Intercept the PDF download
  90  |     const downloadPromise = page.waitForEvent("download");
  91  | 
  92  |     // Click Extract
  93  |     await page.getByRole("button", { name: "EXTRACT FORGED SIGIL" }).click();
  94  | 
  95  |     // Wait for the download to complete (progress bar animates ~2s then downloads)
  96  |     await downloadPromise;
  97  | 
  98  |     // Wait for the "Return to Covert" button (signals deduction happened)
  99  |     await expect(page.getByRole("button", { name: "Return to Covert" })).toBeVisible({ timeout: 15000 });
  100 |     await page.getByRole("button", { name: "Return to Covert" }).click();
  101 | 
  102 |     // Back on the dashboard — navigate to The Forge to see the balance again
  103 |     await page.getByRole("button", { name: "The Forge" }).click();
  104 |     const next2 = page.getByRole("button", { name: "Next Step" });
  105 |     await next2.click();
  106 |     await next2.click();
  107 |     await next2.click();
  108 |     await next2.click();
  109 |     await page.getByText("Classified Dossier").first().click();
  110 |     await page.getByRole("button", { name: "Complete Forge" }).click();
  111 | 
  112 |     await expect(page.getByRole("heading", { name: "The Armory Cache" })).toBeVisible();
  113 | 
  114 |     // After deduction, guest has 0 credits → UI should show the "No Beskar Credits" error button
  115 |     const noCreditsButton = page.getByRole("button", { name: /No Beskar Credits/i });
  116 |     await expect(noCreditsButton).toBeVisible({ timeout: 5000 });
  117 | 
  118 |     console.log("[Test] ✅ Credit balance correctly decremented — paywall shown after using last credit.");
  119 |   });
  120 | 
  121 |   test("credit balance is NOT reset by simulated background fetchProfile (lock test)", async ({ page }) => {
  122 |     await reachArmoryCacheAsGuest(page);
  123 | 
  124 |     // Verify balance is 1 initially
  125 |     const balanceText = page.locator("text=/Balance: \\d+/");
  126 |     await expect(balanceText).toBeVisible({ timeout: 5000 });
  127 | 
  128 |     // Trigger PDF extraction
  129 |     const downloadPromise = page.waitForEvent("download");
  130 |     await page.getByRole("button", { name: "EXTRACT FORGED SIGIL" }).click();
```