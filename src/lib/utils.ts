import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "glass-panel": ["glass-panel", "glass-panel-hover"],
      glow: ["glow-primary", "glow-accent"],
      "text-glow": ["text-glow"],
    } as Record<string, string[]>,
    conflictingClassGroups: {
      glow: ["glow"],
    } as Record<string, string[]>,
  },
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}
