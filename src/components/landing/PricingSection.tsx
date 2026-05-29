"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

const plans = [
  {
    id: "foundling",
    name: "Foundling Dossier",
    price: "$5",
    tokens: 1,
    description: "Secure one full-access single-column resume export. Perfect for a targeted application.",
    features: [
      "1 Beskar Token (1 Full Export)",
      "1 Dossier Forge Authorization",
      "Pure Beskar layout template access",
      "Standard PDF render download",
    ],
    popular: false,
  },
  {
    id: "guild",
    name: "Guild Contractor",
    price: "$15",
    tokens: 5,
    description: "Receive 5 Beskar Tokens. Edit, iterate, and customize multiple sigil variations.",
    features: [
      "5 Beskar Tokens (5 Full Exports)",
      "5 Dossier Forge Authorizations",
      "Full chassis template library access",
      "Advanced custom sigil support",
      "Priority Holonet pipeline routing",
    ],
    popular: true,
  },
  {
    id: "syndicate",
    name: "Mandalore Syndicate",
    price: "$35",
    tokens: 15,
    description: "An unlimited tactical reserve of 15 Beskar Tokens. Command the hiring market.",
    features: [
      "15 Beskar Tokens (15 Full Exports)",
      "15 Dossier Forge Authorizations",
      "Full tactical template library access",
      "Unlimited profile/sigil variations",
      "Elite client-side profile parsing",
      "Clan emblem watermark bypass",
    ],
    popular: false,
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handlePlanSelect = (planId: string) => {
    if (!user) {
      navigate(`/login?redirect=/editor?buy_package=${planId}`);
    } else {
      navigate(`/editor?buy_package=${planId}`);
    }
  };

  return (
    <section
      ref={ref}
      id="pricing"
      className="w-full bg-background px-4 py-12 sm:py-16 md:py-20 lg:py-24"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:mb-14 md:mb-16"
        >
          <h2
            id="pricing-heading"
            className="mb-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-4xl md:text-5xl"
          >
            The Bounty Exchange
          </h2>
          <p className="mx-auto max-w-2xl px-4 text-base text-muted-foreground sm:text-lg">
            Secure the assets you need to complete your mission.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const cardContent = (
              <Card
                className={cn(
                  "relative flex h-full w-full flex-col overflow-hidden transition-all duration-200",
                  plan.popular ? "border-none bg-background rounded-3xl" : "shadow-md hover:shadow-lg bg-background"
                )}
                role="article"
                aria-label={`${plan.name} plan${plan.popular ? ', most popular' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                    <Badge
                      variant="default"
                      className="text-xs font-medium sm:text-sm shadow-[0_0_15px_rgba(var(--primary),0.5)]"
                      aria-label="Most popular plan"
                    >
                      Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="px-4 pt-6 pb-6 sm:px-6 sm:pt-8 sm:pb-8">
                  <CardTitle className="font-heading text-lg font-bold sm:text-xl text-foreground">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-3 flex items-baseline gap-1.5 sm:mt-4">
                    <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      {plan.price}
                    </span>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-primary">
                      / {plan.tokens} {plan.tokens === 1 ? "token" : "tokens"}
                    </span>
                  </div>
                  <CardDescription className="mt-2 text-sm sm:text-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-1 flex-col justify-between gap-6 px-4 pb-6 sm:gap-8 sm:px-6 sm:pb-8">
                  <ul
                    className="space-y-2.5 sm:space-y-3"
                    role="list"
                    aria-label={`${plan.name} plan features`}
                  >
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground sm:gap-3"
                      >
                        <div
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                          aria-hidden="true"
                        >
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={cn(
                      "w-full text-sm font-semibold transition-all sm:text-base",
                      plan.popular ? "font-bold shadow-md shadow-primary/10 hover:shadow-primary/20" : ""
                    )}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    aria-label={`Forge dossier with ${plan.name} for ${plan.price}`}
                  >
                    Forge Dossier
                  </Button>
                </CardContent>
              </Card>
            );

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex"
              >
                {plan.popular ? (
                  <NeonGradientCard
                    className="w-full"
                    borderSize={2}
                    borderRadius={24}
                    neonColors={{ firstColor: "hsl(var(--primary))", secondColor: "hsl(var(--primary) / 0.5)" }}
                  >
                    {cardContent}
                  </NeonGradientCard>
                ) : (
                  <div className="w-full">{cardContent}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
