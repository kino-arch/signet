# UI Component Testing (Storybook & Playwright)

## Overview
Signet v2.0 relies on an arsenal of dense, interactive UI components. Because the `EditorPage` and individual `Template` chassis are highly complex, we advocate for Component-Driven Development (CDD).

While we currently build within Vite, implementing Storybook is highly recommended for future scaling.

## Recommended Storybook Setup
1. Initialize Storybook in the root: `npx storybook@latest init`
2. Create stories for isolated atomic components first (e.g., `Button.stories.tsx`, `TargetLockPanel.stories.tsx`).
3. Use Storybook Controls to simulate different data payloads being injected into the Template Chassis components (`ModernTemplate.stories.tsx`).

## Testing the Templates
Since templates accept a standardized `SlateData` payload, testing them is incredibly straightforward:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ModernTemplate } from './ModernTemplate';
import { mockSlateData } from './__mocks__/slateData';

const meta: Meta<typeof ModernTemplate> = {
  title: 'Chassis/ModernTemplate',
  component: ModernTemplate,
};

export default meta;
type Story = StoryObj<typeof ModernTemplate>;

export const Default: Story = {
  args: {
    data: mockSlateData,
  },
};
```

## E2E Testing (Playwright)
To verify the critical path (Auth -> Token Purchase -> Editor -> Export), we recommend Playwright.

```bash
npm init playwright@latest
```

Key E2E Scenarios to Automate:
1. **The Guest Flow:** User selects "Enter as Guest", bypasses auth, interacts with the editor, and is blocked at export (prompted to sign in).
2. **The Target Lock Flow:** User inputs a Job Description, fires the Edge Function, and verifies the UI updates with the XYZ scores and gap analysis.
3. **The Data Sync Flow:** User updates the "BasicInfoForm", the `useAutoSave` debounce fires, and a network request to `upsert` the `slate_sections` table is verified.
