import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-9 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
      indicator: {
        pill: "",
        underline:
          "h-auto rounded-none border-b border-border/50 bg-transparent p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      indicator: "pill",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  indicator = "pill",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      data-indicator={indicator}
      className={cn(tabsListVariants({ variant, indicator }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex flex-1 items-center justify-center gap-1.5 px-3 py-1.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all outline-none disabled:pointer-events-none disabled:opacity-50 has-[data-icon=inline-end]:pr-2 has-[data-icon=inline-start]:pl-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50",

        // Pill variant
        "group-data-[indicator=pill]/tabs-list:h-[calc(100%-2px)] group-data-[indicator=pill]/tabs-list:rounded-md",
        "group-data-[indicator=pill]/tabs-list:data-[state=active]:bg-background group-data-[indicator=pill]/tabs-list:data-[state=active]:text-foreground group-data-[indicator=pill]/tabs-list:data-[state=active]:shadow-sm",

        // Underline variant
        "group-data-[indicator=underline]/tabs-list:rounded-none group-data-[indicator=underline]/tabs-list:border-b-2 group-data-[indicator=underline]/tabs-list:border-transparent group-data-[indicator=underline]/tabs-list:pb-2",
        "group-data-[indicator=underline]/tabs-list:data-[state=active]:border-primary group-data-[indicator=underline]/tabs-list:data-[state=active]:text-foreground",

        // Legacy variant support
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 text-xs/relaxed outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
