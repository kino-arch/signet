import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

interface NativeTabsProps {
  items: TabItem[]
  defaultTab?: string
  className?: string
}

export function NativeTabs({ items, defaultTab, className }: NativeTabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab || items[0]?.id)

  return (
    <div className={cn("w-full", className)}>
      <div className="flex space-x-1 border-b border-nordic-border bg-transparent p-0 mb-6 relative">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors outline-none",
              activeTab === item.id
                ? "text-nordic-text"
                : "text-nordic-text-tertiary hover:text-nordic-text-secondary"
            )}
          >
            {item.label}
            {activeTab === item.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-nordic-accent"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-4">
        {items.find((item) => item.id === activeTab)?.content}
      </div>
    </div>
  )
}
