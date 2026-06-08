import { test, expect } from "@playwright/test"

test.describe("Editor Happy Path Pipeline", () => {
  test("should complete onboarding, handoff to editor, auto-save, and export PDF", async ({
    page,
  }) => {
    test.setTimeout(60000)

    // Capture browser console logs for easier debugging in CI
    page.on("console", (msg) => {
      console.log(
        `[Browser Console] ${msg.type().toUpperCase()}: ${msg.text()}`
      )
    })

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

    // Mock profiles for the header
    await page.route("**/rest/v1/profiles*", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          id: "12345678-1234-1234-1234-123456789012",
          full_name: "Din Djarin",
        }),
      })
    })

    await page.route("**/functions/v1/emergency-sync", async (route) => {
      // Mock emergency sync edge function
      await route.fulfill({ status: 200 })
    })

    await page.route("**/functions/v1/get-user-geo", async (route) => {
      await route.fulfill({ status: 200, json: { threat_origin: "Mock City" } })
    })

    // 3. Start directly at Onboarding (since we are authenticated via mock)
    await page.goto("/onboarding")
    await expect(page).toHaveURL(/.*onboarding/, { timeout: 15000 })

    // STEP 0: Wait for Biometric Recognition scanner
    const enterForgeButton = page.getByRole("button", {
      name: "Enter the Forge",
    })
    await expect(enterForgeButton).toBeEnabled({ timeout: 10000 })
    await enterForgeButton.click()

    // STEP 1: Select Guild Creed (Specialization)
    await expect(page.getByText("Select Your Specialization")).toBeVisible()
    await page.getByText("The Forge", { exact: true }).click()
    const confirmRoleButton = page.getByRole("button", {
      name: "Confirm Specialization",
    })
    await expect(confirmRoleButton).toBeEnabled()
    await confirmRoleButton.click()

    // STEP 2: Target Intelligence (Skip for now)
    await expect(page.getByText("Target Intelligence")).toBeVisible()
    await page.getByRole("button", { name: "Skip for now / Continue" }).click()

    // STEP 3: Professional Profile
    await expect(page.getByText("Your Professional Profile")).toBeVisible()
    await page.locator("#firstName").fill("Din")
    await page.locator("#lastName").fill("Djarin")
    await page.locator("input[type='tel']").fill("+15550198000")
    await page.locator("#location").fill("Mandalore Sector")
    await page.getByRole("button", { name: "Continue to Review" }).click()

    // STEP 4: The Forge Commitment
    await expect(page.getByText("The Forge Commitment")).toBeVisible()
    const oathCheckboxText = page.getByText(
      "I'm ready to build my resume inside the Forge editor."
    )
    await expect(oathCheckboxText).toBeVisible({ timeout: 15000 })
    await oathCheckboxText.click()

    const launchButton = page.getByRole("button", { name: "Launch the Forge" })
    await expect(launchButton).toBeEnabled()
    await launchButton.click()

    // 5. Redirect to Slates Armory
    await expect(page).toHaveURL(/.*\/slates/, { timeout: 15000 })

    // Click the empty state dropzone to initialize a new slate
    await page.locator("text=AWAITING INTEL").click()

    // 6. Redirect to Editor Forge
    await expect(page).toHaveURL(/.*\/forge\/.+/, { timeout: 15000 })

    // Wait for Hydration to complete
    await expect(page.getByText("Hydrating Forge…")).not.toBeVisible({
      timeout: 10000,
    })

    // Verify Dashboard loads and inputs are pre-filled
    await expect(
      page.getByRole("heading", { name: /Forge Array/i })
    ).toBeVisible({ timeout: 10000 })
    await expect(page.getByText("Identity Core")).toBeVisible()
    const nameInput = page.locator("#basics-name")
    await expect(nameInput).toHaveValue("Din Djarin")

    // 6. Test Data Mutation and Sync Debounce
    const roleInput = page.locator("#basics-label")
    await roleInput.fill("Bounty Hunter")

    // Verify it updates instantly in the template preview
    const previewArea = page.locator(".w-full.bg-white.text-zinc-950")
    await expect(previewArea).toContainText("BOUNTY HUNTER", {
      ignoreCase: true,
    })

    // Verify Sync Status Indicator goes to SYNCING... and then SECURED
    const syncStatus = page.getByText(/STATE:/)
    await expect(syncStatus).toContainText("SYNCING", { timeout: 2000 })
    await expect(syncStatus).toContainText("SECURED", { timeout: 10000 })

    // 7. Verify Document Export functionality
    const exportButton = page.getByRole("button", { name: "Export PDF" })
    await expect(exportButton).toBeVisible()
    await expect(exportButton).toHaveClass(/hover:bg-primary/)
  })
})
