import { useForgeStore } from "@/store/useForgeStore";

/**
 * Heavy Infantry — FAANG Standard Template
 *
 * Designed strictly for Applicant Tracking Systems (ATS) and Top-Tier MNCs.
 * - 100% Single-column layout for perfect parsing
 * - No tables, no complex flex layouts that break text selection
 * - Clean, standard headers (Experience, Education, Skills)
 * - Pure white background, high contrast dark charcoal ink
 * - Minimalist styling that relies on premium typography and spacing
 */
export function StandardTemplate() {
  const { basicInfo, experience, education, skills } = useForgeStore(
    (state) => state.resumeData
  );

  const INK = "#111111";
  const MUTED = "#555555";
  const BORDER = "#dddddd";
  const ACCENT = "#000000"; // Pure black for stark FAANG contrast

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
        backgroundColor: "#ffffff",
        color: INK,
        fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        fontSize: "14px", // Standard highly readable size
        lineHeight: "1.5",
        padding: "48px", // Generous premium margins
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
            color: ACCENT,
            margin: "0 0 6px 0",
            lineHeight: "1.1",
          }}
        >
          {basicInfo.firstName} {basicInfo.lastName}
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
              color: MUTED,
            }}
          >
            {contactItems.map((item, i) => (
              <span key={i}>
                {item}
                {i < contactItems.length - 1 && (
                  <span style={{ margin: "0 8px", color: BORDER }}>|</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── SUMMARY ── */}
      {basicInfo.summary && (
        <section>
          <div
            dangerouslySetInnerHTML={{ __html: basicInfo.summary }}
            style={{ margin: "0", fontSize: "13.5px", lineHeight: "1.6", color: INK }}
          />
        </section>
      )}

      {/* ── EXPERIENCE ── */}
      {experience.length > 0 && (
        <section>
          <SectionHeader label="Professional Experience" border={BORDER} accent={ACCENT} />
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {experience.map((job) => (
              <div key={job.id} className="resume-item">
                {/* Row 1: Role & Dates */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 style={{ fontSize: "14.5px", fontWeight: "700", margin: "0", color: INK }}>
                    {job.role}
                  </h3>
                  <span style={{ fontSize: "12.5px", fontWeight: "600", color: MUTED }}>
                    {job.startDate} – {job.current ? "Present" : job.endDate}
                  </span>
                </div>
                {/* Row 2: Company & Location */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "500", fontStyle: "italic", color: INK }}>
                    {job.company}
                  </span>
                  {job.location && (
                    <span style={{ fontSize: "12.5px", color: MUTED }}>
                      {job.location}
                    </span>
                  )}
                </div>

                {/* Optional brief description */}
                {job.description && (
                  <div
                    dangerouslySetInnerHTML={{ __html: job.description }}
                    style={{ margin: "0 0 4px 0", fontSize: "13.5px", color: INK, lineHeight: "1.5" }}
                  />
                )}

                {/* Achievements (STAR method bullets) */}
                {job.highlights && job.highlights.length > 0 && (
                  <ul style={{ margin: "0", paddingLeft: "16px", listStyleType: "disc" }}>
                    {job.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: "13.5px",
                          color: INK,
                          lineHeight: "1.5",
                          marginBottom: "3px",
                          paddingLeft: "4px", // breathing room from bullet
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
          <SectionHeader label="Education" border={BORDER} accent={ACCENT} />
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {education.map((edu) => (
              <div key={edu.id} className="resume-item">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: "700", margin: "0", color: INK }}>
                    {edu.institution}
                  </h3>
                  <span style={{ fontSize: "12.5px", fontWeight: "600", color: MUTED }}>
                    {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "2px" }}>
                  <span style={{ fontSize: "13.5px", color: INK }}>
                    {edu.degree} {edu.field ? `in ${edu.field}` : ""}
                  </span>
                  {edu.score && (
                    <span style={{ fontSize: "12.5px", color: MUTED }}>
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
          <SectionHeader label="Technical Skills" border={BORDER} accent={ACCENT} />
          <div style={{ fontSize: "13.5px", color: INK, lineHeight: "1.6" }}>
            <span style={{ fontWeight: "600", marginRight: "4px" }}>Core Competencies:</span>
            {skills.join(", ")}
          </div>
        </section>
      )}
    </div>
  );
}

function SectionHeader({ label, border, accent }: { label: string; border: string; accent: string }) {
  return (
    <h2
      className="resume-header"
      style={{
        fontSize: "15px",
        fontWeight: "700",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        color: accent,
        margin: "0 0 8px 0",
        paddingBottom: "4px",
        borderBottom: `1px solid ${border}`,
      }}
    >
      {label}
    </h2>
  );
}
