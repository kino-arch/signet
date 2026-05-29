# AccessibilitySidecar

## Purpose
The `AccessibilitySidecar` is a background agent/monitor tasked with ensuring that the "Great Forge" dark-mode theme maintains strict WCAG AAA contrast ratios as the application is built.

## Responsibilities
1. **Contrast Monitoring:** Continuously evaluate the luminance ratios between foreground text (e.g., `text-beskar-pure`) and background elements (e.g., `bg-beskar-void` or `bg-forge-molten`).
2. **Thresholds:**
   - Normal text: Must maintain a minimum of 7:1 ratio.
   - Large text/UI Components: Must maintain a minimum of 4.5:1 ratio.
3. **Alerting:** If an agent attempts to combine colors that fail these thresholds (e.g., using `text-beskar-dark` on `bg-forge-ember`), the Sidecar will instantly alert the primary agent and block the commit.
4. **Auto-Correction:** Suggest the nearest semantic variable from the taxonomy that satisfies the contrast requirement.
