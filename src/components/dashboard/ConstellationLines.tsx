import type { SlateMeta } from "./deriveCompleteness"

export interface DecayState {
  color: "cyan" | "violet" | "coral" | "gray" | "ghost"
  glow: "strong" | "medium" | "faint" | "none"
  opacity: number
  lineStyle: "solid" | "solid-dim" | "dashed" | "dotted" | "none"
}

export interface PlottedStar {
  slate: SlateMeta
  x: number
  y: number
  glowSize: number
  completeness: number
  decay: DecayState
}

interface ConstellationLinesProps {
  stars: PlottedStar[]
}

export function ConstellationLines({ stars }: ConstellationLinesProps) {
  return (
    <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full">
      {stars.map((star, i) => {
        const nextStar = stars[i + 1]
        if (!nextStar) return null

        const start = star
        const end = nextStar

        if (start.decay.lineStyle === "none") return null

        // Control points for bezier curve
        const cp1x = start.x + (end.x - start.x) * 0.3
        const cp1y = start.y
        const cp2x = start.x + (end.x - start.x) * 0.7
        const cp2y = end.y

        let strokeDasharray = "none"
        if (start.decay.lineStyle === "dashed") strokeDasharray = "6 6"
        if (start.decay.lineStyle === "dotted") strokeDasharray = "2 4"

        // Use a stable random delay based on index so it doesn't flicker on re-render
        const animDelay = `${(i * 0.7) % 5}s`

        return (
          <path
            key={`line-${i}`}
            d={`M ${start.x}% ${start.y}% C ${cp1x}% ${cp1y}%, ${cp2x}% ${cp2y}%, ${end.x}% ${end.y}%`}
            fill="none"
            stroke="oklch(0.75 0.24 220)"
            strokeWidth="1.5"
            strokeOpacity={
              start.decay.lineStyle === "solid-dim"
                ? 0.08
                : start.decay.opacity * 0.25
            }
            className="connection-line transition-opacity duration-500 hover:stroke-[oklch(0.75_0.24_220)] hover:stroke-2 hover:opacity-100"
            style={{
              strokeDasharray,
              animationDelay: animDelay,
              // Data pulse stroke offset trick
              strokeDashoffset: 100,
            }}
          />
        )
      })}
    </svg>
  )
}
