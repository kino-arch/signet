import * as React from "react"
import { cn } from "@/lib/utils"

interface GeometricSealProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  animate?: boolean
  glowIntensity?: "none" | "subtle" | "medium" | "strong"
  variant?: "solid" | "outline" | "gradient"
  className?: string
  /** Accessibility label for the seal */
  "aria-label"?: string
  /** Whether the seal is decorative or informative */
  role?: "img" | "presentation"
}

export const GeometricSeal = React.forwardRef<
  SVGSVGElement,
  GeometricSealProps
>(
  (
    {
      size = 100,
      animate = true,
      glowIntensity = "medium",
      variant = "outline",
      className,
      "aria-label": ariaLabel,
      role = "img",
      ...props
    },
    ref
  ) => {
    // 12-pointed star / geometric burst paths
    const outerPath =
      "M50,5 L58.5,35 L88.5,35 L64.2,52.6 L73.5,81.4 L50,64.3 L26.5,81.4 L35.8,52.6 L11.5,35 L41.5,35 Z"
    const innerPath =
      "M50,20 L55.6,39.6 L76,39.6 L60.2,51.5 L66.4,70 L50,58.8 L33.6,70 L39.8,51.5 L24,39.6 L44.4,39.6 Z"

    // Core hexagon
    const corePath = "M50,30 L67.3,40 L67.3,60 L50,70 L32.7,60 L32.7,40 Z"

    const isGradient = variant === "gradient"
    const fillStyle = isGradient
      ? "url(#seal-gradient)"
      : variant === "solid"
        ? "var(--color-primary)"
        : "none"
    const strokeStyle = variant === "solid" ? "none" : "var(--color-primary)"
    const strokeOpacity = variant === "outline" ? 0.8 : 1

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role={role}
        aria-label={
          role === "img" ? ariaLabel || "Signet brand seal" : undefined
        }
        aria-hidden={role === "presentation" ? "true" : undefined}
        className={cn(
          "inline-block text-primary",
          animate && "animate-[spin_20s_linear_infinite]",
          className
        )}
        style={{
          filter:
            glowIntensity !== "none"
              ? `drop-shadow(0 0 ${glowIntensity === "strong" ? "12px" : glowIntensity === "medium" ? "8px" : "4px"} var(--color-primary))`
              : "none",
        }}
        {...props}
      >
        <title>Signet — AI-Powered Resume Builder</title>
        <desc>
          A crystalline geometric seal representing professional identity
        </desc>

        <defs>
          <linearGradient
            id="seal-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>

          {animate && (
            <style>
              {`
                @keyframes pulse-core {
                  0%, 100% { opacity: 0.6; transform: scale(0.95); transform-origin: 50% 50%; }
                  50% { opacity: 1; transform: scale(1.05); transform-origin: 50% 50%; }
                }
                .core-animate {
                  animation: pulse-core 4s ease-in-out infinite;
                }
                @media (prefers-reduced-motion: reduce) {
                  .core-animate { animation: none; }
                }
              `}
            </style>
          )}
        </defs>

        <g>
          {/* Outer geometric frame */}
          <path
            d={outerPath}
            fill="none"
            stroke={strokeStyle}
            strokeWidth="1.5"
            strokeOpacity={strokeOpacity * 0.5}
            className="transition-all duration-300"
          />

          {/* Inner geometric frame */}
          <path
            d={innerPath}
            fill="none"
            stroke={strokeStyle}
            strokeWidth="2"
            strokeOpacity={strokeOpacity}
            className="transition-all duration-300"
          />

          {/* Core shape */}
          <path
            d={corePath}
            fill={fillStyle}
            fillOpacity={variant === "solid" ? 1 : 0.3}
            stroke={strokeStyle}
            strokeWidth="1"
            className={cn(
              animate && "core-animate",
              "transition-all duration-300"
            )}
          />

          {/* Orbiting dots */}
          {animate && (
            <g className="text-accent">
              <circle cx="50" cy="5" r="2" fill="currentColor">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 50 50"
                  to="360 50 50"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="50" cy="95" r="2" fill="currentColor">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="180 50 50"
                  to="540 50 50"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="5" cy="50" r="1.5" fill="currentColor">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="270 50 50"
                  to="630 50 50"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          )}
        </g>
      </svg>
    )
  }
)
GeometricSeal.displayName = "GeometricSeal"
