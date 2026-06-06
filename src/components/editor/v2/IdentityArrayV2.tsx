import { SignetCard } from "@/components/primitives/SignetCard"
import { SignetInput } from "@/components/primitives/SignetInput"
import { useDataSlateStore } from "@/store/useDataSlateStore"
import { telemetry } from "@/lib/telemetry"

export function IdentityArrayV2() {
  const { basics, setBasics } = useDataSlateStore()

  const handleUpdate = (field: string, value: string) => {
    setBasics({ [field]: value })
    telemetry.track('v2_editor_identity_update', { field })
  }

  const handleLocationUpdate = (field: 'city' | 'countryCode' | 'region', value: string) => {
    setBasics({ location: { ...basics.location, [field]: value } })
    telemetry.track('v2_editor_identity_location_update', { field })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-[var(--color-action-secondary)] pb-2">
        <h3 className="text-sm font-bold tracking-widest text-[var(--color-action-primary)] uppercase">
          Identity Matrix
        </h3>
      </div>

      <SignetCard className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SignetInput
            label="Full Name"
            value={basics.name}
            onChange={(e) => handleUpdate('name', e.target.value)}
            placeholder="Jane Doe"
          />
          <SignetInput
            label="Professional Title"
            value={basics.label}
            onChange={(e) => handleUpdate('label', e.target.value)}
            placeholder="Senior Software Engineer"
          />
          <SignetInput
            label="Email"
            type="email"
            value={basics.email}
            onChange={(e) => handleUpdate('email', e.target.value)}
            placeholder="jane@example.com"
          />
          <SignetInput
            label="Phone"
            type="tel"
            value={basics.phone}
            onChange={(e) => handleUpdate('phone', e.target.value)}
            placeholder="+1 555-0100"
          />
          <SignetInput
            label="Website"
            type="url"
            value={basics.url}
            onChange={(e) => handleUpdate('url', e.target.value)}
            placeholder="https://janedoe.com"
          />
          <SignetInput
            label="City"
            value={basics.location.city}
            onChange={(e) => handleLocationUpdate('city', e.target.value)}
            placeholder="San Francisco"
          />
        </div>

        <div className="space-y-2 mt-4">
          <label className="block text-sm text-signet-slate-400 mb-1">Professional Summary</label>
          <textarea
            value={basics.summary}
            onChange={(e) => handleUpdate('summary', e.target.value)}
            placeholder="A brief overview of your professional background and goals..."
            className="w-full bg-[var(--color-surface-base)] border border-[var(--component-input-border)] rounded-signet px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:border-[var(--component-input-focusRing)] focus-visible:shadow-glow-focus min-h-32"
          />
        </div>
      </SignetCard>
    </div>
  )
}
