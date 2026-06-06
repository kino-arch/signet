import * as React from "react"

import { cn } from "@/lib/utils"

export interface CardProps extends React.ComponentProps<"div"> {
  size?: "default" | "sm"
  glow?: "none" | "primary" | "accent"
  hover?: boolean
  as?: React.ElementType
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      size = "default",
      glow = "none",
      hover = true,
      as: Component = "div",
      ...props
    },
    ref
  ) => {
    const glowClasses = {
      none: "",
      primary:
        "relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_30%,oklch(0.55_0.22_285_/_0.15),transparent_60%)] before:pointer-events-none",
      accent:
        "relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_30%,oklch(0.60_0.20_25_/_0.15),transparent_60%)] before:pointer-events-none",
    }

    return (
      <Component
        ref={ref}
        data-slot="card"
        data-size={size}
        className={cn(
          "group/card glass-panel flex flex-col gap-4 rounded-lg py-4 text-xs/relaxed text-card-foreground has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg",
          hover && "glass-panel-hover",
          glowClasses[glow],
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-lg px-4 group-data-[size=sm]/card:px-3 has-[data-slot=card-action]:grid-cols-[1fr_auto] has-[data-slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading text-sm font-medium", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-xs/relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-lg px-4 group-data-[size=sm]/card:px-3 [.border-t]:pt-4 group-data-[size=sm]/card:[.border-t]:pt-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
