import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface OpenBetaBadgeProps {
  tip?: string;
  title?: string;
  className?: string;
}

export const OpenBetaBadge = ({
  tip = "This feature is currently in open beta. We are actively improving it based on your feedback.",
  title = "Beta",
  className
}: OpenBetaBadgeProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="secondary" className={cn("cursor-help", className)}>
            {title}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-sm">
          <p>{tip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
