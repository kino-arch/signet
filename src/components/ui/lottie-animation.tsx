import LottieLib, { type LottieComponentProps } from "lottie-react";
import { cn } from "@/lib/utils";

// Workaround for Vite/ESM default export resolution of CJS modules
const Lottie = (LottieLib as any).default || LottieLib;

interface LottieAnimationProps extends Omit<LottieComponentProps, "animationData"> {
  animationData: unknown;
  className?: string;
  colorMode?: "original" | "cyan-tint";
}

/**
 * Centralised Lottie wrapper used for every animation in Signet.
 *
 * All animations are decorative — the wrapper sets `aria-hidden` and
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
  rendererSettings,
  ...props 
}: LottieAnimationProps) {
  if (!animationData) {
    return null;
  }

  // Use individual Tailwind filter utilities to ensure JIT compiler picks them up reliably
  const tintFilter = colorMode === "cyan-tint" 
    ? "grayscale sepia hue-rotate-[150deg] saturate-[300%] brightness-[1.2]" 
    : "";

  return (
    <Lottie 
      className={cn(tintFilter, className)}
      aria-hidden="true"
      role="presentation"
      animationData={animationData} 
      loop={loop} 
      autoplay={autoplay}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
        ...rendererSettings,
      }}
      {...props} 
    />
  );
}

