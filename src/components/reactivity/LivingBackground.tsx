import React, { useEffect, useRef, useState } from "react"
import { useThemeStore } from "@/store/useThemeStore"
import { useReactivityStore } from "@/store/useReactivityStore"
import { themes } from "@/themes"

const spawnParticle = (
  container: HTMLDivElement | null,
  particleConfig: any,
  color: string
) => {
  if (!container || particleConfig.type === "none") return
  // Cap particles to prevent DOM thrashing
  if (container.childElementCount > (particleConfig.maxCount || 30)) return

  const particle = document.createElement("div")

  // Base classes
  particle.className = `absolute rounded-full pointer-events-none`

  // Start position
  particle.style.left = `${Math.random() * 100}%`
  // Start at bottom or random depending on type
  if (particleConfig.type === "rain") {
    particle.style.top = `-10px`
  } else {
    particle.style.top = `${Math.random() * 100}%`
  }

  // Randomize size slightly
  const baseSize = parseFloat(particleConfig.size) || 2
  const size = baseSize * (0.5 + Math.random())
  particle.style.width = particleConfig.type === "rain" ? "1px" : `${size}px`
  particle.style.height =
    particleConfig.type === "rain" ? `${size * 10}px` : `${size}px`

  // Color and glow
  particle.style.backgroundColor = color
  particle.style.boxShadow = `0 0 ${size * 4}px ${color}`

  // Animation (we'll just use a generic transform for now)
  particle.animate(
    [
      { transform: "translateY(0) scale(1)", opacity: 1 },
      {
        transform:
          particleConfig.type === "rain"
            ? "translateY(100vh) scale(0.5)"
            : "translateY(-50px) scale(0)",
        opacity: 0,
      },
    ],
    {
      duration: 1000 + Math.random() * 1500,
      easing: "ease-out",
    }
  )

  container.appendChild(particle)

  // Remove after animation
  setTimeout(() => {
    if (particle.parentNode === container) {
      container.removeChild(particle)
    }
  }, 2500)
}

export const LivingBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const activeThemeId = useThemeStore((s) => s.activeThemeId)
  const theme = themes[activeThemeId]

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setPrefersReducedMotion(mediaQuery.matches)

      const listener = (e: MediaQueryListEvent) =>
        setPrefersReducedMotion(e.matches)
      mediaQuery.addEventListener("change", listener)
      return () => mediaQuery.removeEventListener("change", listener)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Subscribe to store changes via vanilla API — NO REACT RE-RENDERS
    const unsubIntensity = useReactivityStore.subscribe((state) => {
      const intensity = state.typingIntensity
      container.style.setProperty("--typing-intensity", String(intensity))

      // Particle spawn threshold
      if (!prefersReducedMotion && intensity > 0.6) {
        // Extract the actual color value from CSS variable or literal
        const colorValue =
          theme.colors["--app-primary"] || "oklch(0.75 0.24 220)"
        spawnParticle(particlesRef.current, theme.particles, colorValue)
      }
    })

    const unsubIdle = useReactivityStore.subscribe((state) => {
      const isIdle = state.isIdle
      container.style.setProperty("--is-idle", isIdle ? "1" : "0")
    })

    const unsubScroll = useReactivityStore.subscribe((state) => {
      const velocity = state.scrollVelocity
      container.style.setProperty(
        "--scroll-velocity",
        String(
          Math.min(velocity / 50, 1) // normalize to 0-1
        )
      )
    })

    return () => {
      unsubIntensity()
      unsubIdle()
      unsubScroll()
    }
  }, [theme, prefersReducedMotion]) // re-subscribe only on theme/motion preference change

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
      style={
        {
          // Theme-driven base variables
          "--idle-glow-color": theme.colors["--app-primary"], // Use primary color for glow
          "--idle-glow-duration": prefersReducedMotion
            ? "0ms"
            : `${theme.reactivity.idleGlow.interval || 4000}ms`,
          "--particle-color": theme.colors["--app-primary"],
        } as React.CSSProperties
      }
    >
      <div ref={particlesRef} className="absolute inset-0" />

      {/* CSS-driven idle glow layer */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, var(--idle-glow-color), transparent 70%)`,
          // When idle, show the glow. When active, dim it slightly, but increase it based on typing intensity!
          opacity: `calc( (var(--is-idle) * 0.15) + (var(--typing-intensity, 0) * 0.25) )`,
          animation: prefersReducedMotion
            ? "none"
            : "pulse var(--idle-glow-duration) ease-in-out infinite",
        }}
      />
    </div>
  )
}
