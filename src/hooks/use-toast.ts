/**
 * Standardised toast wrapper around Sonner.
 * Provides a single call signature with semantic variant styles
 * aligned to the Nordic design token system.
 *
 * Usage:
 *   import { toast } from "@/hooks/use-toast"
 *   toast({ title: "Saved", variant: "success" })
 *   toast({ title: "Failed", description: "Please retry.", variant: "error" })
 */
import { toast as sonnerToast } from "sonner"

export type ToastVariant = "success" | "error" | "warning" | "info"

interface ToastOptions {
  /** Short headline for the toast. */
  title: string
  /** Optional supplementary text rendered below the title. */
  description?: string
  /** Semantic colour variant. Defaults to "info". */
  variant?: ToastVariant
  /** Duration in ms before auto-dismissal. Defaults to 4000. */
  duration?: number
}

const variantConfig: Record<
  ToastVariant,
  { icon: string; style: React.CSSProperties }
> = {
  success: {
    icon: "✓",
    style: {
      background: "rgba(52, 211, 153, 0.1)",
      borderColor: "rgba(52, 211, 153, 0.3)",
      color: "#34D399",
    },
  },
  error: {
    icon: "✕",
    style: {
      background: "rgba(248, 113, 113, 0.1)",
      borderColor: "rgba(248, 113, 113, 0.3)",
      color: "#F87171",
    },
  },
  warning: {
    icon: "⚠",
    style: {
      background: "rgba(251, 191, 36, 0.1)",
      borderColor: "rgba(251, 191, 36, 0.3)",
      color: "#FBBF24",
    },
  },
  info: {
    icon: "ℹ",
    style: {
      background: "rgba(129, 140, 248, 0.1)",
      borderColor: "rgba(129, 140, 248, 0.3)",
      color: "#818CF8",
    },
  },
}

/**
 * Fires a styled Sonner toast notification.
 * Returns the Sonner toast ID for optional dismissal via `sonner.dismiss(id)`.
 */
export function toast({
  title,
  description,
  variant = "info",
  duration = 4000,
}: ToastOptions): string | number {
  const config = variantConfig[variant]

  return sonnerToast(title, {
    description,
    duration,
    icon: config.icon,
    style: {
      ...config.style,
      border: "1px solid",
      borderRadius: "0px",
      fontSize: "13px",
    },
  })
}
