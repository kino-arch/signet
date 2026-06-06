import DOMPurify from "dompurify"
import type { ResumeTemplateProps } from "./registry"

/**
 * InteractiveTemplate — Technical
 *
 * ATS Parse Rate: 100%
 * Target: Software Engineer, DevOps, ML/AI Engineer, SRE, Backend Engineer
 * Design: Datacore — Skills pushed to the top, monospace headers, technical focus.
 * Color: Slate on white
 */
export function InteractiveTemplate({ data }: ResumeTemplateProps) {
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
        fontFamily: "var(--resume-font-sans)",
        fontSize: "14px",
        lineHeight: "1.5",
        padding: "48px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* ── HEADER ── */}
      <div style={{ marginBottom: "4px" }}>
        <h1
          style={{
            fontFamily: "var(--resume-font-mono)",
            fontSize: "28px",
            fontWeight: "700",
            letterSpacing: "-0.02em",
            color: "var(--resume-ink)",
            margin: "0 0 4px 0",
            lineHeight: "1.1",
          }}
        >
          {basics.name || "YOUR NAME"}
        </h1>
        {basics.label && (
          <div
            style={{
              fontFamily: "var(--resume-font-mono)",
              fontSize: "14px",
              color: "var(--accent-technical)",
              marginBottom: "8px",
              fontWeight: "500",
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
              flexWrap: "wrap",
              gap: "12px",
              fontSize: "12.5px",
              fontFamily: "var(--resume-font-mono)",
              color: "var(--resume-ink)",
            }}
          >
            {contactItems.map((item, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span style={{ color: "var(--accent-technical)" }}>&gt;</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── SKILLS SECTION FIRST ── */}
      {skills.length > 0 && (
        <section>
          <SectionHeader
            label="Technical Skills"
            accent="var(--accent-technical)"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {skills.map((skill) => (
              <div
                key={skill.id}
                style={{
                  fontSize: "13px",
                  color: "var(--resume-ink)",
                  lineHeight: "1.6",
                }}
              >
                {skill.name && (
                  <span
                    style={{
                      fontFamily: "var(--resume-font-mono)",
                      fontWeight: "600",
                      color: "var(--accent-technical)",
                      marginRight: "6px",
                    }}
                  >
                    {skill.name}:
                  </span>
                )}
                {skill.keywords.join(" · ")}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── SUMMARY ── */}
      {basics.summary && (
        <section>
          <SectionHeader label="Summary" accent="var(--accent-technical)" />
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(basics.summary),
            }}
            style={{
              margin: "0",
              fontSize: "13.5px",
              lineHeight: "1.6",
              color: "var(--resume-ink)",
            }}
          />
        </section>
      )}

      {/* ── EXPERIENCE ── */}
      {work.length > 0 && (
        <section>
          <SectionHeader label="Experience" accent="var(--accent-technical)" />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {work.map((job) => (
              <div
                key={job.id}
                className="resume-item print:break-inside-avoid"
              >
                {/* Row 1: Role & Dates */}
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
                      fontFamily: "var(--resume-font-mono)",
                      fontSize: "14px",
                      fontWeight: "600",
                      margin: "0",
                      color: "var(--resume-ink)",
                      lineHeight: "1.3",
                      letterSpacing: "-0.01em",
                      flex: "1 1 auto",
                      paddingRight: "16px",
                    }}
                  >
                    {job.position || "Role Title"}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--resume-font-mono)",
                      fontSize: "12px",
                      color: "var(--accent-technical-light)",
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
                {/* Row 2: Company & Location */}
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
                      fontWeight: "500",
                      color: "var(--resume-ink)",
                    }}
                  >
                    {job.name || "Company Name"}
                  </span>
                </div>

                {/* Optional brief description */}
                {job.summary && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(job.summary),
                    }}
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: "13.5px",
                      color: "var(--resume-ink)",
                      lineHeight: "1.5",
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
                          fontSize: "13.5px",
                          color: "var(--resume-ink)",
                          lineHeight: "1.5",
                          marginBottom: "3px",
                          paddingLeft: "4px",
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
          <SectionHeader label="Education" accent="var(--accent-technical)" />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
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
                      fontFamily: "var(--resume-font-mono)",
                      fontSize: "13px",
                      fontWeight: "600",
                      margin: "0",
                      color: "var(--resume-ink)",
                    }}
                  >
                    {edu.institution || "Institution Name"}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--resume-font-mono)",
                      fontSize: "12px",
                      color: "var(--accent-technical-light)",
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
                    style={{ fontSize: "13.5px", color: "var(--resume-ink)" }}
                  >
                    {edu.studyType} {edu.area ? `in ${edu.area}` : ""}
                  </span>
                  {edu.score && (
                    <span
                      style={{
                        fontSize: "12.5px",
                        color: "var(--resume-muted)",
                      }}
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

      {/* ── CERTIFICATIONS ── */}
      {certifications && certifications.length > 0 && (
        <section>
          <SectionHeader
            label="Certifications"
            accent="var(--accent-technical)"
          />
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
                      fontFamily: "var(--resume-font-mono)",
                      fontSize: "13px",
                      fontWeight: "600",
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
                      style={{ fontSize: "13.5px", color: "var(--resume-ink)" }}
                    >
                      {" "}
                      — {cert.issuer}
                    </span>
                  )}
                </div>
                {cert.date && (
                  <span
                    style={{
                      fontFamily: "var(--resume-font-mono)",
                      fontSize: "12px",
                      color: "var(--accent-technical-light)",
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
        fontFamily: "var(--resume-font-mono)",
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: accent,
        margin: "0 0 12px 0",
        paddingBottom: "6px",
        borderBottom: `1px solid ${accent}`,
        opacity: 0.7,
      }}
    >
      {label}
    </h2>
  )
}
