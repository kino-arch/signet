import DOMPurify from "dompurify"
import type { ResumeTemplateProps } from "./registry"

/**
 * ExecutiveTemplate — Imperial
 *
 * ATS Parse Rate: 95%
 * Target: VP/Director, C-Suite, Fortune 500, McKinsey, Goldman Sachs
 * Design: Imperial — Centered authority, serif typography, stark borders.
 * Color: Slate-900 on white
 */
export function ExecutiveTemplate({ data }: ResumeTemplateProps) {
  const { basics, work, education, skills, certifications } = data

  // Build location string safely
  let locationStr = ""
  if (basics.location?.city) {
    locationStr = basics.location.city
    if (basics.location.region) locationStr += `, ${basics.location.region}`
  }

  // Find linkedin profile if exists
  const linkedin =
    basics.profiles?.find((p) => p.network.toLowerCase() === "linkedin")?.url ||
    ""

  const contactItems = [
    basics.email,
    basics.phone,
    locationStr,
    linkedin,
    basics.url,
  ].filter(Boolean)

  return (
    <div
      className="relative min-h-full w-full print:overflow-visible print:p-0"
      style={{
        backgroundColor: "var(--resume-bg)",
        color: "var(--resume-ink)",
        fontFamily: "var(--resume-font-serif)",
        fontSize: "14px",
        lineHeight: "1.6",
        padding: "48px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          textAlign: "center",
          borderBottom: "2px solid var(--resume-ink)",
          paddingBottom: "12px",
          marginBottom: "8px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--resume-ink)",
            margin: "0 0 6px 0",
            lineHeight: "1.1",
          }}
        >
          {basics.name || "YOUR NAME"}
        </h1>
        {basics.label && (
          <div
            style={{
              fontSize: "14px",
              fontStyle: "italic",
              color: "var(--resume-muted)",
              marginBottom: "12px",
            }}
          >
            {basics.label}
          </div>
        )}

        {/* Contact Info Row */}
        {contactItems.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "8px",
              fontSize: "11px",
              fontFamily: "var(--resume-font-sans)",
              color: "var(--resume-ink)",
            }}
          >
            {contactItems.map((item, i) => (
              <span key={i}>
                {item}
                {i < contactItems.length - 1 && (
                  <span style={{ margin: "0 8px" }}>•</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── SUMMARY ── */}
      {basics.summary && (
        <section>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(basics.summary),
            }}
            style={{
              margin: "0",
              fontSize: "14px",
              lineHeight: "1.6",
              color: "var(--resume-ink)",
              textAlign: "justify",
            }}
          />
        </section>
      )}

      {/* ── EXPERIENCE ── */}
      {work.length > 0 && (
        <section>
          <SectionHeader
            label="Professional Experience"
            accent="var(--resume-ink)"
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {work.map((job) => (
              <div
                key={job.id}
                className="resume-item print:break-inside-avoid"
              >
                {/* Row 1: Company & Dates */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "4px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      margin: "0",
                      color: "var(--resume-ink)",
                      lineHeight: "1.3",
                      letterSpacing: "-0.01em",
                      flex: "1 1 auto",
                      paddingRight: "16px",
                    }}
                  >
                    {job.name || "Company Name"}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--resume-font-sans)",
                      fontSize: "12px",
                      color: "var(--resume-muted)",
                      whiteSpace: "nowrap",
                      lineHeight: "1.3",
                      paddingTop: "1px",
                    }}
                  >
                    {job.startDate}
                    {job.startDate && " – "}
                    {job.endDate || (job.startDate ? "Present" : "")}
                  </span>
                </div>
                {/* Row 2: Position */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      fontStyle: "italic",
                      color: "var(--resume-ink)",
                      lineHeight: "1.4",
                    }}
                  >
                    {job.position || "Role Title"}
                  </span>
                </div>

                {/* Optional brief description */}
                {job.summary && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(job.summary),
                    }}
                    style={{
                      margin: "0 0 6px 0",
                      fontSize: "14px",
                      color: "var(--resume-ink)",
                      lineHeight: "1.6",
                      textAlign: "justify",
                    }}
                  />
                )}

                {/* Achievements (STAR method bullets) */}
                {job.highlights && job.highlights.length > 0 && (
                  <ul
                    style={{
                      margin: "0",
                      paddingLeft: "16px",
                      listStyleType: "disc",
                    }}
                  >
                    {job.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: "14px",
                          color: "var(--resume-ink)",
                          lineHeight: "1.6",
                          marginBottom: "4px",
                          paddingLeft: "4px",
                          textAlign: "justify",
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── EDUCATION ── */}
      {education.length > 0 && (
        <section>
          <SectionHeader label="Education" accent="var(--resume-ink)" />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {education.map((edu) => (
              <div
                key={edu.id}
                className="resume-item print:break-inside-avoid"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "14.5px",
                      fontWeight: "700",
                      margin: "0",
                      color: "var(--resume-ink)",
                    }}
                  >
                    {edu.institution || "Institution Name"}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--resume-font-sans)",
                      fontSize: "12px",
                      color: "var(--resume-muted)",
                    }}
                  >
                    {edu.startDate}
                    {edu.startDate && " – "}
                    {edu.endDate || (edu.startDate ? "Present" : "")}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginTop: "2px",
                  }}
                >
                  <span
                    style={{ fontSize: "14px", color: "var(--resume-ink)" }}
                  >
                    {edu.studyType} {edu.area ? `in ${edu.area}` : ""}
                  </span>
                  {edu.score && (
                    <span
                      style={{ fontSize: "13.5px", color: "var(--resume-ink)" }}
                    >
                      {edu.score}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── TECHNICAL SKILLS ── */}
      {skills.length > 0 && (
        <section>
          <SectionHeader label="Technical Skills" accent="var(--resume-ink)" />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {skills.map((skill) => (
              <div
                key={skill.id}
                style={{
                  fontSize: "14px",
                  color: "var(--resume-ink)",
                  lineHeight: "1.6",
                }}
              >
                {skill.name && (
                  <span style={{ fontWeight: "700", marginRight: "6px" }}>
                    {skill.name}:
                  </span>
                )}
                {skill.keywords.join(", ")}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CERTIFICATIONS ── */}
      {certifications && certifications.length > 0 && (
        <section>
          <SectionHeader label="Certifications" accent="var(--resume-ink)" />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="resume-item print:break-inside-avoid"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "var(--resume-ink)",
                    }}
                  >
                    {cert.url ? (
                      <a
                        href={cert.url}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {cert.name}
                      </a>
                    ) : (
                      cert.name
                    )}
                  </span>
                  {cert.issuer && (
                    <span
                      style={{ fontSize: "14px", color: "var(--resume-ink)" }}
                    >
                      {" "}
                      — {cert.issuer}
                    </span>
                  )}
                </div>
                {cert.date && (
                  <span
                    style={{
                      fontFamily: "var(--resume-font-sans)",
                      fontSize: "12px",
                      color: "var(--resume-muted)",
                    }}
                  >
                    {cert.date}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function SectionHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <h2
      style={{
        fontSize: "16px",
        fontWeight: "700",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        textAlign: "center",
        color: accent,
        margin: "0 0 16px 0",
        paddingBottom: "8px",
        borderBottom: `1px solid ${accent}`,
      }}
    >
      {label}
    </h2>
  )
}
