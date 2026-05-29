import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Flame, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const benefits = [
  "No Beskar Required (Free Tier)",
  "ATS Indestructible",
  "Instant Live Preview",
];

export function CTASection() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/login");
  };
  return (
    <section id="forge" className="relative w-full overflow-hidden bg-background py-16 md:py-24 lg:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl md:h-[600px] md:w-[600px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl md:h-[600px] md:w-[600px]"
        />
      </div>

      <div className="relative z-10 container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="mb-4 md:mb-6" variant="secondary">
                <Flame className="mr-2 h-3 w-3" />
                The Great Forge Awaits
              </Badge>
            </motion.div>

            <motion.h2
              className="mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text font-heading text-4xl font-bold tracking-tight text-transparent md:mb-6 md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Survive the <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Corporate Galaxy</span>
            </motion.h2>

            <motion.p
              className="mb-6 text-base text-muted-foreground md:mb-8 md:text-lg lg:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Earthlings: Stop losing opportunities to automated filters. Step into the forge and construct an indestructible, FAANG-ready signet.
            </motion.p>

            {/* Email signup form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6 md:mb-8"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Enter your comm-link (email)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 flex-1 text-base md:h-14"
                  required
                />
                <Button type="submit" variant="default" size="lg" className="group h-12 md:h-14">
                  Forge Corporate Resume
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Button>
              </form>
            </motion.div>

            {/* Benefits list */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 md:gap-6"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-muted-foreground md:text-base">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8 flex flex-wrap items-center gap-4 md:mt-12"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + i * 0.1, type: "spring" }}
                    className="h-10 w-10 overflow-hidden rounded-full border-2 border-background"
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=mando${i}`}
                      alt={`Warrior ${i}`}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-foreground">10,000+</span>
                <span className="text-muted-foreground"> Signets Forged</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="flex items-center justify-center"
          >
            <motion.div
              className="relative w-full max-w-lg"
            >
              <Card className="relative overflow-hidden bg-background/50 p-4 shadow-2xl backdrop-blur-xl md:p-6">
                <motion.div
                  className="relative aspect-video overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  <img 
                    src="/the_great_forge.png" 
                    alt="The Great Forge"
                    className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-background/40 to-transparent" />

                  {/* Floating elements */}
                  <motion.div
                    className="absolute top-4 right-4 rounded-lg bg-background/80 p-2 shadow-lg backdrop-blur-sm md:p-3"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Flame className="h-4 w-4 text-primary md:h-5 md:w-5" />
                  </motion.div>

                  <motion.div
                    className="absolute bottom-4 left-4 rounded-lg bg-background/80 p-2 shadow-lg backdrop-blur-sm md:p-3"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <Shield className="h-4 w-4 text-primary md:h-5 md:w-5" />
                  </motion.div>
                </motion.div>

                {/* Stats overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-4 grid grid-cols-3 gap-2 md:gap-4"
                >
                  {[
                    { label: "Forges Active", value: "24/7" },
                    { label: "Parse Rate", value: "99%" },
                    { label: "Guilds", value: "50+" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 1.3 + index * 0.1,
                        type: "spring",
                      }}
                      className="rounded-lg bg-secondary/50 p-2 text-center backdrop-blur-sm md:p-3"
                    >
                      <div className="text-base font-bold md:text-lg">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-xs tracking-wider text-muted-foreground uppercase">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
