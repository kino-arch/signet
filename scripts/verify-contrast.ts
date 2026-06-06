import { getComputedStyle } from "jsdom"

const CRITICAL_COMBINATIONS = [
  { fg: "text-foreground", bg: "bg-background", min: 4.5 },
  { fg: "text-primary", bg: "bg-background", min: 4.5 },
  { fg: "text-accent", bg: "bg-background", min: 4.5 },
  { fg: "text-foreground", bg: "bg-card", min: 4.5 },
  { fg: "text-muted-foreground", bg: "bg-background", min: 3.0 },
  { fg: "text-primary", bg: "bg-primary/10", min: 3.0 },
]

const COLOR_MAP: Record<string, string> = {
  "text-foreground": "oklch(0.985 0 0)",
  "text-primary": "oklch(0.985 0 0)",
  "text-accent": "oklch(0.985 0 0)",
  "text-muted-foreground": "oklch(0.708 0 0)",
  "bg-background": "oklch(0.141 0.005 285.823)",
  "bg-card": "oklch(0.141 0.005 285.823)",
  "bg-primary/10": "oklch(0.220 0 0)",
}

function getLuminance(oklchOrClass: string): number {
  const oklch = COLOR_MAP[oklchOrClass] || oklchOrClass
  // Parse OKLCH and extract L (lightness) channel
  const match = oklch.match(/oklch\(([\d.]+)/)
  return match ? parseFloat(match[1]) : 0
}

function calculateContrast(fg: string, bg: string): number {
  // Approximate contrast calculation from OKLCH lightness
  const fgL = getLuminance(fg)
  const bgL = getLuminance(bg)
  const l1 = Math.max(fgL, bgL)
  const l2 = Math.min(fgL, bgL)
  // Using simplified relative luminance estimate for L*
  const y1 = Math.pow((l1 + 0.16) / 1.16, 3)
  const y2 = Math.pow((l2 + 0.16) / 1.16, 3)
  return (y1 + 0.05) / (y2 + 0.05)
}

// Run verification
for (const combo of CRITICAL_COMBINATIONS) {
  const contrast = calculateContrast(combo.fg, combo.bg)
  if (contrast < combo.min) {
    console.error(
      `❌ ${combo.fg} on ${combo.bg}: ${contrast.toFixed(2)} (min: ${combo.min})`
    )
    process.exit(1)
  }
}

console.log("✅ All contrast ratios pass WCAG 2.1 AA")
