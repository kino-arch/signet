# The Signet Visual Language

This document serves as the absolute source of truth for the Signet Design System. It defines the constraints, rhythms, and aesthetic principles that separate a premium SaaS experience from a generic template. 

**These rules are enforced by CI. There are no exceptions without CTO approval.**

---

## 1. The Spatial System

We do not allow edge-to-edge content bleed. Content must be anchored, legible, and comfortably padded.

- **Content Well**: `max-w-7xl` (1280px). All root-level layouts must be contained within `SignetWell`.
- **Narrow Well**: `max-w-3xl` (768px). Use for focused content like settings forms or auth screens.
- **Section Padding**: `py-24` (96px) vertical, `px-6` (24px) minimum horizontal. All logical page sections must be wrapped in `SignetSection`.
- **Card Padding**: `p-8` (32px) internal.
- **Grid Gap**: `gap-6` (24px) standard, `gap-8` (32px) for featured or loose sections.

---

## 2. Atmospheric Depth

We do not use flat black (`bg-black`) as a background unless it is the absolute base layer. Premium SaaS uses atmospheric depth to create hierarchy and focus.

- **Background**: Use a subtle radial gradient for hero/feature sections:
  `bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-signet-navy-900 via-signet-navy-950 to-black`
- **Cards**: Not flat surfaces. Use subtle elevation:
  `bg-signet-surface-elevated border border-signet-border-subtle shadow-signet-card`
- **Glow Accents**: Cyan (`#00D9FF`) at 10% opacity for ambient lighting on hero sections to draw the eye.

---

## 3. Typography Hierarchy

Text must have a clear rhythm. If everything is bold, nothing is bold. 

- **Hero Headline**: `text-5xl` (48px), `font-extrabold` (800), `tracking-tight`, `text-white`. The headline is the hero.
- **Section Headline**: `text-3xl` (30px), `font-bold` (700), `tracking-tight`, `text-white`.
- **Body**: `text-base` (16px), `font-normal` (400), `leading-relaxed`, `text-signet-slate-400`.
- **Labels/Mono**: `text-xs` (12px), `font-medium` (500), `tracking-wider`, `uppercase`, `text-signet-slate-500`.

**CRITICAL RULE**: NEVER center-align more than 2 lines of text. Center-aligned text blocks cause "reading fatigue". Left-align body copy for readability.

---

## 4. Color Philosophy

Our color palette is deeply intentional. We do not use default Tailwind colors.

- **Primary Action (Urgency/Warmth)**: **Amber** (`#F59E0B`). Used for primary CTAs, warnings, and highlighting the highest-value actions.
- **Secondary Action (Tech/Trust)**: **Cyan** (`#00D9FF`). Used for links, icons, and ambient accents.
- **Surface**: Navy (`#0A0E27`) for elevated cards, Black (`#000000`) for the base layer.
- **Feedback**: Red (`text-signet-red-400`) for errors, Green (`text-signet-emerald-400`) for success.

**THE ANTI-RULE**: NO ORANGE (`#f97316`). Orange is explicitly banned. Do not use generic blue. Do not use raw hex codes (`#123456`). Use the semantic `signet-*` tokens exclusively.

---

## 5. Motion Philosophy

Motion should guide the eye, not distract it. 

- **Entrance Animations**: `fade-in` + `translate-y-4`, `duration-500`, `ease-out`. 
- **Hover States**: `scale-105` on cards, `brightness-110` on buttons, `duration-200`.
- **Loading States**: Subtle pulse on skeletons. No aggressive spinners.

**CRITICAL RULE**: NEVER use gratuitous animation. Every motion must serve a UX purpose (e.g., drawing attention to a state change, confirming an action).

---

## The "One-Pixel Rule" (The Squint Test)

Every layout must pass the "squint test". If you squint at the screen, you should still be able to clearly identify:
1. **The Primary Action** (It should be the brightest/most distinct element).
2. **The Headline** (Highest contrast text).
3. **The Content Well** (Clear spatial boundaries).

If these fail the squint test, the design is rejected.
