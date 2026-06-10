import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative flex min-h-[calc(100svh-3.5rem)] w-full flex-col items-center overflow-hidden bg-background pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20">
      {/* Dot Grid Pattern — uses theme token, masked to fade at edges */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(var(--color-muted-foreground)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)] bg-[size:28px_28px] opacity-15" />

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        {/* Badge — using the project's own Badge component */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="gap-1.5">
            <Sparkles className="h-3 w-3" />
            AI-Powered Resume Builder
          </Badge>
        </motion.div>

        {/* Heading — uses theme tokens only, sensible responsive sizes */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl text-style-hero text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground"
        >
          Secure Your Next Role with{" "}
          <span className="text-primary">Beskar-Grade Precision</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          Over 70% of flashy resumes fail Applicant Tracking Systems (ATS).
          Build a clean, data-driven professional resume engineered to bypass
          filters and land the interview.
        </motion.p>

        {/* CTA Buttons — using project's Button component with no overrides */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            onClick={() => navigate("/editor")}
            className="gap-2"
          >
            Start Building
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/ats-specs")}
          >
            ATS Specs
          </Button>
        </motion.div>

        {/* Showcase Image — simple, responsive, inside viewport */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative mt-2 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
        >
          <div className="pointer-events-none absolute -inset-4 bg-primary/5 blur-2xl" />
          <div className="relative overflow-hidden border border-border bg-card shadow-lg">
            <img
              src="/beskar_dataslate.png"
              alt="Beskar data-slate resume layout"
              className="w-full object-cover select-none"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
