import type { DataSlateStore, WorkEntry, SkillEntry, EducationEntry } from "@/store/useDataSlateStore";
import { useTemplateTheme } from "./TemplateContext";

export function ExecutiveTemplate({ store }: { store: DataSlateStore }) {
  const { colors } = useTemplateTheme();
  const { basics, work, skills, education } = store;

  return (
    <div 
      className="h-full overflow-y-auto p-10 font-serif"
      style={{ backgroundColor: colors.pageBg, color: colors.textPrimary }}
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2" style={{ color: colors.textPrimary }}>
          {basics.name || "Your Name"}
        </h1>
        <p className="text-lg uppercase tracking-widest" style={{ color: colors.accent }}>
          {basics.label || "Executive Leader"}
        </p>
        <div className="flex justify-center gap-6 mt-4 text-sm font-sans" style={{ color: colors.textSecondary }}>
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location?.city && <span>{basics.location.city}</span>}
        </div>
      </div>

      {basics.summary && (
        <div className="mb-8 text-center px-8">
          <p className="text-base leading-relaxed italic" style={{ color: colors.textSecondary }}>"{basics.summary}"</p>
        </div>
      )}

      {work.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold uppercase tracking-widest text-center mb-6" style={{ color: colors.textPrimary }}>
            Professional Experience
          </h2>
          <div className="space-y-8">
            {work.map((w: WorkEntry) => (
              <div key={w.id}>
                <div className="flex justify-between items-end border-b pb-2 mb-3" style={{ borderColor: colors.border }}>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: colors.textPrimary }}>{w.position}</h3>
                    <div className="text-sm uppercase tracking-wider font-sans mt-1" style={{ color: colors.textSecondary }}>{w.name}</div>
                  </div>
                  <span className="text-sm font-sans font-semibold" style={{ color: colors.accent }}>{w.startDate} — {w.endDate || 'Present'}</span>
                </div>
                {w.summary && <p className="text-sm leading-relaxed mb-3" style={{ color: colors.textSecondary }}>{w.summary}</p>}
                {w.highlights && w.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-6 text-sm space-y-2 font-sans" style={{ color: colors.textSecondary }}>
                    {w.highlights.map((h: string, i: number) => <li key={i}>{h}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-4" style={{ color: colors.textPrimary }}>
              Education
            </h2>
            <div className="space-y-4">
              {education.map((e: EducationEntry) => (
                <div key={e.id}>
                  <div className="font-bold" style={{ color: colors.textPrimary }}>{e.studyType} {e.area ? `- ${e.area}` : ''}</div>
                  <div className="text-sm font-sans mt-1" style={{ color: colors.textSecondary }}>{e.institution} • {e.endDate}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold uppercase tracking-widest mb-4" style={{ color: colors.textPrimary }}>
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-sans" style={{ color: colors.textSecondary }}>
              {skills.map((s: SkillEntry) => (
                <div key={s.id} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.accent }}></div>
                  {s.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
