import { useState, useEffect } from "react"

export function GravityWell() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isVisible])

  return (
    <div
      className="pointer-events-none fixed z-50 transition-opacity duration-300 ease-in-out"
      style={{
        left: pos.x - 150,
        top: pos.y - 150,
        width: 300,
        height: 300,
        background:
          "radial-gradient(circle, oklch(0.75 0.24 220 / 0.08) 0%, transparent 70%)",
        filter: "blur(40px)",
        opacity: isVisible ? 1 : 0,
      }}
    />
  )
}
