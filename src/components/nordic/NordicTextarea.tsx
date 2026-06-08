import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface NordicTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const NordicTextarea = forwardRef<HTMLTextAreaElement, NordicTextareaProps>(
  ({ label, error, helper, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="nordic-input-label">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "nordic-input w-full resize-none",
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
NordicTextarea.displayName = "NordicTextarea";
