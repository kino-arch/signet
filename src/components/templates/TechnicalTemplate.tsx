import type { DataSlateStore, WorkEntry, SkillEntry, EducationEntry } from "@/store/useDataSlateStore";
import { useTemplateTheme } from "./TemplateContext";

export function TechnicalTemplate({ store }: { store: DataSlateStore }) {
  const { colors } = useTemplateTheme();
  const { basics, work, skills, education } = store;

  return (
    <div 
      className="h-full overflow-y-auto p-8 font-mono text-sm"
      style={{ backgroundColor: colors.pageBg, color: colors.textPrimary }}
    >
      <div className="mb-8 flex justify-between items-end border-b-2 pb-4" style={{ borderColor: colors.accent }}>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{basics.name || "YOUR_NAME"}</h1>
          <p className="font-semibold mt-1" style={{ color: colors.accent }}>{basics.label || "SOFTWARE_ENGINEER"}</p>
        </div>
        <div className="text-right text-xs space-y-1" style={{ color: colors.textSecondary }}>
          {basics.email && <div>{basics.email}</div>}
          {basics.phone && <div>{basics.phone}</div>}
          {basics.location?.city && <div>{basics.location.city}</div>}
        </div>
      </div>

      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold mb-3 uppercase tracking-widest text-xs" style={{ color: colors.accent }}>
            {">"} CORE_TECHNOLOGIES
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s: SkillEntry) => (
              <span key={s.id} className="px-2 py-0.5 rounded text-xs bg-black/5 dark:bg-white/10" style={{ color: colors.textPrimary }}>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {work.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold mb-4 uppercase tracking-widest text-xs" style={{ color: colors.accent }}>
            {">"} EXPERIENCE_LOG
          </h2>
          <div className="space-y-6">
            {work.map((w: WorkEntry) => (
              <div key={w.id} className="border-l-2 pl-4" style={{ borderColor: colors.border }}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-base" style={{ color: colors.textPrimary }}>{w.name}</span>
                  <span className="text-xs" style={{ color: colors.textSecondary }}>[{w.startDate} - {w.endDate || 'PRESENT'}]</span>
                </div>
                <div className="font-medium mb-2 text-xs" style={{ color: colors.accent }}>{w.position}</div>
                {w.summary && <p className="mb-2 leading-relaxed" style={{ color: colors.textSecondary }}>{w.summary}</p>}
                {w.highlights && w.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1" style={{ color: colors.textSecondary }}>
                    {w.highlights.map((h: string, i: number) => <li key={i}>{h}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="font-bold mb-4 uppercase tracking-widest text-xs" style={{ color: colors.accent }}>
            {">"} ACADEMIC_RECORD
          </h2>
          <div className="space-y-4">
            {education.map((e: EducationEntry) => (
              <div key={e.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold" style={{ color: colors.textPrimary }}>{e.institution}</span>
                  <div style={{ color: colors.textSecondary }}>{e.studyType} {e.area ? `// ${e.area}` : ''}</div>
                </div>
                <span className="text-xs" style={{ color: colors.textSecondary }}>[{e.endDate}]</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
