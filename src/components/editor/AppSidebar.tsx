import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { User, Briefcase, GraduationCap, Palette, Check, AlertTriangle, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

// Smart Badge (Phase 5 placeholder logic)
function StepStatusBadge({ stepId }: { stepId: number }) {
  // Mock status for now: 1=verified, 2=draft, 3=warning, 4=error
  const status = stepId === 1 ? 'verified' : stepId === 2 ? 'draft' : stepId === 3 ? 'warning' : 'empty';
  
  const variants = {
    empty: <div className="h-1.5 w-1.5 rounded-full bg-sidebar-border" />,
    draft: <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />,
    verified: <Check className="h-3 w-3 text-emerald-400" />,
    warning: <AlertTriangle className="h-3 w-3 text-amber-400" />,
    error: <X className="h-3 w-3 text-red-400" />,
  };
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="ml-auto flex items-center justify-center w-8 h-8 shrink-0">
          {variants[status]}
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">
        {status === 'warning' && 'Contains AI-estimated claims'}
        {status === 'verified' && 'All claims verified'}
        {status === 'draft' && 'Draft content'}
        {status === 'empty' && 'No content yet'}
      </TooltipContent>
    </Tooltip>
  );
}

// Context Tools (Phase 2)
function PersonalSidebarTools() {
  return (
    <div className="space-y-4 text-sm">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-sidebar-foreground/70">
          <span>Profile Completeness</span>
          <span>85%</span>
        </div>
        <div className="h-1.5 w-full bg-sidebar-border rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 w-[85%]" />
        </div>
      </div>
      <Button variant="outline" className="w-full text-xs justify-start h-8">
        Import from LinkedIn
      </Button>
    </div>
  );
}

function ExperienceSidebarTools() {
  return (
    <div className="space-y-2">
      <Button variant="ghost" className="w-full justify-start h-8 text-xs text-sidebar-foreground/70 hover:text-sidebar-foreground">
        ✨ Enhance All Bullets
      </Button>
      <Button variant="ghost" className="w-full justify-start h-8 text-xs text-sidebar-foreground/70 hover:text-sidebar-foreground">
        🔍 Find Missing Metrics
      </Button>
      <Button variant="ghost" className="w-full justify-start h-8 text-xs text-sidebar-foreground/70 hover:text-sidebar-foreground">
        📈 Quantify Impact
      </Button>
    </div>
  );
}

function EducationSidebarTools() {
  return (
    <div className="space-y-2">
      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-xs text-blue-400 font-medium mb-2">Certification Scanner</p>
        <p className="text-[10px] text-sidebar-foreground/60 leading-tight">
          We detected "AWS Certified" in your experience, but it's not listed here.
        </p>
        <Button variant="ghost" size="sm" className="w-full mt-2 h-6 text-[10px] bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
          Add Certification
        </Button>
      </div>
    </div>
  );
}

function DesignSidebarTools() {
  return (
    <div className="space-y-2">
      <p className="text-xs text-sidebar-foreground/70 mb-2">Recent Templates</p>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <div className="w-16 h-20 shrink-0 bg-sidebar-border rounded border border-sidebar-border/50 hover:border-sidebar-ring transition-colors cursor-pointer" />
        <div className="w-16 h-20 shrink-0 bg-sidebar-border rounded border border-sidebar-border/50 hover:border-sidebar-ring transition-colors cursor-pointer" />
        <div className="w-16 h-20 shrink-0 bg-sidebar-border rounded border border-sidebar-border/50 hover:border-sidebar-ring transition-colors cursor-pointer" />
      </div>
    </div>
  );
}

// Vital Bar (Phase 3)
function VitalBar({ label, score, color }: { label: string; score: number; color: "success" | "primary" | "warning" }) {
  const colorMap = {
    success: "bg-nordic-success",
    primary: "bg-nordic-primary",
    warning: "bg-nordic-warning",
  };
  const barColor = colorMap[color] || "bg-nordic-primary";

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-mono uppercase tracking-widest text-nordic-text-tertiary">{label}</span>
        <span className="text-xs font-semibold text-nordic-text">{score}%</span>
      </div>
      <div className="h-1.5 w-full bg-[#252A3A] rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

function GhostVitalBadge({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-2 w-full mt-2">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-mono uppercase tracking-widest text-nordic-text-tertiary flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3 text-nordic-info" />
          Ghost
        </span>
        <span className="text-xs font-semibold text-nordic-text">{count} pending</span>
      </div>
    </div>
  );
}

// Main Sidebar Component
const STEPS = [
  { id: 1, label: "Personal", icon: User },
  { id: 2, label: "Experience", icon: Briefcase },
  { id: 3, label: "Education", icon: GraduationCap },
  { id: 4, label: "Design", icon: Palette },
];

export function AppSidebar({
  currentStep = 1,
  onStepChange = () => {},
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  currentStep?: number;
  onStepChange?: (step: number) => void;
}) {
  const { state } = useSidebar();
  const [peekStep, setPeekStep] = useState<number | null>(null);
  const [isContextExpanded, setIsContextExpanded] = useState(false);

  return (
    <>
      <Sidebar collapsible="icon" {...props} className="border-r border-sidebar-border arctic-rail z-40">
      <SidebarHeader className="p-4 flex items-center gap-3 flex-row h-16 shrink-0">
        <div className="w-8 h-8 bg-nordic-accent rounded flex items-center justify-center shrink-0 shadow-nordic-sm">
          <div className="w-3.5 h-3.5 border-[2px] border-white rounded-sm" />
        </div>
        <span className="font-medium text-lg tracking-tight text-nordic-text group-data-[state=collapsed]:hidden translate-y-[1px]">Signet</span>
      </SidebarHeader>

      <SidebarContent className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <SidebarGroup className="shrink-0">
          <SidebarGroupLabel className="text-[10px] tracking-widest uppercase font-mono">Editor</SidebarGroupLabel>
          <SidebarMenu>
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              return (
                <SidebarMenuItem 
                  key={step.id}
                  onMouseEnter={() => state === "collapsed" && setPeekStep(step.id)}
                  onMouseLeave={() => state === "collapsed" && setPeekStep(null)}
                >
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={() => onStepChange(step.id)}
                    tooltip={step.label}
                    className="font-medium flex items-center gap-3 h-10"
                  >
                    <div className="flex items-center justify-center w-6 h-6 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="translate-y-[1px]">{step.label}</span>
                    <StepStatusBadge stepId={step.id} />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-auto border-t border-sidebar-border pt-2 group-data-[state=collapsed]:hidden shrink-0">
          <button 
            className="flex w-full items-center justify-between px-2 py-2 text-left hover:bg-nordic-surface rounded-md transition-colors"
            onClick={() => setIsContextExpanded(!isContextExpanded)}
          >
            <span className="text-[10px] tracking-widest uppercase font-mono text-nordic-text-tertiary">Context Tools</span>
            {isContextExpanded ? <ChevronDown className="w-3.5 h-3.5 text-nordic-text-tertiary" /> : <ChevronUp className="w-3.5 h-3.5 text-nordic-text-tertiary" />}
          </button>
          
          <AnimatePresence initial={false}>
            {isContextExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-2 pt-2 pb-4">
                  {currentStep === 1 && <PersonalSidebarTools />}
                  {currentStep === 2 && <ExperienceSidebarTools />}
                  {currentStep === 3 && <EducationSidebarTools />}
                  {currentStep === 4 && <DesignSidebarTools />}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border group-data-[state=collapsed]:hidden">
        <div className="space-y-3">
          <VitalBar label="Human" score={87} color="success" />
          <VitalBar label="ATS" score={92} color="primary" />
          <GhostVitalBadge count={3} />
        </div>
      </SidebarFooter>
    </Sidebar>

    {/* Peek Panel Overlay */}
    <AnimatePresence>
      {peekStep && state === "collapsed" && (
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed left-[48px] top-0 h-full w-[280px] bg-sidebar border-r border-sidebar-border z-50 shadow-2xl flex flex-col"
          onMouseEnter={() => setPeekStep(peekStep)}
          onMouseLeave={() => setPeekStep(null)}
        >
          <div className="p-4 border-b border-sidebar-border flex items-center gap-2">
            <span className="font-bold text-sm tracking-wide text-sidebar-foreground">
              {STEPS.find(s => s.id === peekStep)?.label ?? ""}
            </span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto">
            <div className="mb-4">
              <span className="text-[10px] tracking-widest uppercase font-mono text-sidebar-foreground/70 mb-2 block">Context Tools</span>
              {peekStep === 1 && <PersonalSidebarTools />}
              {peekStep === 2 && <ExperienceSidebarTools />}
              {peekStep === 3 && <EducationSidebarTools />}
              {peekStep === 4 && <DesignSidebarTools />}
            </div>
            {/* Can add section jumps or other peek content here */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
