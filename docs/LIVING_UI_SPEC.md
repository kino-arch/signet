# Living UI Specification

## Night-City Visual System v0.1

A cyber-urban design system for Signet v2, derived from the night-city moodboard aesthetic: wet asphalt, neon glow, screen reflection, and digital intimacy.

---

## Design Principles

1. **Never Static** — Elements breathe, pulse, and react. The UI is alive.
2. **Light as Material** — Neon glow is not decoration; it is the primary visual language.
3. **Depth Through Glass** — Glassmorphism creates spatial hierarchy without heavy shadows.
4. **Performance First** — Every animation is GPU-composited. 60fps is non-negotiable.
5. **Accessibility by Default** — Reduced motion, reduced transparency, and WCAG AA contrast are built in, not bolted on.

---

## Color System

### Asphalt Foundation

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-asphalt-base` | `#0a0c0f` | True OLED black, body background |
| `--color-asphalt-surface` | `#13161b` | Primary panels, cards |
| `--color-asphalt-elevated` | `#1a1e24` | Hover states, secondary surfaces |
| `--color-asphalt-overlay` | `#232830` | Borders, dividers, subtle separators |
| `--color-asphalt-border` | `#2a2f38` | Active borders, focus indicators |

### Neon Accents (Graded for Accessibility)

**Cyan (Primary)**
| Grade | Hex | Contrast on `#0a0c0f` | Usage |
|-------|-----|----------------------|-------|
| 400 | `#4df0ff` | 13.2:1 | Text, high-contrast UI |
| 500 | `#00e5ff` | 11.8:1 | Interactive elements, default state |
| 600 | `#00b8cc` | 8.4:1 | Subtle glow, decorative backgrounds |

**Purple (Secondary)**
| Grade | Hex | Usage |
|-------|-----|-------|
| 400 | `#d68aff` | Text, creative states |
| 500 | `#c084fc` | Interactive, secondary actions |
| 600 | `#9e5cf5` | Subtle backgrounds |

**Amber (Warning/Attention)**
| Grade | Hex | Usage |
|-------|-----|-------|
| 400 | `#ffd166` | Warning text, high-attention CTAs |
| 500 | `#ffb703` | Default warning state |
| 600 | `#fb8500` | Destructive hover |

---

## Glassmorphism System

### Intensity Levels

| Level | Blur | Use Case |
|-------|------|----------|
| Low | 8px | Inline cards, tags, small surfaces |
| Medium | 16px | Default cards, primary content areas |
| High | 24px | Modals, drawers, elevated panels |
| Solid | 0px | Reduced transparency fallback |

### Performance Constraints

- `contain: layout style paint` on all glass surfaces
- `will-change` applied only on hover (never statically)
- Backdrop-filter limited to viewport-visible elements via IntersectionObserver
- Pre-blurred static backgrounds for base layers where possible

---

## Animation Physics

### Easing Curves

| Name | Curve | Usage |
|------|-------|-------|
| Out Expo | `cubic-bezier(0.16, 1, 0.3, 1)` | Primary interactions, hover, click |
| In Expo | `cubic-bezier(0.7, 0, 0.84, 0)` | Exit animations |
| In-Out Sine | `cubic-bezier(0.37, 0, 0.63, 1)` | Ambient breathing, loops |
| Spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful bounces (rare) |
| Smooth | `cubic-bezier(0.4, 0, 0.2, 1)` | Page transitions |

### Duration Scale

| Token | Value | Context |
|-------|-------|---------|
| `--duration-instant` | 80ms | Micro-interactions, active states |
| `--duration-fast` | 150ms | Hover states, toggles |
| `--duration-normal` | 250ms | Transitions, entrances |
| `--duration-slow` | 400ms | Page transitions, complex reveals |
| `--duration-ambient` | 3000ms | Breathing, idle glow |
| `--duration-breath` | 4000ms | Slow ambient pulse |

---

## Component Architecture

### Primitive Hierarchy

```
primitives/
├── GlassSurface.tsx    # Raw backdrop-filter container + cursor glow
├── GlowRing.tsx        # Reusable cursor-tracking glow layer
└── NeonText.tsx        # Text with neon gradient/shadow

components/
├── GlassCard.tsx       # GlassSurface + padding + hover lift
├── NeonButton.tsx      # GlassSurface + states + pulse animation
└── GlassPanel.tsx      # Layout surface (sidebar, modal, drawer)

hooks/
└── useCursorGlow.ts    # Shared cursor tracking logic
```

### Composition Rules

1. **Primitives are unopinionated** — No padding, no margin, no typography.
2. **Components compose primitives** — GlassCard wraps GlassSurface; it does not reimplement blur.
3. **Hooks are shared** — useCursorGlow is used by GlassSurface, not duplicated in each component.
4. **CSS variables drive theming** — All colors, spacing, and animation values are tokens.

---

## Cursor Glow Engine

### Implementation

- **Tracking:** `mousemove` event → `requestAnimationFrame` throttling
- **Position:** Calculated as percentage (0-100) within element bounds
- **Application:** CSS custom properties `--glow-x`, `--glow-y` updated via React state
- **Rendering:** Pseudo-element with `radial-gradient` translated via `transform` (GPU-composited)
- **Never:** `background-position` updates (triggers paint recalculation)

### Performance

- RAF throttling ensures max 60 updates/second
- `transform` only — no layout or paint triggers
- `pointer-events: none` on glow layer prevents hit-test overhead
- Glow disabled on touch devices (`hover: none` media query)

---

## Accessibility

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Reduced Transparency

```css
@media (prefers-reduced-transparency: reduce) {
  .glass-surface {
    backdrop-filter: none;
    background: var(--color-asphalt-elevated);
  }
}
```

### Contrast Requirements

- All text on asphalt backgrounds: minimum 4.5:1 (WCAG AA)
- Neon text (400 grade): 13.2:1 — exceeds AAA
- Interactive elements: 3:1 minimum for non-text (WCAG 2.1)

### Focus Management

- All interactive elements have visible `:focus-visible` ring
- Ring color: `var(--color-neon-cyan-400)`
- Ring offset: 2px
- Never remove focus indicators without replacement

---

## Typography

### Font Stack

| Role | Font | Fallback |
|------|------|----------|
| UI/Body | Inter | SF Pro Display, system-ui |
| Technical/Mono | JetBrains Mono | Fira Code, SF Mono |

### Scale

| Token | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| `--text-xs` | 0.75rem | 1.5 | normal | Captions, badges |
| `--text-sm` | 0.875rem | 1.5 | normal | Secondary text |
| `--text-base` | 1rem | 1.6 | normal | Body text |
| `--text-lg` | 1.125rem | 1.6 | normal | Lead paragraphs |
| `--text-xl` | 1.25rem | 1.4 | -0.01em | H6, small headings |
| `--text-2xl` | 1.5rem | 1.3 | -0.015em | H5 |
| `--text-3xl` | 2rem | 1.25 | -0.02em | H4 |
| `--text-4xl` | 2.5rem | 1.2 | -0.025em | H3 |
| `--text-5xl` | 3.5rem | 1.15 | -0.03em | H1, hero |

---

## Spacing

Base unit: 4px (0.25rem)

| Token | Value | Common Usage |
|-------|-------|--------------|
| `--space-1` | 0.25rem | Tight internal padding |
| `--space-2` | 0.5rem | Icon gaps, small margins |
| `--space-3` | 0.75rem | Compact card padding |
| `--space-4` | 1rem | Standard internal padding |
| `--space-5` | 1.25rem | Card padding |
| `--space-6` | 1.5rem | Section gaps |
| `--space-8` | 2rem | Large section gaps |
| `--space-10` | 2.5rem | Page padding |
| `--space-12` | 3rem | Major section breaks |
| `--space-16` | 4rem | Hero spacing |
| `--space-20` | 5rem | Page-level margins |
| `--space-24` | 6rem | Maximum spacing |

---

## Elevation

| Token | Shadow | Usage |
|-------|--------|-------|
| `--elevation-1` | 0 1px 2px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.15) | Cards at rest |
| `--elevation-2` | 0 4px 6px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.15) | Hover lift |
| `--elevation-3` | 0 10px 15px rgba(0,0,0,0.3), 0 4px 6px rgba(0,0,0,0.15) | Modals, drawers |
| `--elevation-glow` | var(--glow-cyan-sm) | Active neon surfaces |

---

## Verification Checklist

### Performance
- [ ] Lighthouse Performance score > 90
- [ ] 60fps during scroll with 10+ GlassCards visible
- [ ] 60fps during cursor movement across glass surfaces
- [ ] No layout thrashing in React DevTools Profiler

### Accessibility
- [ ] axe DevTools: 0 contrast violations
- [ ] axe DevTools: 0 focus management issues
- [ ] Reduced motion: all animations disabled
- [ ] Reduced transparency: all blur removed, solid backgrounds

### Visual
- [ ] OLED black (`#0a0c0f`) appears true black on iPhone 14 Pro / Pixel 6
- [ ] Neon glow does not bleed into adjacent elements
- [ ] Glass cards have visible depth against asphalt background
- [ ] Typography is readable at all sizes without eye strain

### Responsive
- [ ] Touch devices: no stuck hover states
- [ ] Touch devices: touch targets > 44px
- [ ] Mobile: glassmorphism does not overwhelm small screens
- [ ] Tablet: 2-column grid for cards
- [ ] Desktop: 3-4 column grid for cards

---

## Migration Path

### Phase 1: Foundation (Current)
- [x] Design tokens (colors, spacing, typography)
- [x] Animation system (keyframes, easing, durations)
- [x] GlassSurface primitive
- [x] GlassCard, NeonButton, GlassPanel components
- [x] useCursorGlow hook
- [x] Global styles (index.css)
- [x] Showcase route for verification

### Phase 2: Holographic Inputs (Next)
- [ ] Floating input layers with depth
- [ ] Gaze/cursor-reactive focus rings
- [ ] GlassSurface + GlowRing composition for form controls

### Phase 3: Quantum Slider (Stretch)
- [ ] Multi-state toggle with spring physics
- [ ] Neon trail animation on drag
- [ ] Glassmorphism thumb with glow

### Phase 4: System Integration
- [ ] Replace all existing EditorPage panels with GlassCard
- [ ] Migrate all buttons to NeonButton
- [ ] Audit remaining components for Living UI compliance

---

## Changelog

### v0.1.0 (2026-06-05)
- Initial release
- Complete token system
- GlassSurface primitive with cursor glow
- GlassCard, NeonButton, GlassPanel components
- Animation system with reduced-motion support
- Global asphalt theme with noise texture
- LivingUIShowcase verification route
