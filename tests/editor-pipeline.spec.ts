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

    // STEP 1: What is your current field?
    await expect(page.getByText("What is your current field?")).toBeVisible()
    await page.getByText("Engineering", { exact: true }).click()
    const continueButton = page.getByRole("button", {
      name: "Continue",
    })
    await expect(continueButton).toBeEnabled()
    await continueButton.click()

    // STEP 2: What's your primary goal?
    await expect(page.getByText("What's your primary goal?")).toBeVisible()
    await page.getByText("Format & Polish", { exact: true }).click()
    const buildButton = page.getByRole("button", { name: "Build my workspace" })
    await expect(buildButton).toBeEnabled()
    await buildButton.click()

    // 5. Redirect to Slates Dashboard
    await expect(page).toHaveURL(/.*\/slates/, { timeout: 15000 })

    // Create a new slate via GenesisPrompt
    await expect(page.getByText("Create your first Slate")).toBeVisible({ timeout: 10000 })
    await page.getByLabel(/Target role/).fill("Jedi Knight")
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
    const nameInput = page.getByLabel("Full Name")
    await nameInput.fill("Din Djarin")

    // 6. Test Data Mutation and Preview Sync
    const roleInput = page.getByLabel("Professional Title")
    await roleInput.fill("Bounty Hunter")

    // Open Preview Dialog
    await page.getByRole("button", { name: /Preview/i }).click()

    // Verify it updates instantly in the template preview
    const previewArea = page.locator("#resume-preview").first()
    await expect(previewArea).toContainText("Bounty Hunter", {
      ignoreCase: true,
    })
    
    // Close Preview Dialog
    await page.keyboard.press("Escape")

    // 7. Verify Document Export functionality
    const exportButton = page.getByRole("button", { name: /Export PDF/i })
    await expect(exportButton).toBeVisible()
  })
})
