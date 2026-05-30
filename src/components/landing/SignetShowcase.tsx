import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Flame, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export function SignetShowcase() {
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="signets" className="relative w-full overflow-hidden bg-background py-24 md:py-32">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/[0.03] blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-[360px] w-[360px] rounded-full bg-primary/[0.05] blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-foreground/[0.02] blur-[150px]" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.header
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12 flex flex-col items-center gap-4 text-center"
        >
          <Badge variant="outline" className="gap-2">
            <Flame className="h-3.5 w-3.5" />
            The Signet Archive
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Choose Your Armor
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            Select from battle-tested resume templates designed to pass automated filters while leaving a lasting impression on human recruiters.
          </p>
        </motion.header>

        <motion.div
          className="grid auto-rows-[minmax(200px,auto)] gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {/* Card 1: Darksaber Signet (Featured) */}
          <motion.div variants={cardVariants} className="group col-span-1 sm:col-span-2 lg:row-span-2">
            <Card className="relative flex h-full flex-col justify-between overflow-hidden transition-all group-hover:-translate-y-1">
              <div className="absolute inset-0 z-0">
                 <img
                  src="/darksaber_signet.png"
                  alt="Darksaber Signet Layout"
                  className="absolute top-1/2 right-0 h-[120%] translate-x-1/4 -translate-y-1/2 object-contain opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
              </div>
              
              <div className="relative z-10 flex h-full flex-col justify-between p-6">
                <CardHeader className="space-y-4 p-0">
                  <div className="w-fit">
                    <Badge variant="secondary">Featured Layout</Badge>
                  </div>
                  <CardTitle className="max-w-[250px] font-heading text-2xl leading-tight font-bold md:text-3xl">
                    The Darksaber
                  </CardTitle>
                  <CardDescription className="max-w-[280px] text-sm md:text-base">
                    Aggressive, high-contrast, and commanding. Designed for tech leadership and senior engineering roles where impact is everything.
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-8 p-0">
                  <Button variant="default" className="group/cta gap-2 px-6 py-2">
                    Equip Signet
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1" />
                  </Button>
                </CardFooter>
              </div>
            </Card>
          </motion.div>

          {/* Card 2: Metrics / ATS */}
          <motion.div variants={cardVariants} className="group col-span-1 sm:col-span-2">
            <Card className="flex h-full flex-col p-6 transition-all group-hover:-translate-y-1">
              <CardHeader className="mb-6 flex flex-row items-center justify-between p-0">
                <Badge variant="outline">Performance</Badge>
                <motion.div animate={{ rotate: [0, -6, 0, 6, 0] }} transition={{ repeat: Infinity, duration: 10 }}>
                  <Shield className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </motion.div>
              </CardHeader>
              <CardContent className="grid gap-4 p-0 sm:grid-cols-3">
                <div>
                  <p className="text-xs tracking-widest text-muted-foreground uppercase">ATS Parse Rate</p>
                  <p className="mt-2 font-heading text-3xl font-bold text-foreground">99.4%</p>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">Machine readable</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest text-muted-foreground uppercase">Semantic Density</p>
                  <p className="mt-2 font-heading text-3xl font-bold text-foreground">High</p>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">Keyword rich</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest text-muted-foreground uppercase">Formatting</p>
                  <p className="mt-2 font-heading text-3xl font-bold text-foreground">Strict</p>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">Indestructible</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 3: Living Waters (Visual Showcase) */}
          <motion.div variants={cardVariants} className="group relative col-span-1 sm:col-span-2 lg:row-span-3">
            <Card className="relative flex h-full flex-col justify-end overflow-hidden transition-all group-hover:-translate-y-1">
              <div className="absolute inset-0 z-0">
                <img
                  src="/living_waters_signet.png"
                  alt="Living Waters Signet Layout"
                  className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              </div>
              <CardHeader className="relative z-10 space-y-4 p-6 md:p-8">
                <div className="w-fit">
                  <Badge variant="secondary">Creative Focus</Badge>
                </div>
                <CardTitle className="font-heading text-2xl font-bold tracking-tight text-foreground">
                  The Living Waters
                </CardTitle>
                <CardDescription className="max-w-sm text-sm text-muted-foreground md:text-base">
                  Fluid, elegant, and dynamic. A layout designed to showcase creative portfolios, frontend expertise, and design leadership.
                </CardDescription>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Typography", "Whitespace", "Flow"].map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs tracking-widest uppercase">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Card 4: Sprint/Process mapped to Features */}
          <motion.div variants={cardVariants} className="group col-span-1 sm:col-span-2 lg:row-span-2">
            <Card className="flex h-full flex-col p-6 transition-all group-hover:-translate-y-1">
              <CardHeader className="space-y-4 p-0">
                <div className="w-fit">
                  <Badge variant="outline">The Process</Badge>
                </div>
                <CardTitle className="font-heading text-xl font-bold tracking-tight md:text-2xl">
                  From raw data to indestructible armor in minutes
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  We compress the tedious formatting and layout tweaking into a streamlined forge process.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-8 space-y-5 p-0">
                {[
                  { label: "Extraction (Parsing)", progress: 100 },
                  { label: "Crucible (AI Refinement)", progress: 85 },
                  { label: "Anvil (Signet Formatting)", progress: 95 },
                ].map((step, index) => (
                  <div key={step.label} className="space-y-2">
                    <div className="flex items-center justify-between text-xs tracking-widest text-muted-foreground uppercase">
                      <span>{step.label}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${step.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 5: Gallery (Archives) */}
          <motion.div variants={cardVariants} className="group col-span-1 sm:col-span-2">
            <Card className="flex h-full flex-col p-6 transition-all group-hover:-translate-y-1">
              <CardHeader className="space-y-3 p-0">
                <div className="w-fit">
                  <Badge variant="outline">The Archives</Badge>
                </div>
                <CardTitle className="font-heading text-lg font-bold tracking-tight md:text-xl">
                  Masterful Typography
                </CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Access a curated vault of modern, highly-legible typefaces that ensure your narrative is read effortlessly.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative mt-6 min-h-[160px] flex-grow overflow-hidden  border border-border p-0">
                <img
                  src="/archives_gallery.png"
                  alt="Glowing cyan futuristic runic typography"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
