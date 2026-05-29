# BeskarPaywall

## Overview
The `BeskarPaywall` is an isolated feature module utilizing the Antigravity SDK's feature flag architecture. It acts as the gateway to the Foundry Editor, requiring the user to expend "Beskar Tokens" to access advanced resume-building tools.

## Implementation Details
1. **SDK Integration:** Built as a discrete module that can be toggled on/off via the SDK without affecting the core application routing.
2. **Visual Hierarchy:** Must heavily utilize the `bg-forge-molten` and `animate-forge-glow` properties to draw maximum attention to the transaction CTA.
3. **Intentional Minimalism:** The paywall should contain no extraneous text or generic marketing fluff. The value proposition must be stark, uncompromising, and immediate.
4. **State Handling:** On successful token redemption, the component must unmount gracefully, triggering an "accordion-up" or hardware-accelerated fade-out to reveal the underlying `FoundryEditor`.
