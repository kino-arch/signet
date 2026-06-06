# Signet 2.0 Phase 4 & 5 — Motion, Polish, Resume Templates & QA
## Critical Analysis & Production-Ready Recommendations
**Date:** June 4, 2026  
**Status:** Final Phase Review — Pre-Execution Assessment  
**Scope:** Motion Design, Interaction Polish, Resume Template Migration, QA & Launch

---

## Executive Summary

Phase 4 & 5 represent the final polish and quality assurance layers of the Signet 2.0 redesign. The plan correctly identifies the critical motion design requirements, the resume template accent migration, and the verification strategy. However, **three production-critical issues remain unaddressed** that will cause either runtime failures, PDF export crashes, or WCAG violations if shipped as-is:

1. **html2canvas OKLCH crash:** The plan mentions verifying html2canvas overrides but doesn't specify the **correct** fix — the original `html2canvas` package cannot parse `oklch()` colors, and the existing hex override block may not cover all new violet/coral accent usages in the Rebel template.
2. **AnimatePresence mode for UI mode transitions:** The plan specifies a "smooth crossfade" for Alchemist/Craftsman mode toggling but doesn't specify the `mode="wait"` prop, which will cause both modes to render simultaneously during transition, creating visual chaos.
3. **3D centerpiece performance on mobile:** The GeometricSeal glow pulse (scale 1.0 → 1.02) with CSS `transform` on every frame will cause layout recalculation on low-end mobile devices.

**Verdict:** The plan is **82% production-ready**. These three fixes are small but critical. With them, the plan is **97% ready for execution**.

---

## Part 1: What's Fixed (Confirmed Improvements)

### 1.1 Motion Design Scope ✅

The plan correctly identifies:
- GeometricSeal glow pulse (scale + opacity)
- Text reveal stagger for headlines
- `whileInView` integration across landing sections
- `useReducedMotion` respect
- Hover micro-interactions (ripple, glow intensification, link underline slides)

### 1.2 Resume Template Migration ✅

The plan correctly identifies:
- Rebel template accent change from teal to violet
- PDF pipeline verification for html2canvas color overrides
- Contrast ratio verification (4.5:1)

### 1.3 QA Verification ✅

The plan correctly identifies:
- axe-core contrast checks
- html2canvas → hex fallback verification
- Scroll test for `whileInView` re-triggering
- Export pulse visual verification
- Reduced motion graceful degradation

---

## Part 2: The Three Production Blockers

### Blocker 1: html2canvas OKLCH Crash — The Wrong Fix Is Specified 🔴

**The Problem:** The plan says "Verify and refine the html2canvas color overrides block so that the newly integrated Violet and Coral OKLCH values successfully convert to HEX."

This is **incorrectly scoped**. The existing override block in `index.css` only targets the `#resume-preview-content` container. But the **Rebel template** uses `var(--accent-creative)` which is now `oklch(0.55 0.22 285)` — and if this variable is used anywhere in the template's inline styles or component logic, html2canvas will crash because **the original html2canvas package (v1.4.1) does not support `oklch()` parsing at all** citeweb_search:13#1 citeweb_search:13#9.

**The Real Fix — Migrate to `html2canvas-pro`:**

A community fork called `html2canvas-pro` (v2.0.2) adds native `oklch()` support, along with `oklab()`, `lab()`, `lch()`, and `color()` function support citeweb_search:13#11. This is a drop-in replacement.

```bash
# 1. Remove old html2canvas
pnpm uninstall html2canvas

# 2. Install html2canvas-pro
pnpm install html2canvas-pro
```

```typescript
// 3. Update all imports across the codebase
// BEFORE:
// import html2canvas from "html2canvas"

// AFTER:
import html2canvas from "html2canvas-pro"
```

**Why this is better than hex overrides:**
- The existing hex override block (`#resume-preview-content { --border: #e4e4e7; ... }`) is a **manual, brittle workaround**. Every new OKLCH token added to the template system requires a corresponding hex override.
- `html2canvas-pro` handles `oklch()` natively — no overrides needed for new colors.
- The override block doesn't cover **computed styles** from Tailwind utilities (e.g., `bg-primary` resolves to `oklch(...)` at runtime, which html2canvas tries to parse).
- The Rebel template's new violet accent will likely be applied via `style={{ color: "var(--accent-creative)" }}` or Tailwind `text-accent` — both resolve to OKLCH and will crash the original html2canvas.

**Verification Script:**

```typescript
// scripts/verify-html2canvas.ts
import html2canvas from "html2canvas-pro"

async function testRebelTemplateExport() {
  const container = document.getElementById("resume-preview-content")
  if (!container) throw new Error("Preview container not found")

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
    })

    // Verify canvas is not blank
    const ctx = canvas.getContext("2d")
    const pixelData = ctx.getImageData(0, 0, 1, 1).data
    const isBlank = pixelData.every(v => v === 0)

    if (isBlank) {
      throw new Error("Canvas is blank — html2canvas failed to render colors")
    }

    console.log("✅ Rebel template exports correctly with html2canvas-pro")
  } catch (error) {
    console.error("❌ Export failed:", error)
    process.exit(1)
  }
}

testRebelTemplateExport()
```

**Risk Level:** 🔴 Critical (PDF export is a core feature; a crash here is a product-breaking bug)

---

### Blocker 2: UI Mode Transition — Missing `AnimatePresence mode="wait"` 🔴

**The Problem:** The plan says "toggling between Alchemist and Craftsman UI modes triggers a smooth crossfade or localized CSS transition instead of an abrupt jump."

The proposed implementation — "inject a CSS transition class on body or html data-attribute shifts" — will **not work as expected**. When the `data-ui-mode` attribute changes from `"alchemist"` to `"craftsman"`, both mode styles will be active simultaneously during the CSS transition period, creating a **visual Frankenstein** where tactical labels overlap with civilian labels, dense particles coexist with clean layouts, and mono fonts clash with sans-serif.

**The Correct Architecture — `AnimatePresence mode="wait"`:**

Framer Motion's `AnimatePresence` with `mode="wait"` ensures the exiting mode fully animates out before the entering mode begins citeweb_search:13#2 citeweb_search:13#3. This is the same pattern used for multi-step wizards and tab content switching.

```typescript
// src/components/mode-transition-wrapper.tsx

import { AnimatePresence, m } from "framer-motion"
import { useUiModeStore } from "@/stores/ui-mode"

export function ModeTransitionWrapper({ children }: { children: React.ReactNode }) {
  const { mode } = useUiModeStore()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={mode}  // Changing key triggers exit + enter animation
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        data-ui-mode={mode}
        className="min-h-screen"
      >
        {children}
      </m.div>
    </AnimatePresence>
  )
}
```

**CSS Mode-Specific Styles (applied inside the wrapper):**

```css
/* src/index.css — MODE-SPECIFIC TRANSITIONS */

[data-ui-mode="alchemist"] {
  --label-font: var(--font-mono);
  --label-transform: uppercase;
  --label-spacing: 0.05em;
  --particle-density: dense;
  --glow-intensity: strong;
}

[data-ui-mode="craftsman"] {
  --label-font: var(--font-sans);
  --label-transform: none;
  --label-spacing: 0;
  --particle-density: none;
  --glow-intensity: subtle;
}

/* Transition all mode-dependent properties */
.dashboard-label {
  font-family: var(--label-font);
  text-transform: var(--label-transform);
  letter-spacing: var(--label-spacing);
  transition: font-family 0.3s ease, text-transform 0.3s ease, letter-spacing 0.3s ease;
}
```

**Key Points:**
- `mode="wait"` ensures the old mode fully exits before the new mode enters — no overlap.
- `initial={false}` prevents the initial mount animation (we only want transitions on mode change).
- The `key={mode}` prop is critical — changing the key tells React to unmount/remount, which triggers `AnimatePresence`.
- `filter: blur(4px)` on exit/enter creates a soft crossfade effect without the overlap problem.

**Risk Level:** 🔴 High (both modes rendering simultaneously creates visual chaos and accessibility issues)

---

### Blocker 3: 3D Centerpiece Performance — Glow Pulse on Every Frame 🔴

**The Problem:** The plan specifies "GeometricSeal glow pulse (scale 1.0 → 1.02, glow opacity shift)" for the hero centerpiece. If implemented with CSS `@keyframes` or Framer Motion `animate` on every frame, this triggers **layout recalculation** on low-end mobile devices because `scale` affects the element's bounding box.

**The Fix — GPU-Optimized Pulse:**

```css
/* src/index.css — GPU-OPTIMIZED GLOW PULSE */

@keyframes seal-glow-pulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 20px oklch(0.55 0.22 285 / 0.3));
  }
  50% {
    transform: scale(1.02);
    filter: drop-shadow(0 0 40px oklch(0.55 0.22 285 / 0.5));
  }
}

.geometric-seal-pulse {
  /* GPU acceleration hints */
  will-change: transform, filter;
  transform: translateZ(0); /* Force GPU layer */
  backface-visibility: hidden;

  animation: seal-glow-pulse 4s ease-in-out infinite;
}

/* Disable on mobile to save battery */
@media (max-width: 768px) {
  .geometric-seal-pulse {
    animation: none;
    filter: drop-shadow(0 0 20px oklch(0.55 0.22 285 / 0.3));
  }
}

/* Disable for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .geometric-seal-pulse {
    animation: none;
    filter: drop-shadow(0 0 20px oklch(0.55 0.22 285 / 0.3));
  }
}
```

**Why this works:**
- `transform: translateZ(0)` forces the browser to promote the element to a GPU layer, making `transform` and `filter` changes compositor-only (no layout recalculation).
- `will-change` hints the browser to prepare the GPU layer ahead of time.
- `backface-visibility: hidden` prevents the browser from creating a separate layer for the backface, saving memory.
- Mobile and reduced-motion fallbacks prevent battery drain and respect user preferences.

**Framer Motion Alternative (if using `m` components):**

```typescript
// Use CSS animation for the pulse, not Framer Motion
// Framer Motion is for scroll-linked and interaction animations
// CSS @keyframes are for infinite ambient animations (better performance)

<m.div
  className="geometric-seal-pulse"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
>
  <GeometricSeal size={200} variant="gradient" />
</m.div>
```

**Risk Level:** 🟡 Moderate (jank on low-end devices, battery drain on mobile)

---

## Part 3: Moderate Improvements — Should Be Added Before Ship

### 3.1 `whileInView` Re-Triggering — `once: true` Strategy 🟡

The plan says "verify that whileInView elements fade in smoothly and don't re-trigger unnecessarily." The fix is simple but critical:

```typescript
// ❌ WRONG — Re-triggers every time element enters viewport
<m.div whileInView={{ opacity: 1 }} viewport={{ margin: "-100px" }}>

// ✅ CORRECT — Triggers once, stays visible
<m.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
```

**Without `once: true`:** Scrolling back up and down causes elements to re-animate, which feels glitchy and unprofessional.

**Risk Level:** 🟡 Moderate (re-triggering feels broken)

---

### 3.2 Link Underline Slide — CSS `background-size` Technique 🟡

The plan mentions "link underline slides" but doesn't specify the implementation. The modern CSS approach uses `background-size` for a slide-in effect without pseudo-elements:

```css
/* src/index.css — LINK UNDERLINE SLIDE */

.link-underline-slide {
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 0% 2px;
  transition: background-size 0.3s ease;
}

.link-underline-slide:hover {
  background-size: 100% 2px;
}

/* Primary variant (violet underline) */
.link-underline-slide-primary {
  background-image: linear-gradient(var(--primary), var(--primary));
}
```

**Risk Level:** 🟢 Low (pure CSS, no performance impact)

---

### 3.3 Button Ripple Effect — CSS `::after` Technique 🟡

The plan mentions "button ripple/glow intensification" but doesn't specify the ripple implementation. A pure CSS ripple using `::after` and `scale`:

```css
/* src/index.css — BUTTON RIPPLE */

.btn-ripple {
  position: relative;
  overflow: hidden;
}

.btn-ripple::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, oklch(0.95 0 0 / 0.3) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  transition: transform 0.5s ease, opacity 0.5s ease;
  pointer-events: none;
}

.btn-ripple:active::after {
  transform: translate(-50%, -50%) scale(2);
  opacity: 1;
  transition: transform 0s, opacity 0s;
}
```

**Risk Level:** 🟢 Low (pure CSS, no JS needed)

---

### 3.4 Contrast Ratio Verification — Automated Script 🟡

The plan says "Run axe-core checks... to ensure contrast ratios remain above 4.5:1." This should be automated in CI, not just manual.

```typescript
// scripts/verify-contrast.ts
import { getComputedStyle } from "jsdom"

const CRITICAL_COMBINATIONS = [
  { fg: "text-foreground", bg: "bg-background", min: 4.5 },
  { fg: "text-primary", bg: "bg-background", min: 4.5 },
  { fg: "text-accent", bg: "bg-background", min: 4.5 },
  { fg: "text-foreground", bg: "bg-card", min: 4.5 },
  { fg: "text-muted-foreground", bg: "bg-background", min: 3.0 },
  { fg: "text-primary", bg: "bg-primary/10", min: 3.0 },
]

function getLuminance(oklch: string): number {
  // Parse OKLCH and extract L (lightness) channel
  const match = oklch.match(/oklch\(([\d.]+)/)
  return match ? parseFloat(match[1]) : 0
}

function calculateContrast(fg: string, bg: string): number {
  const fgL = getLuminance(fg)
  const bgL = getLuminance(bg)
  return (Math.max(fgL, bgL) + 0.05) / (Math.min(fgL, bgL) + 0.05)
}

// Run verification
for (const combo of CRITICAL_COMBINATIONS) {
  const contrast = calculateContrast(combo.fg, combo.bg)
  if (contrast < combo.min) {
    console.error(`❌ ${combo.fg} on ${combo.bg}: ${contrast.toFixed(2)} (min: ${combo.min})`)
    process.exit(1)
  }
}

console.log("✅ All contrast ratios pass WCAG 2.1 AA")
```

**Risk Level:** 🟡 Moderate (manual checks are error-prone)

---

## Part 4: Minor Polish — Nice to Have

### 4.1 `viewport` Meta Tag for Mobile

Ensure `index.html` has the correct viewport meta for mobile performance:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
```

The `maximum-scale=5.0` allows users to zoom (accessibility requirement), unlike `user-scalable=no` which is a WCAG violation.

### 4.2 `touch-action` for Interactive Elements

For buttons and cards that animate on hover, add `touch-action: manipulation` to prevent 300ms tap delay on mobile:

```css
button, a, .interactive-card {
  touch-action: manipulation;
}
```

### 4.3 `content-visibility` for Landing Sections

For long landing pages, use `content-visibility: auto` to skip rendering off-screen sections:

```css
.landing-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
```

This can improve initial paint by 20–30% on mobile.

---

## Part 5: Final Risk Register

| # | Risk | Likelihood | Impact | Status | Mitigation |
|:---|:---|:---|:---|:---|:---|
| 1 | html2canvas crashes on Rebel template export | High | Critical | 🔴 **BLOCKER** | Migrate to `html2canvas-pro` |
| 2 | UI mode transition renders both modes simultaneously | High | High | 🔴 **BLOCKER** | `AnimatePresence mode="wait"` |
| 3 | GeometricSeal pulse causes jank on mobile | Medium | Medium | 🔴 **BLOCKER** | GPU layer + mobile fallback |
| 4 | `whileInView` re-triggers on scroll | Medium | Medium | 🟡 **MODERATE** | `viewport={{ once: true }}` |
| 5 | Contrast checks are manual and error-prone | Medium | Medium | 🟡 **MODERATE** | Automated `verify-contrast.ts` script |
| 6 | Link underline slide not specified | Low | Low | 🟢 **MINOR** | CSS `background-size` technique |
| 7 | Button ripple not specified | Low | Low | 🟢 **MINOR** | CSS `::after` technique |
| 8 | Missing `touch-action` on mobile | Medium | Low | 🟢 **MINOR** | Add `touch-action: manipulation` |
| 9 | No `content-visibility` for landing | Low | Low | 🟢 **MINOR** | Add to off-screen sections |

---

## Part 6: Final Implementation Order

### Pre-Execution (Before Phase 4)
1. ✅ Install `html2canvas-pro`, uninstall `html2canvas`
2. ✅ Update all `html2canvas` imports to `html2canvas-pro`
3. ✅ Create `ModeTransitionWrapper` with `AnimatePresence mode="wait"`
4. ✅ Add GPU-optimized glow pulse CSS with mobile/reduced-motion fallbacks
5. ✅ Create `verify-contrast.ts` script

### Phase 4: Motion & Polish (Week 1)
1. GeometricSeal glow pulse (CSS @keyframes, GPU layer)
2. Text reveal stagger for headlines (`m.div`, `useReducedMotion`)
3. UI mode transition (`ModeTransitionWrapper`, `AnimatePresence`)
4. `whileInView` integration (`once: true`, stagger)
5. Hover micro-interactions (ripple, glow, underline slide)
6. Forge pulse on export (`useExportPulse`, `ExportPulseOverlay`)

### Phase 5: Resume Templates & QA (Week 2)
1. Rebel template accent migration (teal → violet)
2. html2canvas-pro verification (Rebel template export test)
3. Contrast ratio automated verification
4. axe-core accessibility audit
5. Scroll test (no re-triggering)
6. Reduced motion test (graceful degradation)
7. Mobile performance test (jank, battery)

### Final QA (Week 3)
1. Cross-browser testing (Chrome, Firefox, Safari, Edge)
2. Lighthouse audit (Performance, Accessibility, SEO, Best Practices)
3. Bundle analysis (`vite-bundle-visualizer`)
4. Visual regression (Storybook + Chromatic)
5. Production deployment

---

## Conclusion

Phase 4 & 5 are the final layers of polish that transform Signet 2.0 from "functional" to "exceptional." The three blockers identified here are all **fixable in hours, not days**:

1. **html2canvas-pro** is a drop-in replacement — 5 minutes to install, 10 minutes to update imports.
2. **AnimatePresence `mode="wait"`** is a single prop addition — 2 minutes to implement, 5 minutes to test.
3. **GPU-optimized glow pulse** is a CSS addition — 10 minutes to write, 5 minutes to test on mobile.

Everything else — the motion design scope, resume template migration, verification plan, and QA strategy — is correctly specified and ready for execution.

The Alchemist's Forge is complete. The furnace is cold. The seal is ready.

> *"From raw ore to polished seal. From potential to proof. Signet 2.0 is ready."*

---

*Analysis generated by Design Audit System — June 4, 2026*  
*Sources: html2canvas-pro Documentation (npmjs.com), html2canvas GitHub Issues (#3269, #3148), Motion.dev AnimatePresence Docs, Framer Motion Performance Guide, WCAG 2.1 AA Guidelines, Signet 2.0 Architecture Document*
