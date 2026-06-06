# Disguise Spec: hero-01 → Signet Hero

## Spatial Adaptation
| Element | Ali Imam Default | Signet Override | Token/Value |
|---------|-----------------|-----------------|-------------|
| Root | `<div className="py-20 px-4">` | `<SignetSection variant="hero">` | `py-24` |
| Content well | `max-w-4xl mx-auto` | `<SignetWell size="wide">` | `max-w-7xl` |
| Text container | `max-w-4xl` | `max-w-2xl` | Focused reading |
| CTA container | `gap-4` | `gap-6` | Breathing room |
| Logo placement | None | Above headline, centered | `mb-8` |

## Color Adaptation
| Element | Ali Imam Default | Signet Override | Token |
|---------|-----------------|-----------------|-------|
| Background | `bg-black` | `.bg-signet-hero-depth` | See index.css |
| Headline | `text-white` | `text-white` | No change |
| Subheadline | `text-gray-400` | `text-signet-slate-400` | `--color-signet-slate-400` |
| Primary CTA | `bg-white text-black` | `bg-signet-amber-500 text-signet-navy-950` | `--color-signet-amber-500` |
| Secondary CTA | `bg-transparent border-white` | `bg-signet-surface-elevated border-signet-border-subtle` | `--color-signet-surface-elevated` |

## Typography Adaptation
| Element | Ali Imam Default | Signet Override | Token |
|---------|-----------------|-----------------|-------|
| Headline size | `text-4xl` | `text-5xl` | `3rem` |
| Headline weight | `font-bold` | `font-extrabold` | `800` |
| Headline tracking | Default | `tracking-tight` | `-0.025em` |
| Subheadline size | `text-lg` | `text-lg` | `1.125rem` |
| Subheadline leading | Default | `leading-relaxed` | `1.625` |
| CTA primary | `text-base font-medium` | `text-lg font-bold` | `1.125rem / 700` |
| CTA secondary | `text-base font-medium` | `text-base font-medium` | `1rem / 500` |

## Motion Adaptation
| Element | Ali Imam Default | Signet Override | Rationale |
|---------|-----------------|-----------------|-----------|
| Entrance | Fade + slide-up 0.8s | Fade + translate-y-4 0.5s ease-out | Snappier |
| Logo pulse | None | `opacity: [0.8,1,0.8], scale: [1,1.02,1], 4s infinite` | "Living Forge" |
| Primary CTA hover | `scale-105` | `scale-105 brightness-110` | Strong feedback |
| Secondary CTA hover | `scale-105` | `scale-102` | Subtle feedback |

## The Forge Signature
- [ ] SignetLogo component placed above headline
- [ ] Logo has ambient pulse animation (4s, infinite, easeInOut)
- [ ] Logo color: `text-signet-cyan-400`
- [ ] Logo size: `w-12 h-12` (48px)

## CTA Dominance Specification
Primary CTA must achieve ≥2.0x visual weight:
- [ ] Padding: `px-8 py-4` vs secondary `px-6 py-3`
- [ ] Text: `text-lg font-bold` vs secondary `text-base font-medium`
- [ ] Fill vs outline: amber-500 solid vs transparent bordered
- [ ] Shadow: `shadow-signet-cta` on primary only
- [ ] Hover: `scale-105 brightness-110` vs `scale-102`

## Acceptance Criteria
- [ ] Squint test: Primary CTA is brightest element
- [ ] Squint test: Headline is highest contrast
- [ ] Squint test: Logo pulse is visible but not distracting
- [ ] Color Guard: 0 violations
- [ ] Component Census: 0 spatial violations
- [ ] Chromatic: Approved by Design Lead
- [ ] Token Diff: No regression
