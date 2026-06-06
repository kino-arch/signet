import React, { useState, useEffect, useId, forwardRef } from "react"
import TextareaAutosize from "react-textarea-autosize"
import { cn } from "@/lib/utils"
import type {
  ValidationType,
  GlowColor,
  TierType,
  UnitType,
} from "./DataStreamInput"

interface HolographicTextareaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "className" | "style"
> {
  label: string
  glowColor?: GlowColor
  validation?: ValidationType
  maxBytes?: number
  unit?: UnitType
  tier?: TierType
  minRows?: number
  maxRows?: number
  enableBulletFormatting?: boolean
  enableReadability?: boolean
}

type ValidationState = "pristine" | "focused" | "dirty" | "valid" | "submitted"

export const HolographicTextarea = forwardRef<
  HTMLTextAreaElement,
  HolographicTextareaProps
>(
  (
    {
      label,
      glowColor = "cyan",
      validation,
      maxBytes,
      unit = "words",
      tier = "full",
      value,
      onChange,
      onFocus,
      onBlur,
      minRows = 3,
      maxRows = 8,
      enableBulletFormatting = true,
      enableReadability = true,
      ...nativeProps
    },
    ref
  ) => {
    const id = useId()
    const errorId = `${id}-error`

    const [validationState, setValidationState] =
      useState<ValidationState>("pristine")
    const [isValid, setIsValid] = useState(true)

    const stringValue = String(value || "")
    const words = stringValue.trim().split(/\s+/).filter(Boolean)
    const sentences = stringValue.split(/[\.\!\?]+/).filter(Boolean)
    const count = React.useMemo(() => {
      if (unit === "words") return words.length
      if (unit === "items")
        return stringValue.split("\n").filter((line) => line.trim().length > 0)
          .length
      return stringValue.length // chars or bytes
    }, [stringValue, unit, words])

    // Readability approximation (Flesch-Kincaid grade level rough approximation based on word/sentence length)
    // Actually we just use a simple heuristic for demonstration if we don't have syllable counts
    const readabilityState = React.useMemo(() => {
      if (!enableReadability || words.length < 5) return null
      const avgWordsPerSentence = words.length / (sentences.length || 1)
      if (avgWordsPerSentence > 25)
        return { label: "VERBOSE", color: "text-cosmic-coral" }
      if (avgWordsPerSentence > 15)
        return { label: "COMPLEX", color: "text-cosmic-amber" }
      return { label: "CLEAR", color: "text-cosmic-cyan" }
    }, [words, sentences, enableReadability])

    // Validation logic
    useEffect(() => {
      if (!validation) {
        setIsValid(true)
        return
      }
      const validateValue = (v: string) => {
        if (validation === "required") return v.trim().length > 0
        return true
      }
      const valid = validateValue(stringValue)
      setIsValid(valid)

      if (validationState === "dirty" && valid) {
        setValidationState("valid")
        const timer = setTimeout(() => {
          setValidationState((prev) => (prev === "valid" ? "pristine" : prev))
        }, 1500)
        return () => clearTimeout(timer)
      }
    }, [stringValue, validation, validationState])

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (validationState === "pristine" || validationState === "valid") {
        setValidationState("focused")
      }
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (validationState === "focused") {
        setValidationState("dirty")
      }
      onBlur?.(e)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (enableBulletFormatting && e.key === "Enter") {
        const lines = stringValue.split("\n")
        const currentLine = lines[lines.length - 1]

        if (currentLine.startsWith("• ") || currentLine.startsWith("- ")) {
          e.preventDefault()

          if (currentLine.trim() === "•" || currentLine.trim() === "-") {
            // Remove empty bullet and exit list
            const newValue = stringValue.slice(0, -2)
            if (onChange) {
              const fakeEvent = {
                target: { value: newValue },
              } as React.ChangeEvent<HTMLTextAreaElement>
              onChange(fakeEvent)
            }
          } else {
            // Add new bullet
            const newValue = stringValue + "\n  // constellation-override: forge-bot-auto-migration\n• "
            if (onChange) {
              const fakeEvent = {
                target: { value: newValue },
              } as React.ChangeEvent<HTMLTextAreaElement>
              onChange(fakeEvent)
            }
          }
        }
      }
      nativeProps.onKeyDown?.(e)
    }

    const isFocused = validationState === "focused"
    const hasError =
      (validationState === "dirty" || validationState === "submitted") &&
      !isValid
    const byteWarning = maxBytes && count > maxBytes * 0.8 && count <= maxBytes
    const byteError = maxBytes && count > maxBytes

    if (tier === "standard") {
      return (
        <div className="space-y-1">
          <label htmlFor={id} className="text-sm leading-none font-medium">
            {label}
          </label>
          <TextareaAutosize
            id={id}
            ref={ref}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            minRows={minRows}
            maxRows={maxRows}
            className={cn(
              "flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
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
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
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
              <span className="font-mono text-xs text-cosmic-cyan">
                ✓ VALID
              </span>
            )}
            {hasError && tier === "full" && (
              <span className="font-mono text-xs text-cosmic-coral">
                ⚠ INVALID
              </span>
            )}
          </div>
          {readabilityState && (
            <span
              className={cn("font-mono text-[10px]", readabilityState.color)}
            >
              {readabilityState.label}
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
          <TextareaAutosize
            id={id}
            ref={ref}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            minRows={minRows}
            maxRows={maxRows}
            className={cn(
              "holographic-textarea w-full resize-none overflow-y-auto bg-transparent px-4 py-3 font-mono text-foreground transition-colors outline-none",
              "placeholder:font-mono placeholder:text-muted-foreground/30",
              byteError && "text-cosmic-coral",
              /* Custom thin cyan scrollbar for textarea */
              "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cosmic-cyan/30 hover:[&::-webkit-scrollbar-thumb]:bg-cosmic-cyan/60 [&::-webkit-scrollbar-track]:bg-transparent"
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
HolographicTextarea.displayName = "HolographicTextarea"
