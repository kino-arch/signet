"use client"

import React from "react"
import { cva } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const orbitalLoaderVariants = cva("flex items-center justify-center gap-2", {
  variants: {
    messagePlacement: {
      bottom: "flex-col",
      top: "flex-col-reverse",
      right: "flex-row",
      left: "flex-row-reverse",
    },
  },
  defaultVariants: {
    messagePlacement: "bottom",
  },
})

export interface OrbitalLoaderProps {
  message?: string
  /**
   * Position of the message relative to the spinner.
   * @default bottom
   */
  messagePlacement?: "top" | "bottom" | "left" | "right"
  /**
   * Ring colour — use "primary" for the brand teal/blue accent, "foreground" for white.
   * @default "foreground"
   */
  color?: "primary" | "foreground"
}

export function OrbitalLoader({
  className,
  message,
  messagePlacement,
  color = "foreground",
  ...props
}: React.ComponentProps<"div"> & OrbitalLoaderProps) {
  const ringClass =
    color === "primary"
      ? "border-t-primary"
      : "border-t-foreground"

  return (
    <div className={cn(orbitalLoaderVariants({ messagePlacement }))}>
      <div className={cn("relative w-16 h-16", className)} {...props}>
        {/* Outer ring — clockwise, 1 s */}
        <motion.div
          className={cn(
            "absolute inset-0 border-2 border-transparent rounded-full",
            ringClass
          )}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        {/* Middle ring — counter-clockwise, 1.5 s */}
        <motion.div
          className={cn(
            "absolute inset-2 border-2 border-transparent rounded-full opacity-75",
            ringClass
          )}
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        {/* Inner ring — clockwise, 0.8 s */}
        <motion.div
          className={cn(
            "absolute inset-4 border-2 border-transparent rounded-full opacity-50",
            ringClass
          )}
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        {/* Glowing centre dot */}
        <div
          className={cn(
            "absolute inset-0 m-auto h-2 w-2 rounded-full",
            color === "primary" ? "bg-primary shadow-[0_0_8px_3px_hsl(var(--primary)/0.6)]" : "bg-foreground"
          )}
        />
      </div>
      {message && (
        <div className="font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase">
          {message}
        </div>
      )}
    </div>
  )
}
