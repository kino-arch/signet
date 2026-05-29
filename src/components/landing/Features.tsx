import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, type Variants } from "framer-motion";

export function Features() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const features = [
    {
      title: "The Armorer's Tongs",
      description: "Extract the purest metals from your scattered history. We automatically parse your LinkedIn or old PDF resumes into raw data.",
      image: "/tongs_anim.png",
    },
    {
      title: "The Crucible",
      description: "Melt down redundancies. Our AI assistant analyzes your experiences and suggests high-impact bullet points tailored to your target role.",
      image: "/crucible_anim.png",
    },
    {
      title: "The Anvil",
      description: "Strike it into shape. Our single-column 'Beskar' layouts are 100% compliant with Workday, Taleo, and Greenhouse ATS parsers.",
      image: "/anvil_anim.png",
    },
  ];

  return (
    <section id="features" className="relative w-full overflow-hidden bg-background py-24 md:py-32">
      {/* Subtle background glow to match the glassmorphism theme */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"></div>

      <div className="relative z-10 container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 flex flex-col items-center justify-center space-y-4 text-center"
        >
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            The Tools of the Forge
          </h2>
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Everything you need to survive the corporate hiring matrix. Built for Earthlings applying to FAANG, Big Tech, and Global MNCs.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="group h-full cursor-pointer border-border/50 bg-background/50 p-6 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 md:p-8">
                <CardHeader className="p-0">
                  <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl border border-primary/10 bg-primary/5 transition-all duration-500 group-hover:scale-110 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_rgba(var(--color-primary),0.2)] md:mx-0">
                    <img src={feature.image} alt={feature.title} className="h-16 w-16 object-contain" />
                  </div>
                  <CardTitle className="mb-4 text-center text-2xl font-bold tracking-tight md:text-left">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <CardDescription className="text-center text-base leading-relaxed text-muted-foreground md:text-left">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
