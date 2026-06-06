import { create } from "zustand"

interface ReactivityState {
  // Raw metrics (updated at interaction frequency)
  typingIntensity: number // 0.0–1.0, spikes on keydown
  scrollVelocity: number // pixels/frame, sampled at rAF

  // Derived state (computed, not stored — or memoized)
  isIdle: boolean // true after 3s no interaction
  idleDuration: number // ms since last interaction (internal tracking)

  // Actions
  bumpTypingIntensity: (amount: number) => void
  setScrollVelocity: (velocity: number) => void
  resetIdleTimer: () => void
  setIsIdle: (idle: boolean) => void
}

let idleTimer: ReturnType<typeof setTimeout>

export const useReactivityStore = create<ReactivityState>()((set, get) => {
  // Decay loop runs in store init, not in a component
  const startDecayLoop = () => {
    let rafId: number
    const tick = () => {
      const current = get().typingIntensity
      if (current > 0.001) {
        // exponential decay
        set({ typingIntensity: current * 0.95 })
      } else if (current !== 0) {
        set({ typingIntensity: 0 })
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }

  if (typeof window !== "undefined") {
    startDecayLoop()
  }

  return {
    typingIntensity: 0,
    scrollVelocity: 0,
    isIdle: true, // Start idle until interaction
    idleDuration: 0,

    bumpTypingIntensity: (amount: number) => {
      set((state) => ({
        typingIntensity: Math.min(state.typingIntensity + amount, 1.0),
      }))
    },

    setScrollVelocity: (velocity: number) => {
      set({ scrollVelocity: velocity })
    },

    setIsIdle: (idle: boolean) => {
      set({ isIdle: idle })
    },

    resetIdleTimer: () => {
      set({ isIdle: false })
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        set({ isIdle: true })
      }, 3000)
    },
  }
})
