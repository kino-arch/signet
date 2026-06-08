import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SignetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glow' | 'strong';
  isInteractive?: boolean;
}

export const SignetCard = forwardRef<HTMLDivElement, SignetCardProps>(
  ({ className, variant = 'default', isInteractive, children, ...props }, ref) => {
    const baseStyles = 'rounded-signet bg-[var(--color-surface-elevated)] border border-[var(--color-action-secondary)] p-signet-6';

    const variantStyles = {
      default: '',
      glow: 'shadow-glow-subtle border-[var(--color-action-primary)]/30',
      strong: 'shadow-glow-medium border-[var(--color-action-primary)]/50',
    };

    const interactiveStyles = isInteractive 
      ? 'cursor-pointer hover:border-[var(--color-action-primary)]/50 hover:shadow-glow-subtle transition-all duration-200' 
      : '';

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], interactiveStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SignetCard.displayName = 'SignetCard';
