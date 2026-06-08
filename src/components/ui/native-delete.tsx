import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface NativeDeleteProps {
  onDelete: () => void
  className?: string
  disabled?: boolean
}

export function NativeDelete({ onDelete, className, disabled = false }: NativeDeleteProps) {
  const [isConfirming, setIsConfirming] = React.useState(false)

  // Reset confirmation state if user clicks outside or blurs
  const handleBlur = () => {
    setIsConfirming(false)
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (disabled) return
    
    if (isConfirming) {
      onDelete()
      setIsConfirming(false)
    } else {
      setIsConfirming(true)
    }
  }

  return (
    <motion.button
      onBlur={handleBlur}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "relative flex items-center justify-center overflow-hidden border transition-all duration-200 outline-none",
        isConfirming
          ? "border-nordic-error bg-nordic-error/10 text-nordic-error w-20 px-2"
          : "border-transparent bg-transparent text-nordic-text-tertiary hover:border-nordic-border hover:bg-nordic-surface hover:text-nordic-error w-8",
        disabled && "opacity-50 cursor-not-allowed",
        "h-8 rounded-none",
        className
      )}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      initial={false}
      animate={{ width: isConfirming ? 80 : 32 }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {isConfirming ? (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
          >
            <AlertCircle className="size-3" />
            <span>Sure?</span>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Trash2 className="size-3.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
