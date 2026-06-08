SIGNET HERO & HEADER PACKAGE — DROP-IN FILES
==============================================

FILES INCLUDED:
---------------
src/components/branding/SignetMark.tsx        — The Seal logo SVG
src/hooks/useScrolled.ts                       — Passive scroll listener
src/layout/Header.tsx                          — Fixed, scroll-aware navbar
src/components/sections/hero/DatapadPreview.tsx — Interactive glassmorphic card
src/components/sections/hero/Hero.tsx          — Full hero with staggered animations
src/pages/LandingPage.tsx                      — Clean wrapper, no diagonal lines
src/stories/Hero.stories.tsx                   — Storybook story
src/stories/Header.stories.tsx                 — Storybook story

INSTALLATION:
-------------
1. Copy all files to matching paths in your project.
2. Ensure you have `cn` utility at `@/lib/utils` (or adjust imports).
3. Ensure React Router v7 is installed (already in your package.json).
4. Ensure Framer Motion is installed (already in your package.json).

TAILWIND CHECK:
---------------
Your CSS must include these colors for the components to render correctly:
  - bg-slate-950, bg-slate-900, bg-slate-800
  - text-cyan-400, text-violet-400, text-emerald-400
  - border-slate-800, border-slate-700

RESPONSIVE BEHAVIOR:
--------------------
- Mobile (375px):    Hero text stacks above Datapad. Datapad is full-width below.
- Tablet (768px):    Same stack, larger text.
- Desktop (1280px):  Two-column grid. Text left, Datapad right.

HEADER BEHAVIOR:
----------------
- At top:      Transparent background, py-5 padding.
- On scroll:   Blurred slate background, border-bottom, py-3 padding.
- Transition:  300ms ease-out.

CHROMATIC NOTES:
----------------
- Hero story uses delay: 500ms for the Datapad chart bars to animate in.
- Header stories render at fullscreen so the background is visible.
- Both use layout: "fullscreen" to test the component in its natural environment.

NEXT STEPS:
-----------
After dropping these in:
  pnpm storybook
Verify Hero and Header render correctly at all viewports, then:
  pnpm build-storybook
  pnpm chromatic
