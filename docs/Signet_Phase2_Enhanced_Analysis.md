# Signet 2.0 Phase 2 & AGE Illustration System — Critical Analysis & Enhanced Implementation Plan
**Date:** June 4, 2026  
**Status:** Architecture Review & Risk Assessment  
**Scope:** Phase 2 Component Redesign + AGE Illustration System Integration

---

## Executive Summary

The proposed Phase 2 plan is directionally excellent but contains **critical architectural risks, performance blind spots, and missing integration points** that could derail the implementation if executed as written. This document provides a thorough analysis of every proposed change, identifies gaps, and delivers an enhanced implementation plan that accounts for the realities of Tailwind v4 CSS-first architecture, shadcn/ui composition philosophy, Framer Motion 12 performance characteristics, and production-grade accessibility requirements.

**Verdict:** The plan is **70% ready**. The remaining 30% requires structural changes to component architecture, animation strategy, token layering, and build tooling before any code is written.

---

## Part 1: Decision Analysis — The Three Open Questions

### Decision 1: Illustration Generation Strategy

**Proposed:** Generate top 3–4 images now, use skeletons for remainder.

**Analysis:** This is the **correct call** but with a critical caveat. The AGE style is highly specific—atmospheric gradients, controlled color temperature, stylized humanity. AI image generation (Midjourney, DALL-E, Stable Diffusion) can produce beautiful results, but **color fidelity to the OKLCH diamond palette is not guaranteed**. Generated images may shift toward warmer or cooler tones, introducing subtle but perceptible brand inconsistency.

**Enhanced Recommendation:**
1. **Generate 3 hero images immediately** using the exact prompts from the style guide.
2. **Post-process every generated image** through a color-correction pass: clamp shadows to `oklch(0.12 0.02 265)`, ensure highlight warmth maps to coral (`#EA545F`), verify no green/cyan contamination.
3. **Create a "Color Audit" step** in the asset pipeline: every image gets run through a script that samples dominant colors and flags deviations >5% from the brand palette.
4. **For UI illustrations** (empty states, onboarding), prioritize **SVG + CSS gradient compositions** over raster images where possible. These are resolution-independent, animatable, and perfectly color-accurate.
5. **Skeleton placeholders** should not be generic gray boxes. They should be **"atmospheric skeletons"**—dark void backgrounds with subtle animated gradient shifts that hint at the final AGE style. This maintains brand immersion during loading states.

**Risk Level:** 🟡 Moderate (if post-processing is skipped) → 🟢 Low (with color audit pipeline)

---

### Decision 2: Particle Performance — Global vs. Local Scoping

**Proposed:** Local scoping via `<Atmosphere />` wrapper around specific containers.

**Analysis:** This is **correct and necessary**, but the implementation details need significant refinement. The proposal mentions "CSS-only animations for drifting violet and coral orbs." CSS-only particle systems are performant for simple cases (10–20 particles) but break down at scale due to:
- **Repaint costs:** Each orb triggers compositor layer updates.
- **Mobile GPU strain:** CSS `filter: blur()` on many elements is expensive.
- **Z-index stacking wars:** Particles must not interfere with interactive elements.

**Enhanced Recommendation:**

```typescript
// src/components/animate-ui/atmosphere.tsx — ENHANCED ARCHITECTURE

interface AtmosphereProps {
  children: React.ReactNode;
  density?: 'sparse' | 'normal' | 'dense';  // Controls particle count
  colorMode?: 'violet' | 'coral' | 'mixed';   // Controls orb color distribution
  intensity?: 'subtle' | 'medium' | 'strong'; // Controls opacity and glow
  interactive?: boolean;                       // Enable mouse parallax (desktop only)
  className?: string;
}

// IMPLEMENTATION STRATEGY:
// 1. Use a single <canvas> element for particle rendering, NOT individual DOM nodes.
//    Canvas 2D context handles hundreds of particles at 60fps. CSS DOM nodes choke at ~30.
// 2. Implement a ParticleEngine class using requestAnimationFrame with delta-time normalization.
// 3. Connect to the IntersectionObserver API: particles only render when container is visible.
// 4. On mobile (<768px), reduce density by 60% and disable blur effects.
// 5. Respect prefers-reduced-motion: render static particle field (no animation) or hide entirely.
// 6. Mouse parallax: track mouse position via throttled listener (16ms), apply subtle translateX/Y
//    to particle layers at different speeds (0.02x, 0.05x, 0.1x) for depth illusion.
```

**Performance Budget:**
| Metric | Target | Measurement |
|:---|:---|:---|
| Particle count (desktop) | 80–120 | Chrome DevTools Performance panel |
| Particle count (mobile) | 30–50 | Same |
| Frame time contribution | <4ms per frame | Same |
| Memory footprint | <15MB | Chrome Memory panel |
| GPU layer count | <5 compositor layers | Chrome Layers panel |

**Risk Level:** 🔴 High (if implemented as CSS-only DOM nodes) → 🟢 Low (with Canvas 2D + IntersectionObserver)

---

### Decision 3: Logo & Seal Design — SVG vs. Image

**Proposed:** Pure SVG + CSS animation for the Violet Spark geometric seal.

**Analysis:** This is **absolutely correct**. A raster image for a logo is a maintainability disaster—resolution-dependent, unresponsive to theme changes, unscalable. SVG ensures:
- **Resolution independence:** Crisp at 16px favicon or 512px hero centerpiece.
- **Theme responsiveness:** `currentColor` and CSS variable references (`fill="var(--primary)"`) adapt instantly to theme changes.
- **Animation control:** CSS `@keyframes` and Framer Motion can animate SVG paths, strokes, and transforms.
- **Accessibility:** SVGs can have `<title>` and `<desc>` elements for screen readers.

**Enhanced Recommendation:**

```typescript
// src/components/ui/geometric-seal.tsx — ENHANCED SPECIFICATION

interface GeometricSealProps {
  size?: number;              // Base size in px, scales proportionally
  animate?: boolean;          // Enable rotation + glow pulse
  glowIntensity?: 'subtle' | 'medium' | 'strong';
  variant?: 'solid' | 'outline' | 'gradient';
  className?: string;
}

// DESIGN SPECIFICATION:
// The seal is a crystalline geometric form — an icosahedron or stellated dodecahedron
// rendered in 2.5D perspective. It consists of:
// - Outer frame: 12 triangular faces, stroke-only, 1.5px stroke weight
// - Inner core: A smaller concentric geometric form (hexagon or octagon), filled
// - Glow layer: Duplicate of outer frame, blurred, low opacity, animated pulse
// - Particle accents: 4–6 small dots orbiting the seal (SVG animateMotion)

// COLOR BINDING:
// - Frame stroke: var(--primary) → oklch(0.55 0.22 285)
// - Core fill: var(--primary) at 30% opacity
// - Glow: var(--primary-glow) → oklch(0.55 0.22 285 / 0.4)
// - Orbiting dots: var(--accent) → oklch(0.60 0.20 25)

// ANIMATION:
// - Slow rotation: 20s linear infinite (if animate=true)
// - Glow pulse: 4s ease-in-out infinite, opacity 0.3→0.6
// - Orbiting dots: 8s linear infinite, staggered start positions
// - Hover (interactive mode): Scale 1.05, glow intensifies, rotation speeds up 2x

// ACCESSIBILITY:
// - <title>Signet — AI-Powered Resume Builder</title>
// - <desc>A crystalline geometric seal representing professional identity</desc>
// - aria-hidden="true" when used decoratively
// - role="img" when used as a standalone brand mark
```

**Risk Level:** 🟢 Low (SVG is the correct choice, specification is detailed)

---

## Part 2: Component Redesign — Deep Dive & Risk Assessment

### 2.1 Button Component (`src/components/ui/button.tsx`)

**Proposed Changes:**
- Primary: Apply `--gradient-cta` and `glow-accent`
- Secondary: Apply `.glass-panel` styling
- Ghost: Update hover states to match AGE cool shadows

**Analysis:** The plan correctly identifies the CVA (class-variance-authority) variant system as the modification target. However, there are **critical implementation details missing** that will cause bugs:

**Issues:**
1. **Gradient backgrounds in Tailwind v4:** The `--gradient-cta` is a CSS custom property defined in `index.css`. In Tailwind v4, referencing it requires `bg-[var(--gradient-cta)]` or defining it as a theme token. The plan doesn't specify how the gradient token maps to Tailwind utilities.
2. **Glow effects on buttons:** `box-shadow` with custom properties requires careful handling. If the button has `overflow-hidden` or `transform`, the glow may be clipped.
3. **CVA variant matrix bloat:** Adding glow variants to all 6 visual × 8 size combinations creates 48 variant permutations. This is unmaintainable.

**Enhanced Implementation:**

```typescript
// src/components/ui/button.tsx — ENHANCED ARCHITECTURE

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// SEPARATE glow from variant. Glow is an orthogonal concern.
const buttonVariants = cva(
  // Base styles: focus ring, disabled state, transition
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        // PRIMARY: Coral gradient with glow
        primary:
          "bg-[var(--gradient-cta)] text-white shadow-[0_0_30px_oklch(0.60_0.20_25_/_0.4)] hover:shadow-[0_0_50px_oklch(0.60_0.20_25_/_0.5)] hover:brightness-110 hover:scale-[1.03]",

        // SECONDARY: Glassmorphism
        secondary:
          "glass-panel text-foreground hover:border-white/15 hover:shadow-lg hover:-translate-y-0.5",

        // GHOST: Minimal with primary hover
        ghost:
          "text-foreground/80 hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_20px_oklch(0.55_0.22_285_/_0.15)]",

        // DESTRUCTIVE: Coral solid
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",

        // OUTLINE: Bordered minimal
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted hover:text-foreground",

        // LINK: Text-only
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

// Glow prop is SEPARATE from variant — composable, not combinatorial
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  glow?: "none" | "primary" | "accent"  // Orthogonal to variant
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, glow = "none", loading, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const glowClasses = {
      none: "",
      primary: "shadow-[0_0_20px_oklch(0.55_0.22_285_/_0.3)]",
      accent: "shadow-[0_0_30px_oklch(0.60_0.20_25_/_0.4)]",
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), glowClasses[glow], className)}
        ref={ref}
        disabled={props.disabled || loading}
        {...props}
      >
        {loading && (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {props.children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**Key Architectural Decision:** Glow is **orthogonal** to variant, not a variant itself. This prevents combinatorial explosion (6 variants × 8 sizes × 3 glows = 144 combinations) while maintaining full flexibility.

**Risk Level:** 🟡 Moderate → 🟢 Low (with orthogonal glow architecture)

---

### 2.2 Card Component (`src/components/ui/card.tsx`)

**Proposed Changes:**
- Replace default `bg-card` with `.glass-panel`
- Extend CVA to accept `glow="primary" | "accent"` prop

**Analysis:** The glassmorphism migration is correct, but the plan misses **critical accessibility and performance concerns**:

**Issues:**
1. **Glassmorphism + backdrop-filter performance:** On low-end devices and Safari, `backdrop-filter: blur(24px)` can cause significant jank during scroll. The plan doesn't mention a performance fallback.
2. **CVA variant extension for glow:** Same combinatorial problem as buttons. If Card has 3 sub-components (Header, Content, Footer) and each can glow, the matrix explodes.
3. **Missing hover state specification:** The AGE style guide specifies card hover should lift (`translateY(-4px)`), border brightens, and internal glow orb intensifies. The plan only mentions the glow prop.

**Enhanced Implementation:**

```typescript
// src/components/ui/card.tsx — ENHANCED ARCHITECTURE

import * as React from "react"
import { cn } from "@/lib/utils"

// GLASS PANEL UTILITY — defined in index.css, but repeated here for clarity:
// .glass-panel {
//   background: oklch(0.2200 0.0100 250 / 0.4);
//   backdrop-filter: blur(24px);
//   -webkit-backdrop-filter: blur(24px);
//   border: 1px solid oklch(0.9500 0 0 / 0.08);
//   border-radius: var(--radius);
//   box-shadow: 0 8px 32px oklch(0 0 0 / 0.2);
// }
// .glass-panel-hover:hover {
//   border-color: oklch(0.9500 0 0 / 0.15);
//   box-shadow: 0 8px 32px oklch(0 0 0 / 0.3), 0 0 20px oklch(0.55 0.22 285 / 0.1);
//   transform: translateY(-4px);
// }
// @media (prefers-reduced-motion: reduce) {
//   .glass-panel-hover { transition: none; }
// }

// PERFORMANCE FALLBACK for low-end devices:
// Detect via CSS @media (prefers-reduced-transparency: reduce) or JS matchMedia
// Fallback: solid background instead of backdrop-filter

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "none" | "primary" | "accent"
  hover?: boolean
  as?: "div" | "article" | "section"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = "none", hover = true, as: Component = "div", ...props }, ref) => {
    const glowClasses = {
      none: "",
      primary: "relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_30%,oklch(0.55_0.22_285_/_0.15),transparent_60%)] before:pointer-events-none",
      accent: "relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_30%,oklch(0.60_0.20_25_/_0.15),transparent_60%)] before:pointer-events-none",
    }

    return (
      <Component
        ref={ref}
        className={cn(
          "glass-panel",
          hover && "glass-panel-hover transition-all duration-300 ease-out",
          glowClasses[glow],
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

// Sub-components remain simple — they don't need glow/hover logic
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("font-heading text-xl font-semibold leading-none tracking-tight", className)} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

**Key Addition:** The `::before` pseudo-element for the internal glow orb is **critical** to the AGE aesthetic. Without it, cards feel flat and dead. The plan mentions "internal glow orb" but doesn't specify how it's implemented. The pseudo-element approach is performant (no extra DOM nodes) and resolution-independent.

**Risk Level:** 🟡 Moderate → 🟢 Low (with pseudo-element glow + performance fallback)

---

### 2.3 Input Component (`src/components/ui/input.tsx`)

**Proposed Changes:**
- Glass background (`bg-input/50`)
- Violet focus rings
- Subtle focus glow

**Analysis:** This is straightforward but the plan misses **form validation state styling** and **dark mode edge cases**:

**Enhanced Implementation:**

```typescript
// src/components/ui/input.tsx — ENHANCED

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base: glass background, subtle border
          "flex h-10 w-full rounded-lg border border-border/60 bg-input/50 px-4 py-2 text-sm text-foreground shadow-sm transition-all duration-200",

          // Placeholder
          "placeholder:text-muted-foreground/60",

          // Focus: violet ring + glow
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-0 focus-visible:border-primary/60 focus-visible:shadow-[0_0_20px_oklch(0.55_0.22_285_/_0.15)]",

          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50",

          // Invalid (aria-invalid): coral ring instead of violet
          "aria-[invalid=true]:border-destructive/60 aria-[invalid=true]:focus-visible:ring-destructive/50 aria-[invalid=true]:focus-visible:shadow-[0_0_20px_oklch(0.60_0.20_25_/_0.15)]",

          // File input special styling
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",

          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

**Key Addition:** The `aria-[invalid=true]` selector uses Tailwind v4's arbitrary variant syntax to apply coral glow on validation errors. This is a critical accessibility + UX detail missing from the original plan.

**Risk Level:** 🟢 Low

---

### 2.4 Badge Component (`src/components/ui/badge.tsx`)

**Proposed Changes:** Update color mappings to new OKLCH tokens.

**Analysis:** Trivial change. The current badge variants (default, secondary, destructive, outline, ghost, link) map cleanly to the new token system. No architectural concerns.

**Risk Level:** 🟢 Low

---

### 2.5 Tabs Component (`src/components/ui/tabs.tsx`)

**Proposed Changes:** Replace pill shape with clean underline indicator (`border-b-2 border-primary text-primary`).

**Analysis:** This is a **significant UX change** that the plan treats as trivial. The current shadcn/ui Tabs use a pill-shaped active indicator, which is a well-established pattern. Switching to an underline indicator changes the visual rhythm and may confuse existing users. Additionally:

1. **Underline indicators work poorly with glassmorphism:** A `border-b-2` on a glass panel can look like a crack rather than an indicator.
2. **Animation complexity:** The pill shape animates smoothly between tabs (width/position). Underlines require different animation logic.
3. **Mobile touch targets:** Underline indicators typically have smaller touch targets than pills.

**Enhanced Recommendation:**

```typescript
// src/components/ui/tabs.tsx — ENHANCED WITH TWO VARIANTS

// VARIANT A: Underline (for content-heavy sections like comparison charts)
// - Clean, minimal, editorial feel
// - Active: border-b-2 border-primary, text-primary
// - Inactive: text-muted-foreground, hover:text-foreground

// VARIANT B: Pill (for navigation, filters, onboarding steps)
// - Active: bg-primary/20 text-primary rounded-full
// - Inactive: text-muted-foreground hover:bg-muted/50 rounded-full
// - This preserves the existing shadcn/ui behavior for appropriate contexts

// The Tabs component should accept a `indicator` prop:
interface TabsProps {
  indicator?: "underline" | "pill"  // Default: "pill" (backward compatible)
}
```

**Risk Level:** 🟡 Moderate → 🟢 Low (with dual variant support)

---

## Part 3: Layout Integration — Critical Migration Path

### 3.1 Sidebar & TopNav Token Migration

**Proposed Changes:** Purge hardcoded `bg-zinc-950`, `bg-cyan-500/10`, `text-cyan-400`.

**Analysis:** This is the **highest-risk change** in the entire plan. The sidebar and top-nav are the most frequently interacted-with components. A botched migration here breaks the entire user experience.

**Migration Strategy:**

```typescript
// MIGRATION MAP: Hardcoded → Semantic
// BEFORE                          → AFTER
// bg-zinc-950                     → bg-background
// bg-zinc-900/50                  → bg-card/50
// border-zinc-800                 → border-border
// text-zinc-50                    → text-foreground
// bg-cyan-500/10                  → bg-primary/10
// text-cyan-400                   → text-primary
// hover:bg-cyan-500/20            → hover:bg-primary/20
// bg-zinc-900                     → bg-muted (or bg-card for elevated surfaces)
```

**Critical Steps:**
1. **Audit first:** Run `grep -r "zinc|cyan" src/components/layout/` to find ALL hardcoded references.
2. **Token mapping document:** Create a shared `MIGRATION.md` file that every developer references.
3. **Visual regression testing:** Use Storybook + Chromatic or Playwright screenshots to catch visual drift.
4. **Dark-mode-only enforcement:** Since we're committing to dark-only for the app UI, ensure no light-mode zombie classes remain.

**Risk Level:** 🔴 High → 🟢 Low (with audit + visual regression)

---

### 3.2 Logo Component

**Proposed Changes:** Rewrite SVG to reflect Violet Spark geometric motif. Delete duplicate `src/components/logo.tsx`.

**Analysis:** Correct. The duplicate file cleanup is important for maintainability. The SVG rewrite should follow the specification in Decision 3 above.

**Risk Level:** 🟢 Low

---

### 3.3 PricingSection NeonGradientCard Fix

**Proposed Changes:** Fix `hsl(var(--primary))` which crashes with OKLCH.

**Analysis:** This is a **critical bug** that will break the pricing page. The `--primary` token is `oklch(0.55 0.22 285)`, not an HSL value. `hsl(oklch(...))` is invalid CSS and renders as black/transparent in many browsers.

**Fix:**

```typescript
// PricingSection.tsx — FIXED

// BEFORE (BROKEN):
// neonColors={{ firstColor: "hsl(var(--primary))", secondColor: "hsl(var(--primary) / 0.5)" }}

// AFTER (FIXED):
neonColors={{ 
  firstColor: "var(--primary)",        // OKLCH value passed directly
  secondColor: "oklch(0.55 0.22 285 / 0.5)"  // Explicit OKLCH with opacity
}}

// ALTERNATIVE: If the NeonGradientCard component requires HSL specifically,
// convert OKLCH to HSL at build time or use a runtime conversion utility.
// But the cleanest fix is to update NeonGradientCard to accept any CSS color format.
```

**Risk Level:** 🔴 Critical (currently broken in production)

---

## Part 4: Missing Components & Infrastructure

### 4.1 The `glass-panel` Utility Class

The plan mentions `.glass-panel` repeatedly but doesn't specify where it's defined. In Tailwind v4, custom utilities should be defined in the CSS file:

```css
/* src/index.css — ADD THESE UTILITIES */

@layer utilities {
  .glass-panel {
    background: oklch(0.2200 0.0100 250 / 0.4);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid oklch(0.9500 0 0 / 0.08);
    border-radius: var(--radius);
    box-shadow: 0 8px 32px oklch(0 0 0 / 0.2);
  }

  .glass-panel-hover:hover {
    border-color: oklch(0.9500 0 0 / 0.15);
    box-shadow: 0 8px 32px oklch(0 0 0 / 0.3), 0 0 20px oklch(0.55 0.22 285 / 0.1);
    transform: translateY(-4px);
  }

  .text-glow {
    text-shadow: 0 0 40px oklch(0.55 0.22 285 / 0.4);
  }

  .glow-primary {
    box-shadow: 0 0 20px oklch(0.55 0.22 285 / 0.3), 0 0 60px oklch(0.55 0.22 285 / 0.15);
  }

  .glow-accent {
    box-shadow: 0 0 20px oklch(0.60 0.20 25 / 0.35), 0 0 50px oklch(0.60 0.20 25 / 0.2);
  }
}

/* Performance fallback for reduced transparency */
@media (prefers-reduced-transparency: reduce) {
  .glass-panel {
    background: oklch(0.2200 0.0100 250 / 0.95);
    backdrop-filter: none;
  }
}
```

**Risk Level:** 🔴 High (if utilities aren't defined, all glassmorphism breaks)

---

### 4.2 Motion Token System

The plan references animations but doesn't define a centralized motion token system. In Tailwind v4, this belongs in `@theme`:

```css
/* src/index.css — MOTION TOKENS */

@theme inline {
  /* Duration scale */
  --duration-instant: 0ms;
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-slower: 500ms;
  --duration-hero: 800ms;

  /* Easing curves */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Stagger delays */
  --stagger-base: 80ms;
  --stagger-fast: 50ms;
  --stagger-slow: 120ms;
}
```

**Risk Level:** 🟡 Moderate (inconsistent animation timing without tokens)

---

### 4.3 Framer Motion Integration Strategy

The plan mentions Framer Motion but doesn't specify how it integrates with the new design tokens. Framer Motion 12 can consume CSS variables directly:

```typescript
// Example: Scroll reveal using motion tokens
import { motion } from "framer-motion"

const scrollRevealVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,  // Should reference --duration-hero
      ease: [0.4, 0, 0.2, 1],  // Should reference --ease-in-out
    }
  }
}

// BETTER: Create a motion config hook that reads CSS variables
function useMotionTokens() {
  const style = getComputedStyle(document.documentElement)
  return {
    duration: parseFloat(style.getPropertyValue('--duration-hero')) / 1000,
    ease: style.getPropertyValue('--ease-in-out').trim(),
  }
}
```

**Risk Level:** 🟡 Moderate (animation inconsistency without token integration)

---

### 4.4 The `cn()` Utility Enhancement

The plan doesn't mention updating the `cn()` utility (from `class-variance-authority` + `clsx` + `tailwind-merge`). In Tailwind v4, `tailwind-merge` needs to be aware of custom utilities like `glass-panel`:

```typescript
// src/lib/utils.ts — ENHANCED

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Tell tailwind-merge about custom utilities so they don't get stripped
const customConfig = {
  extend: {
    classGroups: {
      'glass-panel': ['glass-panel', 'glass-panel-hover'],
      'glow': ['glow-primary', 'glow-accent'],
    }
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs), customConfig)
}
```

**Risk Level:** 🟡 Moderate (custom classes may be incorrectly merged without config)

---

## Part 5: Verification Plan — Enhanced

### 5.1 Automated Testing

| Test | Tool | Target | Priority |
|:---|:---|:---|:---|
| Build verification | `pnpm run build` | Zero errors, zero warnings | P0 |
| TypeScript strictness | `tsc --noEmit` | Zero type errors | P0 |
| Token coverage | Custom script | All hardcoded zinc/cyan purged | P0 |
| Visual regression | Playwright + Storybook | <0.1% pixel diff for key components | P1 |
| Accessibility | axe-core + Playwright | 0 critical/serious violations | P0 |
| Performance | Lighthouse CI | 90+ on all metrics | P1 |
| Bundle analysis | `vite-bundle-visualizer` | No unexpected bloat | P2 |

### 5.2 Manual Verification Checklist

| Check | Method | Pass Criteria |
|:---|:---|:---|
| Atmosphere particles | Render on test page | 60fps on mid-tier laptop, 30fps on mobile |
| Reduced motion | Toggle OS setting | Particles freeze, animations become instant fades |
| Glassmorphism fallback | Safari + low-end device | Solid background replaces blur gracefully |
| Button glow | Hover all variants | Glow intensifies smoothly, no clipping |
| Card hover | Hover all glow variants | Lift + border brighten + orb intensify |
| Input focus | Tab through form | Violet ring + glow appear, no layout shift |
| Tab indicator | Switch between underline/pill | Both animate smoothly, active state clear |
| Logo SVG | Resize from 16px to 512px | Crisp at all sizes, colors match tokens |
| NeonGradientCard | Render pricing section | Gradient visible, no black/transparent artifacts |
| Sidebar tokens | Visual inspection | No zinc/cyan visible, all semantic colors |
| Dark mode only | Toggle "D" key | Disabled or no-op (per dark-only decision) |
| Resume preview | Export PDF | Colors render correctly, no OKLCH crash |

---

## Part 6: Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|:---|:---|:---|:---|:---|
| 1 | Canvas particle system exceeds GPU budget on mobile | High | High | IntersectionObserver + mobile density reduction + prefers-reduced-motion |
| 2 | Glassmorphism causes scroll jank on Safari | Medium | High | prefers-reduced-transparency fallback + solid background option |
| 3 | OKLCH colors render incorrectly in older browsers | Medium | Medium | Print/PDF pipeline already has hex fallbacks; add `@supports` query for app UI |
| 4 | CVA variant explosion makes components unmaintainable | Medium | Medium | Orthogonal glow prop pattern (Section 2.1) |
| 5 | Token migration misses hidden hardcoded colors | High | High | Automated grep audit + visual regression testing |
| 6 | AI-generated images have off-brand color drift | Medium | Medium | Post-processing color audit pipeline (Section 1) |
| 7 | Framer Motion animations conflict with CSS animations | Low | Medium | Centralized motion token system (Section 4.2) |
| 8 | `tailwind-merge` strips custom utility classes | Medium | Medium | Enhanced `cn()` with custom config (Section 4.4) |
| 9 | Underline tab indicator breaks glassmorphism aesthetic | Medium | Low | Dual variant support (Section 2.5) |
| 10 | NeonGradientCard fix breaks in production | High | Critical | Explicit OKLCH values + browser testing |

---

## Part 7: Revised Implementation Order

The original plan implies parallel execution. This is dangerous. Here's the **sequenced order**:

### Week 1: Foundation & Audit
1. Define `glass-panel`, `glow-*`, `text-glow` utilities in `index.css`
2. Add motion tokens to `@theme inline`
3. Enhance `cn()` utility for custom classes
4. Run automated audit: `grep -r "zinc|cyan|hsl(var" src/`
5. Create token migration map document
6. Fix NeonGradientCard (critical bug)
7. Remove Ubuntu font conflict
8. Generate 3 hero images + color-correct

### Week 2: Core Components
1. Rewrite Button with orthogonal glow
2. Rewrite Card with pseudo-element glow
3. Rewrite Input with validation states
4. Update Badge mappings
5. Update Tabs with dual indicator variants
6. Rewrite Logo SVG (GeometricSeal)
7. Delete duplicate logo file

### Week 3: Layout & Integration
1. Migrate Sidebar tokens
2. Migrate TopNav tokens
3. Build Atmosphere component (Canvas 2D)
4. Build GeometricSeal component
5. Integrate Atmosphere into Hero + Empty States
6. Visual regression testing

### Week 4: Animation & Polish
1. Integrate motion tokens with Framer Motion
2. Implement scroll reveal system
3. Implement hover micro-interactions
4. Implement reduced-motion fallbacks
5. Performance audit + optimization
6. Accessibility audit

### Week 5: QA & Launch Prep
1. Cross-browser testing
2. Mobile responsiveness audit
3. Bundle size analysis
4. Final visual regression
5. Documentation update

---

## Conclusion

The Phase 2 plan is a strong foundation with clear vision. The enhancements in this document address:

1. **Performance:** Canvas 2D particles instead of CSS DOM nodes, glassmorphism fallbacks
2. **Maintainability:** Orthogonal glow props, centralized motion tokens, enhanced `cn()`
3. **Accessibility:** `aria-invalid` styling, `prefers-reduced-motion`, `prefers-reduced-transparency`
4. **Quality:** Color audit pipeline, visual regression testing, automated token audits
5. **Risk:** Sequenced implementation, risk register, migration mapping

The core philosophy—Atmospheric Gradient Editorial, the Alchemist's Forge, the four-color diamond—remains intact. These enhancements ensure the vision ships without compromising performance, accessibility, or maintainability.

> *"Dark is the canvas. Light is the story. Code is the craft."*

---

*Analysis generated by Design Audit System — June 4, 2026*  
*Sources: Tailwind CSS v4 Documentation, shadcn/ui Handbook 2026, Framer Motion Performance Guide, Signet 2.0 Architecture Document, AGE Illustration Style Guide*
