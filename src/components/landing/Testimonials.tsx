import { motion } from "framer-motion"
import { Sparkles, ShieldCheck, FileOutput } from "lucide-react"

export function Testimonials() {
  const valueProps = [
    {
      title: "AI Reforging",
      description:
        "Our proprietary AI doesn't just check spelling—it analyzes the job description and rewrites your bullet points to match the required tone, keywords, and narrative arc.",
      icon: Sparkles,
    },
    {
      title: "ATS Compliance",
      description:
        "Signet guarantees your resume is readable by over 99% of Applicant Tracking Systems used by Fortune 500 companies. No more getting filtered before a human sees your application.",
      icon: ShieldCheck,
    },
    {
      title: "Smart Exports",
      description:
        "Instantly generate pixel-perfect PDFs or copy optimized text directly into plain-text application fields. Your formatting stays intact exactly as designed.",
      icon: FileOutput,
    },
  ]

  return (
    <section className="w-full bg-nordic-bg py-24">
      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <h2 className="font-heading text-3xl font-medium tracking-tight text-nordic-text md:text-5xl lg:max-w-2xl">
            Create Resumes with AI Assistance
          </h2>
          <p className="mt-4 max-w-xl text-lg text-nordic-text-secondary leading-relaxed">
            We've distilled the expertise of executive recruiters into an automated platform that works for you.
          </p>
        </motion.div>

        <div className="grid gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((prop, index) => {
            const Icon = prop.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pt-6 border-t border-nordic-border"
              >
                {/* Decorative accent dot on the border */}
                <div className="absolute top-[-3px] left-0 h-1.5 w-1.5 rounded-full bg-nordic-accent" />

                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-nordic-surface border border-nordic-border text-nordic-accent shadow-nordic-sm">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mb-3 font-heading text-xl font-medium text-nordic-text">
                  {prop.title}
                </h3>

                <p className="text-base text-nordic-text-secondary leading-relaxed">
                  {prop.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
