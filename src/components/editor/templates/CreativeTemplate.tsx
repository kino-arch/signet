import DOMPurify from "dompurify"
import type { ResumeTemplateProps } from "./registry"

/**
 * CreativeTemplate — Rebel
 *
 * ATS Parse Rate: 60%
 * Target: UX Designer, Creative Director, Brand Strategist, Portfolio
 * Design: Rebel — Visual layout prioritizes impact with timeline, skill tags, and violet accent.
 * Color: Violet on white/slate-50
 */
export function CreativeTemplate({ data }: ResumeTemplateProps) {
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
        gridTemplateColumns: "35% 1fr",
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
            fontSize: "36px",
            fontWeight: "800",
            letterSpacing: "-0.02em",
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
              fontSize: "16px",
              color: "var(--accent-creative)",
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
              fontSize: "13px",
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
            <SectionHeader label="Profile" accent="var(--accent-creative)" />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(basics.summary),
              }}
              style={{
                margin: "0",
                fontSize: "14px",
                lineHeight: "1.6",
                color: "var(--resume-ink)",
              }}
            />
          </section>
        )}
      </div>

      {/* ── DOM #3: EXPERIENCE (Right Column, Row 2 spanning down) ── */}
      <div
        style={{
          gridColumn: "2",
          gridRow: "2 / -1",
          padding: "0 48px 48px 40px",
        }}
      >
        {work.length > 0 && (
          <section>
            <SectionHeader label="Experience" accent="var(--accent-creative)" />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              {work.map((job) => (
                <div
                  key={job.id}
                  className="resume-item print:break-inside-avoid"
                  style={{ display: "flex" }}
                >
                  {/* Timeline element */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginRight: "16px",
                      marginTop: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "var(--accent-creative)",
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        width: "2px",
                        height: "100%",
                        backgroundColor: "var(--accent-creative)",
                        opacity: 0.2,
                        marginTop: "4px",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, paddingBottom: "4px" }}>
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
                        {job.position || "Role Title"}
                      </h3>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "var(--accent-creative)",
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
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "var(--resume-muted)",
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
                          margin: "0 0 8px 0",
                          fontSize: "13.5px",
                          color: "var(--resume-ink)",
                          lineHeight: "1.6",
                        }}
                      />
                    )}

                    {/* Achievements */}
                    {job.highlights && job.highlights.length > 0 && (
                      <ul
                        style={{
                          margin: "0",
                          paddingLeft: "0",
                          listStyleType: "none",
                        }}
                      >
                        {job.highlights.map((item, idx) => (
                          <li
                            key={idx}
                            style={{
                              display: "flex",
                              fontSize: "13.5px",
                              color: "var(--resume-ink)",
                              lineHeight: "1.6",
                              marginBottom: "6px",
                            }}
                          >
                            <span
                              style={{
                                color: "var(--accent-creative)",
                                marginRight: "8px",
                                fontWeight: "bold",
                              }}
                            >
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── DOM #4: EDUCATION (Left Column, Row 2) ── */}
      <div
        style={{
          gridColumn: "1",
          gridRow: "2",
          backgroundColor: "var(--resume-sidebar-bg)",
          padding: "0 24px 24px 32px",
          borderRight: "1px solid var(--resume-border)",
        }}
      >
        {education.length > 0 && (
          <section>
            <SectionHeader label="Education" accent="var(--accent-creative)" />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="resume-item print:break-inside-avoid"
                >
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      margin: "0 0 4px 0",
                      color: "var(--resume-ink)",
                    }}
                  >
                    {edu.institution || "Institution"}
                  </h3>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "var(--resume-ink)",
                      fontWeight: "500",
                    }}
                  >
                    {edu.studyType} {edu.area ? `in ${edu.area}` : ""}
                  </div>
                  <div
                    style={{
                      fontSize: "12.5px",
                      color: "var(--accent-creative)",
                      marginTop: "4px",
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

      {/* ── DOM #5: SKILLS (Left Column, Row 3) ── */}
      <div
        style={{
          gridColumn: "1",
          gridRow: "3",
          backgroundColor: "var(--resume-sidebar-bg)",
          padding: "0 24px 24px 32px",
          borderRight: "1px solid var(--resume-border)",
        }}
      >
        {skills.length > 0 && (
          <section>
            <SectionHeader label="Expertise" accent="var(--accent-creative)" />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {skill.name && (
                    <div
                      style={{
                        fontWeight: "700",
                        fontSize: "13px",
                        color: "var(--resume-ink)",
                      }}
                    >
                      {skill.name}
                    </div>
                  )}
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                  >
                    {skill.keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "var(--accent-creative)",
                          border: "1px solid var(--accent-creative)",
                          backgroundColor: "var(--resume-bg)",
                          padding: "2px 8px",
                          borderRadius: "100px",
                        }}
                      >
                        {kw}
                      </span>
                    ))}
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
              accent="var(--accent-creative)"
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
                      fontSize: "13.5px",
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
                        fontSize: "12.5px",
                        color: "var(--accent-creative)",
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
        fontSize: "16px",
        fontWeight: "800",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: accent,
        margin: "0 0 16px 0",
        paddingBottom: "4px",
        borderBottom: `2px solid ${accent}`,
        opacity: 0.9,
      }}
    >
      {label}
    </h2>
  )
}
