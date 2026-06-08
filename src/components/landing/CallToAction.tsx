import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export function CallToAction() {
  const benefits = [
    "14-day free trial",
    "No credit card required",
    "Enterprise-grade security",
    "24/7 Priority support",
  ];

  return (
    <section id="pricing" className="w-full bg-nordic-bg py-24">
      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-none border border-nordic-border bg-nordic-surface shadow-nordic-lg"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Content */}
            <div className="p-10 md:p-14 lg:p-16">
              <h2 className="font-heading text-3xl font-medium tracking-tight text-nordic-text md:text-4xl">
                Transform Your Workflow
              </h2>
              <p className="mt-4 text-lg text-nordic-text-secondary leading-relaxed">
                Join thousands of developers building the future of integrations. Start your 14-day free trial today.
              </p>

              <ul className="mt-8 space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-nordic-text-secondary">
                    <CheckCircle2 className="h-5 w-5 text-nordic-success shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Pricing Card area */}
            <div className="flex flex-col justify-center bg-nordic-surface-hover p-10 md:p-14 lg:p-16 border-t md:border-t-0 md:border-l border-nordic-border-subtle">
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wider text-nordic-accent">
                    Pro Builder
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tight text-nordic-text">$0</span>
                    <span className="text-nordic-text-secondary">/ month</span>
                  </div>
                  <p className="mt-3 text-sm text-nordic-text-secondary">
                    Start exploring API endpoints with our generously free sandbox tier.
                  </p>
                </div>

                <div className="pt-4">
                  <Link to="/dashboard" className="nordic-btn-primary w-full justify-between group">
                    <span>Start your free trial</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <p className="mt-3 text-center text-xs text-nordic-text-tertiary">
                    Takes less than 2 minutes to sign up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
