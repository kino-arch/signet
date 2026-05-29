import { useForgeStore } from "@/store/useForgeStore";

/**
 * The Operative — Professional Template
 *
 * Industry-standard Big Tech / FAANG single-column layout.
 * - Always white background, always dark ink (mode-agnostic)
 * - Refined centered header, custom bullet spacing, sleek section separators.
 * - Premium Inter-based typography for modern executive tech roles.
 * - Section order: Header → Summary → Experience → Skills → Education.
 */
export function ProfessionalTemplate() {
  const { basicInfo, experience, education, skills } = useForgeStore(
    (state) => state.resumeData
  );

  const contactItems = [
    basicInfo.email,
    basicInfo.phone,
    basicInfo.location,
    basicInfo.linkedin,
    basicInfo.website,
  ].filter(Boolean);

  return (
    <div
      className="absolute inset-0 h-full w-full overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        color: "#1e293b",
        fontFamily: "'Inter Variable', 'Helvetica Neue', Arial, sans-serif",
        fontSize: "9.5px",
        lineHeight: "1.55",
        padding: "40px 48px",
        boxSizing: "border-box",
      }}
    >
      {/* ── HEADER ── */}
      <header style={{ textAlign: "center", marginBottom: "18px" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "700",
            letterSpacing: "0.02em",
            color: "#0f172a",
            margin: "0 0 4px 0",
            textTransform: "uppercase",
          }}
        >
          {basicInfo.firstName} {basicInfo.lastName}
        </h1>

        {basicInfo.designation && (
          <p
            style={{
              fontSize: "9px",
              fontWeight: "600",
              letterSpacing: "0.16em",
              color: "#64748b",
              textTransform: "uppercase",
              margin: "0 0 8px 0",
            }}
          >
            {basicInfo.designation}
          </p>
        )}

        {/* Contact row — elegant bullet separators */}
        {contactItems.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "0 10px",
              fontSize: "8.5px",
              color: "#475569",
              lineHeight: "1.4",
            }}
          >
            {contactItems.map((item, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center" }}>
                <span>{item}</span>
                {i < contactItems.length - 1 && (
                  <span style={{ margin: "0 10px", color: "#cbd5e1" }}>•</span>
                )}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* ── RULED DIVIDER ── */}
      <hr
        style={{
          border: "none",
          borderTop: "1.5px solid #0f172a",
          margin: "0 0 16px 0",
        }}
      />

      {/* ── PROFESSIONAL SUMMARY ── */}
      {basicInfo.summary && (
        <section style={{ marginBottom: "14px" }}>
          <SectionHeader label="Professional Summary" />
          <div
            dangerouslySetInnerHTML={{ __html: basicInfo.summary }}
            style={{
              fontSize: "9px",
              color: "#334155",
              lineHeight: "1.6",
              margin: "6px 0 0 0",
              textAlign: "justify",
            }}
          />
        </section>
      )}

      {/* ── EXPERIENCE ── */}
      {experience.length > 0 && (
        <section style={{ marginBottom: "14px" }}>
          <SectionHeader label="Work Experience" />
          <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {experience.map((job) => (
              <div key={job.id}>
                {/* Role and Date line */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "2px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10.5px",
                      fontWeight: "700",
                      color: "#0f172a",
                    }}
                  >
                    {job.role}
                  </span>
                  <span
                    style={{
                      fontSize: "8.5px",
                      color: "#64748b",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                      marginLeft: "8px",
                    }}
                  >
                    {job.startDate} – {job.current ? "Present" : job.endDate}
                  </span>
                </div>

                {/* Company + Location */}
                <p
                  style={{
                    fontSize: "9px",
                    fontWeight: "600",
                    color: "#475569",
                    fontStyle: "italic",
                    margin: "0 0 6px 0",
                  }}
                >
                  {job.company}
                  {job.location ? ` · ${job.location}` : ""}
                </p>

                {/* Narrative description */}
                {job.description && (
                  <div
                    dangerouslySetInnerHTML={{ __html: job.description }}
                    style={{
                      fontSize: "9px",
                      color: "#475569",
                      lineHeight: "1.5",
                      margin: "0 0 4px 0",
                    }}
                  />
                )}

                {/* Highlights */}
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
                          fontSize: "9px",
                          color: "#334155",
                          lineHeight: "1.55",
                          marginBottom: "3px",
                          paddingLeft: "10px",
                          position: "relative",
                        }}
                      >
                        <span style={{ position: "absolute", left: 0, color: "#94a3b8" }}>•</span>
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

      {/* ── TECHNICAL SKILLS ── */}
      {skills.length > 0 && (
        <section style={{ marginBottom: "14px" }}>
          <SectionHeader label="Technical Skills" />
          <p
            style={{
              fontSize: "9px",
              color: "#334155",
              lineHeight: "1.6",
              marginTop: "6px",
            }}
          >
            {skills.join("  •  ")}
          </p>
        </section>
      )}

      {/* ── EDUCATION ── */}
      {education.length > 0 && (
        <section style={{ marginBottom: "0" }}>
          <SectionHeader label="Education" />
          <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {education.map((edu) => (
              <div
                key={edu.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "700",
                      color: "#0f172a",
                      display: "block",
                      marginBottom: "2px",
                    }}
                  >
                    {edu.institution}
                  </span>
                  <span
                    style={{
                      fontSize: "9px",
                      color: "#475569",
                      fontStyle: "italic",
                      fontWeight: "500",
                    }}
                  >
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ""}
                    {edu.score ? `  ·  ${edu.score}` : ""}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "8.5px",
                    color: "#64748b",
                    whiteSpace: "nowrap",
                    marginLeft: "8px",
                    fontWeight: "600",
                  }}
                >
                  {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div style={{ marginBottom: "4px", marginTop: "16px" }}>
      <h2
        style={{
          fontSize: "10px",
          fontWeight: "700",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#0f172a",
          margin: "0 0 2px 0",
          paddingBottom: "3px",
          borderBottom: "1px solid #cbd5e1",
        }}
      >
        {label}
      </h2>
    </div>
  );
}
