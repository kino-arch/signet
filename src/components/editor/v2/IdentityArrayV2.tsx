import { useState } from "react"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import { telemetry } from "@/lib/telemetry"
import { NordicInput } from "@/components/nordic/NordicInput"
import { NordicTextarea } from "@/components/nordic/NordicTextarea"
import { Sparkles } from "lucide-react"
import { SummaryGeneratorAssistant } from "./SummaryGeneratorAssistant"

export function IdentityArrayV2() {
  const { basics, setBasics } = useDataSlateStore()
  const [showAiSummary, setShowAiSummary] = useState(false)

  const handleUpdate = (field: string, value: string) => {
    setBasics({ [field]: value })
    telemetry.track("v2_editor_identity_update", { field })
  }

  const handleLocationUpdate = (
    field: "city" | "countryCode" | "region",
    value: string
  ) => {
    setBasics({ location: { ...basics.location, [field]: value } })
    telemetry.track("v2_editor_identity_location_update", { field })
  }

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="border-b border-nordic-border pb-3">
        <h3 className="text-lg font-semibold text-nordic-text">
          Personal Information
        </h3>
        <p className="mt-0.5 text-xs text-nordic-text-tertiary">
          This information will appear at the top of your resume.
        </p>
      </div>

      {/* Card */}
      <div className="nordic-card-flat p-6 space-y-4">
        {/* Row 1: Name + Title */}
        <div className="grid grid-cols-2 gap-4">
          <NordicInput
            label="Full Name"
            value={basics.name}
            onChange={(e) => handleUpdate("name", e.target.value)}
            placeholder="Jane Doe"
          />
          <NordicInput
            label="Professional Title"
            value={basics.label}
            onChange={(e) => handleUpdate("label", e.target.value)}
            placeholder="Senior Software Engineer"
          />
        </div>

        {/* Row 2: Email + Phone */}
        <div className="grid grid-cols-2 gap-4">
          <NordicInput
            label="Email"
            type="email"
            value={basics.email}
            onChange={(e) => handleUpdate("email", e.target.value)}
            placeholder="jane@example.com"
          />
          <NordicInput
            label="Phone"
            type="tel"
            value={basics.phone}
            onChange={(e) => handleUpdate("phone", e.target.value)}
            placeholder="+1 555-0100"
          />
        </div>

        {/* Row 3: Website + City */}
        <div className="grid grid-cols-2 gap-4">
          <NordicInput
            label="Website"
            type="url"
            value={basics.url}
            onChange={(e) => handleUpdate("url", e.target.value)}
            placeholder="https://janedoe.dev"
          />
          <NordicInput
            label="City"
            value={basics.location.city}
            onChange={(e) => handleLocationUpdate("city", e.target.value)}
            placeholder="San Francisco"
          />
        </div>

        {/* Professional Summary */}
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
              onApply={(text) => {
                handleUpdate("summary", text)
                setShowAiSummary(false)
              }}
              onCancel={() => setShowAiSummary(false)}
            />
          )}

          <NordicTextarea
            value={basics.summary ?? ""}
            onChange={(e) => handleUpdate("summary", e.target.value)}
            placeholder="A brief overview of your professional background and goals..."
            rows={5}
          />
        </div>
      </div>
    </div>
  )
}
