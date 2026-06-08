import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function NordicHero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden px-6 pt-24 pb-16 bg-nordic-bg">
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-8">
          {/* Text — 3 cols */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:col-span-3 max-w-xl"
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-lg bg-nordic-accent-soft px-3 py-1 text-xs font-medium text-nordic-accent"
            >
              AI-Powered ATS Optimization
            </motion.span>

            <motion.h1
              variants={item}
              className="mt-5 text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-nordic-text"
            >
              Resumes{" "}
              <span className="text-nordic-accent">Engineered</span>{" "}
              for ATS
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 max-w-md text-base leading-relaxed text-nordic-text-secondary"
            >
              AI-calibrated keywords, real-time ATS scoring, and instant exports
              that land interviews.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <a href="/dashboard" className="nordic-btn-primary">
                Build Resume
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#features"
                className="nordic-btn-ghost"
              >
                <Play className="h-4 w-4" />
                See How It Works
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-4 flex items-center gap-2.5">
              <div className="flex -space-x-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-6 rounded-md border-2 border-white bg-nordic-border"
                  />
                ))}
              </div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-nordic-text-tertiary">
                Trusted by 43,000+
              </span>
            </motion.div>
          </motion.div>

          {/* Illustration — 2 cols */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:col-span-2"
          >
            <div className="relative w-full max-w-[320px] lg:max-w-[360px]">
              <div className="nordic-card overflow-hidden">
                <img
                  src="/hero-illustration.png"
                  alt="Resume optimization"
                  className="h-auto w-full"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
