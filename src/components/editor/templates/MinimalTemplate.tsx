import DOMPurify from "dompurify"
import type { ResumeTemplateProps } from "./registry"

/**
 * MinimalTemplate — Ghost
 *
 * ATS Parse Rate: 98%
 * Target: SaaS Startups, Y Combinator, Stripe, Vercel, Product Engineer
 * Design: Minimal — Typography driven, extreme whitespace, no borders.
 * Color: Gray on white
 */
export function MinimalTemplate({ data }: ResumeTemplateProps) {
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
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: "13.5px",
        lineHeight: "1.6",
        padding: "54px", // Extreme whitespace
        display: "flex",
        flexDirection: "column",
        gap: "24px", // Max whitespace between sections
      }}
    >
      {/* ── HEADER ── */}
      <div style={{ marginBottom: "8px" }}>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "300",
            letterSpacing: "-0.03em",
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
              color: "var(--accent-minimal)",
              marginBottom: "12px",
              fontWeight: "400",
            }}
          >
            {basics.label}
          </div>
        )}

        {/* Contact Info Row (No separators) */}
        {contactItems.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              fontSize: "12px",
              color: "var(--accent-minimal)",
            }}
          >
            {contactItems.map((item, i) => (
              <span key={i}>{item}</span>
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
          <SectionHeader label="Experience" accent="var(--accent-minimal)" />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {work.map((job) => (
              <div
                key={job.id}
                className="resume-item print:break-inside-avoid"
              >
                {/* Row 1: Role at Company & Dates */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "4px",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "var(--resume-ink)",
                      lineHeight: "1.3",
                      letterSpacing: "-0.01em",
                      flex: "1 1 auto",
                      paddingRight: "16px",
                    }}
                  >
                    <span style={{ fontWeight: "600" }}>
                      {job.position || "Role Title"}
                    </span>
                    {job.name && (
                      <span style={{ color: "var(--resume-muted)" }}>
                        {" "}
                        at {job.name}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "12.5px",
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

                {/* Optional brief description */}
                {job.summary && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(job.summary),
                    }}
                    style={{
                      margin: "0 0 6px 0",
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
                      paddingLeft: "16px",
                      listStyleType: "circle",
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
          <SectionHeader label="Education" accent="var(--accent-minimal)" />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
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
                  <div style={{ fontSize: "14px", color: "var(--resume-ink)" }}>
                    <span style={{ fontWeight: "600" }}>
                      {edu.studyType} {edu.area ? `in ${edu.area}` : ""}
                    </span>
                    {edu.institution && (
                      <span style={{ color: "var(--resume-muted)" }}>
                        {" "}
                        at {edu.institution}
                      </span>
                    )}
                  </div>
                  <span
                    style={{ fontSize: "12.5px", color: "var(--resume-muted)" }}
                  >
                    {edu.startDate}
                    {edu.startDate && " – "}
                    {edu.endDate || (edu.startDate ? "Present" : "")}
                  </span>
                </div>
                {edu.score && (
                  <div
                    style={{
                      fontSize: "12.5px",
                      color: "var(--resume-muted)",
                      marginTop: "2px",
                    }}
                  >
                    {edu.score}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── TECHNICAL SKILLS ── */}
      {skills.length > 0 && (
        <section>
          <SectionHeader label="Skills" accent="var(--accent-minimal)" />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                  <span
                    style={{
                      fontWeight: "600",
                      color: "var(--accent-minimal)",
                      marginRight: "8px",
                    }}
                  >
                    {skill.name}
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
            accent="var(--accent-minimal)"
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
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
        fontSize: "12px",
        fontWeight: "600",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: accent,
        margin: "0 0 16px 0",
      }}
    >
      {label}
    </h2>
  )
}
