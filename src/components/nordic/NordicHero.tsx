import { motion, type Variants } from "framer-motion";
import { ChevronRight, Sparkles, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { NordicBackground } from "@/components/ui/NordicBackground";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};


export function NordicHero() {
  return (
    <section
      aria-label="Hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-nordic-bg pt-20 pb-12 lg:pt-28 lg:pb-20"
    >
      <NordicBackground />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-xl"
          >
            {/* Eyebrow badge */}
            <motion.div variants={item} className="mb-8 inline-flex">
              <span className="inline-flex items-center gap-2 rounded-none border border-nordic-accent/30 bg-nordic-accent-soft px-4 py-1.5 text-sm font-medium text-nordic-accent">
                <Sparkles className="h-3.5 w-3.5" />
                AI Resume Builder
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-balance text-style-hero text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.15] text-nordic-text"
            >
              Engineered{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, var(--color-nordic-accent-hover) 0%, var(--color-nordic-accent) 50%, var(--color-nordic-accent-hover) 100%)",
                }}
              >
                for ATS.
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-md text-lg leading-relaxed text-nordic-text-secondary"
            >
              AI-powered resume optimization. Pass filters, land interviews, export instantly.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link to="/dashboard" className="nordic-btn-primary group text-base px-6 py-3">
                <span>Start Building</span>
                <ChevronRight className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-sm font-medium text-nordic-text-secondary transition-colors hover:text-nordic-text"
              >
                See templates
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>


          </motion.div>

          {/* Right Column — Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
            aria-hidden="true"
          >
            <div className="relative shadow-nordic-xl rounded-none border border-nordic-border/50">
              <img 
                src="/assets/illustrations/hero_02_landscape.png" 
                alt="AI Resume Builder Interface" 
                className="w-full h-auto object-cover object-center rounded-none aspect-[4/3]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
