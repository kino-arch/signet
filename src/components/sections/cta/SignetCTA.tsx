/**
 * @component SignetCTA
 * @category section
 * @maturity stable
 * @origin signet-native
 * @compliance 
 *   - spatial: 0 violations
 *   - color: 0 violations  
 *   - typography: 0 violations
 */

import React from 'react';
import { SignetSection } from '@/components/layout/SignetSection';
import { SignetWell } from '@/components/layout/SignetWell';
import { SignetButton } from '@/components/primitives/SignetButton';

export function SignetCTA() {
  return (
    <SignetSection variant="cta" className="bg-signet-hero-depth">
      <SignetWell size="default">
        <div className="flex flex-col items-center text-center justify-center space-y-8 py-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-white">
              Ready to land your dream job?
            </h2>
            <p className="text-lg text-signet-slate-400 max-w-xl mx-auto">
              Join 43,000+ professionals who built their resumes with Signet.
            </p>
          </div>
          
          <div className="relative group">
            {/* The "Atmospheric Amber" Signature pulse glow */}
            <div className="absolute -inset-2 bg-signet-amber-500/30 rounded-full blur-xl opacity-30 group-hover:opacity-50 animate-pulse transition-opacity duration-4000" />
            <SignetButton 
              size="lg" 
              variant="primary" 
              className="relative bg-signet-amber-500 hover:bg-signet-amber-400 px-8 py-4 shadow-signet-cta hover:scale-105 hover:brightness-110 shadow-lg transition-all duration-300"
            >
              Build Your Resume — Free
            </SignetButton>
          </div>
        </div>
      </SignetWell>
    </SignetSection>
  );
}
