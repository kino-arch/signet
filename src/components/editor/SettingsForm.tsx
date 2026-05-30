import { useForgeStore } from "@/store/useForgeStore";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const templates = [
  {
    id: "pure-beskar",
    name: "The FAANG Executive",
    tagline: "ATS-Indestructible · Pure Sans",
    description: "The gold standard. Single-column Inter/DM Sans layout engineered to flawlessly bypass FAANG and MNC corporate scanners.",
    accent: "#000000",
    preview: "classic",
  },
  {
    id: "operative",
    name: "The Operative",
    tagline: "ATS-Ready · Clean Sans",
    description: "Centered header, ruled separators, clean Inter typography. Ideal for corporate and enterprise tech roles.",
    accent: "#1a1a2e",
    preview: "operative",
  },
  {
    id: "minimal",
    name: "Ghost Protocol",
    tagline: "Two-Column · Tech Modern",
    description: "Light gray sidebar with monospaced labels, white main panel. Favored by design engineers and product leads.",
    accent: "#3a3a4a",
    preview: "minimal",
  },
  {
    id: "standard",
    name: "Heavy Infantry",
    tagline: "Navy Accent · Bold Hierarchy",
    description: "Deep navy accent sidebar, bold section hierarchy. Commands attention at first glance — senior and leadership roles.",
    accent: "#1e2a3a",
    preview: "standard",
  },
  {
    id: "avant-garde",
    name: "Classified Dossier",
    tagline: "Creative · Teal Accent",
    description: "Bold dark header bar, teal accent system, warm off-white base. Perfect for product, design, and creative engineering roles.",
    accent: "#0f6b6b",
    preview: "avant",
  },
];

/** Tiny visual thumbnail showing each template's distinct layout fingerprint */
function TemplateThumbnail({ preview, accent }: { preview: string; accent: string }) {
  const base = { backgroundColor: "#ffffff", width: "100%", height: "80px", position: "relative" as const, overflow: "hidden", borderRadius: "3px" };

  if (preview === "classic") {
    return (
      <div style={base}>
        {/* Classic single-col: centered header, lines */}
        <div style={{ padding: "8px 10px" }}>
          <div style={{ height: "6px", backgroundColor: "#111", borderRadius: "1px", marginBottom: "3px" }} />
          <div style={{ height: "3px", backgroundColor: "#777", width: "55%", margin: "0 auto 5px auto", borderRadius: "1px" }} />
          <div style={{ height: "1.5px", backgroundColor: "#111", marginBottom: "5px" }} />
          {[70, 90, 80, 60, 85].map((w, i) => (
            <div key={i} style={{ height: "2.5px", backgroundColor: "#ccc", width: `${w}%`, marginBottom: "2.5px", borderRadius: "1px" }} />
          ))}
        </div>
      </div>
    );
  }
  if (preview === "operative") {
    return (
      <div style={base}>
        <div style={{ padding: "8px 10px" }}>
          <div style={{ height: "6px", backgroundColor: "#111", borderRadius: "1px", width: "50%", margin: "0 auto 3px auto" }} />
          <div style={{ height: "3px", backgroundColor: "#777", width: "40%", margin: "0 auto 4px auto", borderRadius: "1px" }} />
          <div style={{ height: "1.5px", backgroundColor: "#111", marginBottom: "4px" }} />
          <div style={{ height: "2.5px", backgroundColor: "#555", width: "30%", marginBottom: "3px", borderRadius: "1px" }} />
          {[85, 70, 90, 75].map((w, i) => (
            <div key={i} style={{ height: "2.5px", backgroundColor: "#ccc", width: `${w}%`, marginBottom: "2.5px", borderRadius: "1px" }} />
          ))}
        </div>
      </div>
    );
  }
  if (preview === "minimal") {
    return (
      <div style={{ ...base, display: "flex" }}>
        {/* Sidebar */}
        <div style={{ width: "32%", backgroundColor: "#f4f4f4", borderRight: "1px solid #e0e0e0", padding: "8px 6px" }}>
          <div style={{ height: "5px", backgroundColor: "#333", borderRadius: "1px", marginBottom: "3px", width: "80%" }} />
          <div style={{ height: "2.5px", backgroundColor: "#888", borderRadius: "1px", width: "60%", marginBottom: "6px" }} />
          {[70, 55, 80, 50].map((w, i) => (
            <div key={i} style={{ height: "2px", backgroundColor: "#bbb", width: `${w}%`, marginBottom: "2px", borderRadius: "1px" }} />
          ))}
        </div>
        {/* Main */}
        <div style={{ flex: 1, padding: "8px 8px" }}>
          <div style={{ height: "2.5px", backgroundColor: "#999", width: "40%", marginBottom: "4px", borderRadius: "1px" }} />
          {[90, 75, 85, 70, 80].map((w, i) => (
            <div key={i} style={{ height: "2.5px", backgroundColor: "#ccc", width: `${w}%`, marginBottom: "2.5px", borderRadius: "1px" }} />
          ))}
        </div>
      </div>
    );
  }
  if (preview === "standard") {
    return (
      <div style={{ ...base, display: "flex" }}>
        {/* Navy sidebar */}
        <div style={{ width: "34%", backgroundColor: accent, padding: "8px 7px" }}>
          <div style={{ height: "6px", backgroundColor: "rgba(255,255,255,0.85)", borderRadius: "1px", marginBottom: "3px", width: "80%" }} />
          <div style={{ height: "2.5px", backgroundColor: "rgba(255,255,255,0.4)", borderRadius: "1px", width: "60%", marginBottom: "6px" }} />
          {[70, 55, 80].map((w, i) => (
            <div key={i} style={{ height: "2px", backgroundColor: "rgba(255,255,255,0.25)", width: `${w}%`, marginBottom: "2px", borderRadius: "1px" }} />
          ))}
        </div>
        {/* Main */}
        <div style={{ flex: 1, backgroundColor: "#fff", padding: "8px 8px" }}>
          <div style={{ height: "2.5px", backgroundColor: accent, width: "50%", marginBottom: "4px", borderRadius: "1px" }} />
          {[85, 70, 90, 65].map((w, i) => (
            <div key={i} style={{ height: "2.5px", backgroundColor: "#ccc", width: `${w}%`, marginBottom: "2.5px", borderRadius: "1px" }} />
          ))}
        </div>
      </div>
    );
  }
  // avant-garde
  return (
    <div style={{ ...base, flexDirection: "column", display: "flex" }}>
      {/* Dark header */}
      <div style={{ height: "22px", backgroundColor: "#1c1c1c", padding: "5px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ height: "5px", backgroundColor: "#fff", borderRadius: "1px", width: "45%" }} />
        <div style={{ height: "14px", width: "4px", backgroundColor: accent, borderRadius: "2px" }} />
      </div>
      {/* Body two-col */}
      <div style={{ display: "flex", flex: 1 }}>
        <div style={{ flex: 1, padding: "6px 8px", borderRight: "1px solid #e8e8e4" }}>
          {[85, 70, 90, 65].map((w, i) => (
            <div key={i} style={{ height: "2.5px", backgroundColor: "#ccc", width: `${w}%`, marginBottom: "2.5px", borderRadius: "1px" }} />
          ))}
        </div>
        <div style={{ width: "30%", backgroundColor: "#f2f2f0", padding: "6px 6px" }}>
          {[80, 60, 70].map((w, i) => (
            <div key={i} style={{ height: "2px", backgroundColor: "#bbb", width: `${w}%`, marginBottom: "2px", borderRadius: "1px" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SettingsForm() {
  const { activeTemplate, setActiveTemplate } = useForgeStore();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="mb-1 text-xl font-bold text-foreground">Choose Your Armor</h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Each template is built to professional industry standards. Select the format that best suits your target role.
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => {
            const isActive = activeTemplate === template.id;
            return (
              <motion.button
                key={template.id}
                type="button"
                aria-pressed={isActive}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                onClick={() => setActiveTemplate(template.id)}
                className={cn(
                  "group relative cursor-pointer  border-2 p-0 overflow-hidden text-left transition-all duration-200",
                  isActive
                    ? "border-primary shadow-lg shadow-primary/15 ring-2 ring-primary/20"
                    : "border-border/50 hover:border-primary/50 hover:shadow-md"
                )}
              >
                {/* Template thumbnail */}
                <div className="w-full border-b border-border/30">
                  <TemplateThumbnail preview={template.preview} accent={template.accent} />
                </div>

                {/* Info */}
                <div className="p-3">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm leading-tight font-bold text-foreground">
                        {template.name}
                      </h3>
                      <p className="mt-0.5 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                        {template.tagline}
                      </p>
                    </div>
                    {isActive && (
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {template.description}
                  </p>
                </div>

                {/* Active glow effect */}
                {isActive && (
                  <div className="pointer-events-none absolute inset-0  ring-2 ring-primary/30" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
