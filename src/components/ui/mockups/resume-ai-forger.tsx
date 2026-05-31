"use client"
import { motion } from "framer-motion"
import { Wand2 } from "lucide-react"

export function ResumeAiForgerMockup() {
  return (
    <div className="flex flex-col h-full w-full bg-background/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl relative ring-1 ring-white/5">
      {/* Mac Window Controls */}
      <div className="h-8 w-full bg-black/40 border-b border-white/5 flex items-center px-4 gap-2 shrink-0 z-20">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80 shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
        <div className="ml-4 h-2 w-32 bg-white/5 rounded-full" />
      </div>

      <div className="flex-1 bg-black/40 p-6 flex items-center justify-center relative overflow-hidden">
        {/* Deep Lighting & Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--color-primary),0.15)_0%,transparent_60%)] pointer-events-none" />
        
        {/* Resume Paper */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, rotateY: -5 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          style={{ transformPerspective: 1000 }}
          className="w-[80%] max-w-[350px] aspect-[1/1.414] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(var(--color-primary),0.1)] flex flex-col p-6 gap-4 rounded-sm relative z-10 border border-white/20"
        >
          {/* Resume Header */}
          <div className="flex flex-col items-center border-b border-gray-200 pb-3">
            <h1 className="text-2xl font-bold text-gray-900 font-serif tracking-tight">JOHN DOE</h1>
            <p className="text-[9px] text-gray-500 mt-1 uppercase tracking-widest">Senior Systems Architect</p>
          </div>

          {/* Resume Body */}
          <div className="flex flex-col gap-3 relative">
            <div>
              <div className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-2">Professional Experience</div>
              
              {/* Highlighted AI Target */}
              <div className="relative mb-3">
                {/* AI Tooltip */}
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
                  className="absolute -top-10 -right-8 bg-black/90 backdrop-blur-xl border border-primary/50 shadow-[0_10px_30px_rgba(var(--color-primary),0.3)] rounded-lg p-2.5 flex items-center gap-2 z-20"
                >
                  <Wand2 className="h-3.5 w-3.5 text-primary animate-pulse" />
                  <span className="text-[9px] font-mono text-primary font-bold tracking-wide">Forging Narrative...</span>
                </motion.div>

                {/* Text being forged */}
                <div className="h-2.5 w-full bg-primary/20 rounded mb-1 relative overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                  />
                </div>
                <div className="h-2.5 w-11/12 bg-primary/10 rounded mb-1" />
                <div className="h-2.5 w-4/5 bg-primary/10 rounded" />
                
                {/* Tactical Frame */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -inset-2 border-2 border-primary/50 rounded bg-primary/[0.03] pointer-events-none"
                />
              </div>
              
              {/* Normal Text */}
              <div className="h-2 w-full bg-gray-200 rounded mb-1 mt-4" />
              <div className="h-1.5 w-full bg-gray-100 rounded mb-0.5" />
              <div className="h-1.5 w-5/6 bg-gray-100 rounded" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
