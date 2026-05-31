import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Custom Sci-Fi Mando Armorer's Forge Hammer
const ForgeHammerIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Heavy chamfered head */}
    <path d="M4 6h16l2 2v2l-2 2H4L2 10V8l2-2z" />
    {/* Sturdy Handle */}
    <path d="M10 12v10a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V12" />
    {/* Tactical Grip Rings */}
    <line x1="9" y1="16" x2="15" y2="16" />
    <line x1="9" y1="19" x2="15" y2="19" />
  </svg>
);

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  animateOnHover?: boolean;
}

export function Logo({ size = "md", showText = true, className, animateOnHover = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-14 w-14", // For landing page
  };

  const textClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
    xl: "text-5xl",
  };

  return (
    <motion.div
      className={cn("flex items-center gap-3 group select-none", className)}
      initial="initial"
      whileHover={animateOnHover ? "hover" : "initial"}
    >
      <div className="relative flex items-center justify-center">
        {/* The Hammer */}
        <motion.div
          variants={{
            initial: { rotate: 0, y: 0 },
            hover: {
              rotate: [0, -35, 15, 0],
              y: [0, -5, 2, 0],
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
          className="relative z-10 origin-bottom-right"
        >
          <ForgeHammerIcon
            className={cn(
              "text-primary drop-shadow-[0_0_8px_rgba(var(--color-primary),0.8)]",
              sizeClasses[size]
            )}
          />
        </motion.div>

        {/* Forge Spark / Heat Glow */}
        <motion.div
          className="absolute bottom-1 left-1 h-3 w-3 rounded-full bg-[#FF7B00] mix-blend-screen blur-[4px]"
          variants={{
            initial: { scale: 0, opacity: 0 },
            hover: {
              scale: [0, 2, 0],
              opacity: [0, 0.8, 0],
              transition: { delay: 0.15, duration: 0.4 },
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
  );
}
