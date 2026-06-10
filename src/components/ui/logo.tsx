import { motion } from "motion/react"
import { cn } from "@/lib/utils"

const SparkIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path
      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
  </svg>
)

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  className?: string
  animateOnHover?: boolean
}

export function Logo({
  size = "md",
  showText = true,
  className,
  animateOnHover = true,
}: LogoProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-14 w-14", // For landing page
  }

  const textClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
    xl: "text-5xl",
  }

  return (
    <motion.div
      className={cn("group flex items-center gap-3 select-none", className)}
      initial="initial"
      whileHover={animateOnHover ? "hover" : "initial"}
    >
      <div className="relative flex items-center justify-center">
        {/* The Spark */}
        <motion.div
          variants={{
            initial: { rotate: 0, scale: 1 },
            hover: {
              rotate: 180,
              scale: [1, 1.2, 1],
              transition: { duration: 0.8, ease: "easeInOut" },
            },
          }}
          className="relative z-10"
        >
          <SparkIcon
            className={cn(
              "text-primary drop-shadow-[0_0_8px_oklch(0.55_0.22_285)] filter",
              sizeClasses[size]
            )}
          />
        </motion.div>

        {/* Violet Ambient Glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary mix-blend-screen blur-2"
          variants={{
            initial: { opacity: 0.4, scale: 0.8 },
            hover: {
              opacity: 0.8,
              scale: 1.5,
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
        />
      </div>

      {showText && (
        <div
          className={cn(
            "font-heading font-bold tracking-[0.1em] text-foreground transition-colors duration-300",
            textClasses[size]
          )}
        >
          Signet
        </div>
      )}
    </motion.div>
  )
}
