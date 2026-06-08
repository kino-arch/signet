import type React from "react"

export function AuthDivider({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className="relative flex w-full items-center" {...props}>
      <div className="w-full border-t border-border/40" />
      <div className="flex w-max justify-center px-2 font-mono text-[10px] tracking-widest text-nowrap text-muted-foreground/60 uppercase">
        [ {children} ]
      </div>
      <div className="w-full border-t border-border/40" />
    </div>
  )
}
