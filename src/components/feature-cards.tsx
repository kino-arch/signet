"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { ResumeWorkspaceMockup } from "@/components/ui/mockups/resume-workspace"
import { ResumeAiForgerMockup } from "@/components/ui/mockups/resume-ai-forger"
import { ResumeBentoScanMockup } from "@/components/ui/mockups/resume-bento-scan"

const features = [
  {
    title: "Build ATS-optimized templates",
    description:
      "Create consistent, professional resumes that pass through Applicant Tracking Systems with ease.",
    component: <ResumeWorkspaceMockup />,
  },
  {
    title: "AI-powered content forging",
    description:
      "Turn raw experience into compelling narratives quickly and refine your professional impact.",
    component: <ResumeAiForgerMockup />,
  },
  {
    title: "Command the hiring market",
    description:
      "Leverage intelligent analytics to target your resume for any guild or faction.",
    component: <ResumeBentoScanMockup />,
  },
]

export function FeatureCards() {
  const [activeCard, setActiveCard] = useState(0)
  const [progress, setProgress] = useState(0)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true;
    const progressInterval = setInterval(() => {
      if (!mountedRef.current) return

      setProgress((prev) => {
        if (prev >= 100) {
          if (mountedRef.current) {
            setActiveCard((current) => (current + 1) % features.length)
          }
          return 0
        }
        return prev + 2
      })
    }, 100)

    return () => {
      clearInterval(progressInterval)
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  const handleCardClick = (index: number) => {
    if (!mountedRef.current) return
    setActiveCard(index)
    setProgress(0)
  }

  return (
    <section id="blueprints" className="w-full py-8">
      {/* Image showcase */}
      <div className="relative mx-auto w-full max-w-5xl overflow-hidden border bg-card shadow-lg">
        <div className="relative aspect-video w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={features[activeCard].title}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full"
            >
              {features[activeCard].component}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Feature tabs */}
      <div className="mx-auto mt-0 flex w-full max-w-5xl flex-col border-x border-b md:flex-row">
        {features.map((feature, i) => (
          <button
            key={feature.title}
            type="button"
            className={`relative flex flex-1 cursor-pointer flex-col gap-2 border-b px-6 py-5 text-left transition-colors last:border-r-0 last:border-b-0 md:border-r md:border-b-0 ${
              activeCard === i ? "bg-accent" : "hover:bg-accent/50"
            }`}
            onClick={() => handleCardClick(i)}
          >
            {/* Progress bar */}
            {activeCard === i && (
              <div className="absolute top-0 left-0 h-0.5 w-full bg-muted/20">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            )}

            <div className="text-sm font-semibold md:text-base">{feature.title}</div>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
