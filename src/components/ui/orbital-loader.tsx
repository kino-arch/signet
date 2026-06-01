"use client"

import React from "react"
import { cva } from "class-variance-authority"

import { LottieAnimation } from "@/components/ui/lottie-animation"
import holoRingData from "@/assets/animations/holo_ring.json"

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
  return (
    <div className={cn(orbitalLoaderVariants({ messagePlacement }))}>
      <div className={cn("relative w-24 h-24 flex items-center justify-center", className)} {...props}>
        <LottieAnimation 
          animationData={holoRingData} 
          className="w-full h-full opacity-80" 
          colorMode={color === "primary" ? "cyan-tint" : "original"}
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
