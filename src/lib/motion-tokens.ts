export const motionTokens = {
  duration: {
    instant: 0,
    fast: 0.1,
    normal: 0.2,
    slow: 0.3,
    slower: 0.5,
    hero: 0.8,
  },
  ease: {
    out: [0, 0, 0.2, 1] as [number, number, number, number],
    inOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
    spring: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number],
    bounce: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  },
  stagger: {
    fast: 0.05,
    base: 0.08,
    slow: 0.12,
  },
} as const
