"use client"

import { useEffect, useRef, useState } from "react"

export function FeatureCards() {
  const [activeCard, setActiveCard] = useState(0)
  const [progress, setProgress] = useState(0)
  const mountedRef = useRef(true)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (!mountedRef.current) return

      setProgress((prev) => {
        if (prev >= 100) {
          if (mountedRef.current) {
            setActiveCard((current) => (current + 1) % 3)
          }
          return 0
        }
        return prev + 2 // 2% every 100ms = 5 seconds total
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
    <div>
      <div className="relative z-5 my-8 flex w-full flex-col items-center justify-center gap-2">
        <div className="flex h-[520px] w-full max-w-5xl flex-col items-start justify-start overflow-hidden rounded-none border shadow-2xl">
          <div className="flex flex-1 items-start justify-start self-stretch">
            <div className="flex h-full w-full items-center justify-center">
              <div className="relative h-full w-full overflow-hidden">
                <div
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    activeCard === 0
                      ? "blur-0 scale-100 opacity-100"
                      : "scale-95 opacity-0 blur-sm"
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-none border border-muted/50 bg-muted/20 text-muted-foreground/50">
                    <span className="text-xl font-semibold">
                      AI Resume Builder Preview
                    </span>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    activeCard === 1
                      ? "blur-0 scale-100 opacity-100"
                      : "scale-95 opacity-0 blur-sm"
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-none border border-muted/50 bg-muted/20 text-muted-foreground/50">
                    <span className="text-xl font-semibold">
                      ATS Scanner Preview
                    </span>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    activeCard === 2
                      ? "blur-0 scale-100 opacity-100"
                      : "scale-95 opacity-0 blur-sm"
                  }`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-none border border-muted/50 bg-muted/20 text-muted-foreground/50">
                    <span className="text-xl font-semibold">
                      Dashboard Analytics Preview
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex items-start justify-center self-stretch border-y">
        <div className="relative w-4 self-stretch overflow-hidden sm:w-6 md:w-8 lg:w-12">
          <div className="absolute -top-30 -left-4 flex w-40 flex-col items-start justify-start">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="h-4 origin-top-left -rotate-45 self-stretch outline-[0.5px] outline-offset-[-0.25px] outline-primary/40"
              ></div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col items-stretch justify-center gap-0 px-0 md:flex-row">
          <FeatureCard
            title="AI-Powered Content Generation"
            description="Leverage deep learning to translate your experience into professional, high-impact bullet points instantly."
            isActive={activeCard === 0}
            progress={activeCard === 0 ? progress : 0}
            onClick={() => handleCardClick(0)}
          />
          <FeatureCard
            title="ATS-Optimized Formatting"
            description="Ensure your resume passes Applicant Tracking Systems with proven, enterprise-grade templates."
            isActive={activeCard === 1}
            progress={activeCard === 1 ? progress : 0}
            onClick={() => handleCardClick(1)}
          />
          <FeatureCard
            title="Real-time Application Analytics"
            description="Track your application success, measure ATS compatibility scores, and refine your approach."
            isActive={activeCard === 2}
            progress={activeCard === 2 ? progress : 0}
            onClick={() => handleCardClick(2)}
          />
        </div>

        <div className="relative w-4 self-stretch overflow-hidden sm:w-6 md:w-8 lg:w-12">
          <div className="absolute -top-30 -left-4 flex w-40 flex-col items-start justify-start">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="h-4 origin-top-left -rotate-45 self-stretch outline-[0.5px] outline-offset-[-0.25px] outline-primary/40"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  isActive,
  progress,
  onClick,
}: {
  title: string
  description: string
  isActive: boolean
  progress: number
  onClick: () => void
}) {
  return (
    <div
      className={`relative flex w-full cursor-pointer flex-col items-start justify-start gap-2 self-stretch overflow-hidden px-6 py-5 md:flex-1 ${
        isActive ? "bg-code border" : "border-r-0 border-l-0 md:border"
      }`}
      onClick={onClick}
    >
      {isActive && (
        <div className="absolute top-0 left-0 h-1 w-full">
          <div
            className="h-full bg-primary transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="flex flex-col justify-center self-stretch text-sm font-semibold md:text-lg">
        {title}
      </div>
      <div className="self-stretch text-sm text-muted-foreground">
        {description}
      </div>
    </div>
  )
}
