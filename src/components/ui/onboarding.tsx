import type * as React from "react"
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react"
import { useControllableState } from "@radix-ui/react-use-controllable-state"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const stepIndicatorVariants = cva("flex items-center justify-center gap-2", {
  variants: {
    variant: {
      dots: "",
      pills: "",
    },
  },
  defaultVariants: {
    variant: "pills",
  },
})

// Tech-noir styling for the indicator
const stepDotVariants = cva("rounded-full transition-all duration-300", {
  variants: {
    variant: {
      dots: "size-2 data-[state=active]:size-2.5 data-[state=active]:bg-primary data-[state=active]:shadow-[0_0_8px_var(--color-primary)] data-[state=completed]:bg-primary/60 data-[state=inactive]:bg-border",
      pills:
        "h-0.5 flex-1 rounded-full data-[state=active]:bg-primary data-[state=active]:shadow-[0_0_8px_color-mix(in_srgb,var(--color-primary)_40%,transparent)] data-[state=completed]:bg-primary/60 data-[state=inactive]:bg-border",
    },
  },
  defaultVariants: {
    variant: "pills",
  },
})

export interface StepIndicatorProps
  extends
    React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof stepIndicatorVariants>,
    VariantProps<typeof stepDotVariants> {
  currentStep: number
  totalSteps: number
  dotClassName?: string
}

export function StepIndicator({
  currentStep,
  totalSteps,
  variant = "pills",
  className,
  dotClassName,
  ...props
}: StepIndicatorProps) {
  return (
    <div
      aria-label={`Step ${currentStep} of ${totalSteps}`}
      aria-valuemax={totalSteps}
      aria-valuemin={1}
      aria-valuenow={currentStep}
      className={cn(stepIndicatorVariants({ variant }), className)}
      data-slot="onboarding-step-indicator"
      role="progressbar"
      {...props}
    >
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNumber = i + 1
        const isActive = currentStep === stepNumber
        const isCompleted = currentStep > stepNumber
        let stepState: "active" | "completed" | "inactive" = "inactive"
        if (isActive) stepState = "active"
        else if (isCompleted) stepState = "completed"
        return (
          <div
            aria-current={isActive ? "step" : undefined}
            className={cn(stepDotVariants({ variant }), dotClassName)}
            data-slot="onboarding-step-dot"
            data-state={stepState}
            key={stepNumber}
          />
        )
      })}
    </div>
  )
}

// ============================================================================
// Types & Context
// ============================================================================

export interface OnboardingContextValue {
  currentStep: number
  totalSteps: number
  stepValue: number
  setStep: (step: number | ((prev: number) => number)) => void
  setStepValue: (value: number | ((prev: number) => number)) => void
  maxStepValue: number
  canGoNext: boolean
  canGoBack: boolean
  handleBack: () => void
  handleNext: () => void
  handleComplete: () => void
  onComplete?: () => void
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) {
    throw new Error("Onboarding components must be used within Onboarding.Root")
  }
  return ctx
}

// ============================================================================
// Root
// ============================================================================

export interface OnboardingRootProps
  extends
    PropsWithChildren,
    Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  value?: number
  defaultValue?: number
  onValueChange?: (step: number) => void
  stepValue?: number
  defaultStepValue?: number
  onStepValueChange?: (value: number) => void
  totalSteps: number
  maxStepValue?: number
  onComplete?: () => void
  canGoNext?: (step: number, stepValue: number) => boolean
}

function OnboardingRoot({
  value: controlledValue,
  defaultValue = 1,
  onValueChange,
  stepValue: controlledStepValue,
  defaultStepValue = 0,
  onStepValueChange,
  totalSteps,
  maxStepValue: controlledMaxStepValue = 0,
  onComplete,
  canGoNext: canGoNextFn,
  children,
  className,
  ...props
}: OnboardingRootProps) {
  const [currentStep, setCurrentStep] = useControllableState({
    prop: controlledValue,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  const [stepValue, setStepValueState] = useControllableState({
    prop: controlledStepValue,
    defaultProp: defaultStepValue,
    onChange: onStepValueChange,
  })

  const maxStepValue = controlledMaxStepValue ?? 0
  const canGoNext = canGoNextFn
    ? canGoNextFn(currentStep ?? 1, stepValue ?? 0)
    : true
  const canGoBack = (currentStep ?? 1) > 1 || (stepValue ?? 0) > 0

  const handleNext = useCallback(() => {
    if (currentStep === 1 && (stepValue ?? 0) < maxStepValue) {
      setStepValueState((prev) => (prev ?? 0) + 1)
    } else if ((currentStep ?? 1) < totalSteps) {
      setStepValueState(0)
      setCurrentStep((prev) => (prev ?? 1) + 1)
    }
  }, [
    currentStep,
    stepValue,
    maxStepValue,
    totalSteps,
    setStepValueState,
    setCurrentStep,
  ])

  const handleBack = useCallback(() => {
    if (currentStep === 1 && (stepValue ?? 0) > 0) {
      setStepValueState((prev) => (prev ?? 1) - 1)
    } else if (currentStep === 2) {
      setCurrentStep(1)
      setStepValueState(maxStepValue)
    } else if ((currentStep ?? 1) > 1) {
      setCurrentStep((prev) => (prev ?? 2) - 1)
    }
  }, [currentStep, stepValue, maxStepValue, setStepValueState, setCurrentStep])

  const handleComplete = useCallback(() => {
    onComplete?.()
  }, [onComplete])

  const contextValue = useMemo<OnboardingContextValue>(
    () => ({
      currentStep: currentStep ?? 1,
      totalSteps,
      stepValue: stepValue ?? 0,
      setStep: setCurrentStep as unknown as (
        step: number | ((prev: number) => number)
      ) => void,
      setStepValue: setStepValueState as unknown as (
        value: number | ((prev: number) => number)
      ) => void,
      maxStepValue,
      canGoNext,
      canGoBack,
      handleBack,
      handleNext,
      handleComplete,
      onComplete,
    }),
    [
      currentStep,
      totalSteps,
      stepValue,
      setCurrentStep,
      setStepValueState,
      maxStepValue,
      canGoNext,
      canGoBack,
      handleBack,
      handleNext,
      handleComplete,
      onComplete,
    ]
  )

  return (
    <OnboardingContext.Provider value={contextValue}>
      <div
        className={cn("flex w-full flex-col", className)}
        data-slot="onboarding"
        data-state={`step-${currentStep}`}
        {...props}
      >
        {children}
      </div>
    </OnboardingContext.Provider>
  )
}

// ============================================================================
// Step
// ============================================================================

export interface OnboardingStepProps extends React.ComponentPropsWithoutRef<"div"> {
  step: number
}

function OnboardingStep({
  step,
  children,
  className,
  ...props
}: OnboardingStepProps) {
  const { currentStep } = useOnboarding()
  const isActive = currentStep === step

  if (!isActive) {
    return null
  }

  return (
    <div
      className={cn(
        "animate-in duration-300 fade-in slide-in-from-bottom-2",
        className
      )}
      data-slot="onboarding-step"
      data-state="active"
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// StepIndicator Context Wrapper
// ============================================================================

export type OnboardingStepIndicatorProps = Omit<
  React.ComponentProps<typeof StepIndicator>,
  "currentStep" | "totalSteps"
>

function OnboardingStepIndicator(props: OnboardingStepIndicatorProps) {
  const { currentStep, totalSteps } = useOnboarding()
  return (
    <StepIndicator
      currentStep={currentStep}
      totalSteps={totalSteps}
      {...props}
    />
  )
}

// ============================================================================
// Header
// ============================================================================

export interface OnboardingHeaderProps extends React.ComponentPropsWithoutRef<"div"> {
  title?: string
  description?: string
  stepTitle?: string
  children?: React.ReactNode
}

function OnboardingHeader({
  title,
  description,
  stepTitle,
  children,
  className,
  ...props
}: OnboardingHeaderProps) {
  if (children) {
    return (
      <div
        className={cn("mb-8", className)}
        data-slot="onboarding-header"
        {...props}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className={cn("mb-8", className)}
      data-slot="onboarding-header"
      {...props}
    >
      {stepTitle && (
        <p className="mb-1 text-xs font-semibold tracking-widest text-primary uppercase">
          {stepTitle}
        </p>
      )}
      {title != null && (
        <h2
          className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
          data-slot="onboarding-title"
        >
          {title}
        </h2>
      )}
      {description && (
        <p
          className="mt-2 text-sm text-muted-foreground"
          data-slot="onboarding-description"
        >
          {description}
        </p>
      )}
    </div>
  )
}

// ============================================================================
// Navigation
// ============================================================================

export interface OnboardingNavigationProps extends React.ComponentPropsWithoutRef<"fieldset"> {
  backLabel?: string
  nextLabel?: string
  completeLabel?: string
  canGoNext?: boolean
  hideBack?: boolean
  children?: React.ReactNode
}

function OnboardingNavigation({
  backLabel = "Back",
  nextLabel = "Continue",
  completeLabel = "Complete",
  canGoNext: canGoNextOverride,
  hideBack = false,
  children,
  className,
  ...props
}: OnboardingNavigationProps) {
  const {
    currentStep,
    totalSteps,
    canGoNext: contextCanGoNext,
    canGoBack,
    handleBack,
    handleNext,
    handleComplete,
  } = useOnboarding()

  const canGoNext = canGoNextOverride ?? contextCanGoNext
  const isLastStep = currentStep === totalSteps

  if (children) {
    return (
      <fieldset
        className={cn("mt-6 flex items-center justify-between", className)}
        data-slot="onboarding-navigation"
        {...props}
      >
        {children}
      </fieldset>
    )
  }

  return (
    <fieldset
      aria-label="Onboarding navigation"
      className={cn("mt-6 flex items-center justify-between", className)}
      data-slot="onboarding-navigation"
      {...props}
    >
      {!hideBack ? (
        <Button
          aria-label={backLabel}
          className="text-xs"
          size="sm"
          data-slot="onboarding-back"
          disabled={!canGoBack}
          onClick={handleBack}
          variant="outline"
        >
          {backLabel}
        </Button>
      ) : (
        <div /> // Spacer
      )}

      {isLastStep ? (
        <Button
          aria-label={completeLabel}
          className="gap-2 text-xs font-semibold tracking-wide"
          size="sm"
          data-slot="onboarding-complete"
          onClick={handleComplete}
        >
          {completeLabel}
        </Button>
      ) : (
        <Button
          aria-label={nextLabel}
          className="gap-2 text-xs font-semibold tracking-wide"
          size="sm"
          data-slot="onboarding-next"
          disabled={!canGoNext}
          onClick={handleNext}
        >
          {nextLabel}
        </Button>
      )}
    </fieldset>
  )
}

// ============================================================================
// ChoiceGroup
// ============================================================================

type Orientation = "horizontal" | "vertical" | "grid"

interface ChoiceGroupContextValue {
  value: string | null
  setValue: (value: string) => void
  name: string
  orientation: Orientation
}

const ChoiceGroupContext = createContext<ChoiceGroupContextValue | null>(null)

function useChoiceGroup() {
  const ctx = useContext(ChoiceGroupContext)
  if (!ctx) {
    throw new Error("ChoiceGroup.Item must be used within ChoiceGroup")
  }
  return ctx
}

export interface ChoiceGroupProps extends Omit<
  React.ComponentPropsWithoutRef<"div">,
  "defaultValue"
> {
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string) => void
  name: string
  orientation?: Orientation
}

function ChoiceGroupRoot({
  value: controlledValue,
  defaultValue = null,
  onValueChange,
  name,
  orientation = "grid",
  children,
  className,
  ...props
}: ChoiceGroupProps) {
  const [value, setValueState] = useControllableState({
    prop: controlledValue ?? undefined,
    defaultProp: defaultValue ?? null,
    onChange: (v) => v !== null && onValueChange?.(v),
  })

  const setValue = useCallback(
    (v: string) => {
      setValueState(v)
    },
    [setValueState]
  )

  const contextValue = useMemo<ChoiceGroupContextValue>(
    () => ({
      value: value ?? null,
      setValue,
      name,
      orientation,
    }),
    [value, setValue, name, orientation]
  )

  return (
    <ChoiceGroupContext.Provider value={contextValue}>
      <div
        aria-label={name}
        className={cn(className)}
        data-orientation={orientation}
        data-slot="choice-group"
        role="radiogroup"
        {...props}
      >
        {children}
      </div>
    </ChoiceGroupContext.Provider>
  )
}

// ============================================================================
// ChoiceGroup.Item
// ============================================================================

export interface ChoiceGroupItemProps extends React.ComponentPropsWithoutRef<"label"> {
  value: string
  title?: string
  subtitle?: string
  description?: string
  creed?: string
  icon?: React.ReactNode
}

function ChoiceGroupItemComponent({
  value: itemValue,
  title,
  subtitle,
  description,
  creed,
  icon,
  children,
  className,
  ...props
}: ChoiceGroupItemProps) {
  const { value, setValue, name } = useChoiceGroup()
  const isSelected = value === itemValue

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) {
        setValue(itemValue)
      }
    },
    [itemValue, setValue]
  )

  return (
    <label
      className={cn(
        "group glass-panel relative flex cursor-pointer flex-col gap-3 rounded-xl border p-5 text-left transition-all duration-200 select-none",
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background",
        isSelected
          ? "-translate-y-0.5 border-primary/60 bg-primary/5 shadow-[0_0_20px_rgba(var(--color-primary),0.1)]"
          : "border-border/50 bg-card/40 hover:border-primary/30 hover:bg-card/70",
        className
      )}
      data-slot="choice-group-item"
      data-state={isSelected ? "selected" : "unselected"}
      {...props}
    >
      <input
        checked={isSelected}
        className="sr-only"
        name={name}
        onChange={handleChange}
        type="radio"
        value={itemValue}
      />

      {/* Visual Dot */}
      <div
        className={cn(
          "absolute top-3 right-3 h-2 w-2 rounded-full border transition-all duration-200",
          isSelected ? "border-primary bg-primary" : "border-border"
        )}
      />

      {/* Content Injection or Custom Children */}
      {children ? (
        children
      ) : (
        <>
          <div
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-200",
              isSelected
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border/50 bg-muted/30 text-muted-foreground"
            )}
          >
            {icon}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{title}</p>
            {subtitle && (
              <p
                className={cn(
                  "mt-0.5 font-mono text-[10px] font-medium tracking-wider uppercase transition-colors",
                  isSelected ? "text-primary" : "text-muted-foreground/70"
                )}
              >
                {subtitle}
              </p>
            )}
            {description && (
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {creed && (
            <p className="mt-auto truncate border-t border-border/30 pt-2 font-mono text-[9px] text-muted-foreground/50 italic">
              "{creed}"
            </p>
          )}
        </>
      )}
    </label>
  )
}

ChoiceGroupItemComponent.displayName = "ChoiceGroupItem"

// ============================================================================
// Exports
// ============================================================================

export const ChoiceGroup = Object.assign(ChoiceGroupRoot, {
  Item: ChoiceGroupItemComponent,
})

export const Onboarding = Object.assign(OnboardingRoot, {
  Step: OnboardingStep,
  StepIndicator: OnboardingStepIndicator,
  Header: OnboardingHeader,
  Navigation: OnboardingNavigation,
})

export { useOnboarding }
