import LottieModule from "lottie-react"
import commandDeckData from "@/assets/animations/command_deck_hero_tactical.json"

// Handle ESM/CJS interop for lottie-react in Vite
const Lottie = (LottieModule as any).default || LottieModule

export function HolographicDisplay() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:mx-0">
      {/* Outer frame glow */}
      <div className="absolute -inset-1 rounded-lg bg-primary/10 blur-xl" />

      {/* Main container */}
      <div className="relative aspect-video overflow-hidden rounded-lg border border-primary/20 bg-background/80 shadow-2xl backdrop-blur-sm transition-all duration-700 hover:border-primary/40 hover:bg-background">
        {/* Top status bar */}
        <div className="absolute top-0 right-0 left-0 z-20 flex items-center justify-between px-8 pt-5 font-mono text-[10px] tracking-widest text-primary/80">
          <span>[ SYS.COMMAND_DECK ]</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            ONLINE
          </span>
        </div>

        {/* Corner brackets */}
        <div className="absolute top-4 left-4 z-20 h-6 w-6 border-t-2 border-l-2 border-primary/40 transition-all duration-500 hover:border-primary" />
        <div className="absolute top-4 right-4 z-20 h-6 w-6 border-t-2 border-r-2 border-primary/40 transition-all duration-500 hover:border-primary" />
        <div className="absolute bottom-4 left-4 z-20 h-6 w-6 border-b-2 border-l-2 border-primary/40 transition-all duration-500 hover:border-primary" />
        <div className="absolute right-4 bottom-4 z-20 h-6 w-6 border-r-2 border-b-2 border-primary/40 transition-all duration-500 hover:border-primary" />

        {/* The Lottie */}
        <div className="absolute inset-0 px-3 pt-8 pb-3">
          <Lottie
            animationData={commandDeckData}
            loop={true}
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
            className="h-full w-full opacity-90 transition-opacity duration-500 hover:opacity-100"
          />
        </div>

        {/* Scanline overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
          }}
        />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>
    </div>
  )
}
