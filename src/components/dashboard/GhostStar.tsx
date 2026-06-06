import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { GravityEngine } from "@/hooks/useGravityPhysics"
import type { SlateVersion } from "@/db/schema"
import { restoreVersion } from "@/lib/versioning"

interface GhostStarProps {
  version: SlateVersion
  parentStarId: string
  physicsEngine: GravityEngine | null
}

export function GhostStar({
  version,
  parentStarId,
  physicsEngine,
}: GhostStarProps) {
  const [parentPos, setParentPos] = useState({ x: 50, y: 50 })
  const [isRestoring, setIsRestoring] = useState(false)

  // Subscribe to parent's position at 10fps
  useEffect(() => {
    if (!physicsEngine) return
    const unsubscribe = physicsEngine.subscribeToBody(
      parentStarId,
      (pos) => {
        setParentPos(pos)
      },
      100
    ) // 100ms throttle

    return unsubscribe
  }, [parentStarId, physicsEngine])

  // Drift based on version number (deterministic, not random)
  const driftAngle = (version.versionNumber * 137.5 * Math.PI) / 180
  const driftDistance = 4 + version.versionNumber * 1.5

  const gx = parentPos.x + Math.cos(driftAngle) * driftDistance
  const gy = parentPos.y + Math.sin(driftAngle) * driftDistance

  // Ghost opacity based on age
  const age = Date.now() - new Date(version.createdAt).getTime()
  const ageDays = age / (1000 * 60 * 60 * 24)
  const opacity = Math.max(0.05, 0.25 - (ageDays / 365) * 0.2)

  const formattedDate = new Date(version.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  )

  const handleRestore = async () => {
    if (isRestoring) return
    setIsRestoring(true)
    try {
      await restoreVersion(version.id)
      // Force page reload to reflect state, or we could mutate the store.
      // For simplicity in Phase 3, a reload perfectly resets the constellation with the newly restored slate as primary.
      window.location.reload()
    } catch (e) {
      console.error(e)
      setIsRestoring(false)
    }
  }

  return (
    <motion.div
      className="pointer-events-auto absolute z-10"
      animate={{
        left: `${gx}%`,
        top: `${gy}%`,
        opacity,
      }}
      transition={{ duration: 0.1, ease: "linear" }}
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <button
        onClick={handleRestore}
        disabled={isRestoring}
        className="group relative flex items-center justify-center p-2"
        aria-label={`Restore version ${version.versionNumber} from ${formattedDate}`}
      >
        <div
          className={`h-1.5 w-1.5 rounded-full bg-[oklch(0.75_0.24_220)]/20 transition-all ${isRestoring ? "scale-150 animate-pulse" : "group-hover:glow-cyan group-hover:scale-125 group-hover:bg-[oklch(0.75_0.24_220)]/80"}`}
        />

        {/* Connection line to parent */}
        <svg
          className="pointer-events-none absolute overflow-visible"
          style={{
            left: `${-driftDistance * Math.cos(driftAngle)}%`,
            top: `${-driftDistance * Math.sin(driftAngle)}%`,
            width: `${driftDistance * 2}%`,
            height: `${driftDistance * 2}%`,
          }}
        >
          <line
            x1="50%"
            y1="50%"
            x2={`${50 + driftDistance * Math.cos(driftAngle)}%`}
            y2={`${50 + driftDistance * Math.sin(driftAngle)}%`}
            stroke="oklch(0.75 0.24 220 / 0.06)"
            strokeWidth="0.5"
            strokeDasharray="2 6"
            className="transition-colors group-hover:stroke-[oklch(0.75_0.24_220)]/20"
          />
        </svg>

        {/* Tooltip on hover */}
        <div className="pointer-events-none absolute top-full mt-2 rounded border border-[oklch(0.75_0.24_220)]/20 bg-background/90 px-2 py-1 font-mono text-[10px] whitespace-nowrap text-[oklch(0.75_0.24_220)] opacity-0 transition-opacity group-hover:opacity-100">
          {isRestoring
            ? "RESTORING..."
            : `RESTORE v${version.versionNumber} (${formattedDate})`}
        </div>
      </button>
    </motion.div>
  )
}
