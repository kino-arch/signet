import type React from "react"

type TColorProp = string | string[]

interface ShineBorderProps {
  borderRadius?: number
  borderWidth?: number
  duration?: number
  color?: TColorProp
  className?: string
  children: React.ReactNode
}

/**
 * ShineBorder
 * - Self-contained, no Tailwind, no external CSS.
 * - Uses an absolutely-positioned overlay with CSS masking to render an animated border.
 * - Customizable via props: borderRadius, borderWidth, duration, color (string or array).
 */
export function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = [
    "var(--theme-primary)", // signet-cyan
    "var(--theme-secondary)", // signet-amber
    "var(--theme-primary)",
    "var(--theme-secondary)",
  ],

  className,
  children,
}: ShineBorderProps) {
  const colorString =
    Array.isArray(color) && color.length > 0 ? color.join(",") : String(color)

  const rootStyle = {
    // Expose variables for internal CSS
    // Note: These are referenced by the <style> block below
    // for animation, masking, and layout.
    // Using px ensures predictable rendering.
    // Consumers can still style the wrapper via className or style if desired.
    "--sb-border-radius": `${borderRadius}px`,
    "--sb-border-width": `${borderWidth}px`,
    "--sb-duration": `${duration}s`,
  } as React.CSSProperties

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    // padding defines the visible border thickness via mask
    padding: `var(--sb-border-width)`,
    borderRadius: `var(--sb-border-radius)`,
    backgroundImage: `radial-gradient(transparent, transparent, ${colorString}, transparent, transparent)`,
    backgroundSize: "300% 300%",
    animation: "sb-shine-pulse var(--sb-duration) linear infinite",
    // Show only the border region using masks (content-box vs border-box)
    // WebKit/Safari
    WebkitMask:
      "linear-gradient(black 0 0) content-box, linear-gradient(black 0 0)",
    WebkitMaskComposite: "xor" as string,
    // Standard (Chromium/Firefox)
    mask: "linear-gradient(black 0 0) content-box, linear-gradient(black 0 0)",
    maskComposite: "exclude" as string,
    pointerEvents: "none",
  }

  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "grid",
    placeItems: "center",
    width: "100%",
    height: "100%",
    borderRadius: `var(--sb-border-radius)`,
  }

  return (
    <div style={rootStyle} className={className}>
      {/* Local styles for the component (no external CSS or Tailwind needed) */}
      <style>{`
        @keyframes sb-shine-pulse {
          0%   { background-position: 0% 0%; }
          50%  { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>

      <div style={containerStyle}>
        <div aria-hidden="true" style={overlayStyle} />
        {children}
      </div>
    </div>
  )
}
