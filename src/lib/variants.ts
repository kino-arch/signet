/**
 * Shared CVA variant definitions for cross-component consistency.
 * Import from here rather than defining variants inline in individual components.
 */
import { cva } from "class-variance-authority"

// ─── Status Badge Variants ────────────────────────────────────────────────────
// Unified semantic status colors aligned to the Nordic token system.
export const statusVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      status: {
        success:
          "bg-nordic-success/10 text-nordic-success ring-1 ring-nordic-success/20",
        error:
          "bg-nordic-error/10 text-nordic-error ring-1 ring-nordic-error/20",
        warning:
          "bg-nordic-warning/10 text-nordic-warning ring-1 ring-nordic-warning/20",
        info: "bg-nordic-info/10 text-nordic-info ring-1 ring-nordic-info/20",
        neutral:
          "bg-nordic-surface-hover text-nordic-text-secondary ring-1 ring-nordic-border",
        pending:
          "bg-nordic-primary/10 text-nordic-primary ring-1 ring-nordic-primary/20",
      },
    },
    defaultVariants: {
      status: "neutral",
    },
  }
)

// ─── Icon Button Size Variants ────────────────────────────────────────────────
// Standardised square sizes for icon-only buttons across the app.
export const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-9 w-9",
        lg: "h-10 w-10",
        xl: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

// ─── Empty State Variants ─────────────────────────────────────────────────────
// Consistent empty state container padding across page contexts.
export const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center text-nordic-text-tertiary",
  {
    variants: {
      size: {
        sm: "py-8 px-4",
        md: "py-12 px-6",
        lg: "py-16 px-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)
