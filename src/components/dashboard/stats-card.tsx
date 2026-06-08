import { type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  delta?: {
    value: string
    isPositive: boolean
  }
  className?: string
}

export function StatsCard({ title, value, icon, delta, className }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={cn(
        "relative overflow-hidden border border-nordic-border bg-nordic-surface/80 backdrop-blur-md p-6 transition-all",
        "hover:border-nordic-accent hover:shadow-[0_4px_20px_-10px_rgba(255,255,255,0.1)]",
        className
      )}
    >
      {/* Subtle top gradient line on hover */}
      <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-nordic-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-nordic-text-tertiary tracking-tight">
          {title}
        </p>
        {icon && (
          <div className="text-nordic-text-tertiary/50 transition-colors group-hover:text-nordic-accent">
            {icon}
          </div>
        )}
      </div>
      
      <div className="mt-4 flex items-baseline gap-2">
        <h2 className="text-3xl font-bold text-nordic-text tracking-tight">
          {value}
        </h2>
        {delta && (
          <span
            className={cn(
              "text-xs font-semibold px-1.5 py-0.5 border",
              delta.isPositive
                ? "bg-green-500/10 text-green-500 border-green-500/20"
                : "bg-red-500/10 text-red-500 border-red-500/20"
            )}
          >
            {delta.isPositive ? "+" : ""}{delta.value}
          </span>
        )}
      </div>
    </motion.div>
  )
}
