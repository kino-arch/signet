import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does the AI Reforging actually work?",
    answer:
      "Our AI analyzes your provided experience alongside the target job description. It identifies missing keywords, restructures your bullet points to emphasize impact (using the X-Y-Z formula), and adjusts the tone to match industry standards, all while preserving your actual experience.",
  },
  {
    question: "Will my resume pass Applicant Tracking Systems (ATS)?",
    answer:
      "Yes. Our templates are engineered specifically for ATS parsing. We strip out complex formatting, tables, and multi-column layouts that confuse parsers, ensuring 100% of your data is read correctly.",
  },
  {
    question: "Can I export my resume to PDF?",
    answer:
      "Absolutely. Signet generates pixel-perfect PDFs that maintain their exact formatting across all devices. You can also export to plain text for pasting directly into application forms.",
  },
  {
    question: "Is there a limit to how many resumes I can build?",
    answer:
      "The Pro Builder tier is completely free and allows you to build, manage, and export an unlimited number of resumes. We only charge for premium features like bulk ATS scanning and enterprise API access.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full bg-nordic-bg py-24">
      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-3xl font-medium tracking-tight text-nordic-text md:text-5xl">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={cn(
                  "overflow-hidden rounded-2xl border transition-colors duration-200",
                  isOpen
                    ? "border-nordic-border bg-nordic-surface shadow-nordic-sm"
                    : "border-transparent bg-nordic-surface-hover hover:bg-nordic-border/50"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="font-heading text-xl font-medium text-nordic-text">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                      isOpen
                        ? "bg-nordic-accent text-white"
                        : "bg-nordic-border text-nordic-text-secondary"
                    )}
                  >
                    {isOpen ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </div>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-nordic-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
