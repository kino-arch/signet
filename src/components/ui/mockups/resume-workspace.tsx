"use client"
import { motion } from "framer-motion"

export function ResumeWorkspaceMockup() {
  return (
    <div className="flex flex-col h-full w-full bg-background/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl relative ring-1 ring-white/5">
      {/* Mac Window Controls */}
      <div className="h-8 w-full bg-black/40 border-b border-white/5 flex items-center px-4 gap-2 shrink-0 z-20">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80 shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
        <div className="ml-4 h-2 w-32 bg-white/5 rounded-full" />
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div className="w-1/4 h-full bg-black/20 border-r border-white/5 p-4 flex flex-col gap-4 z-10 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-4 w-4 rounded bg-primary/20 flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_5px_var(--color-primary)]" />
            </div>
            <div className="h-3 w-16 bg-muted/60 rounded" />
          </div>
          
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-white/5 rounded" />
            <div className="h-1.5 w-3/4 bg-white/5 rounded" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="aspect-[3/4] rounded-md border-2 border-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--color-primary),0.2)] relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              <div className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_5px_var(--color-primary)]" />
            </div>
            <div className="aspect-[3/4] rounded-md border border-white/10 bg-black/40 hover:bg-white/5 transition-colors" />
            <div className="aspect-[3/4] rounded-md border border-white/10 bg-black/40 hover:bg-white/5 transition-colors" />
            <div className="aspect-[3/4] rounded-md border border-white/10 bg-black/40 hover:bg-white/5 transition-colors" />
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 bg-black/40 p-6 flex items-center justify-center relative overflow-hidden">
          {/* Deep Lighting & Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--color-primary),0.15)_0%,transparent_60%)] pointer-events-none" />
          
          {/* Resume Paper */}
          <motion.div 
            initial={{ opacity: 0, y: 15, rotateX: 5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.1, type: "spring", bounce: 0.4 }}
            style={{ transformPerspective: 1000 }}
            className="w-[70%] max-w-[300px] aspect-[1/1.414] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(var(--color-primary),0.1)] flex flex-col p-6 gap-4 rounded-sm relative z-10 border border-white/20"
          >
            {/* Resume Header */}
            <div className="flex flex-col items-center border-b border-gray-200 pb-3">
              <h1 className="text-xl font-bold text-gray-900 font-serif tracking-tight">JOHN DOE</h1>
              <p className="text-[8px] text-gray-500 mt-1 uppercase tracking-widest">Senior Systems Architect</p>
              <div className="flex gap-2 mt-2">
                <div className="h-1 w-8 bg-gray-300 rounded-full" />
                <div className="h-1 w-8 bg-gray-300 rounded-full" />
                <div className="h-1 w-8 bg-gray-300 rounded-full" />
              </div>
            </div>

            {/* Resume Body */}
            <div className="flex flex-col gap-3">
              <div>
                <div className="text-[9px] font-bold text-gray-800 uppercase tracking-wider mb-1">Experience</div>
                <div className="h-1.5 w-full bg-gray-200 rounded mb-1" />
                <div className="h-1 w-11/12 bg-gray-100 rounded mb-0.5" />
                <div className="h-1 w-4/5 bg-gray-100 rounded mb-2" />
                
                <div className="h-1.5 w-full bg-gray-200 rounded mb-1" />
                <div className="h-1 w-full bg-gray-100 rounded mb-0.5" />
                <div className="h-1 w-5/6 bg-gray-100 rounded" />
              </div>
              
              <div>
                <div className="text-[9px] font-bold text-gray-800 uppercase tracking-wider mb-1">Education</div>
                <div className="h-1.5 w-3/4 bg-gray-200 rounded mb-1" />
                <div className="h-1 w-1/2 bg-gray-100 rounded" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
