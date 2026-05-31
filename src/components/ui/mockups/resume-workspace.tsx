"use client"
import { motion } from "framer-motion"

export function ResumeWorkspaceMockup() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-background/80 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl">
      {/* Mac Window Controls */}
      <div className="z-20 flex h-8 w-full shrink-0 items-center gap-2 border-b border-white/5 bg-black/40 px-4">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80 shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
        <div className="ml-4 h-2 w-32 rounded-full bg-white/5" />
      </div>

      <div className="relative flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="z-10 flex h-full w-1/4 flex-col gap-4 border-r border-white/5 bg-black/20 p-4 backdrop-blur-md">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-4 w-4 items-center justify-center rounded bg-primary/20">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_5px_var(--color-primary)]" />
            </div>
            <div className="h-3 w-16 rounded bg-muted/60" />
          </div>
          
          <div className="space-y-2">
            <div className="h-1.5 w-full rounded bg-white/5" />
            <div className="h-1.5 w-3/4 rounded bg-white/5" />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-md border-2 border-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--color-primary),0.2)]">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              <div className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_5px_var(--color-primary)]" />
            </div>
            <div className="aspect-[3/4] rounded-md border border-white/10 bg-black/40 transition-colors hover:bg-white/5" />
            <div className="aspect-[3/4] rounded-md border border-white/10 bg-black/40 transition-colors hover:bg-white/5" />
            <div className="aspect-[3/4] rounded-md border border-white/10 bg-black/40 transition-colors hover:bg-white/5" />
          </div>
        </div>

        {/* Main Workspace */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-black/40 p-6">
          {/* Deep Lighting & Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--color-primary),0.15)_0%,transparent_60%)]" />
          
          {/* Resume Paper */}
          <motion.div 
            initial={{ opacity: 0, y: 15, rotateX: 5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.1, type: "spring", bounce: 0.4 }}
            style={{ transformPerspective: 1000 }}
            className="relative z-10 flex aspect-[1/1.414] w-[70%] max-w-[300px] flex-col gap-4 rounded-sm border border-white/20 bg-white p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(var(--color-primary),0.1)]"
          >
            {/* Resume Header */}
            <div className="flex flex-col items-center border-b border-gray-200 pb-3">
              <h1 className="font-serif text-xl font-bold tracking-tight text-gray-900">JOHN DOE</h1>
              <p className="mt-1 text-[8px] tracking-widest text-gray-500 uppercase">Senior Systems Architect</p>
              <div className="mt-2 flex gap-2">
                <div className="h-1 w-8 rounded-full bg-gray-300" />
                <div className="h-1 w-8 rounded-full bg-gray-300" />
                <div className="h-1 w-8 rounded-full bg-gray-300" />
              </div>
            </div>

            {/* Resume Body */}
            <div className="flex flex-col gap-3">
              <div>
                <div className="mb-1 text-[9px] font-bold tracking-wider text-gray-800 uppercase">Experience</div>
                <div className="mb-1 h-1.5 w-full rounded bg-gray-200" />
                <div className="mb-0.5 h-1 w-11/12 rounded bg-gray-100" />
                <div className="mb-2 h-1 w-4/5 rounded bg-gray-100" />
                
                <div className="mb-1 h-1.5 w-full rounded bg-gray-200" />
                <div className="mb-0.5 h-1 w-full rounded bg-gray-100" />
                <div className="h-1 w-5/6 rounded bg-gray-100" />
              </div>
              
              <div>
                <div className="mb-1 text-[9px] font-bold tracking-wider text-gray-800 uppercase">Education</div>
                <div className="mb-1 h-1.5 w-3/4 rounded bg-gray-200" />
                <div className="h-1 w-1/2 rounded bg-gray-100" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
