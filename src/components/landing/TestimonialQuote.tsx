import { motion } from "motion/react";

export function TestimonialQuote() {
  return (
    <section className="w-full bg-nordic-bg py-24">
      <div className="mx-auto w-full max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 flex justify-center">
            {/* Simple quotation mark icon */}
            <svg
              className="h-12 w-12 text-nordic-accent opacity-20"
              fill="currentColor"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.896 3.456-8.352 9.12-8.352 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
          </div>

          <blockquote className="font-heading text-2xl font-medium leading-relaxed text-nordic-text md:text-3xl lg:text-4xl">
            "Tailark has been a game-changer for our team. It’s incredibly fast, reliable, and easy to use. I highly recommend it to anyone looking to scale their integrations."
          </blockquote>

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-none bg-nordic-surface border border-nordic-border p-1 shadow-nordic-sm">
              <div className="h-full w-full rounded-none bg-nordic-accent-soft flex items-center justify-center text-nordic-accent font-heading text-xl">
                TB
              </div>
            </div>
            <div>
              <div className="text-base font-semibold text-nordic-text">
                Théo Balick
              </div>
              <div className="text-sm text-nordic-text-secondary mt-1">
                CTO at CloudScale
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
