# Disguise Spec: pricing-03 → Signet Pricing

## Spatial Adaptation
| Element | Ali Imam Default | Signet Override | Token/Value |
|---------|-----------------|-----------------|-------------|
| Root | `<section>` | `<SignetSection variant="feature">` | `py-24` |
| Content well | `max-w-7xl mx-auto` | `<SignetWell size="default">` | `max-w-5xl` |
| Grid | `grid-cols-1 md:grid-cols-3` | `grid-cols-1 md:grid-cols-3 gap-8` | Breathing room |

## Color Adaptation & The Elevated Pro Tier
| Element | Starter | Pro (Recommended) | Premium |
|---------|---------|-------------------|---------|
| Background | `bg-signet-surface-elevated` | `bg-signet-surface-elevated` | `bg-signet-surface-elevated` |
| Border | `border-signet-border-subtle` | `border-2 border-signet-amber-500` | `border-signet-border-subtle` |
| Shadow | `shadow-signet-card` | `shadow-signet-cta shadow-signet-amber-500/20` | `shadow-signet-card` |
| Badge | None | `Most Popular` (Amber Badge) | None |
| CTA Style | Secondary (`bg-secondary`) | Primary (`bg-signet-amber-500`) | Secondary (`bg-secondary`) |

## Typography Adaptation
| Element | Ali Imam Default | Signet Override | Token |
|---------|-----------------|-----------------|-------|
| Section Headline | `text-3xl` | `text-4xl` | `2.25rem` |
| Section Headline weight | `font-bold` | `font-extrabold` | `800` |
| Plan Name | `text-xl` | `text-xl font-bold` | `1.25rem / 700` |
| Plan Price | `text-4xl` | `text-5xl font-black` | `3rem / 900` |
| Features List | `text-sm text-gray-500` | `text-sm text-muted-foreground` | `0.875rem` |

## Motion Adaptation
| Element | Ali Imam Default | Signet Override | Rationale |
|---------|-----------------|-----------------|-----------|
| Entrance | Staggered fade-up | Staggered fade-up (0.1s delay each) | Standard |
| Card Hover | `scale-105` | `scale-102 transition-transform` | Subtle lift |

## Acceptance Criteria
- [ ] Squint test: Pro tier card stands out as the primary visual focus
- [ ] Color Guard: 0 violations
- [ ] Component Census: 0 spatial violations
- [ ] Chromatic: Approved by Design Lead
- [ ] Token Diff: No regression
