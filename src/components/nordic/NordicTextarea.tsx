import { cn } from "@/lib/utils";
import { forwardRef, useState, useEffect, useRef, useCallback } from "react";
import { copilotEngine } from "@/lib/copilot-engine";

interface NordicTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const NordicTextarea = forwardRef<HTMLTextAreaElement, NordicTextareaProps>(
  ({ label, error, helper, className, value, onChange, ...props }, ref) => {
    const [ghostText, setGhostText] = useState<string | null>(null);
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    // Merge refs
    const setRefs = useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }
      },
      [ref]
    );

    useEffect(() => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      
      const currentVal = (value as string) || internalRef.current?.value || "";
      
      if (!currentVal) {
        setGhostText(null);
        return;
      }

      typingTimeoutRef.current = setTimeout(async () => {
        const intent = await copilotEngine.observe({
          fieldId: props.id || "textarea",
          currentValue: currentVal,
        });
        
        if (intent.suggestion && intent.suggestion.startsWith(currentVal)) {
          setGhostText(intent.suggestion.slice(currentVal.length));
        } else if (intent.suggestion) {
          // If the suggestion is an append
          setGhostText(" " + intent.suggestion);
        } else {
          setGhostText(null);
        }
      }, 500); // 500ms debounce
      
      return () => {
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      };
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab" && ghostText) {
        e.preventDefault();
        const currentVal = (value as string) || internalRef.current?.value || "";
        const newVal = currentVal + ghostText;
        setGhostText(null);
        
        if (onChange) {
          // Create a synthetic event
          const event = {
            target: { value: newVal },
            currentTarget: { value: newVal }
          } as React.ChangeEvent<HTMLTextAreaElement>;
          onChange(event);
        }
      }
      if (props.onKeyDown) props.onKeyDown(e);
    };
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="nordic-input-label">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={setRefs}
            value={value}
            onChange={(e) => {
              setGhostText(null);
              if (onChange) onChange(e);
            }}
            onKeyDown={handleKeyDown}
            className={cn(
              "nordic-input w-full resize-none bg-transparent relative z-10",
              error && "border-nordic-error focus:ring-nordic-error/20 focus:border-nordic-error",
              className
            )}
            {...props}
          />
          {ghostText && (
            <div 
              className={cn(
                "absolute inset-0 pointer-events-none p-3 text-sm font-mono opacity-40 z-0 whitespace-pre-wrap break-words overflow-hidden",
                className
              )}
              aria-hidden="true"
            >
              <span className="invisible">{value || internalRef.current?.value}</span>
              <span className="text-nordic-accent italic">{ghostText}</span>
            </div>
          )}
        </div>
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
