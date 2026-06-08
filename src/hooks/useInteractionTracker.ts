import { useEffect } from "react"
import { useReactivityStore } from "@/store/useReactivityStore"

export const useInteractionTracker = () => {
  useEffect(() => {
    if (typeof window === "undefined") return

    // Typing: filter to input/textarea/contenteditable
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isTextInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable

      if (isTextInput) {
        useReactivityStore.getState().bumpTypingIntensity(0.15)
        useReactivityStore.getState().resetIdleTimer()
      }
    }

    // Scroll: frame-aligned, passive
    let lastScrollY = window.scrollY
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const velocity = Math.abs(window.scrollY - lastScrollY)
          useReactivityStore.getState().setScrollVelocity(velocity)
          useReactivityStore.getState().resetIdleTimer()
          lastScrollY = window.scrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Mouse/touch also reset idle
    const resetIdle = () => useReactivityStore.getState().resetIdleTimer()
    window.addEventListener("mousemove", resetIdle, { passive: true })
    window.addEventListener("touchstart", resetIdle, { passive: true })

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", resetIdle)
      window.removeEventListener("touchstart", resetIdle)
    }
  }, [])
}
