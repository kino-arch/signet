"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

export function HeroDemo() {
  const shouldReduceMotion = useReducedMotion()

  // Typography styles from Option A
  const textShadowStyle = {
    textShadow: "0 0 40px oklch(0.55 0.22 285 / 0.4)",
  }

  // Animation sequences
  const headingVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }

  const headingWords = ["Turn", "Raw", "Into", "Remarkable"]

  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-background px-6 pt-32 pb-24">
      {/* Background Illustration */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="/illustrations/hero-01.png"
          alt="The Alchemist's Forge"
          className="h-full w-full object-cover opacity-30 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
      </div>

      {/* Animated background gradient orbs (rounded-none per rule) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] animate-pulse rounded-none bg-primary/5 blur-3xl" />
        <div
          className="absolute right-1/4 bottom-1/4 h-[600px] w-[600px] animate-pulse rounded-none bg-accent/5 blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-none border border-border/30 bg-background/30 px-4 py-2 text-xs font-medium text-foreground/70 backdrop-blur-md transition-all duration-300 hover:border-border/60"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary/80" />
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase md:text-xs">
            Introducing our new platform
          </span>
        </motion.div>

        <motion.h1
          className="flex flex-wrap justify-center gap-x-4 font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] font-bold tracking-[-0.02em] text-foreground uppercase"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          aria-label="Turn Raw Into Remarkable"
          style={textShadowStyle}
        >
          {headingWords.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              aria-hidden="true"
              className={
                word === "Remarkable" ? "text-primary" : "text-foreground"
              }
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mx-auto max-w-xl font-mono text-base leading-relaxed font-light text-muted-foreground/90 md:text-lg"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          AI-forged resumes that pass the bots and impress the humans.
        </motion.p>

        <motion.div
          className="flex flex-col justify-center gap-4 pt-6 sm:flex-row sm:gap-6"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          <Button
            size="lg"
            className="group h-12 rounded-none px-8 text-sm font-semibold tracking-wide uppercase shadow-[0_0_10px_rgba(var(--color-primary),0.1)] transition-all hover:shadow-[0_0_20px_rgba(var(--color-primary),0.3)]"
          >
            Start Forge
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-none border-border/50 px-8 text-sm font-semibold tracking-wide text-foreground uppercase transition-all hover:border-border hover:bg-foreground/5"
          >
            View Demo
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
