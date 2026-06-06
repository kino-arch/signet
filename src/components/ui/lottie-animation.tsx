import { useEffect, useState } from "react"
import LottieLib, { type LottieComponentProps } from "lottie-react"
import { cn } from "@/lib/utils"

// Workaround for Vite/ESM default export resolution of CJS modules
const Lottie =
  (LottieLib as { default?: typeof LottieLib }).default || LottieLib

interface LottieAnimationProps extends Omit<
  LottieComponentProps,
  "animationData"
> {
  animationData: unknown
  className?: string
  colorMode?: "original" | "cyan-tint"
  decorative?: boolean
}

/**
 * Centralised Lottie wrapper used for every animation in Signet.
 *
 * If `decorative=true` (default), the wrapper sets `aria-hidden` and
 * `role="presentation"` so screen-readers skip them entirely.
 * `preserveAspectRatio: xMidYMid slice` keeps the SVG centred and
 * clipped rather than letterboxed when the container aspect ratio
 * doesn't match the animation's native ratio.
 */
export function LottieAnimation({
  animationData,
  className,
  colorMode = "original",
  loop = true,
  autoplay = true,
  decorative = true,
  rendererSettings,
  ...props
}: LottieAnimationProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  if (!animationData) {
    return null
  }

  // Use individual Tailwind filter utilities to ensure JIT compiler picks them up reliably
  const tintFilter =
    colorMode === "cyan-tint"
      ? "grayscale sepia hue-rotate-[150deg] saturate-[300%] brightness-[1.2]"
      : ""

  const finalLoop = prefersReducedMotion ? false : loop
  const finalAutoplay = prefersReducedMotion ? false : autoplay

  return (
    <Lottie
      className={cn(tintFilter, className)}
      aria-hidden={decorative ? "true" : undefined}
      role={decorative ? "presentation" : undefined}
      animationData={animationData}
      loop={finalLoop}
      autoplay={finalAutoplay}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
        ...rendererSettings,
      }}
      {...props}
    />
  )
}
