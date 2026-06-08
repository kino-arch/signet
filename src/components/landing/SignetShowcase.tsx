import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function SignetShowcase() {
  return (
    <section id="templates" className="relative overflow-hidden bg-nordic-bg py-24">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Left — Text content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl font-medium tracking-tight text-nordic-text md:text-5xl">
              Templates That Work as Hard as You Do
            </h2>
            <p className="mt-5 text-lg text-nordic-text-secondary leading-relaxed">
              Every template is engineered from the ground up for ATS parsing — zero
              tables, zero text boxes, zero parsing failures. Nordic-inspired typography,
              generous whitespace, and clean hierarchy that recruiters love.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Passes 99% of ATS parsers out of the box",
                "Pixel-perfect PDF export, every time",
                "Optimized for screen and print readability",
              ].map((point) => (
                <li key={point} className="flex items-center gap-3 text-nordic-text-secondary">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-none text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, var(--color-nordic-accent), var(--color-nordic-accent-hover))" }}
                  >
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link to="/dashboard" className="nordic-btn-secondary group">
                <span>Browse All Templates</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Right — Template Visual */}
          <div className="relative flex items-center justify-center lg:justify-end" aria-hidden="true">
            <div className="relative w-full max-w-lg border border-nordic-border shadow-nordic-xl rounded-none overflow-hidden bg-nordic-surface">
              <img 
                src="/assets/illustrations/empty_state_slates.png" 
                alt="Veil Workflows" 
                className="w-full h-auto rounded-none" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
