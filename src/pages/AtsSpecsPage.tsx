import { motion, type Variants } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldAlert, CheckCircle2, XCircle, FileText, LayoutTemplate, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RippleButton } from "@/components/ui/ripple-button";

export function AtsSpecsPage() {
  const navigate = useNavigate();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Base
          </Link>
          <div className="flex items-center gap-2 font-heading font-bold tracking-widest text-primary">
            SIGNET <span className="text-muted-foreground">INTEL</span>
          </div>
        </div>
      </nav>

      <main className="container pt-24 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl space-y-12"
        >
          {/* Header */}
          <div className="space-y-4 text-center">
            <motion.div variants={itemVariants}>
              <Badge variant="destructive" className="mb-4">
                <ShieldAlert className="mr-2 h-3 w-3" />
                Intelligence Report: CRITICAL
              </Badge>
            </motion.div>
            <motion.h1 variants={itemVariants} className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              The 43% Failure Rate
            </motion.h1>
            <motion.p variants={itemVariants} className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Corporate Applicant Tracking Systems (ATS) like Workday, Taleo, and Greenhouse use legacy parsers that destroy complex layouts. Here is why flashy resumes fail, and how "The FAANG Executive" data-slate guarantees survival.
            </motion.p>
          </div>

          {/* Comparison Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* The Flashy Failure */}
            <motion.div variants={itemVariants}>
              <Card className="relative overflow-hidden border-destructive/20 bg-destructive/5">
                <div className="absolute top-0 right-0 rounded-bl-lg bg-destructive/10 px-3 py-1 text-xs font-bold text-destructive uppercase tracking-wider">
                  Rejected
                </div>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                    <XCircle className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-heading text-xl font-bold text-foreground">The "Flashy" Two-Column</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <LayoutTemplate className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" />
                      <span>Columns are read left-to-right, blending job titles with sidebar skills.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" />
                      <span>Icons and skill progress bars are completely invisible to text parsers.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Database className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" />
                      <span>Result: Profile is marked "Incomplete" and instantly archived.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* The Signet Solution */}
            <motion.div variants={itemVariants}>
              <Card className="relative overflow-hidden border-primary/20 bg-primary/5">
                <div className="absolute top-0 right-0 rounded-bl-lg bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                  Verified
                </div>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-heading text-xl font-bold text-foreground">The FAANG Executive</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <LayoutTemplate className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                      <span>Strict top-to-bottom hierarchy guarantees 100% accurate data extraction.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                      <span>Pure text content styled with high-end Inter and DM Sans typography.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Database className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                      <span>Result: Parsed flawlessly. Ranked as top candidate match.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center pt-8 text-center">
            <h2 className="mb-6 font-heading text-2xl font-bold">Ready to bypass the filter?</h2>
            <RippleButton size="lg" className="w-full sm:w-auto sm:px-12" onClick={() => navigate("/editor")}>
              Equip The FAANG Executive Data-Slate
            </RippleButton>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
