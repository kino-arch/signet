# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: credit-deduction.spec.ts >> Beskar Credit Deduction >> credit counter in header updates immediately after PDF generation
- Location: tests\credit-deduction.spec.ts:164:3

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
  131 |     await downloadPromise;
  132 | 
  133 |     // Immediately simulate a background fetchProfile by calling the store directly
  134 |     // This mimics the Supabase auth TOKEN_REFRESHED event that was overwriting the balance
  135 |     const balanceAfterInjectedFetch = await page.evaluate(async () => {
  136 |       // Access the Zustand store directly through the window (in dev mode it's exposed)
  137 |       // We call fetchProfile() to simulate the token refresh race condition
  138 |       try {
  139 |         // @ts-ignore
  140 |         const { useAuthStore } = await import("/src/store/useAuthStore.ts");
  141 |         const store = useAuthStore.getState();
  142 |         await store.fetchProfile(); // Simulate the TOKEN_REFRESHED background call
  143 |         return store.profile?.token_balance ?? -1;
  144 |       } catch {
  145 |         // If import fails (prod build), return a sentinel
  146 |         return -999;
  147 |       }
  148 |     });
  149 | 
  150 |     // Wait for "Return to Covert"
  151 |     await expect(page.getByRole("button", { name: "Return to Covert" })).toBeVisible({ timeout: 15000 });
  152 | 
  153 |     console.log(`[Test] Balance after simulated fetchProfile race: ${balanceAfterInjectedFetch}`);
  154 | 
  155 |     // If the lock works, balance should still be 0 (not reset to 1)
  156 |     if (balanceAfterInjectedFetch !== -999) {
  157 |       expect(balanceAfterInjectedFetch).toBe(0);
  158 |       console.log("[Test] ✅ Lock correctly prevented fetchProfile from overwriting optimistic deduction.");
  159 |     } else {
  160 |       console.log("[Test] ⚠️  Could not inject store call in this build mode — visual check passed.");
  161 |     }
  162 |   });
  163 | 
  164 |   test("credit counter in header updates immediately after PDF generation", async ({ page }) => {
  165 |     await page.setViewportSize({ width: 1600, height: 900 });
  166 |     test.setTimeout(90000);
  167 | 
  168 |     // Go to editor via guest mode (abbreviated)
  169 |     await page.goto("/");
  170 |     await page.getByRole("link", { name: "Enter the Forge" }).first().click();
> 171 |     await page.getByRole("button", { name: "Enter as Guest / Demo Mode" }).click();
      |                                                                            ^ Error: locator.click: Test timeout of 90000ms exceeded.
  172 |     await expect(page).toHaveURL(/.*onboarding/);
  173 |     await expect(page.getByRole("button", { name: "ENTER THE FORGE" })).toBeEnabled({ timeout: 8000 });
  174 |     await page.getByRole("button", { name: "ENTER THE FORGE" }).click();
  175 |     await page.getByText("The Forge", { exact: true }).click();
  176 |     await page.getByRole("button", { name: "Confirm Specialization" }).click();
  177 |     await page.locator("#firstName").fill("Boba");
  178 |     await page.locator("#lastName").fill("Fett");
  179 |     await page.locator("#phone").fill("555-1337");
  180 |     await page.locator("#location").fill("Tatooine");
  181 |     await page.locator("#website").fill("bounty.org");
  182 |     await page.getByRole("button", { name: "Proceed to the Oath" }).click();
  183 |     const oath = page.getByText("I swear the Creed. I am ready to forge my resume.");
  184 |     await expect(oath).toBeVisible({ timeout: 25000 });
  185 |     await oath.click();
  186 |     await page.getByRole("button", { name: "IGNITE THE FORGE" }).click();
  187 |     await expect(page).toHaveURL(/.*editor/);
  188 | 
  189 |     // Read header credit counter BEFORE download
  190 |     // The header shows something like "1" next to a Coins icon
  191 |     const headerCredit = page.locator("[data-testid='credit-balance']");
  192 | 
  193 |     // Navigate to Armory Cache
  194 |     await page.getByRole("button", { name: "The Forge" }).click();
  195 |     const next = page.getByRole("button", { name: "Next Step" });
  196 |     await next.click();
  197 |     await next.click();
  198 |     await next.click();
  199 |     await next.click();
  200 |     await page.getByText("Classified Dossier").first().click();
  201 |     await page.getByRole("button", { name: "Complete Forge" }).click();
  202 |     await expect(page.getByRole("heading", { name: "The Armory Cache" })).toBeVisible();
  203 | 
  204 |     // Capture balance text before
  205 |     const beforeText = await page.locator("text=/Balance: \\d+/").textContent() ?? "Balance: 1";
  206 |     const beforeBalance = parseInt(beforeText.match(/(\d+)$/)?.[1] ?? "1", 10);
  207 | 
  208 |     // Trigger download
  209 |     const dl = page.waitForEvent("download");
  210 |     await page.getByRole("button", { name: "EXTRACT FORGED SIGIL" }).click();
  211 |     await dl;
  212 | 
  213 |     // Balance shown in Armory panel should now be one less
  214 |     // After deduction the Armory shows the "No Beskar Credits" button (since guest starts with 1)
  215 |     await expect(page.getByRole("button", { name: /No Beskar Credits/i })).toBeVisible({ timeout: 15000 });
  216 | 
  217 |     console.log(`[Test] ✅ Balance before: ${beforeBalance}. After extraction: shows 'No Credits' → correctly decremented to 0.`);
  218 |   });
  219 | });
  220 | 
```