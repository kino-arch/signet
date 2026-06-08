# Signet 2.0 — The Alchemist's Forge
## Comprehensive Redesign Architecture & Implementation Plan
**Project:** Signet — AI-Powered Resume Builder  
**Codename:** "Alchemist"  
**Date:** June 4, 2026  
**Audit Basis:** Codable SaaS Design Audit (DTAIL Studio) + Signet Internal Audit  
**Stack:** Vite 8 · React 19 · TypeScript 6 · Tailwind CSS v4 · shadcn/ui · Framer Motion 12

---

## 0. Executive Manifesto

Signet's current design is technically proficient but visually trapped in a narrow tactical metaphor. The green-on-dark HUD aesthetic, while distinctive, limits the product's perceived audience and creates cognitive friction for non-technical users. The Codable redesign by DTAIL Studio demonstrates a masterclass in **clarity through constraint**: a four-color palette, bold typography as imagery, atmospheric depth, and purposeful motion that signals technical excellence without demanding technical literacy.

**Signet 2.0** adopts this philosophy. We are not abandoning our "forge" identity—we are elevating it. From a military workshop to an **alchemist's atelier**: a place where raw professional identity is transmuted into something precious, polished, and undeniable. The green tactical glow becomes violet wisdom-light. The harsh cyan data-readouts become warm coral sparks of action. The dense HUD grid becomes breathable glassmorphism floating in deep space.

This document provides the narrative, architecture, and implementation roadmap for that transformation.

---

## 1. The Narrative: From Tactical to Timeless

### 1.1 The Story of the Design Theme

> *"Every career is a raw ore. Signet is the furnace that reveals the gold within."*

The original Signet design language was born from the "Mandalorian" metaphor—tactical, military, utilitarian. It served an early audience of engineers and technical professionals who resonated with HUD interfaces and combat terminology. But as Signet grows into a universal resume platform serving designers, executives, nurses, and creatives, the tactical shell has become a cage.

**The Alchemist's Forge** reimagines the creation process:

- **The Raw Material** — The user's scattered experience, skills, and ambitions. Represented by the deep black void: potential without form.
- **The Furnace** — The AI engine and editor interface. Represented by the coral glow: heat, energy, transformation, action.
- **The Transmutation** — The resume building process. Represented by the violet aura: wisdom, creativity, the magic of structure emerging from chaos.
- **The Signet** — The final resume. A seal of quality, a mark of mastery, rendered in pure white clarity on pristine paper.

This narrative allows us to keep the dual-mode vocabulary (Mandalorian/Civilian) but recontextualize it. The "Mandalorian mode" becomes the **Alchemist's Tongue**—ancient, precise, ritualistic. The "Civilian mode" becomes the **Craftsman's Voice**—clear, modern, accessible. Both speak of transformation, but one whispers of ancient mysteries while the other speaks of professional polish.

### 1.2 Emotional Design Principles

1. **Depth, Not Density** — The dark background should feel like a vast studio at night, not a cramped cockpit. Space to breathe. Space to think.
2. **Light as Presence** — Glow effects are not decoration; they are the visible energy of creation. Every illuminated element is alive with potential.
3. **Typography as Sculpture** — Words are not just read; they are seen. Headlines should feel carved from light, commanding attention through form and weight.
4. **Glass as Truth** — Glassmorphism cards suggest transparency, honesty, and refinement. The user sees the depth behind the surface—nothing is hidden.
5. **Motion as Momentum** — Animations do not entertain; they propel. Every scroll, every hover, every transition should feel like forward motion toward a completed resume.

---

## 2. Visual Philosophy: Clarity Through Contrast

### 2.1 Design Pillars (Adapted from Codable)

| Pillar | Codable Application | Signet 2.0 Application |
|:---|:---|:---|
| **Simplify Structure** | Clear information hierarchy for enterprise SaaS | Progressive disclosure in resume editor; dashboard as command deck |
| **Sharpen the Message** | Bold typography emphasizes value propositions | Hero headlines that speak to career transformation; resume preview as hero moment |
| **Amplify Technical Confidence** | Glows, 3D, motion signal engineering excellence | Particle effects around AI features; subtle grid suggests precision without HUD clutter |

### 2.2 The Four-Color Diamond

Codable's color architecture uses a deliberate quadrilateral: **Purple, Black, White, Coral**. This creates visual tension and energy while maintaining cohesion. Signet 2.0 adopts this structure exactly, replacing the current green-blue-violet chaos with a disciplined four-anchor system.

The psychological mapping:
- **Violet (#8264FF)** — Intelligence, creativity, wisdom. The color of AI insight and strategic thinking.
- **Coral (#EA545F)** — Energy, action, heat. The color of "Export PDF," "Start Forge," and urgent CTAs.
- **Deep Black (#0A0A0A)** — Potential, depth, focus. The infinite canvas where careers are composed.
- **Pure White (#FFFFFF)** — Clarity, completion, purity. The final resume rendered in perfection.

---

## 3. Color Architecture: The Luminous Dark

### 3.1 OKLCH Migration Strategy

Signet's existing OKLCH infrastructure is technically correct and will be preserved. We are **re-tuning the hue and chroma values**, not abandoning the system. This ensures all accessibility guarantees, perceptual uniformity, and print-fallback logic remain intact.

#### Layer 1: Application Semantic Tokens (Dark Theme — Redesigned)

```css
:root {
  /* === CORE DIAMOND === */
  --background:           oklch(0.1503 0.0125 264.2926);   /* Deep void — darker than current */
  --foreground:           oklch(0.9500 0 0);                /* Pure white — maximum contrast */

  --card:                 oklch(0.2100 0.0078 223.6661);    /* Warm dark glass */
  --card-foreground:      oklch(0.9200 0 0);

  --popover:              oklch(0.1800 0.0100 250);         /* Elevated surface */
  --popover-foreground:   oklch(0.9500 0 0);

  /* === PRIMARY: VIOLET WISDOM === */
  --primary:              oklch(0.5500 0.2200 285.0000);    /* #8264FF equivalent */
  --primary-foreground:   oklch(0.9800 0 0);
  --primary-light:        oklch(0.6500 0.1800 285.0000);    /* Hover/active state */
  --primary-glow:         oklch(0.5500 0.2200 285.0000 / 0.4);

  /* === SECONDARY: MUTED BLUE-VIOLET === */
  --secondary:            oklch(0.4500 0.1000 260.0000);    /* Supporting cool tone */
  --secondary-foreground: oklch(0.9500 0 0);

  /* === ACCENT: CORAL HEAT === */
  --accent:               oklch(0.6000 0.2000 25.0000);     /* #EA545F equivalent */
  --accent-foreground:    oklch(0.9800 0 0);
  --accent-light:         oklch(0.7000 0.1600 25.0000);     /* Hover state */
  --accent-glow:          oklch(0.6000 0.2000 25.0000 / 0.4);

  /* === MUTED & UTILITY === */
  --muted:                oklch(0.3000 0 0);                /* Neutral gray */
  --muted-foreground:     oklch(0.6500 0 0);                /* Secondary text */
  --border:               oklch(0.2500 0.0100 250 / 0.6);   /* Glass edge */
  --input:                oklch(0.2200 0.0100 250 / 0.8);
  --ring:                 oklch(0.5500 0.2200 285.0000);    /* Primary focus ring */

  /* === DESTRUCTIVE === */
  --destructive:          oklch(0.5500 0.2200 25.0000);     /* Deeper coral for danger */
  --destructive-foreground: oklch(0.9800 0 0);

  /* === CHARTS (Cool Spectrum) === */
  --chart-1: oklch(0.5500 0.2200 285.0000);  /* Violet */
  --chart-2: oklch(0.6000 0.2000 25.0000);   /* Coral */
  --chart-3: oklch(0.4500 0.1000 260.0000);  /* Blue-violet */
  --chart-4: oklch(0.7500 0.1200 200.0000);  /* Cyan accent */
  --chart-5: oklch(0.6500 0.1800 150.0000);  /* Soft green for success */

  /* === SHADOWS (OKLCH Black) === */
  --shadow-color: oklch(0 0 0 / 0.25);
  --shadow-sm: 0 1px 2px 0 oklch(0 0 0 / 0.15);
  --shadow: 0 4px 6px -1px oklch(0 0 0 / 0.2), 0 2px 4px -2px oklch(0 0 0 / 0.15);
  --shadow-lg: 0 10px 15px -3px oklch(0 0 0 / 0.25), 0 4px 6px -4px oklch(0 0 0 / 0.2);
  --shadow-glow-primary: 0 0 40px oklch(0.5500 0.2200 285.0000 / 0.3);
  --shadow-glow-accent: 0 0 60px oklch(0.6000 0.2000 25.0000 / 0.35);

  /* === RADIUS === */
  --radius: 0.75rem;
}
```

#### Layer 2: Resume Foundation Colors (Print-Safe — Unchanged Logic)

The resume preview and PDF pipeline must remain achromatic for print reliability. However, we introduce a **subtle accent injection** for digital preview:

```css
#resume-preview-content {
  --resume-bg: oklch(1 0 0);              /* Pure white */
  --resume-ink: oklch(0.14 0 0);          /* Near-black */
  --resume-muted: oklch(0.55 0.02 250);   /* Gray-600 */
  --resume-faint: oklch(0.72 0.02 250);   /* Gray-400 */
  --resume-border: oklch(0.91 0.01 250);  /* Gray-200 */
  --resume-divider: oklch(0.86 0.01 250); /* Gray-300 */
  --resume-sidebar-bg: oklch(0.97 0.01 250); /* Slate-50 */
  /* NEW: Digital-only accent for preview */
  --resume-accent-digital: oklch(0.5500 0.2200 285.0000); /* Violet for links/highlights in preview */
}
```

#### Layer 3: Template Accent System (Themed — Updated)

```css
--accent-standard:      oklch(0.35 0.08 250);   /* Navy — unchanged base */
--accent-standard-light: oklch(0.45 0.06 250);
--accent-technical:     oklch(0.42 0.05 250);   /* Slate */
--accent-technical-light: oklch(0.52 0.04 250);
--accent-minimal:       oklch(0.48 0.02 250);   /* Gray */
--accent-minimal-light: oklch(0.58 0.02 250);
--accent-modern:        oklch(0.52 0.05 250);   /* Slate-600 */
--accent-modern-light:  oklch(0.62 0.04 250);
--accent-executive:     oklch(0.25 0.05 250);   /* Slate-900 */
--accent-executive-light: oklch(0.35 0.04 250);
--accent-creative:      oklch(0.55 0.15 285);   /* UPDATED: Violet instead of Teal */
--accent-creative-light: oklch(0.65 0.12 285);
```

The creative template now uses the brand violet, creating cohesion between the app UI and the resume output.

### 3.2 Gradient & Glow System

#### Background Gradients

```css
/* Hero Red Glow — positioned from right edge */
--gradient-hero-glow: radial-gradient(
  circle at 85% 50%,
  oklch(0.6000 0.2000 25.0000 / 0.35) 0%,
  oklch(0.6000 0.2000 25.0000 / 0.1) 40%,
  transparent 70%
);

/* Purple Aura — for case study/feature sections */
--gradient-purple-aura: radial-gradient(
  circle at 50% 50%,
  oklch(0.5500 0.2200 285.0000 / 0.25) 0%,
  oklch(0.5500 0.2200 285.0000 / 0.05) 50%,
  transparent 70%
);

/* Card Gradient — subtle depth */
--gradient-card-surface: linear-gradient(
  180deg,
  oklch(0.2200 0.0100 250 / 0.6) 0%,
  oklch(0.1800 0.0080 250 / 0.4) 100%
);

/* CTA Button Gradient — coral heat */
--gradient-cta: linear-gradient(
  135deg,
  oklch(0.6000 0.2000 25.0000) 0%,
  oklch(0.5200 0.1800 25.0000) 100%
);
```

#### Glow Effects

```css
/* Primary Violet Glow */
.glow-primary {
  box-shadow: 0 0 20px oklch(0.5500 0.2200 285.0000 / 0.3),
              0 0 60px oklch(0.5500 0.2200 285.0000 / 0.15);
}

/* Accent Coral Glow */
.glow-accent {
  box-shadow: 0 0 20px oklch(0.6000 0.2000 25.0000 / 0.35),
              0 0 50px oklch(0.6000 0.2000 25.0000 / 0.2);
}

/* Text Glow — for hero headlines */
.text-glow {
  text-shadow: 0 0 40px oklch(0.5500 0.2200 285.0000 / 0.4);
}
```

### 3.3 Text Color Hierarchy

| Element | Token | OKLCH Value | Purpose |
|:---|:---|:---|:---|
| Hero Headlines (H1) | `text-foreground` | `oklch(0.95 0 0)` | Maximum contrast, commanding presence |
| Section Titles (H2) | `text-foreground` | `oklch(0.95 0 0)` | Clear hierarchy |
| Body Text | `text-primary/90` | `oklch(0.95 0 0 / 0.9)` | High readability without harshness |
| Secondary / Meta | `text-muted-foreground` | `oklch(0.65 0 0)` | Labels, captions, timestamps |
| Accent Text | `text-accent` | `oklch(0.60 0.20 25)` | Highlighted words, key metrics, urgency |
| Links | `text-primary` | `oklch(0.55 0.22 285)` | Interactive elements, navigation |
| Active Nav | `text-primary` | `oklch(0.55 0.22 285)` | Current page indication |

---

## 4. Typography Evolution

### 4.1 The Three-Font System (Preserved & Elevated)

Signet's existing three-tier typography is correct and will be retained. The redesign elevates the **weight and scale** treatment, not the font families themselves.

| Token | Font | Role in 2.0 | Treatment Change |
|:---|:---|:---|:---|
| `--font-heading` | DM Sans Variable | Identity, headlines, brand | **Bolder, larger, uppercase** for H1/H2. Tighter line-height (1.1–1.15) for hero moments. |
| `--font-sans` | Inter Variable | Readability, body, forms | Unchanged. Still the workhorse of the UI. |
| `--font-mono` | Geist Mono | Data, status, labels | **More prominent** as decorative element. Used for step counters, telemetry, and "Alchemist's Tongue" labels. |

### 4.2 Type Scale & Hierarchy (Desktop)

| Element | Size | Weight | Line Height | Letter Spacing | Usage |
|:---|:---|:---|:---|:---|:---|
| Hero Title | 56–72px | Bold (700) | 1.05 | -0.02em | Landing hero, forge confirmation |
| Section Title (H1) | 40–48px | Bold (700) | 1.15 | -0.01em | Major section headers |
| Section Subtitle (H2) | 28–32px | Medium (500) | 1.25 | 0 | Secondary headings |
| Card Title (H3) | 20–24px | SemiBold (600) | 1.3 | 0 | Feature/card headings |
| Body Large | 18px | Regular (400) | 1.6 | 0 | Intro paragraphs, quotes |
| Body | 16px | Regular (400) | 1.6 | 0 | Standard body text |
| Caption / Meta | 12–14px | Medium (500) | 1.5 | 0.02em | Labels, navigation, dates |
| Button Text | 14px | SemiBold (600) | 1 | 0.01em | CTA buttons |
| Mono Label | 12px | Medium (500) | 1.4 | 0.05em | Status indicators, step counters |

### 4.3 Implementation Fix: The Ubuntu Conflict

**Critical Action:** Remove the `* { font-family: Ubuntu, sans-serif; }` declaration from `index.css:L295`. The `html { @apply font-sans; }` rule should be the sole typography baseline. Ubuntu is a beautiful font but it creates a specificity war that undermines the entire design system. If Ubuntu is desired for specific decorative moments, apply it via explicit utility classes on those elements only.

---

## 5. Spatial Design & Atmosphere

### 5.1 The Layered Background System

Inspired by Codable's atmospheric depth, Signet 2.0 uses a five-layer background architecture:

```
Layer 5: Vignette — Darkened edges (radial gradient from center transparent to edges oklch(0 0 0 / 0.6))
Layer 4: Gradient Overlay — Strategic radial glows (coral from right, violet from center)
Layer 3: Floating Elements — Scattered geometric shapes (low-opacity squares, subtle motion)
Layer 2: Grid Texture — Subtle 32px tactical grid at 3% opacity (preserved but softened)
Layer 1: Base — Solid near-black (oklch(0.15 0 0))
```

This creates a sense of **infinite studio space** rather than a confined interface. The user is not in a cockpit; they are in a vast, dark atelier where their resume is the luminous center of attention.

### 5.2 Glassmorphism Specification

All cards, panels, and elevated surfaces use a unified glass treatment:

```css
.glass-panel {
  background: oklch(0.2200 0.0100 250 / 0.4);      /* Semi-transparent dark */
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid oklch(0.9500 0 0 / 0.08);      /* Subtle white edge */
  border-radius: var(--radius);                     /* 12px */
  box-shadow: 0 8px 32px oklch(0 0 0 / 0.2);       /* Soft lift */
}

.glass-panel-hover:hover {
  border-color: oklch(0.9500 0 0 / 0.15);
  box-shadow: 0 8px 32px oklch(0 0 0 / 0.3),
              0 0 20px oklch(0.5500 0.2200 285.0000 / 0.1);
  transform: translateY(-2px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 5.3 The "Forge Glow" Concept

A signature visual effect for Signet 2.0: when the user completes a significant action (finishing a section, AI reforge, export), a **coral radial pulse** emanates from the action point, briefly illuminating the surrounding interface. This is the "spark of the forge"—a moment of visible energy release that rewards progress.

---

## 6. Component Redesign Specifications

### 6.1 Navigation System

**Structure:** Fixed top bar, minimal, semi-transparent on scroll.

| Position | Element | Specification |
|:---|:---|:---|
| Left | Logo | "signet" lowercase wordmark + violet spark icon (geometric, not bracket) |
| Center | Primary Nav | Dashboard, My Resumes, Job Tracker, Analytics, Settings |
| Right | CTA + Mode Toggle | "Start Forge" coral pill button + Mandalorian/Civilian toggle |

**Style:**
- Default: `background: transparent; border-bottom: 1px solid transparent;`
- Scrolled: `background: oklch(0.15 0 0 / 0.85); backdrop-filter: blur(20px); border-bottom: 1px solid oklch(0.95 0 0 / 0.08);`
- Links: `text-foreground/80`, weight 500, hover transitions to `text-primary` with subtle glow
- Active: `text-primary` with a 2px bottom border in `oklch(0.55 0.22 285)`
- Mobile: Hamburger menu with slide-in glass panel from right

**Fix:** Migrate all hardcoded `bg-zinc-950`, `border-zinc-800`, `text-zinc-50` in `dashboard-layout.tsx` and `sidebar.tsx` to semantic tokens (`bg-background`, `border-border`, `text-foreground`, `bg-primary/10`, `text-primary`).

### 6.2 Buttons & CTAs

All buttons adopt Codable's pill-shaped design with gradient fills.

| Variant | Background | Text | Border | Shadow | Usage |
|:---|:---|:---|:---|:---|:---|
| **Primary CTA** | `linear-gradient(135deg, oklch(0.60 0.20 25), oklch(0.52 0.18 25))` | White, 14px, SemiBold | None | `0 0 30px oklch(0.60 0.20 25 / 0.4)` | "Start Forge," "Export PDF," main actions |
| **Secondary** | Transparent | White, 14px, Medium | 1px `oklch(0.95 0 0 / 0.2)` | None | "Learn more," "Cancel" |
| **Ghost** | Transparent | `text-primary`, 14px, Medium | None | None | "View Templates," navigation links |
| **Destructive** | `oklch(0.55 0.22 25)` | White | None | None | Delete, remove |
| **Icon Button** | `oklch(0.22 0.01 250 / 0.6)` | `text-foreground` | 1px `oklch(0.95 0 0 / 0.1)` | None | Toolbar actions |

**States:**
- **Default:** As above.
- **Hover:** Scale to 1.03, increased glow, brightness boost.
- **Active:** Scale to 0.98, reduced shadow, pressed appearance.
- **Focus:** `ring-2 ring-primary ring-offset-2 ring-offset-background`.
- **Disabled:** Opacity 0.4, no glow, cursor not-allowed.

**Implementation:** Update `button.tsx` CVA variants. The secondary variant currently uses `color-mix(in_oklch, ...)` — this is correct and should be preserved. Ensure all button sizes (xs through icon-lg) are maintained.

### 6.3 Cards & Containers

**Feature Cards (Landing, Dashboard):**
```css
.feature-card {
  @apply glass-panel;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  /* Subtle gradient orb behind icon */
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at 30% 30%,
    oklch(0.55 0.22 285 / 0.15) 0%,
    transparent 60%
  );
  pointer-events: none;
}
```

- Icon container: 48px circle with `bg-primary/10` and `glow-primary` on hover.
- Title: DM Sans, 20px, SemiBold, `text-foreground`.
- Description: Inter, 16px, Regular, `text-muted-foreground`.
- Hover: Card lifts (`translateY(-4px)`), border brightens, orb intensifies.

**Resume Preview Card (Editor):**
- Maintains white background for print fidelity.
- Surrounded by a **tactical crop mark frame** in `oklch(0.55 0.22 285 / 0.3)` — the "workbench" aesthetic.
- Subtle scanline overlay (preserved from current design but reduced to 5% opacity).
- Floating status pill: "SYSTEM: ONLINE" in Geist Mono, `text-primary`, glass background.

**Testimonial Cards:**
- Company logo at top with gradient backdrop (coral-to-violet subtle gradient).
- Quote in Body Large italic, `text-foreground/90`.
- Author name in DM Sans SemiBold, title in `text-muted-foreground`.
- Carousel indicator dots: `bg-primary` for active, `bg-muted-foreground/30` for inactive.

### 6.4 Input Arrays & Form Elements

The editor's input sections (Identity, Mission History, Skills, Education) are currently functional but visually dense. Redesign:

- **Section Header:** DM Sans, 24px, SemiBold, with a small violet left-border accent (4px wide, full height of header).
- **Input Fields:** Glassmorphism background, subtle border, focus state with `ring-primary` and a soft violet glow.
- **Add Buttons:** Ghost variant with `+` icon, coral on hover.
- **AI Reforge Trigger:** Distinctive floating action button with `glow-accent` and pulsing animation.
- **Drag Handles:** Subtle `oklch(0.95 0 0 / 0.2)` grip lines, brighter on hover.

---

## 7. Page-Level UX Architecture

### 7.1 Landing Page — The Transmutation Chamber

A cinematic single-page scroll experience, replacing the current tactical HUD with atmospheric storytelling.

| # | Section | Purpose | Key Visual Elements |
|:---|:---|:---|:---|
| 1 | **Hero** | Immediate emotional impact | Large 3D geometric spark/vortex (inspired by Codable's code bracket), headline "Forge Your Identity," coral CTA |
| 2 | **Mission Statement** | Positioning & credibility | "Designed for ambition. Built for the hire." — bold typography as imagery |
| 3 | **Feature Highlights** | Core value propositions | 3 glass cards with violet glow orbs: AI Reforge, ATS Optimization, Real-Time Preview |
| 4 | **Template Showcase** | Product demonstration | Horizontal scroll of resume templates with hover-to-preview interaction |
| 5 | **Social Proof** | Trust & validation | Marquee of company logos + testimonial carousel |
| 6 | **Comparison** | Competitive differentiation | "Why Signet?" tabbed comparison chart with counter animations |
| 7 | **Pricing** | Conversion | 3-tier glass cards, violet accent for recommended plan |
| 8 | **Final CTA** | Conversion push | "Ready to transmute your career?" — coral gradient background, centered CTA |
| 9 | **Footer** | Navigation & legal | Minimal, dark, organized links |

**Hero Section Detail:**
- Background: Deep black with coral radial gradient from right edge (40% opacity).
- Centerpiece: Abstract 3D geometric form (a crystalline "signet" seal) that slowly rotates and pulses with violet glow.
- Headline: DM Sans Bold, 64px, uppercase, `text-glow` effect.
- Subheadline: Inter Regular, 20px, `text-foreground/80`, max-width 560px.
- CTA: "Start Your Forge" — Primary CTA button with `glow-accent`.
- Secondary link: "View Templates" — Ghost variant with arrow icon.

### 7.2 Editor Page (Forge) — The Alchemist's Workbench

The editor is Signet's product core. The redesign preserves the split-pane efficiency while elevating the atmosphere.

**Layout:**
- **Header Bar:** Glass panel, fixed. Logo left, breadcrumb ("Forge / Data Slate #3") center-left in Geist Mono, sync status center, export buttons + profile dropdown right.
- **Left Panel:** Input arrays with new section styling. Width: 45% (slightly wider than current for readability).
- **Right Panel:** Live resume preview with enhanced "workbench" framing. Width: 55%.
- **Floating Dock:** Bottom-center, glass pill. Contains: Preview toggle, Save Draft, Export PDF (coral accent when ready).

**Atmospheric Enhancements:**
- Subtle floating square particles in the left panel background (very low opacity, CSS animation).
- When AI Reforge is processing, a violet **scanline** sweeps across the left panel.
- On successful export, a **coral radial pulse** expands from the Export button across the screen, then fades.
- The resume preview is framed by a subtle **violet neon border** that pulses gently when unsaved changes exist.

### 7.3 Dashboard (Command Deck) — The Observatory

**Layout:**
- Sidebar: Glass panel, fixed left. Navigation icons + labels. Active state: `bg-primary/10` with left-border `border-l-2 border-primary`.
- Main Area: Grid of stat cards, recent slates, job tracker summary.
- Background: Subtle grid pattern at 5% opacity + occasional violet gradient orbs behind stat cards.

**Stat Cards:**
- Large numbers in DM Sans Bold, 48px, `text-foreground`.
- Labels in Geist Mono, 12px, uppercase, `text-muted-foreground`.
- Trend indicators in `text-primary` (up) or `text-accent` (down).
- Background: Glass panel with gradient orb behind the number.

**Fix:** All hardcoded `bg-zinc-950`, `bg-cyan-500/10`, `text-cyan-400` must be replaced with semantic tokens.

### 7.4 Onboarding — The Ritual of Initiation

The 4-step onboarding is preserved but visually elevated to feel like an **initiation ritual** rather than a form-filling exercise.

- **Step 0 (Identity Verification):** Dark screen with animated progress bar scan. Session token displayed in Geist Mono with `text-primary`.
- **Step 1 (Specialization):** 4 large cards (Engineering, Customer Success, Leadership, Marketing) with hover glow and icon. Selection triggers a brief violet pulse.
- **Step 2 (Target Intelligence):** Company analysis panel with glassmorphism cards for detected company data.
- **Step 3 (Professional Profile):** Form with floating labels, subtle glow on focus.
- **Step 4 (Forge Commitment):** Typewriter effect for the creed text, culminating in a coral "I Commit" button with dramatic `glow-accent`.

---

## 8. Motion & Interaction Design

### 8.1 Animation Inventory

| Effect | Location | Specification | Purpose |
|:---|:---|:---|:---|
| **Glow Pulse** | Hero centerpiece, AI status | 4s ease-in-out infinite, scale 1.0→1.02, glow opacity 0.3→0.5 | Living energy |
| **Floating Particles** | Background (hero, editor) | CSS animation, 20s linear infinite, translateY(-20px), opacity 0.05→0.1 | Atmospheric depth |
| **3D Rotation** | Hero centerpiece | Mouse-driven parallax (±5deg), CSS transform on :hover for mobile | Engagement |
| **Scroll Reveal** | All sections | Framer Motion `whileInView`, opacity 0→1, translateY(30px→0), duration 0.6s, ease `[0.4, 0, 0.2, 1]` | Narrative pacing |
| **Staggered Children** | Card grids, feature lists | `staggerChildren: 0.1`, same reveal animation | Visual rhythm |
| **Gradient Shift** | Background | 15s ease infinite, background-position shift | Subtle life |
| **Counter Animation** | Stats, comparison chart | Count up from 0 when in viewport, 1.5s duration | Delight + credibility |
| **Forge Pulse** | Export/CTA buttons | On click: radial gradient expands from center, 0.6s, then fade | Reward feedback |
| **Tab Crossfade** | Comparison chart | Opacity crossfade 0.3s, height auto-adjust | Smooth context switch |
| **Carousel** | Testimonials | Touch/swipe enabled, dot indicators, auto-advance 6s | Social proof flow |
| **Scanline** | Editor (AI processing) | Horizontal line sweep, 2s, violet, opacity 0.3 | System status |
| **Marquee** | Logo sections | Infinite horizontal scroll, 30s linear, pause on hover | Social proof |

### 8.2 Interaction Patterns

**Hover States:**
- Cards: `translateY(-4px)`, border brightens, internal glow orb intensifies.
- Buttons: Scale 1.03, glow increases, brightness 1.1.
- Links: Color transition to `text-primary`, underline slides in from left.
- Icons: Container background brightens, icon color shifts to `text-primary`.

**Focus States:**
- All interactive elements: `ring-2 ring-primary ring-offset-2 ring-offset-background`.
- Inputs: `border-primary` + subtle `glow-primary`.

**Active/Pressed:**
- Buttons: Scale 0.97, shadow reduces, brightness 0.95.
- Cards: Brief `glow-accent` flash.

**Loading States:**
- Skeleton screens: `bg-muted` with shimmer gradient animation (left to right, 1.5s).
- Spinners: Custom spinner using `border-primary` with rotating gradient.

### 8.3 Accessibility: Reduced Motion

**Critical Addition:** Implement `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .floating-particles { display: none; }
  .gradient-shift { animation: none; }
  .glow-pulse { animation: none; }
}
```

Framer Motion should also respect this via a custom hook that detects the preference and disables animations.

---

## 9. Resume Template System 2.0

### 9.1 Template Visual Update

The six templates are preserved but their digital preview styling is updated to match the new brand palette:

| Template | Primary Accent | Character | Update |
|:---|:---|:---|:---|
| **Heavy Infantry (Classic)** | Navy | Professional, authoritative | Unchanged—serves traditional industries |
| **Datacore (Technical)** | Slate | Modern, precise | Subtle violet highlights in digital preview |
| **Ghost (Minimal)** | Gray | Clean, invisible | Unchanged—minimalism is timeless |
| **Vanguard (Modern)** | Slate-600 | PM/Consulting, balanced | Slightly warmer gray for humanistic feel |
| **Imperial (Executive)** | Slate-900 | C-Suite, commanding | Deeper blacks, more whitespace |
| **Rebel (Creative)** | **Violet** | Creative, bold | **Major update:** Now uses brand violet instead of teal, creating app-to-resume cohesion |

### 9.2 PDF Export Pipeline

The existing pipeline is technically sound. Required updates:

1. **Color Override:** Ensure `html2canvas` override block in `index.css` maps the new violet/coral accents to appropriate hex values for canvas rendering.
2. **Print Styles:** Update `@media print` fallback block to include new accent colors in `rgb()` format.
3. **Template Accents:** Verify that `var(--accent-creative)` now resolves to the violet OKLCH value and has a proper hex fallback in the print pipeline.

---

## 10. Dual-Mode Vocabulary Evolution

The Mandalorian/Civilian dual-mode system is a **unique brand differentiator** and must be preserved. However, the visual treatment of each mode should diverge more dramatically in 2.0.

### 10.1 Mode Visual Identity

| Aspect | Alchemist's Tongue (Mandalorian) | Craftsman's Voice (Civilian) |
|:---|:---|:---|
| **Language** | "Command Deck," "Data Slates," "Target Matrix," "Forge Commitment" | "Dashboard," "My Resumes," "Job Tracker," "Get Started" |
| **Visual Density** | Higher. More telemetry, more mono labels, more grid lines. | Cleaner. Simplified labels, conventional terminology. |
| **Glow Intensity** | Stronger. More dramatic violet and coral glows. | Subdued. Softer shadows, conventional borders. |
| **Animation** | More pronounced. Faster marquee, more particles. | Restrained. Standard transitions, no floating particles. |
| **Iconography** | Angular, sharp. Alchemical symbols where possible. | Rounded, friendly. Standard UI icons. |
| **Typography** | More mono usage. Uppercase labels. | More sans usage. Sentence case labels. |

### 10.2 Implementation

The `useUiModeStore` is preserved. The visual divergence is achieved by:
- Appending a data attribute to `<html>`: `data-ui-mode="alchemist"` or `data-ui-mode="craftsman"`.
- CSS selectors that target these attributes for style variations:
  ```css
  [data-ui-mode="alchemist"] .dashboard-label {
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  [data-ui-mode="craftsman"] .dashboard-label {
    font-family: var(--font-sans);
    text-transform: none;
    letter-spacing: 0;
  }
  ```

---

## 11. Technical Implementation Roadmap

### Phase 1: Foundation — The Canvas (Week 1)

**Goal:** Establish the new color system, fix critical bugs, and set the atmospheric baseline.

| Task | File(s) | Details |
|:---|:---|:---|
| **1.1** Remove Ubuntu conflict | `index.css` | Delete `* { font-family: Ubuntu... }`. Ensure `html { @apply font-sans; }` is sole baseline. Remove Ubuntu import if unused. |
| **1.2** Redesign OKLCH tokens | `index.css` | Replace entire `:root` semantic token block with new violet/coral values (Section 3.1). Maintain all resume tokens. |
| **1.3** Add gradient/glow tokens | `index.css` | Add `--gradient-*` and `--shadow-glow-*` custom properties. |
| **1.4** Add reduced motion | `index.css` | Implement `prefers-reduced-motion` block (Section 8.3). |
| **1.5** Fix container queries | `index.css` | Consolidate overlapping `@media (min-width: 768px)` blocks (L206-L214). |
| **1.6** Update shadow tokens | `index.css` | Replace `hsl(0 0% 0% / ...)` with `oklch(0 0 0 / ...)` for consistency. |
| **1.7** Update radius consistency | `index.css`, `tailwind.config.js` | Align `--radius-sm` calculation between `@theme inline` and ESLint shim. |
| **1.8** Add print fallbacks | `index.css` | Update `@media print` block to include new accent colors in `rgb()`. |
| **1.9** Fix html2canvas override | `index.css` | Update `#resume-preview-content` override to map new accents to hex. |
| **1.10** Update chart colors | `index.css` | Replace chart-1 through chart-5 with new cool-spectrum values. |

### Phase 2: Components — The Instruments (Week 2)

**Goal:** Redesign all base components to match the new visual language.

| Task | File(s) | Details |
|:---|:---|:---|
| **2.1** Redesign Button | `components/ui/button.tsx` | Update CVA variants: new gradient for primary, glass treatment for secondary, ghost styling. Add `glow` prop for CTA variant. |
| **2.2** Redesign Card | `components/ui/card.tsx` | Apply glassmorphism base. Add `glow-primary` and `glow-accent` variant props. |
| **2.3** Redesign Input | `components/ui/input.tsx` | Glass background, primary focus ring, subtle glow on focus. |
| **2.4** Redesign Badge | `components/ui/badge.tsx` | Update color mappings to new semantic tokens. |
| **2.5** Redesign Navigation | `components/header.tsx`, `components/sidebar.tsx` | Glassmorphism header, fixed position, scroll-aware background. Migrate all hardcoded zinc/cyan to semantic tokens. |
| **2.6** Redesign Tabs | `components/ui/tabs.tsx` | Active tab: `text-primary` with bottom border. Inactive: `text-muted-foreground`. Smooth crossfade for content. |
| **2.7** Create Glass utilities | `index.css` | Add `.glass-panel`, `.glass-panel-hover`, `.glow-primary`, `.glow-accent`, `.text-glow` utility classes. |
| **2.8** Update Logo | `components/ui/logo.tsx` | Redesign SVG to use violet spark motif instead of current mark. Preserve animation logic. Delete duplicate `components/logo.tsx`. |
| **2.9** Fix NeonGradientCard | `PricingSection.tsx` | Replace `hsl(var(--primary))` with direct `var(--primary)` or proper OKLCH handling. |
| **2.10** Update Favicon | `index.html` | Replace `/vite.svg` with new Signet-branded icon. |

### Phase 3: Pages — The Experience (Weeks 3–4)

**Goal:** Implement the new page-level architecture and atmospheric effects.

| Task | File(s) | Details |
|:---|:---|:---|
| **3.1** Landing Hero redesign | `hero-demo.tsx` | New headline treatment, 3D centerpiece (or CSS approximation), coral gradient background, CTA with glow. |
| **3.2** Landing sections | `FeatureCards.tsx`, `BentoSection.tsx`, `TestimonialsSection.tsx`, `PricingSection.tsx` | Apply glassmorphism cards, scroll reveal animations, new color accents. |
| **3.3** Editor atmosphere | `EditorPage.tsx`, editor components | Add floating particles (CSS), scanline effect for AI processing, forge pulse on export, violet border for unsaved changes. |
| **3.4** Dashboard redesign | `dashboard-layout.tsx`, `sidebar.tsx`, dashboard pages | Migrate all hardcoded colors to tokens. Add stat card glow orbs. Implement mode-specific visual density. |
| **3.5** Onboarding polish | `OnboardingPage.tsx` | Enhanced step transitions, ritualistic styling for Step 4, improved progress animation. |
| **3.6** Footer fix | `footer.tsx` | Change `<h1>` to `<h2>`. Make links functional `<a>` tags with proper routing. |
| **3.7** Meta tags | `index.html` | Add `<meta name="description">`, OpenGraph tags, Twitter Card tags, canonical URL. |
| **3.8** Heading audit | All pages | Ensure exactly one `<h1>` per page. Fix hierarchy violations. |

### Phase 4: Motion & Polish (Week 5)

**Goal:** Add the animation layer that brings the design to life.

| Task | File(s) | Details |
|:---|:---|:---|
| **4.1** Scroll reveal system | Global | Implement Framer Motion `whileInView` wrappers for all major sections. |
| **4.2** Hero animations | `hero-demo.tsx` | Glow pulse on centerpiece, gradient shift background, text reveal stagger. |
| **4.3** Particle system | `index.css` or Canvas | CSS-based floating squares (performance-safe). Optional: lightweight Canvas for denser effect. |
| **4.4** Interaction micro-animations | `button.tsx`, `card.tsx` | Hover lifts, glow intensification, ripple effects. |
| **4.5** Forge pulse effect | `EditorPage.tsx` | Coral radial expansion on export success. |
| **4.6** Marquee sections | `MarqueeSection.tsx` | Infinite scroll with pause-on-hover. |
| **4.7** Counter animations | Stats components | `useCountUp` hook with intersection observer trigger. |
| **4.8** Mode transition | `theme-provider.tsx` or `useUiModeStore` | Smooth crossfade between Alchemist and Craftsman visual modes. |

### Phase 5: Resume Templates & QA (Week 6)

**Goal:** Ensure the resume output matches the new brand and all edge cases are handled.

| Task | File(s) | Details |
|:---|:---|:---|
| **5.1** Update creative template | Template components | Change accent from teal to violet. Update preview styling. |
| **5.2** PDF pipeline test | `convert-css-colors.js`, export flow | Verify all OKLCH values properly fallback to hex for html2canvas. Test print styles. |
| **5.3** Accessibility audit | Global | Run axe-core. Verify 4.5:1 contrast ratios. Test keyboard navigation. Verify screen reader compatibility. |
| **5.4** Performance audit | Global | Lighthouse score target: 90+ on all metrics. Verify animation frame rates. Check bundle size impact. |
| **5.5** Cross-browser test | Global | Verify OKLCH rendering in Safari, Firefox, Chrome, Edge. Test glassmorphism fallback. |
| **5.6** Responsive audit | Global | Mobile: hamburger nav, stacked cards, scaled typography. Tablet: adjusted grid. |

---

## 12. Migration Checklist: Addressing All Audit Issues

| # | Issue | Severity | Resolution in 2.0 |
|:---|:---|:---|:---|
| 1 | **Font Stack Conflict** — Ubuntu vs Inter | 🔴 Critical | Remove Ubuntu from `*` selector. Sole baseline: Inter via `html { @apply font-sans; }`. |
| 2 | **No Functional Light Theme** | 🔴 Critical | **Decision:** Commit to dark-only for application UI. Remove light toggle from `ThemeProvider` and disable "D" keyboard shortcut. Resume preview has its own light-mode logic for print. Document this decision. |
| 3 | **Dashboard Hardcodes Zinc** | 🟡 Moderate | Migrate `dashboard-layout.tsx` to `bg-background`, `border-border`, `text-foreground`. |
| 4 | **Sidebar Hardcodes Cyan** | 🟡 Moderate | Migrate `sidebar.tsx` to `bg-primary/10`, `text-primary`. |
| 5 | **NeonGradientCard Uses HSL** | 🟡 Moderate | Fix `PricingSection.tsx:L198` to use `var(--primary)` directly or proper OKLCH string. |
| 6 | **Multiple `<h1>` Tags** | 🟡 Moderate | Change footer `<h1>` to `<h2>`. Audit all pages for single H1. |
| 7 | **Missing Meta Description & OG** | 🟡 Moderate | Add comprehensive meta tags to `index.html`. |
| 8 | **Footer Links Non-Functional** | 🟢 Minor | Convert `<div>` links to `<a>` or `<Link>` with proper routes. |
| 9 | **Container Overlapping Media Queries** | 🟢 Minor | Consolidate `index.css` media queries. |
| 10 | **Inconsistent Shadow System** | 🟢 Minor | Replace HSL black shadows with `oklch(0 0 0 / ...)`. |
| 11 | **Unused CSS Variables** | 🟢 Minor | Audit `--resume-*` tokens. Either consume them in templates or document as reserved for future template expansion. |
| 12 | **Missing `prefers-reduced-motion`** | 🟢 Minor | Implemented in Phase 1.4. |
| 13 | **Favicon Uses Vite Default** | 🟢 Minor | Replace with branded Signet icon. |
| 14 | **Duplicate Logo Files** | 🟢 Minor | Delete `src/components/logo.tsx`, keep `src/components/ui/logo.tsx`. |
| 15 | **"use client" in Vite SPA** | 🟢 Minor | Remove all "use client" directives. They are Next.js artifacts. |
| 16 | **Border Radius Inconsistency** | 🟢 Minor | Align `--radius-sm` between `index.css` and `tailwind.config.js`. |

---

## 13. Success Metrics

How do we know the redesign succeeded?

| Metric | Baseline | Target | Measurement |
|:---|:---|:---|:---|
| **Landing Page Conversion** | Current rate | +25% | "Start Forge" CTA clicks / unique visitors |
| **Editor Engagement** | Current session time | +20% | Average time spent in `/forge/:slateId` |
| **Export Completion** | Current rate | +15% | PDF exports / sessions started |
| **Accessibility Score** | Unknown | 100% | axe-core violations (0 critical, 0 serious) |
| **Performance (Lighthouse)** | Current | 90+ | Mobile performance score |
| **Perceived Quality** | N/A | 4.5/5 | User survey: "How premium does Signet feel?" |
| **Brand Recall** | N/A | 70%+ | Unprompted: "What color do you associate with Signet?" (Violet) |

---

## 14. Conclusion: The Alchemist's Promise

Signet 2.0 is not a departure—it is a **transmutation**. We keep the forge, the fire, and the transformation. We keep the dual-vocabulary, the technical precision, the OKLCH sophistication, and the print-safe pipeline. But we elevate the vessel.

The green tactical HUD becomes a **violet observatory**—a place of wisdom and creation. The harsh cyan alerts become **coral sparks**—warm, energetic, alive. The cramped cockpit becomes a **vast atelier**—breathable, premium, focused.

By adopting the Codable design philosophy of **clarity through constraint**, we limit our palette to four anchors, maximize our typographic impact, use motion as momentum, and always prioritize the user's understanding of their value proposition: *that their career is worth forging, and Signet is the forge that never fails.*

> *"From raw ore to polished seal. From potential to proof. This is Signet 2.0 — The Alchemist's Forge."*

---

*Document generated by Design Audit System — June 4, 2026*
*Inspiration: Codable SaaS Redesign by DTAIL Studio (Behance Gallery #245252771)*
*Architecture: Signet Internal Design System Audit (June 4, 2026)*
