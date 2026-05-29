"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check, Briefcase, GraduationCap, Code, User, Settings } from "lucide-react";
import { BasicInfoForm } from "@/components/editor/BasicInfoForm";
import { ExperienceForm } from "@/components/editor/ExperienceForm";
import { EducationForm } from "@/components/editor/EducationForm";
import { SkillsForm } from "@/components/editor/SkillsForm";
import { SettingsForm } from "@/components/editor/SettingsForm";

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const STEPS = [
  { id: 1, name: "Basic Info", description: "Identity & Comm", icon: User },
  { id: 2, name: "Experience", description: "Bounties & Guilds", icon: Briefcase },
  { id: 3, name: "Education", description: "Training & Academies", icon: GraduationCap },
  { id: 4, name: "Skills", description: "Combat & Tech", icon: Code },
  { id: 5, name: "Aesthetics", description: "Armor & Themes", icon: Settings },
];

function SidebarStep({ step, currentStep }: { step: (typeof STEPS)[0]; currentStep: number }) {
  const Icon = step.icon;
  const isCompleted = currentStep > step.id;
  const isCurrent = currentStep === step.id;

  return (
    <div className="relative flex items-center gap-4 py-4">
      {step.id !== STEPS.length && (
        <div className="absolute top-10 left-6 h-full w-[2px] bg-border/30">
          <motion.div
            className="h-full w-full bg-primary"
            initial={{ height: "0%" }}
            animate={{ height: isCompleted ? "100%" : "0%" }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      <motion.div
        className={cn(
          "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
          isCompleted
            ? "border-primary bg-primary text-primary-foreground"
            : isCurrent
            ? "border-primary bg-background text-primary ring-4 ring-primary/10"
            : "border-border/50 bg-background/50 text-muted-foreground"
        )}
        whileHover={{ scale: 1.05 }}
      >
        {isCompleted ? <Check className="h-5 w-5" strokeWidth={3} /> : <Icon className="h-5 w-5" />}
      </motion.div>

      <div className="flex flex-col">
        <span
          className={cn(
            "text-sm font-semibold transition-colors duration-300",
            isCurrent || isCompleted ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {step.name}
        </span>
        <span className="text-xs text-muted-foreground/70">{step.description}</span>
      </div>
    </div>
  );
}

export function ForgeWizard({ onComplete }: { onComplete?: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <Badge
          variant="outline"
          className="mb-4 inline-flex items-center gap-2"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Data Injection Protocol
        </Badge>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          The Crucible
        </h1>
        <p className="text-muted-foreground">
          Forge your credentials systematically.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden rounded-3xl border border-border/40 bg-background/40 backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-transparent" />

        <div className="grid @3xl:grid-cols-[280px_1fr]">
          <div className="border-b border-border/40 bg-background/30 p-6 @2xl:p-8 @3xl:border-r @3xl:border-b-0">
            <div className="space-y-1">
              {STEPS.map((step) => (
                <SidebarStep key={step.id} step={step} currentStep={currentStep} />
              ))}
            </div>
          </div>

          <div className="flex flex-col p-6 @2xl:p-8 @3xl:p-12">
            <div className="flex-1">
              <motion.div
                key={currentStep}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    {STEPS[currentStep - 1].name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {STEPS[currentStep - 1].description}
                  </p>
                </div>

                <div className="min-h-[400px]">
                  {currentStep === 1 && <BasicInfoForm />}
                  {currentStep === 2 && <ExperienceForm />}
                  {currentStep === 3 && <EducationForm />}
                  {currentStep === 4 && <SkillsForm />}
                  {currentStep === 5 && <SettingsForm />}
                </div>
              </motion.div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-8">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-2 text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              {currentStep === STEPS.length ? (
                <Button
                  onClick={onComplete}
                  className="gap-2 shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40"
                >
                  Complete Forge
                  <Check className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="gap-2"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
