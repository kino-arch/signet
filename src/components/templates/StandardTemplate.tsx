import type { DataSlateStore, WorkEntry, EducationEntry } from "@/store/useDataSlateStore";
import { useTemplateTheme } from "./TemplateContext";

export function StandardTemplate({ store }: { store: DataSlateStore }) {
  const { colors } = useTemplateTheme();
  const { basics, work, skills, education } = store;

  return (
    <div 
      className="h-full overflow-y-auto p-8 font-serif"
      style={{ backgroundColor: colors.pageBg, color: colors.textPrimary }}
    >
      <div className="text-center mb-6 border-b-2 pb-4" style={{ borderColor: colors.textPrimary }}>
        <h1 className="text-3xl font-bold uppercase tracking-widest">{basics.name || "Your Name"}</h1>
        <div className="mt-2 text-sm flex justify-center gap-4" style={{ color: colors.textSecondary }}>
          {basics.location?.city && <span>{basics.location.city}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.email && <span>{basics.email}</span>}
        </div>
      </div>

      {basics.summary && (
        <div className="mb-6">
          <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>{basics.summary}</p>
        </div>
      )}

      {work.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest mb-3 border-b" style={{ borderColor: colors.border, color: colors.textPrimary }}>
            Professional Experience
          </h2>
          <div className="space-y-5">
            {work.map((w: WorkEntry) => (
              <div key={w.id}>
                <div className="flex justify-between font-bold" style={{ color: colors.textPrimary }}>
                  <span>{w.name}</span>
                  <span>{w.startDate} - {w.endDate || 'Present'}</span>
                </div>
                <div className="italic text-sm mb-2" style={{ color: colors.textSecondary }}>{w.position}</div>
                {w.summary && <p className="text-sm mb-2" style={{ color: colors.textSecondary }}>{w.summary}</p>}
                {w.highlights && w.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-5 text-sm space-y-1" style={{ color: colors.textSecondary }}>
                    {w.highlights.map((h: string, i: number) => <li key={i}>{h}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest mb-3 border-b" style={{ borderColor: colors.border, color: colors.textPrimary }}>
            Education
          </h2>
          <div className="space-y-4">
            {education.map((e: EducationEntry) => (
              <div key={e.id}>
                <div className="flex justify-between font-bold" style={{ color: colors.textPrimary }}>
                  <span>{e.institution}</span>
                  <span>{e.endDate}</span>
                </div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>{e.studyType} {e.area ? `in ${e.area}` : ''}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold uppercase tracking-widest mb-3 border-b" style={{ borderColor: colors.border, color: colors.textPrimary }}>
            Skills & Competencies
          </h2>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            {skills.map(s => s.name).join(" • ")}
          </p>
        </div>
      )}
    </div>
  );
}
