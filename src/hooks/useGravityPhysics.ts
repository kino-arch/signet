import { useState, useEffect, useRef, type RefObject } from "react"

export interface StarData {
  id: string
  x: number
  y: number
  completeness: number
  ageDays: number
}

interface GravityBody {
  id: string
  restX: number
  restY: number
  currentX: number
  currentY: number
  vx: number
  vy: number
  mass: number
  charge: number
  damping: number
  sleepCounter: number
  isSleeping: boolean
}

export class GravityEngine {
  private bodies: Map<string, GravityBody> = new Map()
  private starData: Map<string, StarData> = new Map()
  private mouse = { x: -1000, y: -1000 }
  private rafId = 0
  private isRunning = false
  private subscribers: Set<
    (positions: Map<string, { x: number; y: number }>) => void
  > = new Set()

  private readonly G = 1.5
  private readonly MOUSE_FORCE = 8.0
  private readonly SPRING_K = 0.04
  private readonly MAX_VELOCITY = 3.0

  constructor(stars: StarData[]) {
    stars.forEach((star) => {
      this.starData.set(star.id, star)
      this.bodies.set(star.id, {
        id: star.id,
        restX: star.x,
        restY: star.y,
        currentX: star.x,
        currentY: star.y,
        vx: 0,
        vy: 0,
        mass: 0.5 + star.completeness,
        charge: star.ageDays < 7 ? -1 : star.ageDays > 90 ? 1 : 0,
        damping: 0.92 + star.completeness * 0.06,
        sleepCounter: 0,
        isSleeping: false,
      })
    })
  }

  attachContainer(container: HTMLElement) {
    const observer = new ResizeObserver(() => {
      // React handles restX/restY recalculations through updateRestPositions()
      // when the container resizes, but this observer is kept for future-proofing.
    })

    observer.observe(container)
    return () => observer.disconnect()
  }

  // Allow external updates of rest positions (e.g. from React recalculating)
  updateRestPositions(stars: StarData[]) {
    stars.forEach((star) => {
      const body = this.bodies.get(star.id)
      if (body) {
        body.restX = star.x
        body.restY = star.y
        body.isSleeping = false // Wake up on rest change
        body.sleepCounter = 0
      }
    })
  }

  start() {
    if (this.isRunning) return
    this.isRunning = true
    this.tick()
  }

  stop() {
    this.isRunning = false
    cancelAnimationFrame(this.rafId)
  }

  setMouse(x: number, y: number) {
    this.mouse = { x, y }
  }

  subscribe(
    callback: (positions: Map<string, { x: number; y: number }>) => void
  ) {
    this.subscribers.add(callback)
    return () => {
      this.subscribers.delete(callback)
    }
  }

  subscribeToBody(
    id: string,
    callback: (pos: { x: number; y: number }) => void,
    throttleMs: number = 100
  ) {
    const throttledCb = throttle(callback, throttleMs)

    // We add a special wrapper for individual body subscribers to hook into the main tick
    const wrapper = (positions: Map<string, { x: number; y: number }>) => {
      const pos = positions.get(id)
      if (pos) throttledCb(pos)
    }

    this.subscribers.add(wrapper)
    return () => {
      this.subscribers.delete(wrapper)
    }
  }

  private tick = () => {
    if (!this.isRunning) return

    let needsNotify = false
    const currentPositions = new Map<string, { x: number; y: number }>()

    this.bodies.forEach((body) => {
      if (body.isSleeping) {
        const mouseDist = Math.hypot(
          this.mouse.x - body.currentX,
          this.mouse.y - body.currentY
        )
        if (mouseDist < 20) {
          body.isSleeping = false
          body.sleepCounter = 0
        } else {
          currentPositions.set(body.id, { x: body.currentX, y: body.currentY })
          return // Skip force calcs
        }
      }

      const springFx = (body.restX - body.currentX) * this.SPRING_K
      const springFy = (body.restY - body.currentY) * this.SPRING_K

      const mdx = this.mouse.x - body.currentX
      const mdy = this.mouse.y - body.currentY
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy)

      let mouseFx = 0,
        mouseFy = 0
      if (mDist > 3 && mDist < 35) {
        const force = this.MOUSE_FORCE / (mDist * mDist * body.mass)
        mouseFx = (mdx / mDist) * force
        mouseFy = (mdy / mDist) * force
      }

      let bodyFx = 0,
        bodyFy = 0
      this.bodies.forEach((other) => {
        if (other.id === body.id) return
        const bdx = other.currentX - body.currentX
        const bdy = other.currentY - body.currentY
        const bDist = Math.sqrt(bdx * bdx + bdy * bdy)
        if (bDist < 1 || bDist > 50) return

        const force = (this.G * body.charge * other.charge) / (bDist * bDist)
        bodyFx += (bdx / bDist) * force
        bodyFy += (bdy / bDist) * force
      })

      body.vx += springFx + mouseFx + bodyFx
      body.vy += springFy + mouseFy + bodyFy

      const speed = Math.hypot(body.vx, body.vy)
      if (speed > this.MAX_VELOCITY) {
        body.vx = (body.vx / speed) * this.MAX_VELOCITY
        body.vy = (body.vy / speed) * this.MAX_VELOCITY
      }

      body.vx *= body.damping
      body.vy *= body.damping

      body.currentX += body.vx
      body.currentY += body.vy

      body.currentX = Math.max(5, Math.min(95, body.currentX))
      body.currentY = Math.max(5, Math.min(95, body.currentY))

      const displacement = Math.hypot(
        body.restX - body.currentX,
        body.restY - body.currentY
      )

      if (speed < 0.01 && displacement < 0.5) {
        body.sleepCounter++
        if (body.sleepCounter > 30) {
          body.isSleeping = true
          body.vx = 0
          body.vy = 0
          body.currentX = body.restX
          body.currentY = body.restY
        }
      } else {
        body.sleepCounter = 0
        needsNotify = true
      }

      currentPositions.set(body.id, { x: body.currentX, y: body.currentY })
    })

    this.flushToDOM()

    if (needsNotify) {
      this.subscribers.forEach((cb) => cb(currentPositions))
    }

    this.rafId = requestAnimationFrame(this.tick)
  }

  private flushToDOM() {
    this.bodies.forEach((body) => {
      const el = document.querySelector(
        `[data-star-id="${body.id}"]`
      ) as HTMLElement
      if (el) {
        el.style.left = `${body.currentX}%`
        el.style.top = `${body.currentY}%`
      }
    })
  }

  getSnapshot(): Map<string, { x: number; y: number }> {
    const snapshot = new Map()
    this.bodies.forEach((b) =>
      snapshot.set(b.id, { x: b.currentX, y: b.currentY })
    )
    return snapshot
  }
}

// Throttle utility
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T {
  let inThrottle: boolean
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  } as T
}

export function useGravityPhysics(
  stars: StarData[],
  containerRef: RefObject<HTMLElement | null>,
  options: {
    enabled: boolean
    onPositionsChange?: (
      positions: Map<string, { x: number; y: number }>
    ) => void
  }
) {
  const engineRef = useRef<GravityEngine | null>(null)
  const [isReady, setIsReady] = useState(false)

  // Sync rest position updates
  useEffect(() => {
    if (engineRef.current && isReady) {
      engineRef.current.updateRestPositions(stars)
    }
  }, [stars, isReady])

  useEffect(() => {
    if (!options.enabled || !containerRef.current) return

    const engine = new GravityEngine(stars)
    const cleanup = engine.attachContainer(containerRef.current)

    const unsubscribe = engine.subscribe(
      throttle((positions) => {
        options.onPositionsChange?.(positions)
      }, 33)
    )

    engine.start()
    engineRef.current = engine
    setIsReady(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      engine.setMouse(x, y)
    }

    const handleMouseLeave = () => {
      engine.setMouse(-1000, -1000)
    }

    containerRef.current.addEventListener("mousemove", handleMouseMove)
    containerRef.current.addEventListener("mouseleave", handleMouseLeave)

    // Prevent stale closure values in event listeners
    const el = containerRef.current

    return () => {
      unsubscribe()
      engine.stop()
      cleanup()
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
      engineRef.current = null
      setIsReady(false)
    }
  }, [options.enabled])

  return { engine: engineRef.current, isReady }
}
