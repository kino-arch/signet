import React, { type MouseEvent, useEffect, useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export interface RippleButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  rippleColor?: string
  duration?: string
}

export const RippleButton = React.forwardRef<
  HTMLButtonElement,
  RippleButtonProps
>(
  (
    {
      className,
      children,
      rippleColor = "currentColor",
      duration = "600ms",
      onClick,
      variant,
      size,
      ...props
    },
    ref
  ) => {
    const [buttonRipples, setButtonRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([])

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      createRipple(event)
      onClick?.(event)
    }

    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const newRipple = { x, y, size, key: Date.now() }
      setButtonRipples((prevRipples) => [...prevRipples, newRipple])
    }

    const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.touches[0].clientX - rect.left - size / 2
      const y = event.touches[0].clientY - rect.top - size / 2

      const newRipple = { x, y, size, key: Date.now() }
      setButtonRipples((prevRipples) => [...prevRipples, newRipple])
    }

    useEffect(() => {
      let timeout: ReturnType<typeof setTimeout> | null = null

      if (buttonRipples.length > 0) {
        const lastRipple = buttonRipples[buttonRipples.length - 1]
        const durationMs = duration.endsWith("ms")
          ? parseFloat(duration)
          : parseFloat(duration) * 1000

        timeout = setTimeout(() => {
          setButtonRipples((prevRipples) =>
            prevRipples.filter((ripple) => ripple.key !== lastRipple.key)
          )
        }, durationMs)
      }

      return () => {
        if (timeout !== null) {
          clearTimeout(timeout)
        }
      }
    }, [buttonRipples, duration])

    const rippleRef = React.useRef(false)

    return (
      <Button
        className={cn("relative overflow-hidden", className)}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            if (e.key === " ") e.preventDefault()
            if (!rippleRef.current) {
              rippleRef.current = true
              const button = e.currentTarget
              const rect = button.getBoundingClientRect()
              const size = Math.max(rect.width, rect.height)
              const x = rect.width / 2
              const y = rect.height / 2
              const newRipple = { x, y, size, key: Date.now() }
              setButtonRipples((prev) => [...prev, newRipple])
              setTimeout(() => rippleRef.current = false, 100)
            }
          }
          props.onKeyDown?.(e)
        }}
        ref={ref}
        variant={variant}
        size={size}
        style={{ touchAction: 'manipulation', ...props.style }}
        {...props}
      >
        <div className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </div>
        <span className="pointer-events-none absolute inset-0">
          {buttonRipples.map((ripple) => (
            <span
              className="absolute animate-rippling rounded-full opacity-30"
              key={ripple.key}
              style={
                {
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  top: `${ripple.y}px`,
                  left: `${ripple.x}px`,
                  backgroundColor: rippleColor,
                  transform: `scale(0)`,
                  "--duration": duration,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      </Button>
    )
  }
)

RippleButton.displayName = "RippleButton"
