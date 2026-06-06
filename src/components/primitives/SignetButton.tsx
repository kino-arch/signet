import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface SignetButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const SignetButton = forwardRef<HTMLButtonElement, SignetButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:shadow-glow-focus disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary: 'bg-[var(--color-action-primary)] text-[var(--color-surface-base)] hover:opacity-90 active:opacity-100',
      secondary: 'border-2 border-[var(--color-action-primary)] text-[var(--color-action-primary)] hover:bg-[var(--color-action-primary)]/10',
      tertiary: 'text-[var(--color-action-primary)] hover:underline underline-offset-4',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm rounded-signet-sm',
      md: 'px-5 py-2.5 text-base rounded-signet',
      lg: 'px-8 py-3 text-lg rounded-signet',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={isLoading || disabled}
        aria-busy={isLoading}
        aria-disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
        {!isLoading && leftIcon && <span className="mr-2" aria-hidden="true">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2" aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);
SignetButton.displayName = 'SignetButton';
