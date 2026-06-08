export type ThemeId = "cosmic" | "urban" | "cyberpunk" | "paper" | "terminal"

export type ThemeTier = "free" | "premium"

export interface ReactivityConfig {
  typingBurst: {
    animation: string
    duration: number
    intensity: "low" | "medium" | "high"
    color: string
    particleCount: (intensity: number) => number
  }
  scrollDrift: {
    animation: string
    maxSpeed: number
    damping: number
    easing: string
  }
  idleGlow: {
    animation: string
    interval: number
    randomness: number
    minOpacity: number
    maxOpacity: number
  }
}

export interface Theme {
  id: ThemeId
  name: string
  description: string
  tier: ThemeTier
  colors: Record<string, string>
  typography: {
    data: string
    ui: string
    heading: string
  }
  radius: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  shadows: {
    glow: string
    ambient: string
    card: string
  }
  particles: {
    type: "stars" | "rain" | "glitch" | "none"
    count: number
    color: string
    size: string
    animation: string
  }
  reactivity: ReactivityConfig
  landing: {
    bgStart: string
    bgEnd: string
    glowColor: string
    accentColor: string
    grainOpacity: number
  }
  functional: {
    bgStart: string
    bgEnd: string
    glowColor: string
    accentColor: string
    grainOpacity: number
  }
}

export const themes: Record<ThemeId, Theme> = {
  cosmic: {
    id: "cosmic",
    name: "Cosmic",
    description: "Deep space, monoliths, vastness",
    tier: "free",
    colors: {
      "--app-bg": "oklch(0.12 0.04 264)",
      "--app-primary": "oklch(0.75 0.24 220)",
      "--app-coral": "oklch(0.65 0.24 15)",
      "--app-violet": "oklch(0.55 0.20 280)",
      "--app-amber": "oklch(0.70 0.20 80)",
      "--app-foreground": "oklch(0.94 0.005 285.823)",
      "--app-card": "oklch(0.16 0.05 264)",
      "--app-border": "oklch(0.28 0.08 264)",
      "--app-muted": "oklch(0.55 0.08 264)",
      "--app-secondary": "oklch(0.22 0.06 264)",
    },
    typography: {
      data: '"Geist Mono", monospace',
      ui: '"Inter Variable", "DM Sans Variable", system-ui, sans-serif',
      heading: '"DM Sans Variable", "Inter Variable", sans-serif',
    },
    radius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
      xl: "1rem",
    },
    shadows: {
      glow: "0 0 20px oklch(0.75 0.24 220 / 0.3)",
      ambient: "0 4px 24px oklch(0 0 0 / 0.4)",
      card: "0 8px 32px oklch(0 0 0 / 0.2)",
    },
    particles: {
      type: "stars",
      count: 50,
      color: "primary",
      size: "1px",
      animation: "drift",
    },
    reactivity: {
      typingBurst: {
        animation: "energy-pulse",
        duration: 300,
        intensity: "medium",
        color: "primary",
        particleCount: (intensity) => (intensity > 0.7 ? 5 : 0),
      },
      scrollDrift: {
        animation: "orbital-acceleration",
        maxSpeed: 2.0,
        damping: 0.95,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      idleGlow: {
        animation: "star-twinkle",
        interval: 5000,
        randomness: 0.3,
        minOpacity: 0.1,
        maxOpacity: 0.4,
      },
    },
    landing: {
      bgStart: "var(--color-nordic-bg)",
      bgEnd: "var(--color-nordic-surface-hover)",
      glowColor: "var(--color-nordic-accent)",
      accentColor: "var(--color-nordic-warning)",
      grainOpacity: 0.04,
    },
    functional: {
      bgStart: "var(--color-nordic-surface-hover)",
      bgEnd: "var(--color-nordic-surface-hover)",
      glowColor: "#00f0ff33", // Reduced glow for dashboard
      accentColor: "var(--color-nordic-warning)",
      grainOpacity: 0.01,
    },
  },
  urban: {
    id: "urban",
    name: "Urban Night",
    description: "City lights, intimacy, warmth",
    tier: "free",
    colors: {
      "--app-bg": "oklch(0.10 0.03 220)",
      "--app-primary": "oklch(0.75 0.20 80)",
      "--app-coral": "oklch(0.70 0.22 15)",
      "--app-violet": "oklch(0.60 0.18 280)",
      "--app-amber": "oklch(0.72 0.18 150)",
      "--app-foreground": "oklch(0.92 0.005 285)",
      "--app-card": "oklch(0.14 0.04 230)",
      "--app-border": "oklch(0.28 0.06 240)",
      "--app-muted": "oklch(0.55 0.06 250)",
      "--app-secondary": "oklch(0.20 0.05 235)",
    },
    typography: {
      data: '"Geist Mono", monospace', // Ideally "Space Grotesk" but we use available fonts
      ui: '"DM Sans Variable", "Inter Variable", system-ui, sans-serif',
      heading: '"Inter Variable", sans-serif',
    },
    radius: {
      sm: "0.5rem",
      md: "0.75rem",
      lg: "1rem",
      xl: "1.5rem",
    },
    shadows: {
      glow: "0 0 30px oklch(0.75 0.20 80 / 0.25)",
      ambient: "0 4px 24px oklch(0.05 0.03 220 / 0.5)",
      card: "0 8px 32px oklch(0.05 0.03 220 / 0.3)",
    },
    particles: {
      type: "rain",
      count: 20,
      color: "primary",
      size: "2px",
      animation: "fall",
    },
    reactivity: {
      typingBurst: {
        animation: "streetlight-flicker",
        duration: 400,
        intensity: "high",
        color: "primary",
        particleCount: (intensity) => (intensity > 0.8 ? 3 : 0),
      },
      scrollDrift: {
        animation: "traffic-flow",
        maxSpeed: 3.0,
        damping: 0.9,
        easing: "ease-out",
      },
      idleGlow: {
        animation: "neon-pulse",
        interval: 3000,
        randomness: 0.1,
        minOpacity: 0.2,
        maxOpacity: 0.6,
      },
    },
    landing: {
      bgStart: "var(--color-nordic-bg)",
      bgEnd: "var(--color-nordic-surface)",
      glowColor: "var(--color-nordic-error)", // Solar flare / Urban amber-red equivalent
      accentColor: "var(--color-nordic-warning)",
      grainOpacity: 0.05,
    },
    functional: {
      bgStart: "var(--color-nordic-bg)",
      bgEnd: "var(--color-nordic-bg)",
      glowColor: "#ff005533", // Reduced glow
      accentColor: "var(--color-nordic-warning)",
      grainOpacity: 0.02,
    },
  },
  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Neon surges, glitch artifacts, high-tech",
    tier: "premium",
    colors: {}, // to be implemented
    typography: { data: "", ui: "", heading: "" },
    radius: { sm: "", md: "", lg: "", xl: "" },
    shadows: { glow: "", ambient: "", card: "" },
    particles: { type: "glitch", count: 0, color: "", size: "", animation: "" },
    reactivity: {} as ReactivityConfig,
    landing: { bgStart: "", bgEnd: "", glowColor: "", accentColor: "", grainOpacity: 0 },
    functional: { bgStart: "", bgEnd: "", glowColor: "", accentColor: "", grainOpacity: 0 },
  },
  paper: {
    id: "paper",
    name: "Paper & Ink",
    description: "Analog, tactile, minimalist",
    tier: "premium",
    colors: {},
    typography: { data: "", ui: "", heading: "" },
    radius: { sm: "", md: "", lg: "", xl: "" },
    shadows: { glow: "", ambient: "", card: "" },
    particles: { type: "none", count: 0, color: "", size: "", animation: "" },
    reactivity: {} as ReactivityConfig,
    landing: { bgStart: "", bgEnd: "", glowColor: "", accentColor: "", grainOpacity: 0 },
    functional: { bgStart: "", bgEnd: "", glowColor: "", accentColor: "", grainOpacity: 0 },
  },
  terminal: {
    id: "terminal",
    name: "Terminal Green",
    description: "Monochrome, phosphor green, retro",
    tier: "premium",
    colors: {},
    typography: { data: "", ui: "", heading: "" },
    radius: { sm: "", md: "", lg: "", xl: "" },
    shadows: { glow: "", ambient: "", card: "" },
    particles: { type: "none", count: 0, color: "", size: "", animation: "" },
    reactivity: {} as ReactivityConfig,
    landing: { bgStart: "", bgEnd: "", glowColor: "", accentColor: "", grainOpacity: 0 },
    functional: { bgStart: "", bgEnd: "", glowColor: "", accentColor: "", grainOpacity: 0 },
  },
}
