import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SignetBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'dot';
  color?: 'cyan' | 'amber' | 'red';
}

export const SignetBadge = forwardRef<HTMLSpanElement, SignetBadgeProps>(
  ({ className, variant = 'default', color = 'cyan', children, ...props }, ref) => {
    // Map colors to semantic/primitive tokens depending on availability
    // using arbitrary variable mapping based on the W3C tokens we scaffolded
    const colorMap = {
      cyan: {
        default: 'bg-[var(--color-action-primary)]/20 text-[var(--color-action-primary)] border-transparent',
        outline: 'bg-transparent text-[var(--color-action-primary)] border-[var(--color-action-primary)]',
        dot: 'bg-[var(--color-action-primary)]',
      },
      amber: {
        default: 'bg-[var(--signet-amber-400)]/20 text-[var(--signet-amber-400)] border-transparent',
        outline: 'bg-transparent text-[var(--signet-amber-400)] border-[var(--signet-amber-400)]',
        dot: 'bg-[var(--signet-amber-400)]',
      },
      red: {
        default: 'bg-[var(--color-feedback-error)]/20 text-[var(--color-feedback-error)] border-transparent',
        outline: 'bg-transparent text-[var(--color-feedback-error)] border-[var(--color-feedback-error)]',
        dot: 'bg-[var(--color-feedback-error)]',
      },
    };

    const variantStyles = colorMap[color] || colorMap.cyan;

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-signet-full text-label font-medium border',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {variant === 'dot' && (
          <span className={cn('w-2 h-2 rounded-full mr-1.5', variantStyles.dot)} aria-hidden="true" />
        )}
        {children}
      </span>
    );
  }
);
SignetBadge.displayName = 'SignetBadge';
