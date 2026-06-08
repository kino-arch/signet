import DOMPurify from "dompurify"
import type { ResumeTemplateProps } from "./registry"

/**
 * StandardTemplate — Classic
 *
 * ATS Parse Rate: 100%
 * Target: FAANG, Big Tech, Fortune 500, Finance, Consulting
 * Design: Heavy Infantry — Clean, single-column, highly traditional and conservative.
 * Color: Navy on white
 */
export function StandardTemplate({ data }: ResumeTemplateProps) {
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
      <div style={{ textAlign: "center", marginBottom: "4px" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "800",
            letterSpacing: "-0.03em",
            color: "var(--accent-standard)",
            margin: "0 0 6px 0",
            lineHeight: "1.1",
          }}
        >
          {basics.name || "YOUR NAME"}
        </h1>

        {/* Contact Info Row */}
        {contactItems.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "8px",
              fontSize: "12.5px",
              color: "var(--resume-muted)",
            }}
          >
            {contactItems.map((item, i) => (
              <span key={i}>
                {item}
                {i < contactItems.length - 1 && (
                  <span
                    style={{ margin: "0 8px", color: "var(--resume-divider)" }}
                  >
                    |
                  </span>
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
          <SectionHeader
            label="Professional Experience"
            accent="var(--accent-standard)"
          />
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
                      fontSize: "14.5px",
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
                      fontStyle: "italic",
                      color: "var(--resume-ink)",
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

                {/* Achievements (STAR method bullets) */}
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

      {/* ── EDUCATION ── */}
      {education.length > 0 && (
        <section>
          <SectionHeader label="Education" accent="var(--accent-standard)" />
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
                    {edu.institution || "Institution Name"}
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

      {/* ── TECHNICAL SKILLS ── */}
      {skills.length > 0 && (
        <section>
          <SectionHeader
            label="Technical Skills"
            accent="var(--accent-standard)"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {skills.map((skill) => (
              <div
                key={skill.id}
                style={{
                  fontSize: "13.5px",
                  color: "var(--resume-ink)",
                  lineHeight: "1.6",
                }}
              >
                {skill.name && (
                  <span style={{ fontWeight: "600", marginRight: "4px" }}>
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
          <SectionHeader
            label="Certifications"
            accent="var(--accent-standard)"
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
                      fontSize: "14px",
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
                      style={{
                        fontSize: "13.5px",
                        color: "var(--resume-muted)",
                      }}
                    >
                      {" "}
                      — {cert.issuer}
                    </span>
                  )}
                </div>
                {cert.date && (
                  <span
                    style={{ fontSize: "12.5px", color: "var(--resume-muted)" }}
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
        fontSize: "15px",
        fontWeight: "700",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: accent,
        margin: "0 0 12px 0",
        paddingBottom: "6px",
        borderBottom: `1px solid ${accent}`,
        opacity: 0.85,
      }}
    >
      {label}
    </h2>
  )
}
