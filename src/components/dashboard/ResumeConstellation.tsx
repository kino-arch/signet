import { useState, useEffect, useRef, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { StarNode } from "./StarNode"
import { ConstellationLines } from "./ConstellationLines"
import type { PlottedStar, DecayState } from "./ConstellationLines"
import { useSpatialNavigation } from "./useSpatialNavigation"
import { deriveCompleteness } from "./deriveCompleteness"
import type { SlateMeta } from "./deriveCompleteness"
import { useGravityPhysics, type StarData } from "@/hooks/useGravityPhysics"
import { motion, AnimatePresence } from "framer-motion"
import { StarVersionsRenderer } from "./StarVersionsRenderer"

function getStarDecayState(ageDays: number): DecayState {
  if (ageDays < 7)
    return { color: "cyan", glow: "strong", opacity: 1.0, lineStyle: "solid" }
  if (ageDays < 30)
    return {
      color: "violet",
      glow: "medium",
      opacity: 0.85,
      lineStyle: "solid-dim",
    }
  if (ageDays < 90)
    return { color: "coral", glow: "faint", opacity: 0.6, lineStyle: "dashed" }
  if (ageDays < 365)
    return { color: "gray", glow: "none", opacity: 0.3, lineStyle: "dotted" }
  return { color: "ghost", glow: "none", opacity: 0.15, lineStyle: "none" }
}

interface ResumeConstellationProps {
  slates: SlateMeta[]
}

export function ResumeConstellation({ slates }: ResumeConstellationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 })

  // Staged initialization
  const [physicsEnabled, setPhysicsEnabled] = useState(false)
  const [starsVisible, setStarsVisible] = useState(false)

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setDimensions({
        width: entry.contentRect.width,
        height: Math.max(400, entry.contentRect.height),
      })
    })
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  const isMobile = dimensions.width < 768

  // Staged initialization sequence
  useEffect(() => {
    let mounted = true
    const sequence = async () => {
      // 1. Render stars at rest positions
      setStarsVisible(true)
      await new Promise((r) => setTimeout(r, 100))
      if (!mounted) return

      // 2. Physics enablement (delayed to avoid handoff chaos)
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
      const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches
      const shouldEnablePhysics =
        !isMobile && !prefersReducedMotion && !hasCoarsePointer

      if (shouldEnablePhysics) {
        await new Promise((r) => setTimeout(r, 600))
        if (!mounted) return
        setPhysicsEnabled(true)
      }
    }
    sequence()
    return () => {
      mounted = false
    }
  }, [isMobile])

  useSpatialNavigation(slates, containerRef, isMobile)

  const [physicsPositions, setPhysicsPositions] = useState<
    Map<string, { x: number; y: number }>
  >(new Map())

  const basePlottedStars: PlottedStar[] = useMemo(() => {
    return slates.map((slate, i) => {
      const completeness = deriveCompleteness(slate)
      const age = Date.now() - new Date(slate.updated_at).getTime()
      const ageDays = age / (1000 * 60 * 60 * 24)

      const clamp = (val: number, min: number, max: number) =>
        Math.max(min, Math.min(max, val))

      let x = 50
      let y = 50

      if (isMobile) {
        x = 50 + Math.sin(i * 45) * 20
        y = clamp(10 + i * (80 / Math.max(1, slates.length)), 10, 90)
      } else {
        const angle = (i * 137.508 * Math.PI) / 180
        const spiralRadius = 20 + i * 15 + ageDays * 2

        x = clamp(50 + (spiralRadius * Math.cos(angle)) / 5, 8, 92)
        y = clamp(50 + (spiralRadius * Math.sin(angle)) / 5, 8, 92)
      }

      const glowSize = 30 + completeness * 50
      const decay = getStarDecayState(ageDays)

      return {
        slate,
        x,
        y,
        glowSize,
        completeness,
        decay,
      }
    })
  }, [slates, isMobile])

  // Map to StarData for physics engine
  const starDataForPhysics: StarData[] = useMemo(() => {
    return basePlottedStars.map((star) => ({
      id: star.slate.id,
      x: star.x,
      y: star.y,
      completeness: star.completeness,
      ageDays:
        (Date.now() - new Date(star.slate.updated_at).getTime()) /
        (1000 * 60 * 60 * 24),
    }))
  }, [basePlottedStars])

  const { engine } = useGravityPhysics(starDataForPhysics, containerRef, {
    enabled: physicsEnabled,
    onPositionsChange: setPhysicsPositions,
  })

  // Apply physics positions specifically to the ConstellationLines
  // (StarNode DOM is updated directly by the engine's flushToDOM)
  const renderedStarsForLines = useMemo(() => {
    return basePlottedStars.map((star) => {
      const physicsPos = physicsPositions.get(star.slate.id)
      if (physicsPos) {
        return { ...star, x: physicsPos.x, y: physicsPos.y }
      }
      return star
    })
  }, [basePlottedStars, physicsPositions])

  const handleOpenEditor = (id: string) => {
    navigate(`/forge/${id}`)
  }

  return (
    <div
      ref={containerRef}
      className="glass-panel relative w-full flex-1 overflow-hidden rounded-xl border-0"
      style={{ minHeight: isMobile ? "80vh" : "60vh" }}
      role="region"
      aria-label="Resume Constellation View"
    >
      <AnimatePresence>
        {starsVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 h-full w-full"
          >
            {/* Background Atmosphere */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background via-background/95 to-background" />

            {/* Connection Lines (Needs physics positions to render SVGs accurately) */}
            <ConstellationLines stars={renderedStarsForLines} />

            {/* Stars (Positioned at rest first, then DOM manipulated by engine) */}
            {basePlottedStars.map((star, i) => (
              <StarNode
                key={star.slate.id}
                index={i}
                slate={star.slate}
                x={star.x}
                y={star.y}
                glowSize={star.glowSize}
                decay={star.decay}
                completeness={star.completeness}
                onOpenEditor={handleOpenEditor}
              />
            ))}

            {/* Ghost Stars for versions */}
            {basePlottedStars.map((star) => (
              <StarVersionsRenderer
                key={`versions-${star.slate.id}`}
                slateId={star.slate.id}
                physicsEngine={engine}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
