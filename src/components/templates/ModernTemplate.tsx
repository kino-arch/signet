import type { DataSlateStore, WorkEntry, SkillEntry, EducationEntry } from "@/store/useDataSlateStore";
import { useTemplateTheme } from "./TemplateContext";

export function ModernTemplate({ store }: { store: DataSlateStore }) {
  const { colors } = useTemplateTheme();
  const { basics, work, skills, education } = store;

  return (
    <div 
      className="h-full flex overflow-y-auto font-sans"
      style={{ backgroundColor: colors.pageBg, color: colors.textPrimary }}
    >
      {/* Left Column (Contact & Skills) */}
      <div className="w-1/3 p-8 border-r" style={{ backgroundColor: 'rgba(0,0,0,0.02)', borderColor: colors.border }}>
        <h1 className="text-3xl font-extrabold tracking-tight leading-none mb-2">{basics.name || "First Last"}</h1>
        <p className="text-sm font-semibold uppercase tracking-wider mb-8" style={{ color: colors.accent }}>{basics.label}</p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.textPrimary }}>Contact</h3>
            <div className="space-y-2 text-sm" style={{ color: colors.textSecondary }}>
              {basics.email && <p>{basics.email}</p>}
              {basics.phone && <p>{basics.phone}</p>}
              {basics.location?.city && <p>{basics.location.city}</p>}
            </div>
          </div>

          {skills.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.textPrimary }}>Expertise</h3>
              <div className="flex flex-col gap-1.5 text-sm" style={{ color: colors.textSecondary }}>
                {skills.map((s: SkillEntry) => (
                  <span key={s.id}>{s.name}</span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: colors.textPrimary }}>Education</h3>
              <div className="space-y-3">
                {education.map((e: EducationEntry) => (
                  <div key={e.id}>
                    <p className="font-semibold text-sm" style={{ color: colors.textPrimary }}>{e.studyType}</p>
                    <p className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>{e.institution}</p>
                    <p className="text-xs mt-0.5" style={{ color: colors.accent }}>{e.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Column (Experience & Summary) */}
      <div className="w-2/3 p-8">
        {basics.summary && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: colors.textPrimary }}>Profile</h2>
            <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{basics.summary}</p>
          </div>
        )}

        {work.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-5" style={{ color: colors.textPrimary }}>Experience</h2>
            <div className="space-y-8">
              {work.map((w: WorkEntry) => (
                <div key={w.id} className="relative pl-6 border-l-2" style={{ borderColor: colors.border }}>
                  <div className="absolute w-2.5 h-2.5 rounded-full -left-[6px] top-1.5" style={{ backgroundColor: colors.accent }}></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base" style={{ color: colors.textPrimary }}>{w.position}</h3>
                    <span className="text-xs font-medium uppercase tracking-wider" style={{ color: colors.accent }}>{w.startDate} - {w.endDate || 'Present'}</span>
                  </div>
                  <div className="font-medium text-sm mb-3" style={{ color: colors.textSecondary }}>{w.name}</div>
                  
                  {w.summary && <p className="text-sm mb-3" style={{ color: colors.textSecondary }}>{w.summary}</p>}
                  
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
      </div>
    </div>
  );
}
