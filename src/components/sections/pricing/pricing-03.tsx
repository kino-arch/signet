import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SignetSection } from '@/components/layout/SignetSection';
import { SignetWell } from '@/components/layout/SignetWell';
import { QuantumSlider } from '@/components/forge/forge-glow';
import { cn } from '@/lib/utils';

export default function PricingSection03() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const [billingCycle, setBillingCycle] = useState('Monthly');

  return (
    <SignetSection variant="feature" className="py-24">
      <SignetWell size="default" className="max-w-5xl">
        <div className="flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold mb-8 text-center"
          >
            Pricing Plans
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-12"
          >
            <QuantumSlider 
              value={billingCycle}
              onChange={setBillingCycle}
              labels={['Monthly', 'Annual']}
              accentColor="signet-amber-500"
            />
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
          >
            {/* Starter */}
            <motion.div variants={item} className="p-8 rounded-xl bg-signet-surface-elevated border border-signet-border-subtle shadow-signet-card flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.02]">
              <h3 className="text-xl font-bold mb-4">Starter</h3>
              <div className="text-5xl font-black mb-6">
                ${billingCycle === 'Monthly' ? '19' : '15'}
                <span className="text-lg font-medium text-muted-foreground">/mo</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-4 mb-8 flex-1">
                <li>Up to 5 projects</li>
                <li>Basic support</li>
                <li>10GB storage</li>
              </ul>
              <button className="w-full bg-secondary text-secondary-foreground py-3 rounded-md font-medium border border-signet-border-subtle hover:brightness-110 transition-all active:scale-95">
                Get Started
              </button>
            </motion.div>

            {/* Pro */}
            <motion.div variants={item} className="p-8 rounded-xl bg-signet-surface-elevated border-2 border-signet-amber-500 shadow-signet-cta shadow-signet-amber-500/20 flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.02] relative">
              <div className="absolute top-0 transform -translate-y-1/2 bg-signet-amber-500 text-signet-navy-950 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-4">Pro</h3>
              <div className="text-5xl font-black mb-6">
                ${billingCycle === 'Monthly' ? '49' : '39'}
                <span className="text-lg font-medium text-signet-slate-400">/mo</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-4 mb-8 flex-1">
                <li>Unlimited projects</li>
                <li>Priority support</li>
                <li>100GB storage</li>
              </ul>
              <button className="w-full bg-signet-amber-500 text-signet-navy-950 py-3 rounded-md font-bold shadow-signet-cta hover:brightness-110 transition-all active:scale-95">
                Get Started
              </button>
            </motion.div>

            {/* Premium */}
            <motion.div variants={item} className="p-8 rounded-xl bg-signet-surface-elevated border border-signet-border-subtle shadow-signet-card flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.02]">
              <h3 className="text-xl font-bold mb-4">Premium</h3>
              <div className="text-5xl font-black mb-6">
                ${billingCycle === 'Monthly' ? '99' : '79'}
                <span className="text-lg font-medium text-muted-foreground">/mo</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-4 mb-8 flex-1">
                <li>Enterprise features</li>
                <li>24/7 support</li>
                <li>Unlimited storage</li>
              </ul>
              <button className="w-full bg-secondary text-secondary-foreground py-3 rounded-md font-medium border border-signet-border-subtle hover:brightness-110 transition-all active:scale-95">
                Get Started
              </button>
            </motion.div>
          </motion.div>
        </div>
      </SignetWell>
    </SignetSection>
  );
}
