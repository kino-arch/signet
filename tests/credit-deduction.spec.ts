import { test, expect, Page } from "@playwright/test"

test.describe("Beskar Credit Deduction", () => {
  async function enterEditorAsGuest(page: Page) {
    await page.goto("/login")
    await page
      .getByRole("button", { name: "Enter as Guest / Demo Mode" })
      .click()

    const enterForgeButton = page.getByRole("button", {
      name: "Enter the Forge",
    })
    await expect(enterForgeButton).toBeEnabled({ timeout: 15000 })
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

    await page.locator("#firstName").fill("Din")
    await page.locator("#lastName").fill("Djarin")
    await page.locator("input[type='tel']").fill("+15550198000")
    await page.locator("#location").fill("Mandalore Sector")
    await page.locator("#website").fill("guild.org")
    await page.getByRole("button", { name: "Continue to Review" }).click()

    await expect(page.getByText("The Forge Commitment")).toBeVisible()
    await page
      .getByText("I'm ready to build my resume inside the Forge editor.")
      .click()
    const launchButton = page.getByRole("button", { name: "Launch the Forge" })
    await expect(launchButton).toBeEnabled()
    await launchButton.click()

    await expect(page).toHaveURL(/.*slates/, { timeout: 10000 })
    await page.locator("text=AWAITING INTEL").click()

    await expect(page).toHaveURL(/.*\/forge\/.+/, { timeout: 15000 })
    await expect(
      page.getByRole("heading", { name: /Forge Array/i })
    ).toBeVisible({ timeout: 10000 })
  }

  test("credit balance decrements by 1 after PDF extraction (guest mode)", async ({
    page,
  }) => {
    await enterEditorAsGuest(page)

    // Open Export PDF Dialog
    await page.getByRole("button", { name: /Export PDF/i }).click()

    // Read initial balance from the dialog
    const dialogBalanceText = page
      .locator("text=Available Balance:")
      .locator("..")
      .locator("span")
      .nth(1)
    await expect(dialogBalanceText).toBeVisible({ timeout: 5000 })
    const initialText = (await dialogBalanceText.textContent()) ?? ""
    const initialBalance = parseInt(
      initialText.match(/(\d+)\s*Credits/)?.[1] ?? "0",
      10
    )
    console.log(`[Test] Initial balance: ${initialBalance}`)
    expect(initialBalance).toBeGreaterThan(0)

    // Click "Extract Sigil" which deducts credit
    await page
      .getByRole("button", { name: /Extract Sigil \(-1 Credit\)/i })
      .click()

    // Modal closes automatically, wait for it
    await expect(page.getByRole("dialog")).not.toBeVisible({ timeout: 5000 })

    // Re-open Export PDF dialog to check new balance
    await page.getByRole("button", { name: /Export PDF/i }).click()

    await expect(dialogBalanceText).toBeVisible({ timeout: 5000 })
    const finalText = (await dialogBalanceText.textContent()) ?? ""
    const finalBalance = parseInt(
      finalText.match(/(\d+)\s*Credits/)?.[1] ?? "0",
      10
    )
    console.log(`[Test] Final balance: ${finalBalance}`)

    expect(finalBalance).toBe(initialBalance - 1)
  })
})
