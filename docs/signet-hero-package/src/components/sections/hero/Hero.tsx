import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { DatapadPreview } from "./DatapadPreview";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-28 pb-16">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-violet-500/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Text column */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-xl"
          >
            {/* Badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                <Sparkles className="h-3 w-3" />
                AI-Powered ATS Optimization
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={item}
              className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Resumes{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Engineered
              </span>{" "}
              for ATS
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={item}
              className="mt-6 text-lg leading-relaxed text-slate-400"
            >
              Build ATS-optimized resumes that pass filters and land interviews.
              AI-powered keyword calibration, real-time scoring, and beautiful
              export-ready layouts.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={item}
              className="mt-8 flex flex-col items-start gap-4 sm:flex-row"
            >
              <a
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Build Your Resume
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-slate-600 hover:bg-slate-800"
              >
                <Play className="h-4 w-4 text-slate-400" />
                See How It Works
              </a>
            </motion.div>

            {/* Social proof */}
            <motion.p
              variants={item}
              className="mt-8 text-xs font-medium uppercase tracking-widest text-slate-600"
            >
              Trusted by 43,000+ professionals
            </motion.p>
          </motion.div>

          {/* Datapad column */}
          <div className="flex justify-center lg:justify-end">
            <DatapadPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
