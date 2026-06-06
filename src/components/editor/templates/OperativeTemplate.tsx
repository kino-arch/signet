import DOMPurify from "dompurify"
import type {
  Basics,
  WorkEntry,
  EducationEntry,
  SkillEntry,
} from "@/store/useDataSlateStore"
import { Separator } from "@/components/ui/separator"
import { SignetWell } from "@/components/layout/SignetWell"
import { tokenizeColor } from "@/lib/color-tokenizer"

interface TemplateProps {
  data: {
    basics: Basics
    work: WorkEntry[]
    education: EducationEntry[]
    skills: SkillEntry[]
  }
}

export function OperativeTemplate({ data }: TemplateProps) {
  const { basics, work, education, skills } = data
  const fullName = basics.name.trim()
  
  // Example of using the tokenizer for a user-defined color (defaulting to a dark navy)
  const accentColor = tokenizeColor('#1a1a2e')

  return (
    <SignetWell size="narrow" className="print:max-w-none print:p-0 print:m-0">
      <div
        className="relative min-h-full w-full bg-card text-card-foreground p-12 print:overflow-visible print:p-0 font-sans shadow-signet-card"
      >
        {/* Top accent border */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: accentColor }}
        />

        {/* ═══ HEADER ═══ */}
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight uppercase text-foreground m-0">
            {fullName || "YOUR NAME"}
          </h1>

          {basics.label && (
            <p className="text-sm font-semibold tracking-widest text-muted-foreground mt-1.5 uppercase">
              {basics.label}
            </p>
          )}

          {/* Contact row */}
          <div className="flex justify-center flex-wrap gap-x-5 gap-y-1.5 mt-3.5 text-xs text-muted-foreground font-medium">
            {basics.email && <span>{basics.email}</span>}
            {basics.email && basics.phone && (
              <span className="text-border">│</span>
            )}
            {basics.phone && <span>{basics.phone}</span>}
            {basics.phone &&
              (basics.location?.city || basics.location?.region) && (
                <span className="text-border">│</span>
              )}
            {(basics.location?.city || basics.location?.region) && (
              <span>{`${basics.location.city}${basics.location.city && basics.location.region ? ", " : ""}${basics.location.region}`}</span>
            )}
            {(basics.location?.city || basics.location?.region) && basics.url && (
              <span className="text-border">│</span>
            )}
            {basics.url && <span>{basics.url}</span>}
          </div>
        </div>

        <Separator className="bg-border mb-5" />

        {/* ═══ PROFESSIONAL SUMMARY ═══ */}
        {basics.summary && (
          <section className="mb-6">
            <h2 className="text-sm font-bold tracking-widest text-foreground uppercase mb-2.5 pb-1.5 border-b-[1.5px] border-border">
              Professional Summary
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(basics.summary),
              }}
              className="text-[13.5px] text-muted-foreground leading-relaxed mt-1"
            />
          </section>
        )}

        {/* ═══ WORK EXPERIENCE ═══ */}
        {work.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold tracking-widest text-foreground uppercase mb-2.5 pb-1.5 border-b-[1.5px] border-border">
              Work Experience
            </h2>

            {work.map((exp: WorkEntry) => {
              const isCurrent =
                !exp.endDate || exp.endDate.toLowerCase() === "present"
              const dateRange = `${exp.startDate}${exp.startDate && (exp.endDate || isCurrent) ? " – " : ""}${isCurrent ? "Present" : exp.endDate}`
              return (
                <div key={exp.id} className="mb-4 break-inside-avoid">
                  {/* Role + dates row */}
                  <div className="flex justify-between items-start flex-wrap gap-1 mb-0.5">
                    <h3 className="text-[15px] font-bold text-foreground m-0 leading-tight tracking-tight flex-1 pr-4">
                      {exp.position}
                    </h3>
                    <span className="text-[13px] font-semibold text-muted-foreground whitespace-nowrap tracking-wide leading-tight pt-[1px]">
                      {dateRange}
                    </span>
                  </div>

                  {/* Company */}
                  {exp.name && (
                    <p className="text-[13.5px] text-muted-foreground font-semibold italic m-0 mb-1 leading-snug">
                      {exp.name}
                    </p>
                  )}

                  {/* Narrative Description */}
                  {exp.summary && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(exp.summary),
                      }}
                      className="text-[13.5px] text-muted-foreground leading-relaxed mb-1.5"
                    />
                  )}

                  {/* Highlights */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="mt-1 pl-4 list-disc">
                      {exp.highlights.map((highlight: string, idx: number) => (
                        <li
                          key={`${exp.id}-h-${idx}`}
                          className="text-[13.5px] text-muted-foreground leading-relaxed mb-1 pl-1"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </section>
        )}

        {/* ═══ TECHNICAL SKILLS ═══ */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold tracking-widest text-foreground uppercase mb-2.5 pb-1.5 border-b-[1.5px] border-border">
              Technical Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill: SkillEntry, idx: number) => (
                <span
                  key={idx}
                  className="inline-block text-xs font-semibold text-foreground bg-muted border border-border rounded px-2.5 py-[3px] tracking-wide"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ═══ EDUCATION ═══ */}
        {education.length > 0 && (
          <section>
            <h2 className="text-sm font-bold tracking-widest text-foreground uppercase mb-2.5 pb-1.5 border-b-[1.5px] border-border">
              Education
            </h2>

            {education.map((edu: EducationEntry) => {
              const isCurrent =
                !edu.endDate || edu.endDate.toLowerCase() === "present"
              const dateRange = `${edu.startDate}${edu.startDate && (edu.endDate || isCurrent) ? " – " : ""}${isCurrent ? "Present" : edu.endDate}`
              return (
                <div key={edu.id} className="mb-2.5 break-inside-avoid">
                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="text-[15px] font-bold text-foreground m-0">
                      {edu.studyType}
                      {edu.area ? ` in ${edu.area}` : ""}
                    </h3>
                    <span className="text-[13px] font-semibold text-muted-foreground whitespace-nowrap tracking-wide">
                      {dateRange}
                    </span>
                  </div>
                  {edu.institution && (
                    <p className="text-[13.5px] text-muted-foreground font-semibold italic mt-0.5 mb-0">
                      {edu.institution}
                      {edu.score ? ` · ${edu.score}` : ""}
                    </p>
                  )}
                </div>
              )
            })}
          </section>
        )}
      </div>
    </SignetWell>
  )
}
