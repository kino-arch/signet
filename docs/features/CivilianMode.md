# Civilian Mode (Signet v2.0)

## Overview
Signet is steeped in Mandalorian-inspired lore and terminology (e.g., "The Forge", "Beskar Tokens", "Mission History"). While this creates a unique and engaging experience, it can be polarizing or confusing for users seeking a standard, utilitarian SaaS experience.

**Civilian Mode** is a global UI toggle that instantly translates all lore-specific terminology across the application into standard professional terminology.

## Architecture & Implementation

### The Store (`useUiModeStore.ts`)
Civilian Mode is driven by a lightweight Zustand store `useUiModeStore`. It tracks a single boolean state (`isCivilianMode`) and persists it to `localStorage` so the user's preference is remembered across sessions.

```typescript
interface UiModeState {
  isCivilianMode: boolean;
  toggleUiMode: () => void;
  getLabel: (lore: string, civilian: string) => string;
}
```

### The Translation Function
The store provides a `getLabel` utility function. Throughout the application, developers use this function to render text conditionally based on the active mode.

```tsx
// Example Usage
import { useUiModeStore } from "@/store/useUiModeStore";

export function ExampleComponent() {
  const { getLabel } = useUiModeStore();
  
  return (
    <h1>{getLabel("Enter the Forge", "Resume Editor")}</h1>
  );
}
```

## Impacted Surfaces
The Civilian Mode translation layer is applied comprehensively across:
1. **Navigation & Menus:** "The Forge" -> "Resume Editor", "Target Matrix" -> "Job Tracker".
2. **Editor Input Labels:** "Mission History" -> "Work Experience", "Core Competencies" -> "Skills".
3. **Template Names:** "Heavy Infantry" -> "Classic", "Datacore" -> "Technical".
4. **Onboarding & Marketing Copy:** Lore-heavy descriptions are swapped for standard SaaS value propositions.

## Extending the Vocabulary
When adding new features, developers must supply both a `lore` variant and a `civilian` variant to `getLabel` to maintain parity. Hardcoding lore terminology without a civilian fallback is strictly prohibited.
