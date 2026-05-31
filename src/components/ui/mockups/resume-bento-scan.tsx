"use client"
import { motion } from "framer-motion"
import { Target } from "lucide-react"

export function ResumeBentoScanMockup() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-background/80 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl">
      {/* Mac Window Controls */}
      <div className="z-20 flex h-8 w-full shrink-0 items-center gap-2 border-b border-white/5 bg-black/40 px-4">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80 shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
        <div className="ml-4 h-2 w-32 rounded-full bg-white/5" />
      </div>

      <div className="relative z-10 flex w-full flex-1 gap-6 bg-black/40 p-6">
        {/* Background Grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Left: Tactical Dashboard */}
        <div className="z-10 flex w-1/2 flex-col gap-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary drop-shadow-[0_0_5px_var(--color-primary)]" />
            <h3 className="font-mono text-xs font-bold tracking-widest text-primary uppercase drop-shadow-[0_0_2px_var(--color-primary)]">Bounty Target</h3>
          </div>
          
          <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-primary/30 bg-black/60 p-4 shadow-[inset_0_0_40px_rgba(var(--color-primary),0.1),0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute top-0 left-0 h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(var(--color-primary),0.15)_0%,transparent_70%)]" />
            
            {/* ATS Score Ring */}
            <div className="relative flex h-24 w-24 items-center justify-center">
              <svg className="h-full w-full -rotate-90 transform drop-shadow-[0_0_10px_rgba(var(--color-primary),0.5)]">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
                <motion.circle 
                  cx="48" cy="48" r="40" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  fill="transparent" 
                  strokeDasharray="251.2" 
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 * 0.05 }} // 95%
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  className="text-primary" 
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="font-mono text-2xl font-bold tracking-tighter text-white drop-shadow-md">95<span className="text-sm text-primary">%</span></span>
                <span className="mt-0.5 text-[6px] font-bold tracking-widest text-primary/80 uppercase">ATS Match</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="mt-6 w-full space-y-2">
              <div className="flex items-center justify-between font-mono text-[8px]">
                <span className="text-white/60">Keyword Density</span>
                <span className="font-bold text-primary">Optimized</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10 shadow-inner">
                <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ delay: 1, duration: 1 }} className="h-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
              </div>
              
              <div className="mt-3 flex items-center justify-between font-mono text-[8px]">
                <span className="text-white/60">Impact Verbs</span>
                <span className="font-bold text-amber-500">Actionable</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10 shadow-inner">
                <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ delay: 1.2, duration: 1 }} className="h-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: The Resume */}
        <div className="relative z-10 flex h-full w-1/2 items-center justify-end">
          <motion.div 
            initial={{ x: 50, opacity: 0, rotateY: 15 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            style={{ transformPerspective: 1000 }}
            className="flex aspect-[1/1.414] w-full max-w-[250px] rotate-2 transform flex-col gap-3 rounded-sm border border-white/20 bg-white p-5 shadow-[0_30px_60px_rgba(0,0,0,0.7),-10px_0_30px_rgba(var(--color-primary),0.1)] transition-transform duration-500 hover:rotate-0"
          >
            <div className="border-b border-gray-200 pb-2">
              <h1 className="font-serif text-lg font-bold tracking-tight text-gray-900">JOHN DOE</h1>
              <p className="mt-1 text-[7px] tracking-widest text-gray-500 uppercase">Target: Software Engineer L5</p>
            </div>
            <div className="relative z-10 flex flex-col gap-2">
              <div className="mb-0.5 h-1.5 w-full rounded bg-primary/80 shadow-[0_0_5px_rgba(var(--color-primary),0.5)]" />
              <div className="h-1 w-11/12 rounded bg-gray-200" />
              <div className="mb-2 h-1 w-4/5 rounded bg-gray-200" />
              
              <div className="mb-0.5 h-1.5 w-full rounded bg-primary/60 shadow-[0_0_5px_rgba(var(--color-primary),0.3)]" />
              <div className="h-1 w-full rounded bg-gray-200" />
              <div className="h-1 w-5/6 rounded bg-gray-200" />
            </div>
            
            {/* Scanner Line Overlay */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute left-0 z-50 h-[2px] w-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1),0_0_30px_rgba(34,211,238,0.5)]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
