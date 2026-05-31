"use client"
import { motion } from "framer-motion"
import { Target } from "lucide-react"

export function ResumeBentoScanMockup() {
  return (
    <div className="flex flex-col h-full w-full bg-background/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl relative ring-1 ring-white/5">
      {/* Mac Window Controls */}
      <div className="h-8 w-full bg-black/40 border-b border-white/5 flex items-center px-4 gap-2 shrink-0 z-20">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80 shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
        <div className="ml-4 h-2 w-32 bg-white/5 rounded-full" />
      </div>

      <div className="flex flex-1 w-full p-6 gap-6 relative z-10 bg-black/40">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Left: Tactical Dashboard */}
        <div className="w-1/2 flex flex-col gap-4 z-10">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary drop-shadow-[0_0_5px_var(--color-primary)]" />
            <h3 className="text-xs font-mono font-bold tracking-widest text-primary uppercase drop-shadow-[0_0_2px_var(--color-primary)]">Bounty Target</h3>
          </div>
          
          <div className="flex-1 bg-black/60 backdrop-blur-2xl border border-primary/30 rounded-xl p-4 flex flex-col justify-center items-center relative overflow-hidden shadow-[inset_0_0_40px_rgba(var(--color-primary),0.1),0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(var(--color-primary),0.15)_0%,transparent_70%)] pointer-events-none" />
            
            {/* ATS Score Ring */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_10px_rgba(var(--color-primary),0.5)]">
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
                <span className="text-2xl font-bold font-mono tracking-tighter text-white drop-shadow-md">95<span className="text-sm text-primary">%</span></span>
                <span className="text-[6px] uppercase tracking-widest text-primary/80 mt-0.5 font-bold">ATS Match</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="w-full mt-6 space-y-2">
              <div className="flex justify-between items-center text-[8px] font-mono">
                <span className="text-white/60">Keyword Density</span>
                <span className="text-primary font-bold">Optimized</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
                <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ delay: 1, duration: 1 }} className="h-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
              </div>
              
              <div className="flex justify-between items-center text-[8px] font-mono mt-3">
                <span className="text-white/60">Impact Verbs</span>
                <span className="text-amber-500 font-bold">Actionable</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
                <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ delay: 1.2, duration: 1 }} className="h-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: The Resume */}
        <div className="w-1/2 h-full flex justify-end items-center relative z-10">
          <motion.div 
            initial={{ x: 50, opacity: 0, rotateY: 15 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            style={{ transformPerspective: 1000 }}
            className="w-full max-w-[250px] aspect-[1/1.414] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.7),-10px_0_30px_rgba(var(--color-primary),0.1)] flex flex-col p-5 gap-3 rounded-sm transform rotate-2 hover:rotate-0 transition-transform duration-500 border border-white/20"
          >
            <div className="border-b border-gray-200 pb-2">
              <h1 className="text-lg font-bold text-gray-900 font-serif tracking-tight">JOHN DOE</h1>
              <p className="text-[7px] text-gray-500 mt-1 uppercase tracking-widest">Target: Software Engineer L5</p>
            </div>
            <div className="flex flex-col gap-2 relative z-10">
              <div className="h-1.5 w-full bg-primary/80 rounded mb-0.5 shadow-[0_0_5px_rgba(var(--color-primary),0.5)]" />
              <div className="h-1 w-11/12 bg-gray-200 rounded" />
              <div className="h-1 w-4/5 bg-gray-200 rounded mb-2" />
              
              <div className="h-1.5 w-full bg-primary/60 rounded mb-0.5 shadow-[0_0_5px_rgba(var(--color-primary),0.3)]" />
              <div className="h-1 w-full bg-gray-200 rounded" />
              <div className="h-1 w-5/6 bg-gray-200 rounded" />
            </div>
            
            {/* Scanner Line Overlay */}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1),0_0_30px_rgba(34,211,238,0.5)] pointer-events-none z-50"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
