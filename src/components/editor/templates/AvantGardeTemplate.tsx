import { useForgeStore } from "@/store/useForgeStore";

/**
 * Classified Dossier — Avant-Garde Template (Premium Light Mode)
 *
 * Inspired by Vercel / Linear design systems.
 * - Crisp Light Mode: #ffffff background, highly legible typography.
 * - Premium details: pill-shaped skills, stark borders (#eaeaea), 
 *   perfect flex alignments, and minimalist aesthetic.
 * - Fits the "Signet / Sci-Fi" vibe through precise geometry and 
 *   ultra-clean layout without sacrificing ATS compatibility.
 */
export function AvantGardeTemplate() {
  const { basicInfo, experience, education, skills } = useForgeStore(
    (state) => state.resumeData
  );

  const BASE = "#ffffff";
  const INK = "#111111"; // Almost black for stark contrast
  const BODY = "#333333";
  const MUTED = "#666666";
  const BORDER = "#eaeaea";
  const ACCENT = "#000000"; // Black accent for the premium "ink" feel

  const contactItems = [
    basicInfo.email,
    basicInfo.phone,
    basicInfo.location,
    basicInfo.linkedin,
    basicInfo.website,
  ].filter(Boolean);

  return (
    <div
      className="relative min-h-full w-full print:p-0 print:overflow-visible"
      style={{
        backgroundColor: BASE,
        color: BODY,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        fontSize: "13.5px",
        lineHeight: "1.6",
        display: "flex",
        flexDirection: "column",
        padding: "40px",
      }}
    >
      {/* ── HERO HEADER ── */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingBottom: "24px",
          borderBottom: `1px solid ${BORDER}`,
          marginBottom: "24px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "38px",
              fontWeight: "900",
              color: INK,
              letterSpacing: "-0.04em",
              lineHeight: "1",
              margin: "0 0 4px 0",
            }}
          >
            {basicInfo.firstName} {basicInfo.lastName}
          </h1>
          {basicInfo.designation && (
            <p
              style={{
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: MUTED,
                margin: "0",
              }}
            >
              {basicInfo.designation}
            </p>
          )}
        </div>

        {/* Contact Info Grid */}
        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "2px" }}>
          {contactItems.map((item, idx) => (
            <span
              key={idx}
              style={{
                fontSize: "12px",
                color: MUTED,
                fontWeight: "500",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </header>

      {/* ── BODY (2-Column Grid) ── */}
      <div style={{ display: "flex", flex: 1, gap: "32px", overflow: "visible" }}>
        
        {/* LEFT COLUMN: Skills, Education */}
        <aside
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            flexShrink: 0,
          }}
        >
          {skills.length > 0 && (
            <div>
              <SectionLabel label="Expertise" color={INK} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "12px" }}>
                {skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      color: INK,
                      backgroundColor: "#f7f7f7",
                      border: `1px solid ${BORDER}`,
                      borderRadius: "6px", // Pill shape
                      padding: "3px 8px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div>
              <SectionLabel label="Education" color={INK} />
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                {education.map((edu) => (
                  <div key={edu.id} className="resume-item">
                    <span
                      style={{
                        fontSize: "13.5px",
                        fontWeight: "700",
                        color: INK,
                        display: "block",
                        marginBottom: "2px",
                        lineHeight: "1.3",
                      }}
                    >
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </span>
                    <span style={{ fontSize: "12px", color: BODY, display: "block", marginBottom: "2px" }}>
                      {edu.institution}
                    </span>
                    <span style={{ fontSize: "11px", color: MUTED, fontWeight: "500" }}>
                      {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* RIGHT COLUMN: Summary, Experience */}
        <main
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            overflow: "visible",
          }}
        >
          {basicInfo.summary && (
            <div>
              <SectionLabel label="Profile" color={INK} />
              <div
                dangerouslySetInnerHTML={{ __html: basicInfo.summary }}
                style={{
                  fontSize: "13.5px",
                  lineHeight: "1.6",
                  color: BODY,
                  marginTop: "12px",
                  marginBottom: "0",
                }}
              />
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <SectionLabel label="Work Experience" color={INK} />
              <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "12px" }}>
                {experience.map((job) => (
                  <div key={job.id} className="resume-item" style={{ position: "relative" }}>
                    
                    {/* Role Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                      <div>
                        <h3 style={{ fontSize: "14px", fontWeight: "700", color: INK, margin: "0 0 2px 0", letterSpacing: "-0.01em" }}>
                          {job.role}
                        </h3>
                        <p style={{ fontSize: "13px", fontWeight: "500", color: ACCENT, margin: "0" }}>
                          {job.company}
                          {job.location && (
                            <span style={{ color: MUTED, fontWeight: "400" }}>
                              {" "}· {job.location}
                            </span>
                          )}
                        </p>
                      </div>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: MUTED,
                          backgroundColor: "#f7f7f7",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          border: `1px solid ${BORDER}`,
                        }}
                      >
                        {job.startDate} – {job.current ? "Present" : job.endDate}
                      </span>
                    </div>

                    {/* Description */}
                    {job.description && (
                      <div
                        dangerouslySetInnerHTML={{ __html: job.description }}
                        style={{ fontSize: "13.5px", color: BODY, lineHeight: "1.6", margin: "6px 0 0 0" }}
                      />
                    )}

                    {/* Highlights (Custom SVG bullet dashes) */}
                    {job.highlights && job.highlights.length > 0 && (
                      <ul style={{ margin: "6px 0 0 0", paddingLeft: "0", listStyleType: "none" }}>
                        {job.highlights.map((item, idx) => (
                          <li
                            key={idx}
                            style={{
                              fontSize: "13.5px",
                              color: BODY,
                              lineHeight: "1.6",
                              marginBottom: "4px",
                              paddingLeft: "12px",
                              position: "relative",
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                left: "0",
                                top: "5px",
                                width: "4px",
                                height: "1px",
                                backgroundColor: MUTED,
                              }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function SectionLabel({ label, color }: { label: string; color: string }) {
  return (
    <h2
      className="resume-header"
      style={{
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: color,
        margin: "0",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      {label}
      <span style={{ flex: 1, height: "1px", backgroundColor: "#eaeaea" }} />
    </h2>
  );
}
