import { cn } from "@/lib/utils";
import { forwardRef, useId } from "react";

interface NordicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const NordicInput = forwardRef<HTMLInputElement, NordicInputProps>(
  ({ label, error, helper, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="nordic-input-label">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "nordic-input w-full",
            error && "border-nordic-error focus:ring-nordic-error/20 focus:border-nordic-error",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-nordic-error">{error}</p>
        )}
        {helper && !error && (
          <p className="text-xs text-nordic-text-tertiary">{helper}</p>
        )}
      </div>
    );
  }
);
NordicInput.displayName = "NordicInput";
