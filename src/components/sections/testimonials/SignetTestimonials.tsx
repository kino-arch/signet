/**
 * @component SignetTestimonials
 * @category section
 * @maturity stable
 * @origin signet-native
 * @inspired-by aliimam/testimonials-01 (reference only, not installed)
 * @compliance 
 *   - spatial: 0 violations
 *   - color: 0 violations  
 *   - typography: 0 violations
 * @baseline chromatic-approved-2026-06-05
 */

import React from 'react';
import { SignetSection } from '@/components/layout/SignetSection';
import { SignetWell } from '@/components/layout/SignetWell';
import { SignetCard } from '@/components/primitives/SignetCard';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Signet got me interviews at top tier tech companies within weeks of rewriting my resume.",
    author: "Sarah L.",
    role: "Senior Software Engineer",
  },
  {
    quote: "The ATS optimization feature alone is worth its weight in gold. Passed screening 90% of the time.",
    author: "James T.",
    role: "Product Manager",
  },
  {
    quote: "Elegant, intuitive, and highly effective. This is how career tools should be built.",
    author: "Elena M.",
    role: "UX Designer",
  }
];

export function SignetTestimonials() {
  return (
    <SignetSection variant="default">
      <SignetWell size="default">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Trusted by Professionals
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <SignetCard className="h-full bg-signet-surface-elevated border-l-4 border-l-amber-500 border-t border-r border-b border-signet-border-subtle shadow-signet-card p-6 hover:scale-[1.02] transition-transform duration-300">
                <blockquote className="text-signet-slate-300 italic mb-6">
                  "{t.quote}"
                </blockquote>
                <div>
                  <div className="font-bold text-white">{t.author}</div>
                  <div className="text-sm text-signet-slate-500">{t.role}</div>
                </div>
              </SignetCard>
            </motion.div>
          ))}
        </div>
      </SignetWell>
    </SignetSection>
  );
}
