"use client"
import { motion } from "framer-motion"
import { Wand2 } from "lucide-react"

export function ResumeAiForgerMockup() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-background/80 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl">
      {/* Mac Window Controls */}
      <div className="z-20 flex h-8 w-full shrink-0 items-center gap-2 border-b border-white/5 bg-black/40 px-4">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80 shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
        <div className="ml-4 h-2 w-32 rounded-full bg-white/5" />
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black/40 p-6">
        {/* Deep Lighting & Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--color-primary),0.15)_0%,transparent_60%)]" />
        
        {/* Resume Paper */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, rotateY: -5 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          style={{ transformPerspective: 1000 }}
          className="relative z-10 flex aspect-[1/1.414] w-[80%] max-w-[350px] flex-col gap-4 rounded-sm border border-white/20 bg-white p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(var(--color-primary),0.1)]"
        >
          {/* Resume Header */}
          <div className="flex flex-col items-center border-b border-gray-200 pb-3">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-gray-900">JOHN DOE</h1>
            <p className="mt-1 text-[9px] tracking-widest text-gray-500 uppercase">Senior Systems Architect</p>
          </div>

          {/* Resume Body */}
          <div className="relative flex flex-col gap-3">
            <div>
              <div className="mb-2 text-[10px] font-bold tracking-wider text-gray-800 uppercase">Professional Experience</div>
              
              {/* Highlighted AI Target */}
              <div className="relative mb-3">
                {/* AI Tooltip */}
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
                  className="absolute -top-10 -right-8 z-20 flex items-center gap-2 rounded-lg border border-primary/50 bg-black/90 p-2.5 shadow-[0_10px_30px_rgba(var(--color-primary),0.3)] backdrop-blur-xl"
                >
                  <Wand2 className="h-3.5 w-3.5 animate-pulse text-primary" />
                  <span className="font-mono text-[9px] font-bold tracking-wide text-primary">Forging Narrative...</span>
                </motion.div>

                {/* Text being forged */}
                <div className="relative mb-1 h-2.5 w-full overflow-hidden rounded bg-primary/20">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                  />
                </div>
                <div className="mb-1 h-2.5 w-11/12 rounded bg-primary/10" />
                <div className="h-2.5 w-4/5 rounded bg-primary/10" />
                
                {/* Tactical Frame */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pointer-events-none absolute -inset-2 rounded border-2 border-primary/50 bg-primary/[0.03]"
                />
              </div>
              
              {/* Normal Text */}
              <div className="mt-4 mb-1 h-2 w-full rounded bg-gray-200" />
              <div className="mb-0.5 h-1.5 w-full rounded bg-gray-100" />
              <div className="h-1.5 w-5/6 rounded bg-gray-100" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
