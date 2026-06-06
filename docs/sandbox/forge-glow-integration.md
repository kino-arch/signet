## forge-glow Integration Spec: hero-01.tsx

### Placement
- **Layer:** Absolute-positioned background layer, `z-index: 0`
- **Container:** Full SignetSection variant="hero" bounds
- **Opacity:** 15% maximum (subtle atmosphere, not dominant effect)
- **Pointer events:** `pointer-events: none` (does not interfere with CTA clicks)

### Behavior
- **Default state:** Static radial gradient centered on viewport center
- **Interactive state (desktop only):** Subtle parallax shift following mouse position
  - Max displacement: 20px from center
  - Easing: `ease-out`, duration 300ms
- **Mobile state:** Static gradient only (no mouse tracking, battery preservation)

### Accessibility
- **Reduced motion:** Static gradient, no parallax
- **High contrast mode:** Disabled entirely (glow conflicts with forced colors)

### Performance Budget
- **Max CPU:** 2% of single core on Moto G Power
- **Max GPU:** 5% on integrated graphics
- **Fallback:** If performance budget exceeded, degrade to static CSS gradient

### Chromatic Impact
- **Expected diff:** <3% pixel change from current hero-01 baseline
- **Approval required:** Design Lead + Staff Engineer joint sign-off
