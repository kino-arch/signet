import { useState, useCallback } from "react";
import { Download, Eye } from "lucide-react";
import { defaultResume, type ResumeData } from "@/types/resume";
import { NordicNav } from "@/layout/NordicNav";
import { NordicInput } from "@/components/nordic/NordicInput";
import { NordicTextarea } from "@/components/nordic/NordicTextarea";
import { AIAssistButton } from "@/components/nordic/AIAssistButton";

/* Placeholder template — replace with actual templates */
function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="h-full overflow-y-auto bg-white p-8 text-nordic-text">
      <h1 className="text-2xl font-bold">{data.identity.name || "Your Name"}</h1>
      <p className="text-nordic-accent font-medium">{data.identity.title || "Professional Title"}</p>
      <div className="mt-2 flex flex-wrap gap-3 text-sm text-nordic-text-secondary">
        {data.identity.email && <span>{data.identity.email}</span>}
        {data.identity.phone && <span>{data.identity.phone}</span>}
        {data.identity.city && <span>{data.identity.city}</span>}
      </div>
      {data.identity.summary && (
        <div className="mt-6">
          <h2 className="border-b border-nordic-border pb-1 text-sm font-bold uppercase tracking-wider text-nordic-text-secondary">
            Summary
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-nordic-text-secondary">{data.identity.summary}</p>
        </div>
      )}
    </div>
  );
}

export function NordicEditorPage() {
  const [liveData, setLiveData] = useState<ResumeData>(defaultResume);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  const handleFieldChange = useCallback(
    (field: keyof ResumeData["identity"], value: string) => {
      setLiveData((prev) => ({
        ...prev,
        identity: { ...prev.identity, [field]: value },
      }));
    },
    []
  );

  const canExport = !!activeTemplate && !!liveData.identity.name;

  return (
    <div className="min-h-screen bg-nordic-bg">
      <NordicNav />

      {/* Top bar */}
      <div className="border-b border-nordic-border bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-nordic-text">Resume Editor</h1>
            <p className="text-xs text-nordic-text-tertiary">Build your resume</p>
          </div>
          <button
            disabled={!canExport}
            className="nordic-btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            aria-disabled={!canExport}
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar — Templates */}
          <div className="lg:col-span-3">
            <div className="nordic-card-flat p-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-nordic-text-tertiary mb-4">
                Templates
              </h2>
              <div className="space-y-3">
                {["minimal", "technical", "creative"].map((id) => (
                  <button
                    key={id}
                    onClick={() => setActiveTemplate(id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      activeTemplate === id
                        ? "border-nordic-accent bg-nordic-accent-soft"
                        : "border-nordic-border bg-white hover:bg-nordic-surface-hover"
                    }`}
                  >
                    <div className="aspect-[3/4] bg-nordic-bg border border-nordic-border-subtle mb-2 flex items-center justify-center">
                      <span className="text-xs font-medium uppercase text-nordic-text-tertiary">{id}</span>
                    </div>
                    <p className="text-sm font-medium text-nordic-text capitalize">{id}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Editor — Form */}
          <div className="lg:col-span-5">
            <div className="nordic-card-flat p-6 space-y-6">
              <h2 className="text-lg font-semibold text-nordic-text">Personal Information</h2>

              <div className="grid grid-cols-2 gap-4">
                <NordicInput
                  label="Full Name"
                  value={liveData.identity.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  placeholder="Jane Doe"
                />
                <NordicInput
                  label="Professional Title"
                  value={liveData.identity.title}
                  onChange={(e) => handleFieldChange("title", e.target.value)}
                  placeholder="Senior Software Engineer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <NordicInput
                  label="Email"
                  value={liveData.identity.email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  placeholder="jane@example.com"
                />
                <NordicInput
                  label="Phone"
                  value={liveData.identity.phone}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  placeholder="+1 555-0100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <NordicInput
                  label="Website"
                  value={liveData.identity.website || ""}
                  onChange={(e) => handleFieldChange("website", e.target.value)}
                  placeholder="https://janedoe.dev"
                />
                <NordicInput
                  label="City"
                  value={liveData.identity.city || ""}
                  onChange={(e) => handleFieldChange("city", e.target.value)}
                  placeholder="San Francisco"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="nordic-input-label">Professional Summary</label>
                  <AIAssistButton
                    onGenerate={async () => "Experienced software engineer with a passion for building scalable systems..."}
                    onResult={(text) => handleFieldChange("summary", text)}
                  />
                </div>
                <NordicTextarea
                  value={liveData.identity.summary || ""}
                  onChange={(e) => handleFieldChange("summary", e.target.value)}
                  placeholder="A brief overview of your professional background and goals..."
                  rows={5}
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-4">
            <div className="nordic-card-flat h-[calc(100vh-12rem)] overflow-hidden">
              {activeTemplate ? (
                <MinimalTemplate data={liveData} />
              ) : (
                <div className="nordic-empty-state h-full">
                  <div className="flex h-12 w-12 items-center justify-center border border-nordic-border bg-nordic-surface-hover">
                    <Eye className="h-5 w-5 text-nordic-text-tertiary" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-nordic-text">
                    No template selected
                  </h3>
                  <p className="mt-1 max-w-[200px] text-xs text-nordic-text-tertiary">
                    Choose a template from the left panel to preview your resume.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
