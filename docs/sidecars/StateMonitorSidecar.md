# StateMonitorSidecar

## Purpose
The `StateMonitorSidecar` acts as a runtime diagnostics agent running in parallel to ensure the Resume Builder interface remains highly performant, particularly monitoring React state complexity and animation-induced memory leaks.

## Responsibilities
1. **State Complexity Profiling:** Warn if a component contains deeply nested state objects that trigger excessive re-renders during form inputs. Enforce the use of React Hook Form or similar optimized state management for the Foundry Editor.
2. **Animation Tracking:** When using CSS keyframes (like `forge-glow`) or Framer Motion for micro-interactions, monitor for unmounted components failing to clean up their animation loops (memory leaks).
3. **Reflow/Repaint Costs:** Flag DOM mutations that cause layout thrashing. Enforce the use of HSL CSS variables mapping to opacity modifiers to ensure visual changes only trigger repaints, not reflows.
