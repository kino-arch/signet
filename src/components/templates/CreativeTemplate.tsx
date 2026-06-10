import type { DataSlateStore, WorkEntry, SkillEntry, EducationEntry } from "@/store/useDataSlateStore";
import { useTemplateTheme } from "./TemplateContext";

export function CreativeTemplate({ store }: { store: DataSlateStore }) {
  const { colors } = useTemplateTheme();
  const { basics, work, skills, education } = store;

  return (
    <div 
      className="h-full overflow-y-auto font-sans"
      style={{ backgroundColor: colors.pageBg, color: colors.textPrimary }}
    >
      <div 
        className="p-10 text-white rounded-br-[100px] mb-8"
        style={{ 
          background: `linear-gradient(135deg, ${colors.accent} 0%, rgba(0,0,0,0.8) 100%)` 
        }}
      >
        <h1 className="text-5xl font-black tracking-tighter mb-2">{basics.name || "Your Name"}</h1>
        <p className="text-xl font-medium opacity-90">{basics.label || "Creative Professional"}</p>
        <div className="flex flex-wrap gap-4 mt-6 text-sm font-medium opacity-80">
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location?.city && <span>{basics.location.city}</span>}
        </div>
      </div>

      <div className="px-10 pb-10">
        {basics.summary && (
          <div className="mb-10 max-w-2xl">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: colors.accent }}>About Me</h2>
            <p className="text-lg leading-relaxed font-medium" style={{ color: colors.textSecondary }}>
              {basics.summary}
            </p>
          </div>
        )}

        <div className="flex gap-12">
          <div className="flex-1 space-y-10">
            {work.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: colors.accent }}>Experience</h2>
                <div className="space-y-8">
                  {work.map((w: WorkEntry) => (
                    <div key={w.id} className="relative">
                      <div className="flex items-baseline gap-4 mb-2">
                        <h3 className="text-xl font-black" style={{ color: colors.textPrimary }}>{w.name}</h3>
                        <span className="text-sm font-bold px-3 py-1 rounded-full bg-black/5 dark:bg-white/10" style={{ color: colors.textSecondary }}>{w.startDate} - {w.endDate || 'Present'}</span>
                      </div>
                      <div className="text-base font-bold mb-3" style={{ color: colors.accent }}>{w.position}</div>
                      {w.summary && <p className="text-sm leading-relaxed mb-3" style={{ color: colors.textSecondary }}>{w.summary}</p>}
                      {w.highlights && w.highlights.length > 0 && (
                        <ul className="list-disc list-outside ml-5 text-sm space-y-2" style={{ color: colors.textSecondary }}>
                          {w.highlights.map((h: string, i: number) => <li key={i}>{h}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-1/3 space-y-10">
            {skills.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: colors.accent }}>Expertise</h2>
                <div className="flex flex-col gap-3">
                  {skills.map((s: SkillEntry) => (
                    <div key={s.id}>
                      <div className="text-sm font-bold mb-1" style={{ color: colors.textPrimary }}>{s.name}</div>
                      <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: colors.accent }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {education.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest mb-6" style={{ color: colors.accent }}>Education</h2>
                <div className="space-y-5">
                  {education.map((e: EducationEntry) => (
                    <div key={e.id}>
                      <h3 className="font-bold" style={{ color: colors.textPrimary }}>{e.institution}</h3>
                      <div className="text-sm font-medium mt-1" style={{ color: colors.textSecondary }}>{e.studyType} {e.area ? `in ${e.area}` : ''}</div>
                      <div className="text-xs mt-1" style={{ color: colors.accent }}>{e.endDate}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
