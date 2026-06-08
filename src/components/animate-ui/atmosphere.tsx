import * as React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AtmosphereProps {
  children?: React.ReactNode
  density?: "sparse" | "normal" | "dense"
  colorMode?: "violet" | "coral" | "mixed"
  intensity?: "subtle" | "medium" | "strong"
  interactive?: boolean
  className?: string
  /** Accessible label describing the decorative effect */
  ariaLabel?: string
}

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  opacity: number
  baseOpacity: number
  glowIntensity: number

  constructor(
    width: number,
    height: number,
    colorMode: string,
    intensityMode: string
  ) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.radius = Math.random() * 2 + 1

    const isViolet =
      colorMode === "violet" || (colorMode === "mixed" && Math.random() > 0.5)
    // oklch(0.55 0.22 285) for violet, oklch(0.60 0.20 25) for coral
    this.color = isViolet ? "130, 100, 255" : "234, 84, 95"

    const intensityMultiplier =
      intensityMode === "strong" ? 1.5 : intensityMode === "subtle" ? 0.5 : 1
    this.baseOpacity = (Math.random() * 0.3 + 0.1) * intensityMultiplier
    this.opacity = this.baseOpacity
    this.glowIntensity = (Math.random() * 10 + 5) * intensityMultiplier
  }

  update(width: number, height: number, deltaTime: number) {
    const timeScale = deltaTime / 16.66
    this.x += this.vx * timeScale
    this.y += this.vy * timeScale

    if (this.x < 0) this.x = width
    if (this.x > width) this.x = 0
    if (this.y < 0) this.y = height
    if (this.y > height) this.y = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`
    ctx.shadowBlur = this.glowIntensity
    ctx.shadowColor = `rgba(${this.color}, ${this.opacity})`
    ctx.fill()
  }
}

export function Atmosphere({
  children,
  density = "normal",
  colorMode = "mixed",
  intensity = "medium",
  interactive = false,
  className,
  ariaLabel = "Decorative ambient particle effect",
}: AtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const isVisibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      // Don't animate if reduced motion is preferred
      return
    }

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap DPR at 2

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      initParticles(rect.width, rect.height)
    }

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
    })
    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting
        })
      },
      { threshold: 0 }
    )
    intersectionObserver.observe(container)

    const getParticleCount = (width: number) => {
      const isMobile = width < 768
      const base = isMobile ? 30 : 80
      return density === "sparse"
        ? base * 0.5
        : density === "dense"
          ? base * 1.5
          : base
    }

    const initParticles = (width: number, height: number) => {
      const count = getParticleCount(width)
      particlesRef.current = Array.from(
        { length: count },
        () => new Particle(width, height, colorMode, intensity)
      )
    }

    // Interaction logic intentionally removed to prevent layout thrashing
    // If interactivity is needed in the future, pass mouse coordinates explicitly via props

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time
      const deltaTime = time - lastTimeRef.current
      lastTimeRef.current = time

      if (isVisibleRef.current) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        particlesRef.current.forEach((particle) => {
          particle.update(canvas.width, canvas.height, deltaTime)
          particle.draw(ctx)
        })
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      cancelAnimationFrame(animationRef.current)
    }
  }, [density, colorMode, intensity, interactive])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        role="presentation"
        className="pointer-events-none absolute inset-0"
        style={{ zIndex: 0 }}
      />
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="atmosphere-status"
      >
        {ariaLabel}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
