import React, { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

export interface SignetInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const SignetInput = forwardRef<HTMLInputElement, SignetInputProps>(
  ({ className, id: externalId, label, error, helperText, leftIcon, ...props }, ref) => {
    const internalId = useId();
    const id = externalId || internalId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-label text-signet-slate-400 mb-signet-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-signet-3 top-1/2 -translate-y-1/2 text-signet-slate-500" aria-hidden="true">
              {leftIcon}
            </span>
          )}
          <input
            id={id}
            ref={ref}
            className={cn(
              'w-full bg-[var(--color-surface-base)] border border-[var(--component-input-border)] rounded-signet',
              'px-signet-4 py-signet-3 text-body text-white',
              'placeholder:text-signet-slate-600',
              'focus-visible:outline-none focus-visible:border-[var(--component-input-focusRing)] focus-visible:shadow-glow-focus',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon && 'pl-signet-10',
              error && 'border-[var(--color-feedback-error)] focus-visible:border-[var(--color-feedback-error)]',
              className
            )}
            aria-invalid={!!error}
            aria-errormessage={error ? errorId : undefined}
            aria-describedby={!error && helperText ? helperId : undefined}
            {...props}
          />
        </div>
        {error && <p id={errorId} className="mt-signet-2 text-body-sm text-[var(--color-feedback-error)]" role="alert">{error}</p>}
        {helperText && !error && <p id={helperId} className="mt-signet-2 text-body-sm text-signet-slate-500">{helperText}</p>}
      </div>
    );
  }
);
SignetInput.displayName = 'SignetInput';
