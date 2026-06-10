import { useState, useEffect } from "react";
import {
  Download, Eye, Plus, Trash2,
  LayoutTemplate, FileText, Terminal, Briefcase, Palette, Layers,
  Crosshair, Sparkles, LayoutDashboard, Edit3, BarChart2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { useDataSlateStore } from "@/store/useDataSlateStore";
import type { DataSlateStore, WorkEntry, EducationEntry } from "@/store/useDataSlateStore";

import { NordicInput } from "@/components/nordic/NordicInput";
import { NordicTextarea } from "@/components/nordic/NordicTextarea";

import { TemplateProvider, useTemplateTheme } from "@/components/templates/TemplateContext";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/editor/AppSidebar";
import { NordicBackground } from "@/components/ui/NordicBackground";
import { VoiceMemoButton } from "@/components/editor/VoiceMemoButton";
import { TargetLockPanel } from "@/components/editor/TargetLockPanel";
import { HighlightsEditor } from "@/components/editor/HighlightsEditor";
import { CoreCompetenciesArray } from "@/components/editor/CoreCompetenciesArray";
import { SummaryGeneratorAssistant } from "@/components/editor/v2/SummaryGeneratorAssistant";
import { ImpactScorePanel } from "@/components/editor/ImpactScorePanel";
import { SigilRetrieval } from "@/components/editor/SigilRetrieval";

import { StandardTemplate } from "@/components/templates/StandardTemplate";
import { TechnicalTemplate } from "@/components/templates/TechnicalTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { ExecutiveTemplate } from "@/components/templates/ExecutiveTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";

import { useForgeStore } from "@/store/useForgeStore";
import { useEditorShortcuts } from "@/hooks/useEditorShortcuts";

// ── Design constants ──────────────────────────────────────────────────────────

const TEMPLATES_LIST = [
  { id: "standard", name: "Standard", icon: FileText, desc: "ATS Optimized" },
  { id: "minimal", name: "Minimal", icon: LayoutTemplate, desc: "Clean & Simple" },
  { id: "technical", name: "Technical", icon: Terminal, desc: "For Engineers" },
  { id: "modern", name: "Modern", icon: Layers, desc: "Sleek Split" },
  { id: "executive", name: "Executive", icon: Briefcase, desc: "Leadership" },
  { id: "creative", name: "Creative", icon: Palette, desc: "Design Focus" },
];

// Focus Tunnel — three cognitive modes
type FocusMode = "compose" | "structure" | "analyze";

const FOCUS_MODES: { id: FocusMode; label: string; icon: typeof Edit3 }[] = [
  { id: "compose", label: "Compose", icon: Edit3 },
  { id: "structure", label: "Structure", icon: LayoutDashboard },
  { id: "analyze", label: "Analyze", icon: BarChart2 },
];

// ── MinimalTemplate (inline) ──────────────────────────────────────────────────

function MinimalTemplate({ store }: { store: DataSlateStore }) {
  const { colors } = useTemplateTheme();
  const { basics, work, skills, education } = store;

  return (
    <div
      id="resume-preview"
      className="h-full overflow-y-auto p-8"
      style={{ backgroundColor: colors.pageBg, color: colors.textPrimary }}
    >
      <h1 className="text-2xl font-bold">{basics.name || "Your Name"}</h1>
      <p className="font-medium" style={{ color: colors.accent }}>{basics.label || "Professional Title"}</p>
      <div className="mt-2 flex flex-wrap gap-3 text-sm" style={{ color: colors.textSecondary }}>
        {basics.email && <span>{basics.email}</span>}
        {basics.phone && <span>{basics.phone}</span>}
        {basics.location?.city && <span>{basics.location.city}</span>}
      </div>

      {basics.summary && (
        <div className="mt-6">
          <h2 className="pb-1 text-sm font-bold uppercase tracking-wider" style={{ borderBottom: `1px solid ${colors.border}`, color: colors.textSecondary }}>
            Summary
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{basics.summary}</p>
        </div>
      )}

      {work.length > 0 && (
        <div className="mt-6">
          <h2 className="pb-1 text-sm font-bold uppercase tracking-wider" style={{ borderBottom: `1px solid ${colors.border}`, color: colors.textSecondary }}>
            Experience
          </h2>
          <div className="mt-3 space-y-4">
            {work.map((w: WorkEntry) => (
              <div key={w.id}>
                <div className="flex justify-between font-medium">
                  <span style={{ color: colors.textPrimary }}>{w.name}</span>
                  <span className="text-sm" style={{ color: colors.textSecondary }}>{w.startDate} – {w.endDate || "Present"}</span>
                </div>
                <div className="text-sm" style={{ color: colors.accent }}>{w.position}</div>
                {w.highlights && w.highlights.length > 0 && (
                  <ul className="mt-1 list-disc list-outside ml-4 space-y-0.5 text-sm" style={{ color: colors.textSecondary }}>
                    {w.highlights.map((h: string, i: number) => <li key={i}>{h}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mt-6">
          <h2 className="pb-1 text-sm font-bold uppercase tracking-wider" style={{ borderBottom: `1px solid ${colors.border}`, color: colors.textSecondary }}>
            Skills
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((s: any) => (
              <span key={s.id} className="text-sm px-2 py-0.5 rounded" style={{ backgroundColor: colors.border, color: colors.textSecondary }}>{s.name}</span>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mt-6">
          <h2 className="pb-1 text-sm font-bold uppercase tracking-wider" style={{ borderBottom: `1px solid ${colors.border}`, color: colors.textSecondary }}>
            Education
          </h2>
          <div className="mt-3 space-y-3">
            {education.map((e: EducationEntry) => (
              <div key={e.id}>
                <div className="flex justify-between font-medium">
                  <span style={{ color: colors.textPrimary }}>{e.institution}</span>
                  <span className="text-sm" style={{ color: colors.textSecondary }}>{e.endDate}</span>
                </div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>{e.studyType} {e.area ? `in ${e.area}` : ""}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── TemplateRenderer ──────────────────────────────────────────────────────────

function TemplateRenderer({ store, templateId }: { store: DataSlateStore; templateId: string }) {
  return (
    <TemplateProvider theme="light">
      {templateId === "standard" && <StandardTemplate store={store} />}
      {templateId === "minimal" && <MinimalTemplate store={store} />}
      {templateId === "technical" && <TechnicalTemplate store={store} />}
      {templateId === "modern" && <ModernTemplate store={store} />}
      {templateId === "executive" && <ExecutiveTemplate store={store} />}
      {templateId === "creative" && <CreativeTemplate store={store} />}
    </TemplateProvider>
  );
}

// ── NordicEditorPage ──────────────────────────────────────────────────────────

export function NordicEditorPage() {
  const store = useDataSlateStore();
  const {
    basics, setBasics,
    work, addWorkEntry, updateWorkEntry, removeWorkEntry,
    education, addEducationEntry, updateEducationEntry, removeEducationEntry,
  } = store;

  const targetLockCompany = useForgeStore((s) => s.targetLockCompany);

  const [activeTemplate, setActiveTemplate] = useState<string>("minimal");
  const [currentStep, setCurrentStep] = useState(1);
  const [showAiSummary, setShowAiSummary] = useState(false);

  // Focus Tunnel: cognitive mode
  const [focusMode, setFocusMode] = useState<FocusMode>("compose");

  // Command Center: popup state
  const [commandCenterOpen, setCommandCenterOpen] = useState(false);

  // Sidebar open/collapse state — synced to focusMode
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Export Dialog state
  const [exportDialogOpen, setExportDialogOpen] = useState(false);


  useEffect(() => {
    if (focusMode === "compose") {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [focusMode]);

  useEditorShortcuts({
    navigateTo: (step) => setCurrentStep(step),
    toggleSidebar: () => setSidebarOpen(s => !s),
    openCommandPalette: () => setCommandCenterOpen(true),
  });

  // Ambient Shelf: show only on the Design step (step 4)
  const showAmbientShelf = currentStep === 4;

  const canExport = !!activeTemplate && !!basics.name;

  const handleExportComplete = () => {
    setExportDialogOpen(false);
  };

  // Focus Tunnel: derive rail + command center state from mode

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex h-screen w-full font-sans relative overflow-hidden bg-nordic-bg">
        <NordicBackground />
        
        <AppSidebar currentStep={currentStep} onStepChange={setCurrentStep} />

        <SidebarInset role="main" className="flex-1 flex flex-col h-full bg-transparent overflow-hidden">
          {/* ── Header ── */}
          <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-white/5 bg-nordic-surface/50 px-4">
             {/* Left: Command History Breadcrumbs */}
             <div className="flex items-center gap-4">
               <SidebarTrigger className="-ml-1 text-nordic-text-tertiary hover:text-nordic-text transition-colors" />
               <div className="h-4 w-px bg-white/10" />
               <div className="flex items-center gap-2 pl-2 text-[10px] font-mono tracking-widest uppercase">
                  <h1 className="text-nordic-text-secondary max-w-[120px] truncate m-0 font-normal leading-normal">{basics.name || "Untitled Resume"}</h1>
                  <span className="text-nordic-text-tertiary opacity-40">/</span>
                  <span className="text-nordic-accent/80 border border-nordic-accent/20 bg-nordic-accent/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Enhanced 3 bullets
                  </span>
                  <span className="text-nordic-text-tertiary opacity-40">/</span>
                  <span className="text-nordic-text px-1.5 py-0.5 rounded border border-white/5 bg-white/5">
                    {targetLockCompany ? `Added Target: ${targetLockCompany}` : "Updated Personal Info"}
                  </span>
               </div>
             </div>
             
             {/* Center: Command Center Dialog */}
             <div className="flex items-center">
               <Dialog open={commandCenterOpen} onOpenChange={setCommandCenterOpen}>
                 <DialogTrigger asChild>
                   <button className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border border-white/10 text-nordic-text-tertiary hover:text-nordic-text hover:border-white/20">
                     <Crosshair className="w-3 h-3" />
                     {targetLockCompany ? `Target: ${targetLockCompany}` : "Target Lock"}
                   </button>
                 </DialogTrigger>
                 <DialogContent className="max-w-[480px] w-full p-0 border-nordic-border bg-nordic-bg/95 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden liquid-glass">
                   <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0 bg-white/5">
                     <div className="flex items-center gap-2">
                       <Crosshair className="w-4 h-4 text-nordic-accent" />
                       <span className="text-sm font-semibold text-nordic-text uppercase tracking-wider">Command Center</span>
                     </div>
                   </div>
                   <div className="flex-1 overflow-y-auto p-6 max-h-[80vh]">
                     <TargetLockPanel onComplete={() => setCommandCenterOpen(false)} />
                   </div>
                 </DialogContent>
               </Dialog>
             </div>

             {/* Right: Actions */}
             <div className="flex items-center gap-3">
                {/* Focus Modes */}
                <div className="flex items-center gap-1 border border-white/8 rounded px-1">
                  {FOCUS_MODES.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setFocusMode(id)}
                      className={`p-1 rounded transition-colors ${focusMode === id ? "text-nordic-accent bg-white/5" : "text-nordic-text-tertiary hover:text-nordic-text hover:bg-white/5"}`}
                      title={`${label} mode`}
                    >
                      <Icon className="w-3 h-3" />
                    </button>
                  ))}
                </div>
                <span className="opacity-20 text-[10px]">|</span>
                {/* Preview */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      disabled={!activeTemplate}
                      className="text-[10px] uppercase tracking-widest text-nordic-text-secondary hover:text-nordic-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      Preview
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[1000px] w-full max-h-[90vh] overflow-hidden p-0 border-nordic-border bg-nordic-bg shadow-2xl">
                    <div className="h-[85vh] w-full overflow-y-auto">
                      {activeTemplate && <TemplateRenderer store={store} templateId={activeTemplate} />}
                    </div>
                  </DialogContent>
                </Dialog>
                <span className="opacity-20 text-[10px]">|</span>
                
                {/* Hidden Template for PDF Export */}
                {activeTemplate && (
                  <div className="fixed -left-[10000px] top-0 pointer-events-none w-[800px] bg-white">
                    <TemplateRenderer store={store} templateId={activeTemplate} />
                  </div>
                )}

                {/* Export */}
                <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
                  <DialogTrigger asChild>
                    <button
                      disabled={!canExport}
                      className="text-[10px] uppercase tracking-widest text-nordic-text-secondary hover:text-nordic-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      Export PDF
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[600px] w-full p-0 border-nordic-border bg-nordic-bg shadow-2xl rounded-xl">
                    <DialogTitle className="sr-only">Export to PDF</DialogTitle>
                    <DialogDescription className="sr-only">Retrieve your document using Beskar Credits</DialogDescription>
                    <SigilRetrieval 
                      onComplete={handleExportComplete} 
                      onNoTokens={() => {
                        // In a real app we might redirect to a billing page or show an alert.
                        alert("Not enough Beskar Credits.");
                      }} 
                    />
                  </DialogContent>
                </Dialog>
             </div>
          </header>

          <main className="flex-1 overflow-y-auto p-8 relative z-10">
            <div className="max-w-4xl mx-auto">
            {/* ── Step 1: Personal Info ── */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="bg-nordic-surface border border-nordic-border p-6">
                  <h2 className="text-base font-semibold text-nordic-text mb-4">Personal Information</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <NordicInput label="Full Name" value={basics.name} onChange={(e) => setBasics({ name: e.target.value })} placeholder="Jane Doe" />
                    <NordicInput label="Professional Title" value={basics.label} onChange={(e) => setBasics({ label: e.target.value })} placeholder="Senior Software Engineer" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <NordicInput label="Email" value={basics.email} onChange={(e) => setBasics({ email: e.target.value })} placeholder="jane@example.com" />
                    <NordicInput label="Phone" value={basics.phone} onChange={(e) => setBasics({ phone: e.target.value })} placeholder="+1 555-0100" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <NordicInput label="Website" value={basics.url} onChange={(e) => setBasics({ url: e.target.value })} placeholder="https://janedoe.dev" />
                    <NordicInput
                      label="City"
                      value={basics.location?.city || ""}
                      onChange={(e) => setBasics({ location: { ...basics.location, city: e.target.value, countryCode: basics.location?.countryCode || "", region: basics.location?.region || "" } })}
                      placeholder="San Francisco"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="nordic-input-label">Professional Summary</label>
                      {!showAiSummary && (
                        <button
                          onClick={() => setShowAiSummary(true)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-primary transition hover:bg-primary/20"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          AI Architect
                        </button>
                      )}
                    </div>
                    {showAiSummary && (
                      <SummaryGeneratorAssistant
                        currentSummary={basics.summary || ""}
                        onApply={(text) => { setBasics({ summary: text }); setShowAiSummary(false); }}
                        onCancel={() => setShowAiSummary(false)}
                      />
                    )}
                    <NordicTextarea value={basics.summary} onChange={(e) => setBasics({ summary: e.target.value })} placeholder="A brief overview of your professional background and goals..." rows={5} />
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: Experience ── */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-nordic-surface border border-nordic-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-base font-semibold text-nordic-text">Experience</h2>
                    <button onClick={addWorkEntry} className="nordic-btn-ghost text-xs"><Plus className="h-3 w-3 mr-1" /> Add</button>
                  </div>
                  <div className="space-y-6">
                    {work.map((w, index) => (
                      <div key={w.id} className="relative group border-b border-nordic-border pb-8 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-nordic-text-secondary uppercase tracking-wider">Role {index + 1}</h3>
                          <button onClick={() => removeWorkEntry(w.id)} className="p-1 text-nordic-text-tertiary hover:text-nordic-error opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove work entry">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <NordicInput label="Company" value={w.name} onChange={(e) => updateWorkEntry(w.id, { name: e.target.value })} placeholder="Acme Corp" />
                          <NordicInput label="Position" value={w.position} onChange={(e) => updateWorkEntry(w.id, { position: e.target.value })} placeholder="Software Engineer" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <NordicInput label="Start Date" value={w.startDate} onChange={(e) => updateWorkEntry(w.id, { startDate: e.target.value })} placeholder="Jan 2020" />
                          <NordicInput label="End Date" value={w.endDate} onChange={(e) => updateWorkEntry(w.id, { endDate: e.target.value })} placeholder="Present" />
                        </div>
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="nordic-input-label mb-0">Summary</label>
                            <VoiceMemoButton entryId={w.id} />
                          </div>
                          <NordicInput value={w.summary} onChange={(e) => updateWorkEntry(w.id, { summary: e.target.value })} placeholder="Led frontend development..." />
                        </div>
                        <div className="mb-4">
                          <HighlightsEditor entry={w} />
                        </div>
                        <div className="mb-4">
                          <ImpactScorePanel entry={w} />
                        </div>
                      </div>
                    ))}
                    {work.length === 0 && (
                      <p className="text-sm text-nordic-text-tertiary italic">No experience entries yet. Click <strong>Add</strong> to begin.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 3: Education ── */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-nordic-surface border border-nordic-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-base font-semibold text-nordic-text">Education</h2>
                    <button onClick={addEducationEntry} className="nordic-btn-ghost text-xs"><Plus className="h-3 w-3 mr-1" /> Add</button>
                  </div>
                  <div className="space-y-6">
                    {education.map((e, index) => (
                      <div key={e.id} className="relative group border-b border-nordic-border pb-8 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-semibold text-nordic-text-secondary uppercase tracking-wider">Degree {index + 1}</h3>
                          <button onClick={() => removeEducationEntry(e.id)} className="p-1 text-nordic-text-tertiary hover:text-nordic-error opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove education entry">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <NordicInput label="Institution" value={e.institution} onChange={(ev) => updateEducationEntry(e.id, { institution: ev.target.value })} placeholder="University of Tech" />
                          <NordicInput label="Area of Study" value={e.area} onChange={(ev) => updateEducationEntry(e.id, { area: ev.target.value })} placeholder="Computer Science" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <NordicInput label="Degree Type" value={e.studyType} onChange={(ev) => updateEducationEntry(e.id, { studyType: ev.target.value })} placeholder="B.S." />
                          <NordicInput label="End Date" value={e.endDate} onChange={(ev) => updateEducationEntry(e.id, { endDate: ev.target.value })} placeholder="May 2019" />
                        </div>
                      </div>
                    ))}
                    {education.length === 0 && (
                      <p className="text-sm text-nordic-text-tertiary italic">No education entries yet. Click <strong>Add</strong> to begin.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 4: Design (Skills + Template — Ambient Shelf lives here) ── */}
            {currentStep === 4 && (
              <div className="bg-nordic-surface border border-nordic-border p-6">
                <h2 className="text-base font-semibold text-nordic-text mb-4">Skills & Competencies</h2>
                <CoreCompetenciesArray />
              </div>
            )}
            </div>
          </main>
          
          {/* ── Phase 3: Ambient Shelf (template picker for step 4) ── */}
          <AnimatePresence>
            {showAmbientShelf && (
              <motion.div
                className="ambient-shelf fixed bottom-9 left-1/2 -translate-x-1/2 z-30 rounded-2xl px-6 py-4"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.05}
                whileHover={{ scale: 1.01 }}
                aria-label="Template Selector"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-nordic-text-tertiary">Choose Template</span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {TEMPLATES_LIST.map(({ id, name, icon: Icon }) => (
                    <motion.button
                      key={id}
                      onClick={() => setActiveTemplate(id)}
                      whileHover={{ scale: 1.04, rotateX: 2, rotateY: -2 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`shrink-0 flex flex-col items-center gap-2 w-20 px-3 py-3 rounded-xl border transition-all ${
                        activeTemplate === id
                          ? "border-nordic-accent bg-nordic-accent/15 text-nordic-accent shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                          : "border-white/8 bg-white/3 text-nordic-text-tertiary hover:text-nordic-text hover:border-white/15 hover:bg-white/6"
                      }`}
                      aria-pressed={activeTemplate === id}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                      <span className="text-[9px] font-bold uppercase tracking-wider text-center leading-tight">{name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
