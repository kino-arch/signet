import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { motion, type Variants } from "framer-motion"
import { Award, Target, Users, ShieldAlert } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Precision Targeting",
    description:
      "Generate highly targeted resumes that bypass Applicant Tracking Systems (ATS) and get you straight to the interview stage.",
  },
  {
    icon: Users,
    title: "Built for Professionals",
    description:
      "Designed by industry experts to highlight your strengths with clean, professional layouts that recruiters love.",
  },
  {
    icon: ShieldAlert,
    title: "Enterprise Standards",
    description:
      "Every template is tested against modern enterprise parsers to ensure your data is always read accurately.",
  },
  {
    icon: Award,
    title: "The Signet Quality",
    description:
      "No bloat, no distracting graphics. Pure data extracted and structured for maximum impact.",
  },
]

export function Testimonials() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section id="testimonials" className="w-full bg-background py-20 md:py-24">
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Badge className="mb-4" variant="secondary">
            Early Access
          </Badge>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Why Choose Signet?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We melt down your bloated work history and reforge it into
            streamlined, ATS-optimized assets for the modern job market.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((value) => {
            const Icon = value.icon
            return (
              <motion.div key={value.title} variants={itemVariants}>
                <Card className="group h-full border-border/50 bg-card/50 p-6 backdrop-blur transition-all hover:border-primary/50 hover:shadow-lg">
                  <div className="mb-4 inline-flex bg-secondary p-3">
                    <Icon className="h-6 w-6 text-foreground transition-transform group-hover:scale-110" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
