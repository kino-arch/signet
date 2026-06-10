import { test, expect, Page } from "@playwright/test"

test.describe("Beskar Credit Deduction", () => {
  async function enterEditorMocked(page: Page) {
    // 1. Mock Supabase Auth State in LocalStorage to bypass login/signup limits
    await page.addInitScript(() => {
      // Create a valid 3-part JWT format to prevent supabase-js from throwing parse errors
      const encodeBase64Url = (str: string) =>
        btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
      const validMockJwt =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
        encodeBase64Url(
          JSON.stringify({
            exp: Math.floor(Date.now() / 1000) + 3600,
            sub: "12345678-1234-1234-1234-123456789012",
            role: "authenticated",
          })
        ) +
        ".signature"

      const mockSession = {
        access_token: validMockJwt,
        refresh_token: "mock-refresh-token",
        user: {
          id: "12345678-1234-1234-1234-123456789012",
          email: "e2e-test@signet.com",
          user_metadata: { full_name: "Test User" },
        },
        expires_at: Math.floor(Date.now() / 1000) + 3600,
      }
      localStorage.setItem(
        "auth-storage",
        JSON.stringify({
          state: {
            user: mockSession.user,
            session: mockSession,
            onboardingCompleted: false,
          },
        })
      )
      localStorage.setItem(
        "sb-vslbiwubtcynvfytwcbr-auth-token",
        JSON.stringify(mockSession)
      )
    })

    // 2. Mock Supabase REST API responses to simulate the pipeline
    await page.route("**/rest/v1/data_slates*", async (route) => {
      const headers = route.request().headers()
      const isSingle = headers["accept"]?.includes(
        "application/vnd.pgrst.object"
      )
      const fakeSlate = {
        id: "87654321-4321-4321-4321-210987654321",
        user_id: "12345678-1234-1234-1234-123456789012",
      }
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(isSingle ? fakeSlate : [fakeSlate]),
      })
    })

    await page.route("**/rest/v1/slate_sections*", async (route) => {
      const headers = route.request().headers()
      const isSingle = headers["accept"]?.includes(
        "application/vnd.pgrst.object"
      )
      if (route.request().method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(
            isSingle
              ? null
              : [
                  {
                    section_type: "basics",
                    raw_content: {
                      name: "Din Djarin",
                      label: "Software Engineer",
                      email: "e2e-test@signet.com",
                      phone: "+15550198000",
                      url: "",
                      summary: "",
                      location: {
                        city: "Mandalore Sector",
                        countryCode: "",
                        region: "",
                      },
                      profiles: [],
                    },
                  },
                ]
          ),
        })
      } else {
        await route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify(isSingle ? {} : []),
        })
      }
    })

    // Mock profiles for the header and credit balance
    await page.route("**/rest/v1/profiles*", async (route) => {
      if (route.request().method() === "PATCH") {
         await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({}),
        })
        return;
      }
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "12345678-1234-1234-1234-123456789012",
          full_name: "Din Djarin",
          credits: 5,
        }),
      })
    })

    await page.route("**/functions/v1/emergency-sync", async (route) => {
      await route.fulfill({ status: 200 })
    })

    await page.route("**/functions/v1/get-user-geo", async (route) => {
      await route.fulfill({ status: 200, json: { threat_origin: "Mock City" } })
    })

    // Go directly to onboarding
    await page.goto("/onboarding")

    // STEP 1: What is your current field?
    await expect(page.getByText("What is your current field?")).toBeVisible()
    await page.getByText("Engineering", { exact: true }).click()
    const confirmRoleButton = page.getByRole("button", {
      name: "Continue",
    })
    await expect(confirmRoleButton).toBeEnabled()
    await confirmRoleButton.click()

    // STEP 2: What's your primary goal?
    await expect(page.getByText("What's your primary goal?")).toBeVisible()
    await page.getByText("Format & Polish", { exact: true }).click()
    const confirmGoalButton = page.getByRole("button", {
      name: "Build my workspace",
    })
    await expect(confirmGoalButton).toBeEnabled()
    await confirmGoalButton.click()

    // Land on Slates Dashboard
    await expect(page).toHaveURL(/.*\/slates/, { timeout: 15000 })
    await expect(page.getByText("Slates", { exact: true }).first()).toBeVisible({ timeout: 15000 })

    // Create a new slate via GenesisPrompt
    await expect(page.getByText("Create your first Slate")).toBeVisible({ timeout: 10000 })
    await page.getByLabel(/Target role/).fill("E2E Test Engineer")
    await page.getByRole("button", { name: /Forge Slate/i }).click()

    // Wait for "Slate forged" and click Open Editor
    await expect(page.getByText("Slate forged.")).toBeVisible({ timeout: 10000 })
    await page.getByRole("link", { name: "Open Editor" }).click()

    // 6. Redirect to Editor
    await expect(page).toHaveURL(/.*\/editor|.*\/forge\/.+/, { timeout: 15000 })
    
    // Wait for Hydration to complete
    await expect(page.getByText("Hydrating Forge…")).not.toBeVisible({
      timeout: 10000,
    })

    // Verify Editor loads
    await expect(
      page.getByRole("heading", { name: /Personal Information/i })
    ).toBeVisible({ timeout: 10000 })
    
    // Fill in a name to enable Export
    const nameInput = page.getByLabel("Full Name")
    await nameInput.fill("Din Djarin")
  }

  test("credit balance decrements by 1 after PDF extraction", async ({
    page,
  }) => {
    test.setTimeout(60000)
    page.on("console", msg => console.log(`[Browser Console] ${msg.text()}`))
    await enterEditorMocked(page)

    // Open Export PDF Dialog
    await page.getByRole("button", { name: /Export PDF/i }).click()

    // Read initial balance from the dialog (it shows e.g., "1 Credits")
    const dialogBalanceText = page.locator("text=Credits").filter({ hasText: /[0-9]+\s*Credits/i }).first()
    await expect(dialogBalanceText).toBeVisible({ timeout: 5000 })
    const initialText = (await dialogBalanceText.textContent()) ?? ""
    const initialBalance = parseInt(
      initialText.match(/(\d+)\s*Credits/i)?.[1] ?? "0",
      10
    )
    console.log(`[Test] Initial balance: ${initialBalance}`)
    expect(initialBalance).toBeGreaterThan(0)

    // Hover over the container to reveal the extract button
    await page.getByText("Ready for extraction").hover()

    // Click "Extract Sigil" which deducts credit
    await page
      .getByRole("button", { name: /Extract Sigil \(-1 Credit\)/i })
      .click()

    // Let the extraction animation finish and wait for completion button
    const returnButton = page.getByRole("button", { name: /Return to Covert/i })
    await expect(returnButton).toBeVisible({ timeout: 15000 })
    await returnButton.click()

    // Modal closes automatically, wait for it
    await expect(page.getByRole("dialog")).not.toBeVisible({ timeout: 5000 })

    // Re-open Export PDF dialog to check new balance
    await page.getByRole("button", { name: /Export PDF/i }).click()

    await expect(dialogBalanceText).toBeVisible({ timeout: 5000 })
    const finalText = (await dialogBalanceText.textContent()) ?? ""
    const finalBalance = parseInt(
      finalText.match(/(\d+)\s*Credits/i)?.[1] ?? "0",
      10
    )
    console.log(`[Test] Final balance: ${finalBalance}`)

    expect(finalBalance).toBe(initialBalance - 1)
  })
})
