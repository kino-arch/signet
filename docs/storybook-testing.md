# Storybook Testing & Documentation Setup

This document outlines the testing strategy, setup, and usage guidelines for Storybook-driven testing in the **Signet** application.

---

## 1. Testing Strategy Overview

Signet uses a three-tier testing strategy integrated directly into the component development workflow:

1. **Interaction Testing:** Validates component state changes, user input, and behaviors in a real headless browser using **Vitest** and **Playwright**.
2. **Accessibility (a11y) Audits:** Runs automated accessibility checks (using Axe-core) on every story, failing builds automatically if a11y violations are introduced.
3. **Visual Regression Testing:** Detects visual modifications or layout shifts across viewports and browsers using **Chromatic**.

---

## 2. Interaction & Unit Testing

Interaction tests are written directly inside Storybook files (`.stories.tsx`) using the `play` function. The `play` function simulates user actions when the story renders.

### Writing Interaction Tests

We use `@storybook/test` to query elements (`within`), simulate events (`userEvent`), and assert outcomes (`expect`).

Example from [Button.stories.tsx](file:///c:/cv/signet/src/components/ui/Button.stories.tsx):
```tsx
import { expect, userEvent, within } from "@storybook/test";

export const ClickInteraction: Story = {
  name: "Interaction — Click fires handler",
  args: { children: "Click me" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const btn = canvas.getByRole("button", { name: /click me/i });

    let clicked = false;
    btn.addEventListener("click", () => { clicked = true; });

    await userEvent.click(btn);
    expect(clicked).toBe(true);
  },
};
```

---

## 3. Automated Accessibility Testing

The `@storybook/addon-a11y` addon performs real-time WCAG accessibility audits. It has been integrated into our test runner to fail CI/CD pipelines when accessibility errors occur.

In [.storybook/preview.tsx](file:///c:/cv/signet/.storybook/preview.tsx), the default check behavior is set to `"error"`:

```tsx
a11y: {
  test: "error", // Fails Vitest/CI on any accessibility violation
}
```

### Excluding Intentional Violations
If a story is designed to demonstrate a state that intentionally fails a11y checks (e.g. for demo purposes), add the `!test` tag to exclude it from automated testing runs:

```tsx
export const IconNoAriaLabel: Story = {
  args: {
    size: "icon",
    children: <Mail className="h-4 w-4" />,
  },
  tags: ["!test"], // Excludes this story from the automated test run
};
```

---

## 4. Visual Regression Testing with Chromatic

Visual regression testing is powered by **Chromatic** (the official Storybook cloud platform).

### How It Works
1. Chromatic builds the Storybook workspace statically.
2. It captures cloud-based screenshots of every story across targeted browsers (Chrome, Firefox, Safari).
3. On future builds, it compares new screenshots to baseline screenshots and notifies you of differences.

### Running Visual Tests
To run visual testing, you need to publish your Storybook to Chromatic:

1. **Get a Project Token** from your Chromatic dashboard.
2. **Execute the Chromatic CLI** to build and upload:
   ```bash
   npx chromatic --project-token=<your-chromatic-project-token>
   ```

To streamline this, you can add a script to `package.json`:
```json
"chromatic": "npx chromatic"
```

---

## 5. How to Run Tests Locally

| Command | Purpose |
| :--- | :--- |
| `pnpm run storybook` | Starts the local interactive Storybook server on port `6006` |
| `npx vitest --project=storybook` | Runs all interaction and a11y tests in a headless Chromium instance (Watch mode) |
| `npx vitest --project=storybook run` | Executes all story-based tests once and exits (CI mode) |
| `pnpm run build-storybook` | Compiles Storybook into a static bundle in `storybook-static/` |

### Adding a Test Script
To make testing easier, the following script can be run:
```bash
pnpm test:storybook
```
*(Runs storybook tests once via Vitest)*
