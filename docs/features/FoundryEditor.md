# FoundryEditor

## Overview
The `FoundryEditor` is the core application logic of Project Signet. It is the dynamic resume builder interface constructed with the "Great Forge" aesthetic.

## Implementation Details
1. **SDK Integration:** Managed as an independent feature that is conditionally rendered upon passing the `BeskarPaywall`. 
2. **Component Architecture:**
   - **Shadcn Primitives:** All inputs, dropdowns, and modals must be derived from Shadcn UI (`ShadcnOrchestrator` skill enforcement).
   - **Semantic Styling:** Must exclusively use the Beskar material taxonomy for structure (e.g., `bg-beskar-dark` for canvases, `border-beskar-base` for panel dividers).
3. **UX Focus:** Micro-interactions are key. Hover states should reflect heat (e.g., a button turning from `bg-beskar-base` to `bg-forge-ember` on hover) rather than generic color shifts.
4. **Performance:** As monitored by the `StateMonitorSidecar`, the editor must maintain 60fps during complex DOM updates (e.g., drag-and-drop sorting of resume sections) without causing re-renders across unaffected sibling components.
