---
name: ShadcnOrchestrator
description: Enforces the use of the Shadcn UI component library over custom implementations for standard primitives.
---

# ShadcnOrchestrator

## Directives
1. **Never build standard primitives from scratch.** If a component exists in the Shadcn registry (e.g., button, modal, dialog, input, select, card, badge), you MUST use it.
2. **Registry Check.** Before attempting to build a component, verify if it exists in the `components.json` or Shadcn registry.
3. **Auto-Install.** Run `npx shadcn@latest add [component]` via the terminal if a required primitive is missing.
4. **Strict Preset Enforcement (NO OVERRIDES).** You MUST NOT apply custom `bg-*`, `text-*`, or `border-*` Tailwind classes to Shadcn components like `Badge`, `Button`, or `Card`. You must rely ENTIRELY on their built-in `variant` props (e.g., `variant="default"`, `variant="outline"`, `variant="secondary"`) to ensure strict adherence to the project's global theme preset.
5. **Wrap, Don't Replace.** You may wrap library components (e.g. inside a `motion.div`) to apply layouts or animations, but the underlying accessible primitive MUST come from Shadcn and remain unaltered in its coloring.
