import { useState, useEffect } from "react"
import type { RefObject } from "react"
import type { SlateMeta } from "./deriveCompleteness"

export function useSpatialNavigation(
  items: SlateMeta[],
  containerRef: RefObject<HTMLElement | null>,
  isMobile: boolean
) {
  const [focusedIndex, setFocusedIndex] = useState(-1)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return

      const positions = items.map((_, i) => {
        if (isMobile) {
          return { x: 50, y: i * 10 } // simplified vertical positions
        }
        const angle = (i * 137.508 * Math.PI) / 180
        return {
          x: Math.cos(angle),
          y: Math.sin(angle),
        }
      })

      if (positions.length === 0) return

      const currentIndex = focusedIndex === -1 ? 0 : focusedIndex
      const current = positions[currentIndex] || positions[0]
      let nextIndex = currentIndex
      let bestScore = -Infinity

      positions.forEach((pos, i) => {
        if (i === currentIndex) return

        let score = 0
        if (e.key === "ArrowRight") score = pos.x - current.x
        if (e.key === "ArrowLeft") score = current.x - pos.x
        if (e.key === "ArrowDown") score = pos.y - current.y
        if (e.key === "ArrowUp") score = current.y - pos.y

        if (score > bestScore) {
          bestScore = score
          nextIndex = i
        }
      })

      if (bestScore > 0) {
        e.preventDefault()
        setFocusedIndex(nextIndex)
        const element = containerRef.current?.querySelector(
          `[data-star-index="${nextIndex}"]`
        ) as HTMLElement
        element?.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [focusedIndex, items, containerRef, isMobile])

  return { focusedIndex, setFocusedIndex }
}
