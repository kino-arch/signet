/**
 * @component SignetFeatureGrid
 * @category section
 * @maturity stable
 * @origin signet-native
 * @inspired-by aliimam/bento-grid-02 (reference only, not installed)
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
import { cn } from '@/lib/utils';
import { Brain, Search, FileText, Target } from 'lucide-react';

const features = [
  {
    title: 'AI Generation',
    description: 'Forge AI optimizes your resume layout and content instantly.',
    icon: Brain,
    size: 'large', // spans 2x2
  },
  {
    title: 'ATS Optimization',
    description: 'Bypass robotic filters with precisely calibrated keywords.',
    icon: Search,
    size: 'small',
  },
  {
    title: 'Cover Letters',
    description: 'Context-aware letters that read like you wrote them.',
    icon: FileText,
    size: 'small',
  },
  {
    title: 'Application Tracking',
    description: 'Never lose track of where you stand in the pipeline.',
    icon: Target,
    size: 'large', // spans 2x2
  }
];

export function SignetFeatureGrid() {
  return (
    <SignetSection variant="feature">
      <SignetWell size="wide">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-white">
            Engineered for Career Growth
          </h2>
          <p className="mt-4 text-lg text-signet-slate-400 leading-relaxed max-w-2xl mx-auto">
            From entry-level to executive, we build resumes that get you hired.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={cn(
                  feature.size === 'large' ? 'md:col-span-2 md:row-span-2' : '',
                  'group'
                )}
              >
                <SignetCard className="h-full bg-signet-surface-elevated border border-signet-border-subtle shadow-signet-card p-8 hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between gap-8">
                  <div className="w-12 h-12 rounded-lg bg-signet-cyan-500/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-signet-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                    <p className="mt-2 text-signet-slate-400">{feature.description}</p>
                  </div>
                </SignetCard>
              </motion.div>
            );
          })}
        </div>
      </SignetWell>
    </SignetSection>
  );
}
