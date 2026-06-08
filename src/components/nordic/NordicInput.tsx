import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface NordicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const NordicInput = forwardRef<HTMLInputElement, NordicInputProps>(
  ({ label, error, helper, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="nordic-input-label">
            {label}
          </label>
        )}
        <input
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
