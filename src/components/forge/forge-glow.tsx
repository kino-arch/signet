import React from 'react';
import { motion } from 'framer-motion';

export interface ForgeGlowProps {
  children?: React.ReactNode;
  active?: boolean;
}

export function ForgeGlow({ children, active = true }: ForgeGlowProps) {
  if (!active) return <>{children}</>;
  
  return (
    <div className="relative inline-block">
      {/* Ambient background pulse */}
      <motion.div
        className="absolute inset-0 z-0 rounded-xl bg-signet-amber-500/20 blur-xl pointer-events-none"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export interface QuantumSliderProps {
  value: string;
  onChange: (val: string) => void;
  labels: [string, string];
  accentColor?: string;
}

export function QuantumSlider({ value, onChange, labels, accentColor = "signet-amber-500" }: QuantumSliderProps) {
  const isRight = value === labels[1];

  return (
    <div 
      className="relative flex items-center p-1 bg-signet-navy-950 border border-signet-border-subtle rounded-full cursor-pointer overflow-hidden shadow-inner"
      onClick={() => onChange(isRight ? labels[0] : labels[1])}
    >
      <motion.div
        layout
        className={`absolute inset-y-1 w-1/2 bg-${accentColor} rounded-full shadow-signet-cta`}
        animate={{
          left: isRight ? "50%" : "0%",
          width: "50%"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      
      <div className="relative z-10 flex w-full text-sm font-bold">
        <div className={`flex-1 text-center py-2 px-6 transition-colors duration-300 ${!isRight ? 'text-signet-navy-950' : 'text-signet-slate-400'}`}>
          {labels[0]}
        </div>
        <div className={`flex-1 text-center py-2 px-6 transition-colors duration-300 ${isRight ? 'text-signet-navy-950' : 'text-signet-slate-400'}`}>
          {labels[1]}
        </div>
      </div>
    </div>
  );
}
