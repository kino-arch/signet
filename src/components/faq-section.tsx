import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What’s included in a token pack?",
    answer:
      "Each token allows you to generate and export one highly-optimized resume in PDF format. You maintain access to the digital version in the platform to edit anytime.",
  },
  {
    question: "Do tokens expire?",
    answer:
      "No, your tokens act as a strategic reserve. They do not expire and will remain in your account until you deploy them for an export.",
  },
  {
    question: "Can I build a resume for free?",
    answer:
      "Absolutely. You can use the Signet editor, import data, and preview your forged resume entirely for free. You only need a token when you are ready to export the final ATS-optimized PDF.",
  },
  {
    question: "Are there subscription plans?",
    answer:
      "Signet operates strictly on a pay-per-export token system. We believe professionals shouldn't be trapped in monthly subscriptions when they only need to hunt for a job occasionally.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Security is a top priority. We use industry-standard encryption and best practices to ensure your professional data remains protected at all times.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply create your account, connect your existing data or start from scratch, and begin forging your resume immediately.",
  },
]

export function FAQSection() {
  return (
    <div id="specs" className="flex w-full items-start justify-center">
      <div className="flex flex-1 flex-col gap-6 px-4 py-16 md:px-12 md:py-20 lg:flex-row lg:gap-12">
        <div className="flex w-full flex-col gap-4 lg:flex-1 lg:py-5">
          <h2 className="text-4xl leading-tight font-semibold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base leading-7">
            Everything you need to know about our pricing,
            <br className="hidden md:block" />
            plans, and billing.
          </p>
        </div>

        <div className="w-full lg:flex-1">
          <Accordion type="single" className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b"
              >
                <AccordionTrigger className="p-5 text-left text-base font-medium hover:no-underline">
                  {item.question}
                </AccordionTrigger>

                <AccordionContent className="p-5 text-sm leading-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
