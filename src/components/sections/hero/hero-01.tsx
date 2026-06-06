import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Diamond } from "lucide-react"
import { SignetSection } from "@/components/layout/SignetSection"
import { SignetWell } from "@/components/layout/SignetWell"
import { cn } from "@/lib/utils"
import { ForgeGlowBackground } from "@/components/forge/forge-glow"

export default function HeroSection01() {
  return (
    <SignetSection variant="hero" className="bg-signet-hero-depth relative overflow-hidden flex items-center justify-center min-h-[80vh] py-24">
      <ForgeGlowBackground />
      <SignetWell size="wide" className="relative z-10">
        <div className="flex flex-col text-center items-center justify-center">
          <motion.div
            className="mb-8"
            animate={{ 
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Diamond className="w-12 h-12 text-signet-cyan-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl mx-auto flex flex-col items-center justify-center"
          >
            <h2 className="text-white text-5xl font-extrabold tracking-tight mb-6">
              Design <br /> without Limits
            </h2>
            
            <p className="w-full text-signet-slate-400 text-lg leading-relaxed mb-10">
              I create digital experiences that connect and inspire. I build apps,
              websites, brands, and products end-to-end.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-6">
              <Link to="https://cal.com/aliimam/30min" target="_blank" rel="noopener noreferrer">
                <button 
                  className={cn(
                    "bg-signet-amber-500 text-signet-navy-950 px-8 py-4 text-lg font-bold shadow-signet-cta rounded-md",
                    "transition-all duration-300 hover:scale-105 hover:brightness-110 active:scale-95"
                  )}
                >
                  Book an Intro Call
                </button>
              </Link>
              
              <button
                className={cn(
                  "bg-signet-surface-elevated border border-signet-border-subtle text-white px-6 py-3 text-base font-medium rounded-md",
                  "transition-all duration-300 hover:scale-[1.02] active:scale-95"
                )}
              >
                Get Started Explore
              </button>
            </div>
          </motion.div>
        </div>
      </SignetWell>
    </SignetSection>
  )
}
