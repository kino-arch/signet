import { motion } from "framer-motion";

export function StatsStrip() {
  return (
    <section className="relative w-full overflow-hidden bg-nordic-bg py-24">
      {/* Subtle radial glow background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-nordic-text md:text-5xl">
            Trusted by Teams Worldwide
          </h2>
          <p className="mt-4 text-lg text-nordic-text-secondary">
            Our platform delivers measurable results that accelerate growth.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="font-display text-5xl font-medium text-nordic-accent md:text-6xl lg:text-7xl">
              99.9<span className="text-3xl md:text-4xl">%</span>
            </div>
            <div className="mt-4 font-medium text-nordic-text uppercase tracking-wider text-sm">
              Uptime
            </div>
            <div className="mt-2 text-sm text-nordic-text-secondary">
              Guaranteed reliability for your apps
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center justify-center p-8 text-center sm:border-x sm:border-nordic-border-subtle"
          >
            <div className="font-display text-5xl font-medium text-nordic-accent md:text-6xl lg:text-7xl">
              10<span className="text-3xl md:text-4xl">M+</span>
            </div>
            <div className="mt-4 font-medium text-nordic-text uppercase tracking-wider text-sm">
              API requests
            </div>
            <div className="mt-2 text-sm text-nordic-text-secondary">
              Processed daily with low latency
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="font-display text-5xl font-medium text-nordic-accent md:text-6xl lg:text-7xl">
              500<span className="text-3xl md:text-4xl">+</span>
            </div>
            <div className="mt-4 font-medium text-nordic-text uppercase tracking-wider text-sm">
              Enterprise customers
            </div>
            <div className="mt-2 text-sm text-nordic-text-secondary">
              Scaling securely on our platform
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
