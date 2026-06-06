/**
 * @component SignetFooter
 * @category section
 * @maturity stable
 * @origin signet-native
 * @compliance 
 *   - spatial: 0 violations
 *   - color: 0 violations  
 *   - typography: 0 violations
 */

import React from 'react';
import { SignetWell } from '@/components/layout/SignetWell';
import { SignetIcon } from '@/components/primitives/SignetIcon';

export function SignetFooter() {
  return (
    <footer className="border-t border-signet-border-subtle bg-signet-surface-base py-16">
      <SignetWell size="wide">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-start">
          {/* Column 1: Logo + Tagline */}
          <div className="col-span-2 md:col-span-1 space-y-6">
            <div className="flex items-center space-x-2 text-white">
              {/* Logo SVG (24px height) */}
              <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-bold text-lg tracking-tight">Signet</span>
            </div>
            <p className="text-signet-slate-400 text-sm max-w-xs">
              Transform scattered experience into a polished, ATS-optimized resume.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-signet-slate-400 hover:text-signet-cyan-400 transition-colors">
                <SignetIcon name="twitter" className="w-5 h-5" />
              </a>
              <a href="#" className="text-signet-slate-400 hover:text-signet-cyan-400 transition-colors">
                <SignetIcon name="github" className="w-5 h-5" />
              </a>
              <a href="#" className="text-signet-slate-400 hover:text-signet-cyan-400 transition-colors">
                <SignetIcon name="linkedin" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="font-semibold text-signet-slate-500 text-sm uppercase tracking-wider">Product</h3>
            <ul className="mt-6 space-y-3">
              <li><a href="#" className="text-signet-slate-400 hover:text-white transition-colors text-sm">Resume Builder</a></li>
              <li><a href="#" className="text-signet-slate-400 hover:text-white transition-colors text-sm">ATS Optimizer</a></li>
              <li><a href="#" className="text-signet-slate-400 hover:text-white transition-colors text-sm">Templates</a></li>
              <li><a href="#" className="text-signet-slate-400 hover:text-white transition-colors text-sm">Pricing</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="font-semibold text-signet-slate-500 text-sm uppercase tracking-wider">Company</h3>
            <ul className="mt-6 space-y-3">
              <li><a href="#" className="text-signet-slate-400 hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-signet-slate-400 hover:text-white transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-signet-slate-400 hover:text-white transition-colors text-sm">Contact</a></li>
              <li><a href="#" className="text-signet-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h3 className="font-semibold text-signet-slate-500 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="mt-6 space-y-3">
              <li><a href="#" className="text-signet-slate-400 hover:text-white transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-signet-slate-400 hover:text-white transition-colors text-sm">Career Advice</a></li>
              <li><a href="#" className="text-signet-slate-400 hover:text-white transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-signet-slate-400 hover:text-white transition-colors text-sm">System Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-signet-border-subtle flex flex-col md:flex-row justify-between items-center">
          <p className="text-signet-slate-500 text-sm">
            © 2026 Signet. All rights reserved.
          </p>
        </div>
      </SignetWell>
    </footer>
  );
}
