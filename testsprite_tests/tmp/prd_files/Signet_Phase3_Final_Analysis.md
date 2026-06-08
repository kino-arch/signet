# Signet 2.0 Phase 3 — The Alchemist's Experience
## Critical Analysis & Enhanced Implementation Plan
**Date:** June 4, 2026  
**Status:** Page-Level Architecture Review  
**Scope:** Landing Page, Editor, Dashboard, Onboarding, Migration & Technical Debt

---

## Executive Summary

Phase 3 is where the design system meets the user. The plan correctly identifies the five critical page areas and the technical debt that must be cleared. However, **three architectural blind spots, two performance risks, and one missing animation system** could turn the "Alchemist's Experience" into a sluggish, broken, or inaccessible mess.

The plan assumes Phase 1 (tokens) and Phase 2 (components) are fully complete and stable. In reality, page-level integration often reveals component-level gaps that weren't visible in isolation. This document anticipates those gaps and provides architectural guardrails.

**Verdict:** The plan is **75% production-ready**. The remaining 25% requires scroll orchestration architecture, animation state management, and a comprehensive "dark mode only" enforcement strategy.

---

## Part 1: User Confirmation — Dark Mode Only

### Your Question: "Does dark mode only align with expectations?"

**Answer: Yes, with one critical caveat.**

The architecture document correctly identified that the current "light mode" is broken (pressing "D" adds `.light` to `<html>` but no CSS rules change the tokens). Removing the toggle is the right call.

**However, the plan does not specify HOW to enforce dark mode only.** Simply removing the toggle from `ThemeProvider` is not enough. Zombie code and edge cases will persist.

**Enhanced Enforcement Strategy:**

```typescript
// src/components/theme-provider.tsx — DARK-ONLY ENFORCEMENT

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"  // Keep the type for compatibility

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme  // Ignored — always dark
  storageKey?: string
}

const ThemeProviderContext = createContext<{
  theme: "dark"
  setTheme: (theme: Theme) => void  // No-op for backward compatibility
}>({
  theme: "dark",
  setTheme: () => {},  // Intentionally no-op
})

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme] = useState<"dark">("dark")

  useEffect(() => {
    const root = window.document.documentElement

    // Remove any lingering light classes from previous sessions
    root.classList.remove("light")
    root.classList.add("dark")

    // Clear any stored light preference to prevent future confusion
    localStorage.removeItem(storageKey)

    // Disable the "D" keyboard shortcut entirely
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "d" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Check if user is in an editable field
        const target = e.target as HTMLElement
        const isEditable = 
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.contentEditable === "true" ||
          target.getAttribute("role") === "textbox"

        if (!isEditable) {
          e.preventDefault()
          // Optionally: Show a toast "Signet is always dark mode"
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [storageKey])

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme: () => {} }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
```

**Key Points:**
- `setTheme` is a no-op function. Components that call it won't break, but nothing happens.
- The "D" keyboard shortcut is intercepted and prevented, with a guard for editable fields.
- Any stored "light" preference in localStorage is purged on mount.
- The `.light` class is actively removed from `<html>` on every mount.

**Risk Level:** 🟡 Moderate (if not enforced comprehensively, zombie light-mode classes persist)

---

## Part 2: Favicon Decision — "Violet Spark" Geometric Icon

### Your Question: "Do you have a specific favicon, or should I generate one?"

**Recommendation: Generate a new "Violet Spark" geometric icon.**

The existing `/vite.svg` is a generic Vite logo. Replacing it with a branded icon is critical for:
- Browser tab recognition
- Bookmark bar identity
- PWA icon (if you add service workers later)
- Social sharing (when combined with OpenGraph tags)

**Specification:**

```svg
<!-- public/favicon.svg — Violet Spark Geometric Icon -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <title>Signet</title>
  <desc>Crystalline geometric seal representing professional identity</desc>
  <!-- Outer stellated dodecahedron frame -->
  <path 
    d="M16 2L28 9.5V22.5L16 30L4 22.5V9.5L16 2Z" 
    stroke="#8264FF" 
    stroke-width="1.5" 
    fill="none"
  />
  <!-- Inner core hexagon -->
  <path 
    d="M16 8L22 12V20L16 24L10 20V12L16 8Z" 
    fill="#8264FF" 
    fill-opacity="0.3"
  />
  <!-- Center spark point -->
  <circle cx="16" cy="16" r="2" fill="#EA545F"/>
</svg>
```

**Multi-format delivery:**
| Format | File | Purpose |
|:---|:---|:---|
| SVG | `public/favicon.svg` | Modern browsers, scalable |
| PNG 32×32 | `public/favicon-32x32.png` | Legacy browsers, Safari |
| PNG 180×180 | `public/apple-touch-icon.png` | iOS home screen |
| PNG 192×192 | `public/android-chrome-192x192.png` | Android PWA |
| PNG 512×512 | `public/android-chrome-512x512.png` | Android PWA splash |
| ICO | `public/favicon.ico` | Legacy (IE, old Edge) |

**HTML head updates:**
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="theme-color" content="#0A0A0F" />
```

**Risk Level:** 🟢 Low (straightforward asset generation)

---

## Part 3: Landing Page — The Transmutation Chamber

### 3.1 Hero Section (`hero-demo.tsx`)

**Proposed Changes:**
- Violet Spark centerpiece
- `text-glow` on H1
- CTA buttons with `glow-accent`

**Analysis:** The plan is correct but misses **scroll orchestration** and **hero loading state**.

**The Missing Piece: Scroll Orchestration**

A premium landing page is not a collection of independent sections — it's a **cinematic sequence**. The hero must hand off to the next section smoothly, with coordinated animations.

```typescript
// src/components/landing/hero-demo.tsx — ENHANCED

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { GeometricSeal } from "@/components/ui/geometric-seal"
import { Button } from "@/components/ui/button"
import { Atmosphere } from "@/components/animate-ui/atmosphere"

export function HeroDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax transforms
  const sealY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const sealScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const sealOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Atmospheric background with particles */}
      <Atmosphere 
        density="dense" 
        colorMode="mixed" 
        intensity="strong"
        className="absolute inset-0"
      >
        {/* Background gradient: coral from right edge */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,oklch(0.60_0.20_25_/_0.35)_0%,transparent_70%)]" />

        {/* Content layer */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
          {/* Geometric Seal centerpiece */}
          <motion.div
            style={{ y: sealY, scale: sealScale, opacity: sealOpacity }}
            className="mb-8"
          >
            <GeometricSeal 
              size={200} 
              animate 
              glowIntensity="strong" 
              variant="gradient"
            />
          </motion.div>

          {/* Headline with text glow */}
          <motion.h1
            style={{ y: textY }}
            className="font-heading text-5xl md:text-7xl font-bold text-foreground text-glow uppercase tracking-tight mb-6"
          >
            Forge Your{" "}
            <span className="text-primary">Identity</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            style={{ y: textY }}
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-10 leading-relaxed"
          >
            Transform scattered experience into a polished, undeniable resume. 
            AI-powered. ATS-optimized. Ready in minutes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            style={{ y: textY }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              variant="primary" 
              size="lg" 
              glow="accent"
              className="text-base"
            >
              Start Your Forge
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="text-base"
            >
              View Templates →
            </Button>
          </motion.div>
        </div>
      </Atmosphere>
    </section>
  )
}
```

**Key Enhancements:**
1. **Scroll-linked parallax:** The seal drifts upward and fades as the user scrolls, creating depth.
2. **Atmosphere wrapper:** The hero is the primary place for dense particles — this is the "wow" moment.
3. **Text glow:** The `text-glow` utility (defined in Phase 1) applies a soft violet halo to the headline.
4. **Responsive typography:** `text-5xl` on mobile, `text-7xl` on desktop, with DM Sans Bold.

**Risk Level:** 🟡 Moderate (scroll-linked animations can cause jank if not optimized)

---

### 3.2 Feature Cards & Bento Section

**Proposed Changes:**
- Wrap cards in `.glass-panel`
- Add subtle violet orb backgrounds

**Analysis:** The plan is correct but misses **staggered entrance animation** and **card interaction states**.

**Enhanced Implementation:**

```typescript
// src/components/landing/FeatureCards.tsx — ENHANCED

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { GeometricSeal } from "@/components/ui/geometric-seal"

const features = [
  {
    title: "AI Reforge",
    description: "Our AI analyzes your experience and restructures it for maximum impact.",
    icon: "spark",
    glow: "primary" as const,
  },
  {
    title: "ATS Optimization",
    description: "Built-in keyword analysis ensures your resume passes every screening system.",
    icon: "shield",
    glow: "accent" as const,
  },
  {
    title: "Real-Time Preview",
    description: "See your resume take shape as you type. No more guessing.",
    icon: "eye",
    glow: "primary" as const,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export function FeatureCards() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-16"
        >
          The <span className="text-primary">Forge</span> Difference
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants}>
              <Card glow={feature.glow} hover>
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <GeometricSeal size={24} variant="outline" animate={false} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

**Key Enhancements:**
1. **Staggered entrance:** Cards animate in sequence (0.12s delay between each) when scrolling into view.
2. **`whileInView` trigger:** Animations only fire when the section is actually visible, preventing unnecessary GPU work.
3. **`viewport={{ once: true }}`:** Animations run once and don't reverse when scrolling back up — this feels more premium.
4. **Card glow prop:** Uses the orthogonal glow system from Phase 2.

**Risk Level:** 🟢 Low

---

## Part 4: Editor Page — The Workbench

### 4.1 Atmosphere Integration

**Proposed Change:** Inject `<Atmosphere />` for floating background particles.

**Analysis:** The editor is a **productivity tool**, not a marketing page. Dense particles in the editor create **visual noise** that competes with the resume content for attention.

**Enhanced Recommendation:**

```typescript
// src/components/forge/EditorPage.tsx — ENHANCED

export function EditorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header: Glass panel, fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/60">
        {/* ... header content ... */}
      </header>

      {/* Main content area */}
      <div className="pt-16 flex h-screen">
        {/* Left panel: Input arrays */}
        <div className="w-[45%] overflow-y-auto p-6">
          {/* 
            Atmosphere here is SPARSE and SUBTLE — ambient, not distracting.
            Density: sparse (30 particles max)
            Color: violet only (calming, professional)
            Intensity: subtle (low opacity)
          */}
          <Atmosphere 
            density="sparse" 
            colorMode="violet" 
            intensity="subtle"
            className="absolute inset-0 pointer-events-none"
          />

          <InputArraySection title="Identity" />
          <InputArraySection title="Mission History" />
          <InputArraySection title="Skills" />
          <InputArraySection title="Education" />
        </div>

        {/* Right panel: Resume preview */}
        <div className="w-[55%] relative bg-muted/30">
          {/* Workbench framing: violet neon border */}
          <div className="absolute inset-4 rounded-lg border border-primary/30 shadow-[0_0_30px_oklch(0.55_0.22_285_/_0.1)]">
            {/* Resume preview content */}
            <div id="resume-preview-content" className="bg-white text-black p-8">
              {/* ... resume content ... */}
            </div>
          </div>

          {/* Floating dock */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <div className="glass-panel rounded-full px-6 py-3 flex items-center gap-4">
              <Button variant="ghost" size="sm">Preview</Button>
              <Button variant="ghost" size="sm">Save Draft</Button>
              <Button 
                variant="primary" 
                size="sm" 
                glow="accent"
                onClick={handleExport}
              >
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Key Decision:** Editor particles are **sparse, violet-only, subtle**. The left panel (where users type) gets minimal atmosphere. The right panel (resume preview) gets **none** — the white resume is the star.

**Risk Level:** 🟡 Moderate (if particles are too dense, they distract from work)

---

### 4.2 AI Scanline Effect

**Proposed Change:** Add a violet "scanline" overlay during AI operations.

**Analysis:** This is a **signature moment** that signals "the AI is working." The current design already has a scanline (6s linear infinite), but it's decorative. The AI scanline must be **functional and state-driven**.

**Enhanced Implementation:**

```typescript
// src/components/forge/AIProcessingOverlay.tsx

import { motion, AnimatePresence } from "framer-motion"

interface AIProcessingOverlayProps {
  isProcessing: boolean
  progress?: number  // 0–100
}

export function AIProcessingOverlay({ isProcessing, progress }: AIProcessingOverlayProps) {
  return (
    <AnimatePresence>
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-50 pointer-events-none overflow-hidden"
        >
          {/* 
            Scanline: A horizontal line that sweeps down the panel,
            leaving a trail of violet glow.
          */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-primary shadow-[0_0_20px_oklch(0.55_0.22_285_/_0.5)]"
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ 
              duration: 2, 
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 0.5
            }}
          />

          {/* Background tint */}
          <div className="absolute inset-0 bg-primary/5" />

          {/* Progress indicator (if progress is provided) */}
          {progress !== undefined && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-xs text-primary font-mono mt-2">
                REFORGING... {progress}%
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**Key Enhancements:**
1. **`AnimatePresence`:** The overlay enters and exits smoothly, not abruptly.
2. **Progress indicator:** If the AI operation reports progress, show a bar + percentage in Geist Mono.
3. **Pointer-events-none:** The overlay doesn't block user interaction with the form underneath.

**Risk Level:** 🟢 Low

---

### 4.3 Export Pulse Animation

**Proposed Change:** Coral radial pulse on successful PDF export.

**Analysis:** This is the **"forge spark"** — the moment of reward. It must feel explosive and satisfying.

**Enhanced Implementation:**

```typescript
// src/components/forge/ExportPulse.tsx

import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback } from "react"

export function useExportPulse() {
  const [isPulsing, setIsPulsing] = useState(false)

  const triggerPulse = useCallback(() => {
    setIsPulsing(true)
    setTimeout(() => setIsPulsing(false), 1500)
  }, [])

  return { isPulsing, triggerPulse }
}

export function ExportPulseOverlay({ isActive }: { isActive: boolean }) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
        >
          {/* Radial pulse: Expands from center, coral glow */}
          <motion.div
            className="absolute w-4 h-4 rounded-full bg-accent"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 50, 100],
              opacity: [1, 0.5, 0],
            }}
            transition={{ 
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              boxShadow: "0 0 100px oklch(0.60 0.20 25 / 0.6)",
            }}
          />

          {/* Secondary ring */}
          <motion.div
            className="absolute w-4 h-4 rounded-full border-2 border-accent"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 80, 150],
              opacity: [1, 0.3, 0],
            }}
            transition={{ 
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.1,
            }}
          />

          {/* Success message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="relative z-10 text-center"
          >
            <p className="font-heading text-2xl font-bold text-foreground mb-2">
              Resume Forged
            </p>
            <p className="text-muted-foreground">
              Your PDF is ready for download.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**Key Enhancements:**
1. **`useExportPulse` hook:** Reusable state management for the pulse trigger.
2. **Dual ring effect:** A solid core + an expanding ring creates a more explosive feel.
3. **Success message:** Appears after the pulse peaks, confirming the action.
4. **Fixed overlay:** Covers the entire viewport, making the moment feel monumental.

**Risk Level:** 🟢 Low

---

### 4.4 Workbench Framing

**Proposed Change:** Violet neon border around resume preview pane.

**Analysis:** The "neon border" is a critical visual cue that separates the "workbench" (dark UI) from the "product" (white resume). It must be subtle enough to not compete with the resume content, but visible enough to frame the preview.

```css
/* Workbench framing — applied to the resume preview container */
.workbench-frame {
  border: 1px solid oklch(0.55 0.22 285 / 0.3);
  border-radius: var(--radius);
  box-shadow: 
    0 0 30px oklch(0.55 0.22 285 / 0.1),
    inset 0 0 60px oklch(0.55 0.22 285 / 0.02);
  transition: all 0.3s ease;
}

/* Unsaved changes state: pulse the border */
.workbench-frame--unsaved {
  border-color: oklch(0.55 0.22 285 / 0.5);
  box-shadow: 
    0 0 30px oklch(0.55 0.22 285 / 0.2),
    inset 0 0 60px oklch(0.55 0.22 285 / 0.05);
  animation: frame-pulse 3s ease-in-out infinite;
}

@keyframes frame-pulse {
  0%, 100% { border-color: oklch(0.55 0.22 285 / 0.3); }
  50% { border-color: oklch(0.55 0.22 285 / 0.6); }
}
```

**Risk Level:** 🟢 Low

---

## Part 5: Dashboard — The Observatory

### 5.1 Token Migration

**Proposed Change:** Purge `bg-zinc-950`, `border-zinc-800`, replace with semantic tokens.

**Analysis:** This is the **highest-risk migration** in Phase 3. The dashboard is the user's primary workspace. Any visual regression here is immediately noticed.

**Migration Verification Script:**

```bash
#!/bin/bash
# scripts/verify-token-migration.sh

echo "🔍 Scanning for hardcoded zinc/cyan colors..."

# Find all zinc references
ZINC_COUNT=$(grep -r "zinc-" src/components/layout/ src/pages/dashboard/ | wc -l)
if [ "$ZINC_COUNT" -gt 0 ]; then
  echo "❌ Found $ZINC_COUNT zinc references:"
  grep -r "zinc-" src/components/layout/ src/pages/dashboard/
  exit 1
else
  echo "✅ No zinc references found"
fi

# Find all cyan references
CYAN_COUNT=$(grep -r "cyan-" src/components/layout/ src/pages/dashboard/ | wc -l)
if [ "$CYAN_COUNT" -gt 0 ]; then
  echo "❌ Found $CYAN_COUNT cyan references:"
  grep -r "cyan-" src/components/layout/ src/pages/dashboard/
  exit 1
else
  echo "✅ No cyan references found"
fi

# Find all hsl(var(--primary)) patterns (NeonGradientCard bug)
HSL_BUG=$(grep -r 'hsl(var(--' src/ | wc -l)
if [ "$HSL_BUG" -gt 0 ]; then
  echo "❌ Found $HSL_BUG hsl(var(--...) bugs:"
  grep -r 'hsl(var(--' src/
  exit 1
else
  echo "✅ No hsl(var(--...) bugs found"
fi

echo "🎉 All token migrations verified!"
```

**Risk Level:** 🔴 High (if migration is incomplete, visual regressions abound)

---

### 5.2 Stat Cards with Gradient Orbs

**Proposed Change:** `.glass-panel` with background gradient orbs.

**Analysis:** Stat cards are the dashboard's "at a glance" information. They need to feel **alive** without being distracting.

```typescript
// src/components/dashboard/StatCard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface StatCardProps {
  title: string
  value: string | number
  trend?: {
    direction: "up" | "down" | "neutral"
    value: string
  }
  icon?: React.ReactNode
}

export function StatCard({ title, value, trend, icon }: StatCardProps) {
  return (
    <Card glow="primary" hover>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground font-mono uppercase tracking-wider">
            {title}
          </CardTitle>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="font-heading text-4xl font-bold text-foreground"
          >
            {value}
          </motion.span>

          {trend && (
            <span className={cn(
              "text-sm font-medium",
              trend.direction === "up" && "text-primary",
              trend.direction === "down" && "text-accent",
              trend.direction === "neutral" && "text-muted-foreground",
            )}>
              {trend.direction === "up" && "↑"}
              {trend.direction === "down" && "↓"}
              {trend.direction === "neutral" && "→"}
              {" "}{trend.value}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
```

**Risk Level:** 🟢 Low

---

## Part 6: Onboarding — The Ritual

### 6.1 Glass Panel Selection Cards

**Proposed Change:** Apply `.glass-panel` to selection cards.

**Analysis:** Onboarding is the user's first product experience. The glassmorphism cards must feel **inviting**, not cold.

```typescript
// src/components/onboarding/SpecializationCard.tsx

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { GeometricSeal } from "@/components/ui/geometric-seal"

interface SpecializationCardProps {
  title: string
  description: string
  icon: string
  isSelected: boolean
  onClick: () => void
}

export function SpecializationCard({ 
  title, 
  description, 
  icon, 
  isSelected, 
  onClick 
}: SpecializationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        glow={isSelected ? "primary" : "none"}
        hover
        className={cn(
          "cursor-pointer transition-all duration-300",
          isSelected && "border-primary/50 shadow-[0_0_30px_oklch(0.55_0.22_285_/_0.2)]"
        )}
        onClick={onClick}
        role="radio"
        aria-checked={isSelected}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onClick()
          }
        }}
      >
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300",
            isSelected ? "bg-primary/20" : "bg-muted/50"
          )}>
            <GeometricSeal 
              size={32} 
              variant={isSelected ? "solid" : "outline"}
              animate={isSelected}
            />
          </div>

          <h3 className="font-heading text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
```

**Key Enhancements:**
1. **`role="radio"` + `aria-checked`:** Selection cards are radio buttons semantically, even if they look like cards.
2. **Keyboard navigation:** Enter/Space selects the card.
3. **Selection glow:** When selected, the card gets a primary glow + border highlight.
4. **Motion:** Hover scale + tap scale provide tactile feedback.

**Risk Level:** 🟢 Low

---

### 6.2 Typewriter Animation for Forge Commitment

**Proposed Change:** Add typewriter effect for the final step.

**Analysis:** The typewriter effect is a **theatrical moment**. It must feel deliberate and ceremonial, not gimmicky.

```typescript
// src/components/onboarding/TypewriterCreed.tsx

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const CREED_TEXT = `I commit to forging my professional identity.
I pledge clarity over clutter.
I choose precision over pretense.
I am ready to be seen.`

export function TypewriterCreed({ onComplete }: { onComplete: () => void }) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < CREED_TEXT.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(CREED_TEXT.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 50 + Math.random() * 50) // Variable typing speed for realism

      return () => clearTimeout(timeout)
    } else {
      setIsComplete(true)
      onComplete()
    }
  }, [currentIndex, onComplete])

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="font-mono text-lg md:text-xl text-foreground/90 leading-relaxed whitespace-pre-line min-h-[200px]">
        {displayedText}
        {!isComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-2 h-5 bg-primary ml-1"
          />
        )}
      </div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10"
        >
          <Button 
            variant="primary" 
            size="lg" 
            glow="accent"
            onClick={() => {/* proceed to dashboard */}}
          >
            I Commit
          </Button>
        </motion.div>
      )}
    </div>
  )
}
```

**Key Enhancements:**
1. **Variable typing speed:** `50 + Math.random() * 50` ms per character feels more human than constant speed.
2. **Blinking cursor:** A violet block cursor that blinks during typing and disappears when complete.
3. **`whitespace-pre-line`:** Respects the line breaks in the creed text.
4. **Callback on complete:** Parent component knows when to reveal the CTA button.

**Risk Level:** 🟢 Low

---

## Part 7: Migration Checklist & Technical Debt

### 7.1 Theme Provider — Dark Mode Only

**Proposed Change:** Remove light theme logic, force dark mode.

**Enhanced Implementation:** (See Part 1 for full code)

**Additional Checklist:**
- [ ] Remove `light` class from `<html>` on mount
- [ ] Clear `theme` localStorage key
- [ ] Disable "D" keyboard shortcut (with editable field guard)
- [ ] Make `setTheme` a no-op (backward compatibility)
- [ ] Add `data-theme="dark"` to `<html>` for CSS selectors
- [ ] Verify no `.light` CSS rules exist in `index.css`

**Risk Level:** 🟡 Moderate (if not comprehensive, zombie light-mode behavior persists)

---

### 7.2 Footer — SEO & Accessibility Fixes

**Proposed Changes:**
- Change `<h1>` to `<h2>`
- Convert `<div>` links to `<a>` or `<Link>`

**Enhanced Implementation:**

```tsx
// src/components/footer.tsx — ENHANCED

import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="md:col-span-1">
            {/* ✅ FIXED: h2 instead of h1 */}
            <h2 className="font-heading text-xl font-bold text-foreground mb-4">
              Signet
            </h2>
            <p className="text-sm text-muted-foreground">
              Forge your identity. Build your future.
            </p>
          </div>

          {/* Link columns */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                {/* ✅ FIXED: Proper Link component with href */}
                <Link 
                  to="/features" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </li>
              {/* ... more links ... */}
            </ul>
          </div>

          {/* ... more columns ... */}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Signet. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

**Risk Level:** 🟢 Low

---

### 7.3 SEO Meta Tags (`index.html`)

**Proposed Change:** Add Description, OpenGraph, Twitter Cards.

**Enhanced Implementation:**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta name="theme-color" content="#0A0A0F" />

    <!-- Primary Meta Tags -->
    <title>Signet — Forge Your Identity | AI-Powered Resume Builder</title>
    <meta name="title" content="Signet — Forge Your Identity | AI-Powered Resume Builder" />
    <meta name="description" content="Transform scattered experience into a polished, ATS-optimized resume. AI-powered resume builder for professionals who want to stand out." />
    <meta name="keywords" content="resume builder, AI resume, ATS optimization, CV builder, professional resume" />
    <meta name="author" content="Signet" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://signet.app" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://signet.app" />
    <meta property="og:title" content="Signet — Forge Your Identity" />
    <meta property="og:description" content="Transform scattered experience into a polished, ATS-optimized resume." />
    <meta property="og:image" content="https://signet.app/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Signet" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://signet.app" />
    <meta property="twitter:title" content="Signet — Forge Your Identity" />
    <meta property="twitter:description" content="Transform scattered experience into a polished, ATS-optimized resume." />
    <meta property="twitter:image" content="https://signet.app/twitter-card.png" />

    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Signet",
      "description": "AI-powered resume builder",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Risk Level:** 🟢 Low

---

### 7.4 Remove "use client" Directives

**Proposed Change:** Search and remove all Next.js "use client" directives.

**Verification Script:**

```bash
#!/bin/bash
# scripts/remove-use-client.sh

echo "🔍 Searching for 'use client' directives..."

FILES=$(grep -rl '"use client"' src/)

if [ -z "$FILES" ]; then
  echo "✅ No 'use client' directives found"
  exit 0
fi

echo "Found in:"
echo "$FILES"

read -p "Remove all 'use client' directives? (y/n) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
  grep -rl '"use client"' src/ | xargs sed -i '/"use client"/d'
  echo "✅ Removed 'use client' directives"
else
  echo "❌ Aborted"
  exit 1
fi
```

**Risk Level:** 🟢 Low

---

## Part 8: Verification Plan — Enhanced

### 8.1 Automated Tests

| Test | Tool | Target | Priority |
|:---|:---|:---|:---|
| Build verification | `pnpm run build` | Zero errors | P0 |
| Token migration | `scripts/verify-token-migration.sh` | Zero zinc/cyan/hsl-bugs | P0 |
| "use client" removal | `scripts/remove-use-client.sh` | Zero directives | P0 |
| Lighthouse SEO | Chrome DevTools | 90+ | P1 |
| Lighthouse Accessibility | Chrome DevTools | 90+ | P0 |
| Lighthouse Performance | Chrome DevTools | 90+ | P1 |

### 8.2 Manual Verification Checklist

| Page | Check | Method | Pass Criteria |
|:---|:---|:---|:---|
| **Landing** | Hero scroll parallax | Scroll slowly | Seal drifts up, fades out, no jank |
| **Landing** | Feature card stagger | Scroll to features | Cards animate in sequence, 0.12s delay |
| **Landing** | CTA glow | Hover "Start Forge" | Coral glow intensifies, scale 1.03 |
| **Editor** | AI scanline | Trigger AI reforge | Violet line sweeps down, progress bar updates |
| **Editor** | Export pulse | Click "Export PDF" | Coral radial expands, success message appears |
| **Editor** | Workbench frame | Edit resume | Violet border pulses when unsaved |
| **Dashboard** | Stat cards | Load dashboard | Numbers animate in, glass panels render |
| **Dashboard** | No zinc/cyan | Visual inspection | All colors match semantic tokens |
| **Onboarding** | Selection cards | Click specialization | Selected card glows, keyboard navigable |
| **Onboarding** | Typewriter | Reach step 4 | Text types variable speed, cursor blinks |
| **Global** | Dark mode only | Press "D" key | Nothing happens (or toast appears) |
| **Global** | Footer links | Click footer links | Navigate to correct pages |
| **Global** | Meta tags | View page source | All SEO tags present, OpenGraph valid |
| **Global** | Favicon | Check browser tab | Violet spark icon visible |
| **Global** | Reduced motion | Toggle OS setting | All animations freeze or simplify |

---

## Part 9: Risk Register

| # | Risk | Likelihood | Impact | Mitigation |
|:---|:---|:---|:---|:---|
| 1 | Hero scroll parallax causes jank on mobile | High | High | Use `will-change: transform`, disable on mobile |
| 2 | Editor particles distract from productivity | Medium | Medium | Sparse density, violet-only, subtle intensity |
| 3 | Token migration misses hidden zinc/cyan | High | High | Automated grep script + visual regression |
| 4 | Typewriter effect is too slow for impatient users | Medium | Low | Add "Skip" button, speed up on second view |
| 5 | Export pulse blocks interaction for 1.5s | Medium | Medium | `pointer-events-none` on overlay |
| 6 | Dark mode enforcement incomplete | Medium | High | Comprehensive cleanup (Part 7.1 checklist) |
| 7 | SEO meta tags missing dynamic route data | Medium | Medium | Use React Helmet Async for route-specific tags |
| 8 | "use client" removal breaks component logic | Low | High | Verify each file after removal |
| 9 | Glassmorphism stat cards unreadable on low-contrast | Low | Medium | `prefers-contrast: more` fallback |
| 10 | Onboarding selection cards not keyboard accessible | Low | High | `role="radio"`, `aria-checked`, Enter/Space handlers |

---

## Part 10: Revised Implementation Order

### Week 1: Foundation & Migration
1. Dark mode enforcement (ThemeProvider, localStorage purge, "D" key disable)
2. Token migration (sidebar, top-nav, dashboard)
3. Remove "use client" directives
4. Fix footer (h1→h2, div→Link)
5. Add SEO meta tags to `index.html`
6. Generate favicon assets
7. Run verification scripts

### Week 2: Landing Page
1. Hero section (Violet Spark, parallax, text-glow)
2. Feature cards (stagger, glass-panel, orbs)
3. Bento section (glass-panel, responsive grid)
4. Testimonials (glassmorphism, gradient backdrops)
5. CTA section (coral gradient, glow-accent)

### Week 3: Editor & Dashboard
1. Editor layout (Atmosphere sparse, workbench frame)
2. AI scanline overlay (state-driven, AnimatePresence)
3. Export pulse animation (hook + overlay)
4. Dashboard stat cards (glass-panel, gradient orbs)
5. Dashboard token migration verification

### Week 4: Onboarding & Polish
1. Onboarding glass cards (selection, keyboard nav)
2. Typewriter creed (variable speed, skip button)
3. Final CTA glow (dramatic accent)
4. Scroll reveal system (global whileInView)
5. Hover micro-interactions (buttons, cards, links)

### Week 5: QA & Launch
1. Cross-browser testing
2. Mobile responsiveness
3. Lighthouse audit (SEO, A11y, Performance)
4. Visual regression
5. Documentation

---

## Conclusion

Phase 3 is where Signet 2.0 becomes real. The plan correctly identifies the five critical page areas and the technical debt that must be cleared. The enhancements in this document address:

1. **Scroll orchestration:** Parallax, stagger, and entrance animations that feel cinematic, not chaotic.
2. **Editor restraint:** Sparse particles that enhance without distracting.
3. **Animation state management:** Hooks for export pulse, AI scanline, and typewriter that keep logic out of JSX.
4. **Accessibility:** Keyboard navigation for onboarding, ARIA for Canvas, semantic HTML for footer.
5. **SEO completeness:** Meta tags, OpenGraph, structured data, and favicon strategy.

The dark mode only decision is correct and should be enforced comprehensively. The favicon should be generated as a Violet Spark geometric icon. The "Alchemist's Experience" is within reach.

> *"The forge is built. The fire is lit. Now we shape the experience."*

---

*Analysis generated by Design Audit System — June 4, 2026*  
*Sources: Signet 2.0 Architecture Document, AGE Illustration Style Guide, Phase 2 Enhanced Analysis, WCAG 2.1 AA Guidelines, Framer Motion Performance Guide*
