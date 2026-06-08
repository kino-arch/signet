import React from 'react';
import { cn } from '@/lib/utils';

export type SignetSectionVariant = 'default' | 'hero' | 'feature' | 'cta';

export interface SignetSectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SignetSectionVariant;
}

export function SignetSection({ variant = 'default', children, className, ...props }: SignetSectionProps) {
  const variants: Record<SignetSectionVariant, string> = {
    default: 'py-16 bg-transparent',
    hero: 'py-24 relative overflow-hidden',
    feature: 'py-20 bg-signet-surface-subtle',
    cta: 'py-16 relative',
  };
  
  return (
    <section className={cn(variants[variant], className)} {...props}>
      {children}
    </section>
  );
}
