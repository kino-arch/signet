SIGNET NORDIC DESIGN SYSTEM — "FJORD"
======================================

PHILOSOPHY
----------
Nordic design is not a visual style. It is a functional philosophy:
  - Simplicity over complexity
  - Functionality over decoration
  - Accessibility over novelty
  - Human warmth over machine coldness

For Signet, this means:
  - Job seekers need clarity, not spectacle
  - ATS optimization is serious; the UI must feel trustworthy
  - Light mode reduces eye strain during daytime job hunting
  - Standard inputs work with screen readers, mobile keyboards, and autofill

COLOR PALETTE (60-30-10)
--------------------------
  60% Dominant:  #FAFAFA (Zinc-50) — Backgrounds, empty space
  30% Secondary:  #FFFFFF (White) — Surfaces, cards, inputs
                  #18181B (Zinc-900) — Primary text
                  #52525B (Zinc-500) — Secondary text
                  #A1A1AA (Zinc-400) — Tertiary text, placeholders
                  #E4E4E7 (Zinc-200) — Borders
  10% Accent:     #2563EB (Blue-600) — CTAs, links, focus rings
                  #1D4ED8 (Blue-700) — CTA hover
                  #EFF6FF (Blue-50) — Soft accent backgrounds

TYPOGRAPHY
----------
  Primary: Inter or Geist (both in package.json)
  Headings: Bold (700), tight tracking, high contrast
  Body: Regular (400), line-height 1.6, relaxed reading
  Labels: Small (12px), uppercase, wide tracking, muted

SPACING
-------
  Generous. Nordic design breathes.
  Section padding: 40px minimum
  Card padding: 24px
  Input padding: 10px 12px
  Gap between elements: 16px standard, 24px for sections

CORNERS
-------
  NOT brutalist 0px. NOT sci-fi 24px pills.
  Inputs: rounded-lg (8px)
  Cards: rounded-xl (12px)
  Buttons: rounded-lg (8px)
  Tags: rounded-md (6px)
  Avatars: rounded-md (6px) — square, not circular

SHADOWS
-------
  No neon glows. No glassmorphism.
  sm: 0 1px 2px rgba(0,0,0,0.04)
  md: 0 4px 6px rgba(0,0,0,0.06)
  lg: 0 10px 15px rgba(0,0,0,0.06)
  xl: 0 20px 25px rgba(0,0,0,0.06)

FILES INCLUDED
--------------
src/styles/index.css              — Complete Nordic CSS with purge rules
src/layout/NordicNav.tsx          — Light, scroll-aware navigation
src/components/nordic/SignetMark.tsx — Logo updated for light mode
src/components/nordic/NordicInput.tsx — Standard accessible input
src/components/nordic/NordicTextarea.tsx — Standard accessible textarea
src/components/nordic/AIAssistButton.tsx — Friendly AI helper
src/components/nordic/NordicHero.tsx — Light hero section
src/pages/NordicEditorPage.tsx    — Full editor with Nordic styling
src/stories/*.stories.tsx         — Storybook stories

MIGRATION CHECKLIST
-------------------
[ ] Replace src/index.css with the Nordic version
[ ] Update all page wrappers to use bg-nordic-bg
[ ] Replace dark nav with NordicNav
[ ] Replace sci-fi inputs with NordicInput/NordicTextarea
[ ] Update all buttons to nordic-btn-* classes
[ ] Update all cards to nordic-card or nordic-card-flat
[ ] Replace cyan accents with blue-600
[ ] Remove all rounded-full (except actual circles like status dots)
[ ] Verify no glass-panel, glow-*, holographic-* classes remain
[ ] Run pnpm storybook and verify light mode renders
[ ] Run pnpm chromatic and re-approve all baselines

VERIFICATION
------------
  pnpm typecheck    — No type errors from summary field
  pnpm build        — Bundle succeeds
  pnpm storybook    — All stories render in light mode
  pnpm chromatic    — Visual regression baselines updated

SCI-FI PURGE COMMAND
--------------------
  grep -r "slate-950\|cyan-400\|glass\|glow\|holographic\|neon\|backdrop-blur-xl" src/ --include="*.tsx" --include="*.css"
  # Should return zero results after migration
