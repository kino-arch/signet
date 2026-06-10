/**
 * Recharts theme bridge — maps CSS design tokens to Recharts props.
 * Import `chartTheme` and spread into your Chart components for consistent styling.
 *
 * Usage:
 *   <CartesianGrid {...chartTheme.grid} />
 *   <Tooltip contentStyle={chartTheme.tooltip.contentStyle} />
 */

/** Resolves a CSS custom property value at runtime from :root. */
function cssVar(name: string): string {
  return `var(${name})`
}

export const chartTheme = {
  /**
   * Ordered color palette mapped to Nordic design tokens.
   * Use `chartTheme.palette[n]` for Recharts `fill` / `stroke` props.
   */
  palette: [
    "#60A5FA", // nordic-primary (blue)
    "#34D399", // nordic-success (green)
    "#FBBF24", // nordic-warning (amber)
    "#F87171", // nordic-error (red)
    "#818CF8", // nordic-info (indigo)
    "#A78BFA", // violet
    "#FB923C", // orange
    "#38BDF8", // sky
  ] as const,

  tooltip: {
    contentStyle: {
      backgroundColor: cssVar("--color-nordic-surface"),
      border: `1px solid ${cssVar("--color-nordic-border")}`,
      borderRadius: "0px",
      color: cssVar("--color-nordic-text"),
      fontSize: "13px",
      fontFamily: cssVar("--font-mono"),
    },
    itemStyle: {
      color: cssVar("--color-nordic-text-secondary"),
    },
    labelStyle: {
      color: cssVar("--color-nordic-text"),
      fontWeight: 600,
    },
    cursor: {
      fill: "rgba(96, 165, 250, 0.05)",
    },
  },

  grid: {
    stroke: cssVar("--color-nordic-border"),
    strokeDasharray: "4 4",
    strokeOpacity: 0.6,
  },

  axis: {
    tick: {
      fill: cssVar("--color-nordic-text-tertiary"),
      fontSize: 12,
      fontFamily: cssVar("--font-mono"),
    },
    line: {
      stroke: cssVar("--color-nordic-border"),
    },
  },

  legend: {
    wrapperStyle: {
      color: cssVar("--color-nordic-text-secondary"),
      fontSize: "13px",
      fontFamily: cssVar("--font-body"),
    },
  },
} as const
