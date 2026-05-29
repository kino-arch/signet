import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion, useInView, type Variants } from "framer-motion";
import { Award, Target, Users, ShieldAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const values = [
  {
    icon: Target,
    title: "The Mission",
    description: "To deliver indestructible resume signets that breach any ATS filter and secure your path to the interview.",
  },
  {
    icon: Users,
    title: "The Covert",
    description: "A collective of silent, efficient developers forging the future of professional presentation.",
  },
  {
    icon: ShieldAlert,
    title: "The Standard",
    description: "Every template is tested against enterprise parsers. If it shatters, we melt it down and start over.",
  },
  {
    icon: Award,
    title: "The Creed",
    description: "No bloat. No useless graphics. Pure data extracted and structured for maximum impact.",
  },
];

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Active Warriors",
    description: "Growing covert worldwide",
  },
  {
    icon: Target,
    value: 120,
    suffix: "+",
    label: "Guilds Breached",
    description: "Companies hiring our users",
  },
  {
    icon: ShieldAlert,
    value: 98,
    suffix: "%",
    label: "ATS Survival",
    description: "Perfect parse rate",
  },
  {
    icon: Award,
    value: 25,
    suffix: "k",
    label: "Signets Forged",
    description: "Documents generated",
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function TheCovert() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="covert" className="w-full bg-background py-20 md:py-24">
      <div className="relative z-10 container">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Badge className="mb-4" variant="secondary">The Covert</Badge>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Who We Are
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We are the armorers. We melt down your bloated work history and reforge it into streamlined, ATS-optimized weapons for the modern job market.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-32 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div key={value.title} variants={itemVariants}>
                <Card className="group h-full border-border/50 bg-card/50 p-6 backdrop-blur transition-all hover:border-primary/50 hover:shadow-lg">
                  <div className="mb-4 inline-flex rounded-lg bg-secondary p-3">
                    <Icon className="h-6 w-6 text-foreground transition-transform group-hover:scale-110" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:mb-16"
        >
          <Badge className="mb-4" variant="secondary">
            The Output
          </Badge>
          <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Numbers That Speak{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              For Themselves
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <Card className="group relative overflow-hidden border-border/50 bg-card p-6 text-center transition-all hover:border-primary/50 hover:shadow-2xl md:p-8">
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div transition={{ duration: 0.6 }} className="mb-4">
                      <div className="w-fit rounded-xl bg-secondary p-3">
                        <Icon className="h-6 w-6 text-foreground md:h-8 md:w-8" />
                      </div>
                    </motion.div>

                    <motion.div
                      className="mb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
                      initial={{ scale: 1 }}
                      whileInView={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </motion.div>

                    <h3 className="mb-1 text-base font-semibold text-foreground md:text-lg">
                      {stat.label}
                    </h3>
                    <p className="text-xs text-muted-foreground md:text-sm">
                      {stat.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
