import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ScanText, LayoutTemplate, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "ai-reforging",
    title: "Seamless Integrations",
    description:
      "Transform scattered bullet points into compelling narratives. Our AI understands context and elevates your professional tone automatically.",
    icon: Sparkles,
  },
  {
    id: "ats-optimization",
    title: "Real-time Sync",
    description:
      "Real-time keyword analysis and formatting checks guarantee your resume passes through Applicant Tracking Systems flawlessly.",
    icon: ScanText,
  },
  {
    id: "smart-templates",
    title: "Developer-first",
    description:
      "Choose from a curated collection of Nordic-inspired, minimalist templates designed to highlight content over clutter.",
    icon: LayoutTemplate,
  },
  {
    id: "app-tracking",
    title: "Enterprise-ready",
    description:
      "Manage your job hunt from a single dashboard. Track statuses, save variations, and monitor your success rate.",
    icon: Briefcase,
  },
];

function FeaturePanel({ featureId }: { featureId: string }) {
  const imageMap: Record<string, string> = {
    "ai-reforging": "/assets/illustrations/feature_ai_generation.png",
    "ats-optimization": "/assets/illustrations/feature_ats_optimization.png",
    "smart-templates": "/assets/illustrations/feature_cover_letters.png",
    "app-tracking": "/assets/illustrations/feature_app_tracking.png",
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-nordic-surface p-8">
      <img 
        src={imageMap[featureId] || imageMap["ai-reforging"]} 
        alt={featureId} 
        className="max-h-full max-w-full object-contain rounded-none border border-nordic-border/30 shadow-nordic-sm" 
      />
    </div>
  );
}

export function FeaturesBento() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  return (
    <section id="features" className="w-full bg-nordic-bg py-24">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-medium tracking-tight text-nordic-text md:text-5xl">
              Powerful Features for Modern Teams
            </h2>
            <p className="mt-4 text-lg text-nordic-text-secondary">
              Everything you need to build, connect, and scale your integrations effortlessly.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column — Tabs */}
          <div className="flex flex-col gap-3 lg:col-span-5">
            {features.map((feature) => {
              const isActive = activeFeature === feature.id;
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={cn(
                    "flex flex-col text-left p-6 rounded-none transition-all duration-300 border",
                    isActive
                      ? "bg-nordic-surface border-nordic-border shadow-nordic-sm"
                      : "border-transparent hover:bg-nordic-surface/50 hover:border-nordic-border"
                  )}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-none transition-colors",
                        isActive
                          ? "bg-nordic-accent text-white"
                          : "bg-nordic-surface border border-nordic-border text-nordic-text-secondary"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3
                      className={cn(
                        "text-xl font-medium transition-colors",
                        isActive ? "text-nordic-text" : "text-nordic-text-secondary"
                      )}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-nordic-text-secondary leading-relaxed overflow-hidden"
                      >
                        {feature.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Right Column — Live CSS mockup panel */}
          <div className="lg:col-span-7">
            <div className="relative h-full min-h-[440px] w-full overflow-hidden rounded-none border border-nordic-border bg-nordic-surface shadow-nordic-lg">
              {/* Window chrome bar */}
              <div className="flex items-center gap-2 border-b border-nordic-border bg-nordic-surface-hover px-5 py-3">
                <div className="h-2.5 w-2.5 rounded-none bg-[var(--color-nordic-error)]" aria-hidden="true" />
                <div className="h-2.5 w-2.5 rounded-none bg-[var(--color-nordic-warning)]" aria-hidden="true" />
                <div className="h-2.5 w-2.5 rounded-none bg-[var(--color-nordic-success)]" aria-hidden="true" />
                <span className="ml-3 text-xs font-mono text-nordic-text-secondary">
                  {features.find((f) => f.id === activeFeature)?.title}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full"
                >
                  <FeaturePanel featureId={activeFeature} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
