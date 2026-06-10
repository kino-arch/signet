import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Bell } from "lucide-react"

export function NativeNotificationBell() {
  const [hasUnread, setHasUnread] = React.useState(true)

  const handleClear = () => setHasUnread(false)

  return (
    <motion.button
      onClick={handleClear}
      className="relative flex items-center justify-center rounded-none border border-transparent p-2 text-nordic-text-tertiary transition-colors hover:bg-nordic-surface-hover hover:text-nordic-text outline-none"
      whileTap={{ scale: 0.95 }}
      aria-label="Notifications"
    >
      <Bell className="size-5" />
      
      <AnimatePresence>
        {hasUnread && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute right-1.5 top-1.5 size-2 bg-nordic-accent"
          />
        )}
      </AnimatePresence>

      {/* Ringing Animation */}
      {hasUnread && (
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 10, 0],
            transition: { repeat: Infinity, repeatDelay: 3, duration: 0.5 },
          }}
          className="absolute inset-0 z-[-1]"
        />
      )}
    </motion.button>
  )
}
