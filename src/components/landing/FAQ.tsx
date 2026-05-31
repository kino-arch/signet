import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "How does the token system work?",
    answer:
      "Each token allows you to generate and export one finalized, ATS-optimized resume. The base builder is free to use—you only spend a token when you're ready to export your final document.",
  },
  {
    question: "Will this pass corporate ATS systems?",
    answer:
      "Yes. Every template we provide is rigorously tested against modern ATS (Applicant Tracking Systems) like Workday, Taleo, and Greenhouse to ensure your data is extracted perfectly.",
  },
  {
    question: "How does the AI Reforging work?",
    answer:
      "You input your raw work history, and our AI agents analyze the specific job description you're targeting. They then suggest high-impact verbs and metrics to reforge your bullet points for maximum relevance.",
  },
  {
    question: "Can I export to PDF?",
    answer:
      "Absolutely. Your resume can be instantly exported to a highly optimized, machine-readable PDF.",
  },
  {
    question: "Is my data secure?",
    answer:
      "We operate under a strict code. Your data is encrypted, and we do not sell your history or contact information to third-party recruiters.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="w-full bg-background py-16 md:py-24">
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <Badge className="mb-4" variant="secondary">
            <HelpCircle className="mr-2 h-3 w-3" />
            FAQ
          </Badge>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Answers to common questions from professionals seeking to upgrade their career assets.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-border/50 bg-card p-6 shadow-md">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base font-semibold transition-colors hover:text-primary md:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center md:mt-16"
        >
          <Card className="border-border/50 bg-secondary/20 p-6 md:p-8">
            <MessageCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-bold text-foreground md:text-2xl">
              Still have questions?
            </h3>
            <p className="mb-6 text-sm text-muted-foreground md:text-base">
              If you didn't find the answer you need, transmit a signal to our support team.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="default">
                <a href="mailto:support@signet.com">Contact Support</a>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
