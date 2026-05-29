---
name: ThemeEngine
description: Maps visual changes strictly to the global CSS variable system defined in the "Great Forge" taxonomy.
---

# ThemeEngine

## Directives
1. **Zero Hardcoding.** NEVER use explicit hex codes, RGB values, or static layout colors (like `bg-red-500`) outside the global config.
2. **Semantic Variables.** Always map styling back to the defined HSL CSS variables in `src/index.css` via Tailwind classes (e.g. `bg-background`, `text-primary`).
3. **Component Overrides.** Generally, Shadcn components should derive their colors from their official `variant` props. However, scoped intentional utility-class overrides (like passing `className="bg-primary/10"`) are allowed when composing primitives or creating specialized aesthetic variations.
4. **Dynamic Scaling.** Rely on Tailwind's native opacity modifiers using HSL mapping (e.g., `bg-primary/50`) to avoid state-driven DOM reflows, but only apply these to raw HTML elements or layout wrappers, NOT to Shadcn primitives.
