import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface PricingPlan {
  name: string
  price: string
  tokens: string
  description: string
  features: string[]
  popular?: boolean
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: "₹380",
    tokens: "2 tokens",
    description:
      "Generate and export 2 targeted resumes. Perfect for a quick job hunt.",
    features: [
      "2 AI-Assisted Exports",
      "Full template library access",
      "Standard PDF render download",
    ],
  },
  {
    name: "Professional",
    price: "₹761",
    tokens: "5 tokens",
    description:
      "Receive 5 exports. Edit, iterate, and customize multiple variations.",
    features: [
      "5 AI-Assisted Exports",
      "Full template library access",
      "Advanced AI restructuring",
      "Priority processing",
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: "₹951",
    tokens: "10 tokens",
    description:
      "A strategic reserve of 10 exports. Command the hiring market.",
    features: [
      "10 AI-Assisted Exports",
      "Full template library access",
      "Unlimited profile variations",
      "Priority support",
    ],
  },
]

export function PricingSection() {
  return (
    <section id="the-forge" className="flex w-full flex-col items-center justify-center py-16 md:py-24">
      <div className="flex w-full max-w-4xl flex-col items-center gap-3 px-4 sm:px-6">
        <Badge variant="outline" className="border-primary/30 bg-primary/5 font-mono tracking-wider text-primary">
          [ STRATEGIC RESERVES ]
        </Badge>
        <h2 className="max-w-xl text-center text-2xl font-semibold tracking-tight uppercase sm:text-3xl md:text-4xl">
          Acquire Target Assets
        </h2>
        <p className="max-w-lg text-center text-sm leading-6 text-muted-foreground">
          Choose a token pack that fits your career campaign
          <br className="hidden sm:block" />
          with no hidden fees and instant availability.
        </p>
      </div>

      <div className="mt-12 grid w-full max-w-5xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col overflow-hidden transition-all duration-500 ${
              plan.popular
                ? "border-primary/50 shadow-[0_0_30px_var(--color-primary)] hover:shadow-[0_0_40px_var(--color-primary)]"
                : "border-border/50 hover:border-primary/30"
            }`}
          >
            {plan.popular && (
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
            )}
            <CardHeader className="relative z-10 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-lg font-semibold uppercase">{plan.name}</h3>
                {plan.popular && (
                  <Badge variant="default" className="animate-pulse font-mono">RECOMMENDED</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {plan.description}
              </p>
            </CardHeader>

            <CardContent className="flex-1 space-y-6">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  / {plan.tokens}
                </p>
              </div>

              <ul className="space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="relative z-10">
              <Button
                size="lg"
                variant={plan.popular ? "default" : "outline"}
                className="w-full font-mono font-bold tracking-wider"
              >
                ACQUIRE ASSET
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
