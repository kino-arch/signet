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
import { Check, Info } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useLocalizedPricing, formatPrice } from "@/hooks/useLocalizedPricing";

const plans = [
  {
    id: "foundling",
    name: "Starter",
    priceUsd: 3.99,
    tokens: 2,
    description: "Generate and export 2 targeted resumes. Perfect for a quick job hunt.",
    features: [
      "2 AI-Assisted Exports",
      "Full template library access",
      "Standard PDF render download",
    ],
    popular: false,
  },
  {
    id: "guild",
    name: "Professional",
    priceUsd: 7.99,
    tokens: 5,
    description: "Receive 5 exports. Edit, iterate, and customize multiple variations.",
    features: [
      "5 AI-Assisted Exports",
      "Full template library access",
      "Advanced AI restructuring",
      "Priority processing",
    ],
    popular: true,
  },
  {
    id: "syndicate",
    name: "Elite",
    priceUsd: 9.99,
    tokens: 10,
    description: "A strategic reserve of 10 exports. Command the hiring market.",
    features: [
      "10 AI-Assisted Exports",
      "Full template library access",
      "Unlimited profile variations",
      "Priority support",
    ],
    popular: false,
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const localization = useLocalizedPricing();

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
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:mb-14 md:mb-16"
        >
          <h2
            id="pricing-heading"
            className="mb-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl px-4 text-base text-muted-foreground sm:text-lg">
            Secure the assets you need to land your next role. One token = One final resume export.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const displayPrice = formatPrice(plan.priceUsd, localization);
            
            const cardContent = (
              <Card
                className={cn(
                  "relative flex h-full w-full flex-col overflow-hidden transition-all duration-200",
                  plan.popular ? "border-none bg-background " : "shadow-md hover:shadow-lg bg-background"
                )}
                role="article"
                aria-label={`${plan.name} plan${plan.popular ? ', most popular' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-3 right-3 z-10 sm:top-4 sm:right-4">
                    <Badge
                      variant="default"
                      className="text-xs font-medium shadow-[0_0_15px_rgba(var(--primary),0.5)] sm:text-sm"
                      aria-label="Most popular plan"
                    >
                      Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="px-4 pt-6 pb-6 sm:px-6 sm:pt-8 sm:pb-8">
                  <CardTitle className="font-heading text-lg font-bold text-foreground sm:text-xl">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-3 flex items-baseline gap-1.5 sm:mt-4">
                    <span className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                      {localization.loading ? "..." : displayPrice}
                    </span>
                    <span className="font-mono text-[11px] font-bold tracking-wider text-primary uppercase">
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
                    aria-label={`Buy ${plan.name} plan`}
                  >
                    Select Plan
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
        
        {/* Localized Pricing Disclaimer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <Info className="h-4 w-4" />
          <span>Prices are estimates based on your location. Final exact pricing in your local currency is calculated securely at checkout.</span>
        </motion.div>
      </div>
    </section>
  );
}
