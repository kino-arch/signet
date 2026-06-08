import { motion, type Variants } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  FileText,
  LayoutTemplate,
  Database,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { RippleButton } from "@/components/ui/ripple-button"

export function AtsSpecsPage() {
  const navigate = useNavigate()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  }

  return (
    <div className="min-h-safe bg-background">
      {/* Navigation */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Base
          </Link>
          <div className="flex items-center gap-2 font-heading font-bold tracking-widest text-primary">
            SIGNET <span className="text-muted-foreground">INTEL</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-24 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-5xl space-y-16"
        >
          {/* Header */}
          <div className="space-y-4 text-center">
            <motion.div variants={itemVariants}>
              <Badge
                variant="destructive"
                className="mb-4 px-4 py-1 tracking-widest uppercase"
              >
                <ShieldAlert className="mr-2 h-3.5 w-3.5" />
                Intelligence Report: CRITICAL
              </Badge>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-style-heading-lg tracking-tight md:text-5xl lg:text-7xl"
            >
              The 43% Failure Rate
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl"
            >
              Corporate Applicant Tracking Systems (ATS) like Workday, Taleo,
              and Greenhouse use legacy parsers that destroy complex layouts.
              Here is why flashy resumes fail, and how "The FAANG Executive"
              data-slate guarantees survival.
            </motion.p>
          </div>

          {/* Comparison Cards */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* The Flashy Failure */}
            <motion.div variants={itemVariants} className="flex h-full">
              <Card className="relative flex w-full flex-col overflow-hidden border-destructive/20 bg-destructive/5 transition-colors hover:border-destructive/40 hover:bg-destructive/10">
                <div className="absolute top-0 right-0 bg-destructive/10 px-4 py-1.5 text-xs font-bold tracking-wider text-destructive uppercase">
                  Rejected
                </div>
                <CardContent className="flex flex-1 flex-col p-8 md:p-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center bg-destructive/10 text-destructive shadow-inner">
                    <XCircle className="h-7 w-7" />
                  </div>
                  <h2 className="mb-4 text-style-heading text-foreground">
                    The "Flashy" Two-Column
                  </h2>
                  <ul className="space-y-4 text-base text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <LayoutTemplate className="mt-1 h-5 w-5 shrink-0 text-destructive/70" />
                      <span>
                        Columns are read left-to-right, blending job titles with
                        sidebar skills.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="mt-1 h-5 w-5 shrink-0 text-destructive/70" />
                      <span>
                        Icons and skill progress bars are completely invisible
                        to text parsers.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Database className="mt-1 h-5 w-5 shrink-0 text-destructive/70" />
                      <span>
                        <strong className="font-semibold text-foreground">
                          Result:
                        </strong>{" "}
                        Profile is marked "Incomplete" and instantly archived.
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* The Signet Solution */}
            <motion.div variants={itemVariants} className="flex h-full">
              <Card className="relative flex w-full flex-col overflow-hidden border-primary/30 bg-primary/5 transition-colors hover:border-primary/50 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/5">
                <div className="absolute top-0 right-0 bg-primary/15 px-4 py-1.5 text-xs font-bold tracking-wider text-primary uppercase">
                  Verified
                </div>
                <CardContent className="flex flex-1 flex-col p-8 md:p-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center bg-primary/15 text-primary shadow-inner">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h2 className="mb-4 text-style-heading text-foreground">
                    The FAANG Executive
                  </h2>
                  <ul className="space-y-4 text-base text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <LayoutTemplate className="mt-1 h-5 w-5 shrink-0 text-primary/70" />
                      <span>
                        Strict top-to-bottom hierarchy guarantees 100% accurate
                        data extraction.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FileText className="mt-1 h-5 w-5 shrink-0 text-primary/70" />
                      <span>
                        Pure text content styled with high-end Inter and DM Sans
                        typography.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Database className="mt-1 h-5 w-5 shrink-0 text-primary/70" />
                      <span>
                        <strong className="font-semibold text-foreground">
                          Result:
                        </strong>{" "}
                        Parsed flawlessly. Ranked as top candidate match.
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center pt-10 text-center"
          >
            <h2 className="mb-8 text-style-heading-lg">
              Ready to bypass the filter?
            </h2>
            <RippleButton
              size="lg"
              className="w-full text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 sm:w-auto sm:px-12 sm:py-6"
              onClick={() => navigate("/editor")}
            >
              Equip The FAANG Executive Data-Slate
            </RippleButton>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
