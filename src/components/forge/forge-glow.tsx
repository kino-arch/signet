import React from 'react';
import { motion } from 'motion/react';

export interface ForgeGlowProps {
  children?: React.ReactNode;
  active?: boolean;
}

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function ForgeGlowBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate displacement from center (-20px to 20px)
      const x = ((e.clientX / window.innerWidth) - 0.5) * 40;
      const y = ((e.clientY / window.innerHeight) - 0.5) * 40;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion, isMobile]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--theme-primary)_0%,_transparent_70%)] opacity-15"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: 'tween',
          ease: 'easeOut',
          duration: 0.3,
        }}
      />
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
