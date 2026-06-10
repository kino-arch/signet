# Signet UI/UX Design Guidelines

> **Authoritative reference for all UI decisions in Signet.**  
> When in doubt, check here before adding inline styles, new packages, or component variants.

---

## 1. Color System

Signet uses the **Nordic design token system** — a dark-mode-first, perceptually balanced palette. All color usage must reference CSS custom properties or Tailwind utility classes derived from them.

### Semantic Color Roles

| Token | Hex | Usage |
|---|---|---|
| `nordic-bg` | `#050505` | Plane 1 — outermost atmosphere |
| `nordic-canvas` | `#0D0F14` | Plane 4 — content canvas (page bg) |
| `nordic-surface` | `#1A1D26` | Plane 5 — elevated cards, rails |
| `nordic-surface-hover` | `#212631` | Interactive surface hover |
| `nordic-text` | `#F1F5F9` | Primary text (headings) |
| `nordic-text-secondary` | `#94A3B8` | Body, labels |
| `nordic-text-tertiary` | `#64748B` | Captions, disabled |
| `nordic-border` | `#252A3A` | 1px structural dividers |
| `nordic-primary` | `#60A5FA` | Actions, active states, links |
| `nordic-accent` | `#2563EB` | Brand blue, CTA |
| `nordic-success` | `#34D399` | Completed / verified states ONLY |
| `nordic-warning` | `#FBBF24` | Needs attention |
| `nordic-error` | `#F87171` | Danger, errors, deletions |
| `nordic-info` | `#818CF8` | Neutral highlights, ghost |

### Rules

- ✅ Use `text-nordic-text`, `bg-nordic-surface`, `border-nordic-border`
- ✅ Use semantic tokens via `var(--color-nordic-*)` in CSS
- ❌ Never hardcode hex values in component JSX
- ❌ Never use generic Tailwind colours (`text-gray-500`, `bg-blue-600`) — use Nordic equivalents

---

## 2. Typography

### Font Role Hierarchy

| Role | Font | Variable | Usage |
|---|---|---|---|
| **Heading** | Schibsted Grotesk Variable | `--font-heading` | `h1`–`h4`, section titles |
| **Body** | Onest Variable | `--font-body`, `--font-sans` | Paragraphs, labels, UI text |
| **Display** | Syne Variable | `--font-display` | Hero text, marketing headlines |
| **Mono** | Spline Sans Mono Variable | `--font-mono` | Code, data, timestamps, buttons |

### Text Style Utilities

Use the predefined text-style utilities from `tailwind.config.js` rather than composing ad-hoc:

```html
<h1 class="text-style-hero">          <!-- 800wt, fluid clamp, tight tracking -->
<h2 class="text-style-heading-lg">   <!-- 600wt, 4xl, tight -->
<h3 class="text-style-heading">      <!-- 600wt, 2xl, snug -->
<p  class="text-style-body">         <!-- 300wt, base, relaxed -->
<span class="text-style-caption">    <!-- 500wt, sm, mono, secondary color -->
```

### Rules

- ✅ Use `font-family: var(--font-heading)` for headings in CSS
- ✅ Use `.text-style-*` utilities for consistent type ramps
- ❌ Do not mix multiple heading fonts on the same page
- ❌ Avoid `text-sm`, `text-base`, `text-lg` without font-family — pair them

---

## 3. Spacing

Signet uses a **4px base grid** (`0.25rem` increments) with named Nordic spacing values for common patterns.

### Nordic Spacing Scale

| Token | Value | Pixels | Usage |
|---|---|---|---|
| `nordic-xs` | `0.25rem` | 4px | Icon gaps, tight badges |
| `nordic-sm` | `0.5rem` | 8px | Inline padding, tag gaps |
| `nordic-md` | `1rem` | 16px | Component internal padding |
| `nordic-lg` | `1.5rem` | 24px | Card padding, section gaps |
| `nordic-xl` | `2.5rem` | 40px | Section separators |
| `nordic-2xl` | `4rem` | 64px | Page-level vertical rhythm |

### Rules

- ✅ Use `p-4` (16px) for component internal padding
- ✅ Use `gap-8` (32px) between sections
- ✅ Mobile page margins: `px-6` (24px), Desktop: `px-12` (48px)
- ❌ Avoid arbitrary values (`p-[13px]`) — use the `// constellation-override:` bypass if truly necessary

---

## 4. Iconography

### Source Priority

1. **Lucide React** — primary icon library for all UI chrome
2. **@aliimam/icons** — brand / product-specific icons
3. **@aliimam/logos** — partner / company logos only
4. ❌ **@tabler/icons-react** — deprecated, do not add new usages

### Size Standards

| Context | Size | Class |
|---|---|---|
| Inline text | 16px | `size-4` |
| Button icon | 20px | `size-5` |
| Section header | 24px | `size-6` |
| Hero / empty state | 48px | `size-12` |

### Stroke Width

- Default: `1.5px` (Lucide default — do not override)
- Emphasis: `2px` — only for marketing / hero contexts

### Migration Rule

When replacing a Tabler icon with Lucide: check [lucide.dev](https://lucide.dev) first. If no equivalent exists, use `@aliimam/icons`. Document any missing icons in this file.

---

## 5. Animation

### Principles

| Motion | Duration | Easing | Use For |
|---|---|---|---|
| Micro-interaction | 150–200ms | `ease-out` | Hover, click, toggle |
| Page transition | 300ms | `ease-in-out` | Route changes |
| Loading skeleton | 400ms | `linear` | Shimmer, pulse |
| Complex sequences | 600ms+ | `spring` | Onboarding, reveals |

### Library

- Use **`motion` (`motion/react`)** — the canonical package
- **`framer-motion`** imports are legacy — new files must use `motion/react`
- Always wrap animation trees in `<LazyMotion features={domAnimation} strict>` (done in `main.tsx`)
- Always respect `prefers-reduced-motion` via `useReducedMotion()` or the `useRespectfulMotion` hook

### Rules

- ✅ `import { motion } from "motion/react"`
- ❌ `import { motion } from "framer-motion"` — legacy, do not add to new files

---

## 6. Components

### Radix Primitives

All low-level interactive primitives (dialogs, dropdowns, tooltips, etc.) are sourced from the `radix-ui` monolith package re-exported as named components. Do not install individual `@radix-ui/react-*` packages unless required by shadcn.

### shadcn/ui Components

Components in `src/components/ui/` are shadcn-generated and are **owned by this codebase** — they can be modified freely. Do not run `shadcn add <component>` with `--overwrite` without reviewing the diff.

### CVA Variants

Use `src/lib/variants.ts` for shared cross-component variant definitions:

```ts
import { statusVariants, iconButtonVariants, emptyStateVariants } from "@/lib/variants"
```

---

## 7. Validation

- **Zod only** — do not add `valibot`, `yup`, or `joi`
- Use `drizzle-zod` for database schema → validation bridges
- Form integration via `react-hook-form` + `@hookform/resolvers/zod`

```ts
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
const form = useForm({ resolver: zodResolver(MySchema) })
```

---

## 8. Toasts

Use the `use-toast` hook wrapper for all notifications — do not call `sonner` directly:

```ts
import { toast } from "@/hooks/use-toast"

toast({ title: "Slate saved", variant: "success" })
toast({ title: "Upload failed", description: "Try again later.", variant: "error" })
```

---

## 9. Editor Styles

Import `src/styles/editor.css` in any component that renders a Tiptap editor:

```ts
import "@/styles/editor.css"
```

Do not define ProseMirror styles in component-level CSS or `<style>` tags.

---

## 10. Quality Gates

Before shipping any UI change:

- [ ] `pnpm run typecheck` — zero errors
- [ ] `pnpm run lint` — zero errors (warnings allowed with justification)
- [ ] `pnpm run build` — clean build
- [ ] No `@tabler/icons-react` imports in `src/`
- [ ] No hardcoded hex values in JSX
- [ ] All interactive elements have `aria-label` or visible text
- [ ] Animations respect `prefers-reduced-motion`
