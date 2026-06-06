import React, { useState, useEffect, useId, forwardRef } from "react"
import { cn } from "@/lib/utils"

export type ValidationType = "required" | "email" | "url" | "phone" | "date"
export type GlowColor = "cyan" | "coral" | "violet" | "amber"
export type TierType = "full" | "partial" | "standard"
export type UnitType = "chars" | "words" | "bytes" | "items" | null

interface DataStreamInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className" | "style"
> {
  label: string
  glowColor?: GlowColor
  validation?: ValidationType
  maxBytes?: number
  unit?: UnitType
  tier?: TierType
}

type ValidationState = "pristine" | "focused" | "dirty" | "valid" | "submitted"

export const DataStreamInput = forwardRef<
  HTMLInputElement,
  DataStreamInputProps
>(
  (
    {
      label,
      glowColor = "cyan",
      validation,
      maxBytes,
      unit = "chars",
      tier = "full",
      value,
      onChange,
      onFocus,
      onBlur,
      ...nativeProps
    },
    ref
  ) => {
    const id = useId()
    const errorId = `${id}-error`

    const [validationState, setValidationState] =
      useState<ValidationState>("pristine")
    const [isValid, setIsValid] = useState(true)

    // Derived unit count
    const stringValue = String(value || "")
    const count = React.useMemo(() => {
      if (unit === "words")
        return stringValue.trim().split(/\s+/).filter(Boolean).length
      if (unit === "items") return stringValue.split(",").filter(Boolean).length
      return stringValue.length // Default for chars and bytes
    }, [stringValue, unit])

    // Validation logic
    useEffect(() => {
      if (!validation) {
        setIsValid(true)
        return
      }

      const validateValue = (v: string) => {
        switch (validation) {
          case "required":
            return v.trim().length > 0
          case "email":
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
          case "url":
            return /^https?:\/\//i.test(v) || v.length === 0
          case "phone":
            return /^[\d\s\-\+\(\)]+$/.test(v) || v.length === 0
          case "date":
            return !isNaN(Date.parse(v)) || v.length === 0
          default:
            return true
        }
      }

      const valid = validateValue(stringValue)
      setIsValid(valid)

      if (validationState === "dirty" && valid) {
        setValidationState("valid")
        // Briefly show valid, then return to pristine/focused
        const timer = setTimeout(() => {
          setValidationState((prev) => (prev === "valid" ? "pristine" : prev))
        }, 1500)
        return () => clearTimeout(timer)
      }
    }, [stringValue, validation, validationState])

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (validationState === "pristine" || validationState === "valid") {
        setValidationState("focused")
      }
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (validationState === "focused") {
        setValidationState("dirty")
      }
      onBlur?.(e)
    }

    // Colors mappings
    const isFocused = validationState === "focused"
    const hasError =
      (validationState === "dirty" || validationState === "submitted") &&
      !isValid
    const byteWarning = maxBytes && count > maxBytes * 0.8 && count <= maxBytes
    const byteError = maxBytes && count > maxBytes

    // Fallback to Shadcn input if standard tier
    if (tier === "standard") {
      return (
        <div className="space-y-1">
          <label htmlFor={id} className="text-sm leading-none font-medium">
            {label}
          </label>
          <input
            id={id}
            ref={ref}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              hasError && "border-destructive focus-visible:ring-destructive"
            )}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            {...nativeProps}
          />
          {hasError && (
            <p
              id={errorId}
              role="alert"
              className="text-[0.8rem] font-medium text-destructive"
            >
              Invalid {validation}. Please correct.
            </p>
          )}
        </div>
      )
    }

    return (
      <div
        role="group"
        aria-labelledby={`${id}-label`}
        className={cn(
          "group relative",
          tier === "full" && "data-stream-input-container"
        )}
      >
        <label id={`${id}-label`} className="sr-only">
          {label}
        </label>

        {/* Terminal header */}
        <div className="mb-2 flex items-center gap-2">
          <div
            className={cn(
              "h-1.5 w-1.5 rounded-full transition-all duration-300",
              isFocused
                ? `bg-cosmic-${glowColor} glow-${glowColor}`
                : "bg-muted-foreground/30",
              hasError && "glow-coral bg-cosmic-coral"
            )}
          />
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {label}
          </span>
          {isFocused && tier === "full" && !hasError && (
            <span className="animate-pulse font-mono text-xs text-cosmic-cyan">
              ■ ACTIVE
            </span>
          )}
          {validationState === "valid" && tier === "full" && (
            <span className="font-mono text-xs text-cosmic-cyan">✓ VALID</span>
          )}
          {hasError && tier === "full" && (
            <span className="font-mono text-xs text-cosmic-coral">
              ⚠ INVALID
            </span>
          )}
        </div>

        {/* Input container with holographic border */}
        <div
          className={cn(
            "relative overflow-hidden rounded-lg bg-background/50 transition-all duration-300",
            "border border-transparent",
            isFocused && tier === "full" && `glow-border-${glowColor}`,
            isFocused && tier === "partial" && `border-cosmic-${glowColor}`,
            hasError && "border-cosmic-coral/50",
            !isFocused && !hasError && "border-border"
          )}
          style={
            { "--glow-color": `var(--app-${glowColor})` } as React.CSSProperties
          }
        >
          <input
            id={id}
            ref={ref}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "data-stream-input w-full bg-transparent px-4 py-3 font-mono text-foreground transition-colors outline-none",
              "placeholder:font-mono placeholder:text-muted-foreground/30",
              byteError && "text-cosmic-coral"
            )}
            aria-invalid={hasError}
            aria-describedby={hasError || byteError ? errorId : undefined}
            {...nativeProps}
          />

          {/* Scanline effect on focus */}
          {isFocused && tier === "full" && !hasError && (
            <div className="scanline pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute h-[150px] w-full animate-[scanline-safe_3s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-cosmic-cyan/10 to-transparent" />
            </div>
          )}

          {/* Validation glow overlay */}
          {hasError && (
            <div className="pointer-events-none absolute inset-0 animate-pulse bg-cosmic-coral/5" />
          )}
        </div>

        {/* Footer: unit count and validation status */}
        <div className="mt-1.5 flex h-4 justify-between">
          <span
            className={cn(
              "font-mono text-[10px] uppercase transition-colors",
              byteError
                ? "text-cosmic-coral"
                : byteWarning
                  ? "text-cosmic-amber"
                  : "text-muted-foreground/50",
              !unit && "invisible"
            )}
          >
            {unit && `${count}${maxBytes ? ` / ${maxBytes}` : ""} ${unit}`}
          </span>
          {hasError && (
            <span
              id={errorId}
              role="alert"
              className="font-mono text-[10px] text-cosmic-coral"
            >
              REQUIRES {validation?.toUpperCase()}
            </span>
          )}
        </div>
      </div>
    )
  }
)
DataStreamInput.displayName = "DataStreamInput"
