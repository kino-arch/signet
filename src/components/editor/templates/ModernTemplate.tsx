import DOMPurify from "dompurify"
import type { ResumeTemplateProps } from "./registry"

/**
 * ModernTemplate — Vanguard
 *
 * ATS Parse Rate: 100%
 * Target: Product Manager, Marketing, Consulting, Business Analyst
 * Design: Vanguard — Visual two-column with STRICT linear DOM order via CSS Grid.
 * Color: Slate-600 on white/slate-50
 */
export function ModernTemplate({ data }: ResumeTemplateProps) {
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
        display: "grid",
        gridTemplateColumns: "32% 1fr",
        gridTemplateRows: "auto auto auto auto 1fr",
        backgroundColor: "var(--resume-bg)",
        color: "var(--resume-ink)",
        fontFamily: "var(--resume-font-sans)",
        fontSize: "13.5px",
        lineHeight: "1.5",
      }}
    >
      {/* ── DOM #1: HEADER (Left Column, Row 1) ── */}
      <div
        style={{
          gridColumn: "1",
          gridRow: "1",
          backgroundColor: "var(--resume-sidebar-bg)",
          padding: "48px 24px 24px 32px",
          borderRight: "1px solid var(--resume-border)",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "800",
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
              fontSize: "14px",
              color: "var(--accent-modern)",
              marginBottom: "24px",
              fontWeight: "600",
            }}
          >
            {basics.label}
          </div>
        )}

        {/* Contact Info (Vertical Stack) */}
        {contactItems.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontSize: "12.5px",
              color: "var(--resume-muted)",
            }}
          >
            {contactItems.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </div>
        )}
      </div>

      {/* ── DOM #2: SUMMARY (Right Column, Row 1) ── */}
      <div
        style={{
          gridColumn: "2",
          gridRow: "1",
          padding: "48px 48px 24px 40px",
        }}
      >
        {basics.summary && (
          <section>
            <SectionHeader label="Summary" accent="var(--accent-modern)" />
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
      </div>

      {/* ── DOM #3: EXPERIENCE (Right Column, Row 2 spanning to end) ── */}
      <div
        style={{
          gridColumn: "2",
          gridRow: "2 / -1",
          padding: "0 48px 48px 40px",
        }}
      >
        {work.length > 0 && (
          <section>
            <SectionHeader
              label="Professional Experience"
              accent="var(--accent-modern)"
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
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
                        fontSize: "14px",
                        fontWeight: "700",
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
                        fontSize: "12.5px",
                        fontWeight: "600",
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
                  {/* Row 2: Company */}
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
                        fontSize: "13.5px",
                        fontWeight: "500",
                        color: "var(--accent-modern)",
                        lineHeight: "1.4",
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

                  {/* Achievements */}
                  {job.highlights && job.highlights.length > 0 && (
                    <ul
                      style={{
                        margin: "4px 0 0 0",
                        paddingLeft: "18px",
                        listStyleType: "disc",
                      }}
                    >
                      {job.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: "13.5px",
                            color: "var(--resume-ink)",
                            lineHeight: "1.6",
                            marginBottom: "4px",
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
      </div>

      {/* ── DOM #4: SKILLS (Left Column, Row 2) ── */}
      <div
        style={{
          gridColumn: "1",
          gridRow: "2",
          backgroundColor: "var(--resume-sidebar-bg)",
          padding: "0 24px 24px 32px",
          borderRight: "1px solid var(--resume-border)",
        }}
      >
        {skills.length > 0 && (
          <section>
            <SectionHeader label="Skills" accent="var(--accent-modern)" />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  style={{
                    fontSize: "13px",
                    color: "var(--resume-ink)",
                    lineHeight: "1.5",
                  }}
                >
                  {skill.name && (
                    <div
                      style={{
                        fontWeight: "600",
                        color: "var(--resume-ink)",
                        marginBottom: "2px",
                      }}
                    >
                      {skill.name}
                    </div>
                  )}
                  <div style={{ color: "var(--resume-muted)" }}>
                    {skill.keywords.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── DOM #5: EDUCATION (Left Column, Row 3) ── */}
      <div
        style={{
          gridColumn: "1",
          gridRow: "3",
          backgroundColor: "var(--resume-sidebar-bg)",
          padding: "0 24px 24px 32px",
          borderRight: "1px solid var(--resume-border)",
        }}
      >
        {education.length > 0 && (
          <section>
            <SectionHeader label="Education" accent="var(--accent-modern)" />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="resume-item print:break-inside-avoid"
                >
                  <h3
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      margin: "0 0 2px 0",
                      color: "var(--resume-ink)",
                    }}
                  >
                    {edu.institution || "Institution"}
                  </h3>
                  <div
                    style={{ fontSize: "12.5px", color: "var(--resume-ink)" }}
                  >
                    {edu.studyType} {edu.area ? `in ${edu.area}` : ""}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--resume-muted)",
                      marginTop: "2px",
                    }}
                  >
                    {edu.startDate}
                    {edu.startDate && " – "}
                    {edu.endDate || (edu.startDate ? "Present" : "")}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── DOM #6: CERTIFICATIONS (Left Column, Row 4) ── */}
      <div
        style={{
          gridColumn: "1",
          gridRow: "4",
          backgroundColor: "var(--resume-sidebar-bg)",
          padding: "0 24px 24px 32px",
          borderRight: "1px solid var(--resume-border)",
        }}
      >
        {certifications && certifications.length > 0 && (
          <section>
            <SectionHeader
              label="Certifications"
              accent="var(--accent-modern)"
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="resume-item print:break-inside-avoid"
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "var(--resume-ink)",
                      margin: "0 0 2px 0",
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
                  </div>
                  {cert.issuer && (
                    <div
                      style={{
                        fontSize: "12.5px",
                        color: "var(--resume-muted)",
                      }}
                    >
                      {cert.issuer}
                    </div>
                  )}
                  {cert.date && (
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--resume-muted)",
                        marginTop: "2px",
                      }}
                    >
                      {cert.date}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Filler for Left Column (Row 5) to extend background to bottom */}
      <div
        style={{
          gridColumn: "1",
          gridRow: "5",
          backgroundColor: "var(--resume-sidebar-bg)",
          borderRight: "1px solid var(--resume-border)",
        }}
      ></div>
    </div>
  )
}

function SectionHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <h2
      style={{
        fontSize: "14px",
        fontWeight: "700",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: accent,
        margin: "0 0 12px 0",
        paddingBottom: "4px",
        borderBottom: `2px solid ${accent}`,
        opacity: 0.85,
      }}
    >
      {label}
    </h2>
  )
}
