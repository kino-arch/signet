import { useState } from "react";
import { Download, Eye, Plus, Trash2 } from "lucide-react";
import { useDataSlateStore } from "@/store/useDataSlateStore";
import type { DataSlateStore, WorkEntry, SkillEntry, EducationEntry } from "@/store/useDataSlateStore";
import { exportResumeToPDF } from "@/lib/export-pdf";

import { NordicInput } from "@/components/nordic/NordicInput";
import { NordicTextarea } from "@/components/nordic/NordicTextarea";
import { FloatingAIChatWidget } from "@/components/editor/floating-ai-chat-widget";
import { GripVertical } from "lucide-react"
import { Reorder } from "framer-motion"
import { TemplateProvider, useTemplateTheme } from "@/components/templates/TemplateContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NordicBackground } from "@/components/ui/NordicBackground";
import { ResumeStepWizard } from "@/components/ui/ResumeStepWizard";

/* Minimal Template connected to DataSlateStore */
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
          <h2 
            className="pb-1 text-sm font-bold uppercase tracking-wider"
            style={{ borderBottom: `1px solid ${colors.border}`, color: colors.textSecondary }}
          >
            Summary
          </h2>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{basics.summary}</p>
        </div>
      )}

      {work.length > 0 && (
        <div className="mt-6">
          <h2 
            className="pb-1 text-sm font-bold uppercase tracking-wider"
            style={{ borderBottom: `1px solid ${colors.border}`, color: colors.textSecondary }}
          >
            Experience
          </h2>
          <div className="mt-3 space-y-4">
            {work.map((w: WorkEntry) => (
              <div key={w.id}>
                <div className="flex justify-between font-medium">
                  <span style={{ color: colors.textPrimary }}>{w.name}</span>
                  <span className="text-sm" style={{ color: colors.textSecondary }}>{w.startDate} - {w.endDate || 'Present'}</span>
                </div>
                <div className="text-sm italic mb-1" style={{ color: colors.accent }}>{w.position}</div>
                {w.summary && <p className="text-sm mb-1" style={{ color: colors.textSecondary }}>{w.summary}</p>}
                {w.highlights && w.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 text-sm space-y-1" style={{ color: colors.textSecondary }}>
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
          <h2 
            className="pb-1 text-sm font-bold uppercase tracking-wider"
            style={{ borderBottom: `1px solid ${colors.border}`, color: colors.textSecondary }}
          >
            Skills
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((s: SkillEntry) => (
              <span key={s.id} className="text-sm border px-2 py-1" style={{ borderColor: colors.border, color: colors.textSecondary }}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mt-6">
          <h2 
            className="pb-1 text-sm font-bold uppercase tracking-wider"
            style={{ borderBottom: `1px solid ${colors.border}`, color: colors.textSecondary }}
          >
            Education
          </h2>
          <div className="mt-3 space-y-3">
            {education.map((e: EducationEntry) => (
              <div key={e.id}>
                <div className="flex justify-between font-medium">
                  <span style={{ color: colors.textPrimary }}>{e.institution}</span>
                  <span className="text-sm" style={{ color: colors.textSecondary }}>{e.endDate}</span>
                </div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>{e.studyType} {e.area ? `in ${e.area}` : ''}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function NordicEditorPage() {
  const store = useDataSlateStore();
  const { 
    basics, setBasics, 
    work, addWorkEntry, updateWorkEntry, removeWorkEntry,
    skills, addSkillEntry, updateSkillEntry, removeSkillEntry,
    education, addEducationEntry, updateEducationEntry, removeEducationEntry
  } = store;

  const [activeTemplate, setActiveTemplate] = useState<string | null>("minimal");
  const [isExporting, setIsExporting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const STEPS = [
    { id: 1, label: "Personal" },
    { id: 2, label: "Experience" },
    { id: 3, label: "Education" },
    { id: 4, label: "Skills" },
  ];

  const totalSteps = STEPS.length;

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportResumeToPDF("resume-preview", `${basics.name || 'resume'}.pdf`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };


  const canExport = !!activeTemplate && !!basics.name;

  return (
    <div
      className="flex h-[calc(100vh-64px)] w-full flex-row font-sans relative overflow-hidden bg-nordic-bg"
      style={{ zoom: 0.85 }}
    >
      <NordicBackground />

      <FloatingAIChatWidget />
      
      {/* Sidebar - Actions & Templates */}
      <div className="w-64 border-r border-nordic-border bg-nordic-surface flex flex-col h-full shrink-0 z-10 relative">
        <div className="p-5 border-b border-nordic-border">
          <h1 className="text-lg font-bold text-nordic-text">Resume Editor</h1>
          <p className="text-xs text-nordic-text-tertiary">Build your resume</p>
        </div>
        
        <div className="p-5 space-y-4">
          <button
            onClick={handleExport}
            disabled={!canExport || isExporting}
            className="nordic-btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            aria-disabled={!canExport || isExporting}
          >
            <Download className="h-4 w-4" />
            {isExporting ? "Exporting..." : "Export"}
          </button>

          <Dialog>
            <DialogTrigger asChild>
              <button
                disabled={!activeTemplate}
                className="nordic-btn-secondary w-full disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Preview
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[1000px] w-full max-h-[90vh] overflow-hidden p-0 border-nordic-border bg-nordic-bg shadow-2xl">
              <div className="h-[85vh] w-full overflow-y-auto bg-white/5">
                {activeTemplate ? (
                  <TemplateProvider theme="light">
                    <MinimalTemplate store={store} />
                  </TemplateProvider>
                ) : (
                  <div className="flex items-center justify-center h-full text-nordic-text-tertiary">
                    Select a template to preview.
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Template Selector */}
        <div className="p-5 flex-1 border-t border-nordic-border">
          <span className="text-[10px] font-bold uppercase tracking-wider text-nordic-text-tertiary mb-3 block">Template</span>
          <div className="flex flex-col gap-2">
            {["minimal", "technical", "creative"].map((id) => (
              <button
                key={id}
                onClick={() => setActiveTemplate(id)}
                className={`w-full text-left p-3 border transition-all ${
                  activeTemplate === id
                    ? "border-nordic-accent bg-nordic-accent text-nordic-bg shadow-[0_0_10px_rgba(var(--nordic-accent-rgb),0.2)]"
                    : "border-nordic-border bg-nordic-bg hover:bg-nordic-surface-hover text-nordic-text-secondary hover:text-nordic-text"
                }`}
              >
                <p className="text-sm font-semibold uppercase tracking-wider">{id}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Container - Step Wizard */}
      <div className="flex-1 relative h-full z-10 flex flex-col overflow-hidden">
        <ResumeStepWizard
          steps={STEPS}
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        >
          {/* ── Step 1: Personal Info ── */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="bg-nordic-surface border border-nordic-border p-6">
                <h2 className="text-base font-semibold text-nordic-text mb-4">Personal Information</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <NordicInput
                    label="Full Name"
                    value={basics.name}
                    onChange={(e) => setBasics({ name: e.target.value })}
                    placeholder="Jane Doe"
                  />
                  <NordicInput
                    label="Professional Title"
                    value={basics.label}
                    onChange={(e) => setBasics({ label: e.target.value })}
                    placeholder="Senior Software Engineer"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <NordicInput
                    label="Email"
                    value={basics.email}
                    onChange={(e) => setBasics({ email: e.target.value })}
                    placeholder="jane@example.com"
                  />
                  <NordicInput
                    label="Phone"
                    value={basics.phone}
                    onChange={(e) => setBasics({ phone: e.target.value })}
                    placeholder="+1 555-0100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <NordicInput
                    label="Website"
                    value={basics.url}
                    onChange={(e) => setBasics({ url: e.target.value })}
                    placeholder="https://janedoe.dev"
                  />
                  <NordicInput
                    label="City"
                    value={basics.location?.city || ""}
                    onChange={(e) => setBasics({ location: { ...basics.location, city: e.target.value, countryCode: basics.location?.countryCode || "", region: basics.location?.region || "" } })}
                    placeholder="San Francisco"
                  />
                </div>
                <div>
                  <label className="nordic-input-label">Professional Summary</label>
                  <NordicTextarea
                    value={basics.summary}
                    onChange={(e) => setBasics({ summary: e.target.value })}
                    placeholder="A brief overview of your professional background and goals..."
                    rows={5}
                  />
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
                  <button onClick={addWorkEntry} className="nordic-btn-ghost text-xs">
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </button>
                </div>
                <div className="space-y-6">
                  {work.map((w, index) => (
                    <div key={w.id} className="relative group border-b border-nordic-border pb-8 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-nordic-text-secondary uppercase tracking-wider">Role {index + 1}</h3>
                        <button
                          onClick={() => removeWorkEntry(w.id)}
                          className="p-1 text-nordic-text-tertiary hover:text-nordic-error opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove work entry"
                        >
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
                        <NordicInput label="Summary" value={w.summary} onChange={(e) => updateWorkEntry(w.id, { summary: e.target.value })} placeholder="Led frontend development..." />
                      </div>
                      <div>
                        <label className="nordic-input-label">Highlights (one per line)</label>
                        <NordicTextarea value={w.highlights.join("\n")} onChange={(e) => updateWorkEntry(w.id, { highlights: e.target.value.split("\n").filter(Boolean) })} placeholder="Shipped new feature X..." rows={3} />
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
                  <button onClick={addEducationEntry} className="nordic-btn-ghost text-xs">
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </button>
                </div>
                <div className="space-y-6">
                  {education.map((e, index) => (
                    <div key={e.id} className="relative group border-b border-nordic-border pb-8 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-nordic-text-secondary uppercase tracking-wider">Degree {index + 1}</h3>
                        <button
                          onClick={() => removeEducationEntry(e.id)}
                          className="p-1 text-nordic-text-tertiary hover:text-nordic-error opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove education entry"
                        >
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

          {/* ── Step 4: Skills ── */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-nordic-surface border border-nordic-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-base font-semibold text-nordic-text">Skills</h2>
                  <button onClick={addSkillEntry} className="nordic-btn-ghost text-xs">
                    <Plus className="h-3 w-3 mr-1" /> Add
                  </button>
                </div>
                <Reorder.Group axis="y" values={skills} onReorder={(newOrder) => store.setSkills(newOrder)} className="grid grid-cols-1 gap-3">
                  {skills.map((s) => (
                    <Reorder.Item key={s.id} value={s} className="flex items-center gap-3 px-3 py-2.5 bg-nordic-bg border border-nordic-border group cursor-grab active:cursor-grabbing hover:border-nordic-accent focus-within:border-nordic-accent focus-within:ring-1 focus-within:ring-nordic-accent/50 transition-all">
                      <div className="text-nordic-text-tertiary flex-shrink-0 cursor-grab active:cursor-grabbing">
                        <GripVertical className="size-4" />
                      </div>
                      <div className="flex-1">
                        <input
                          value={s.name}
                          onChange={(e) => updateSkillEntry(s.id, { name: e.target.value })}
                          placeholder="e.g. React.js"
                          className="w-full bg-transparent border-none text-sm text-nordic-text focus:outline-none focus:ring-0 placeholder:italic placeholder:text-nordic-text-tertiary"
                        />
                      </div>
                      <button
                        onClick={() => removeSkillEntry(s.id)}
                        className="p-1 text-nordic-text-tertiary hover:text-nordic-error opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove skill"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </Reorder.Item>
                  ))}
                  {skills.length === 0 && (
                    <p className="text-sm text-nordic-text-tertiary italic mt-2">No skills added yet. Click <strong>Add</strong> to begin.</p>
                  )}
                </Reorder.Group>
              </div>
            </div>
          )}
        </ResumeStepWizard>

        {/* Step Navigation Footer */}
        <div className="shrink-0 border-t border-nordic-border bg-nordic-surface/80 backdrop-blur-sm px-8 py-5 flex items-center justify-between z-10">
          <span className="text-xs text-nordic-text-tertiary font-medium uppercase tracking-wider">
            Step {currentStep} of {totalSteps}
          </span>
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                className="nordic-btn-secondary"
              >
                ← Back
              </button>
            )}
            {currentStep < totalSteps ? (
              <button
                onClick={() => setCurrentStep((s) => Math.min(totalSteps, s + 1))}
                className="nordic-btn-primary"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleExport}
                disabled={!canExport || isExporting}
                className="nordic-btn-primary disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {isExporting ? "Exporting..." : "Export PDF"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
