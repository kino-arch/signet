import { useForgeStore } from "@/store/useForgeStore";

/**
 * Ghost Protocol — Minimal Two-Column Template
 *
 * Modern sidebar layout used by leading tech companies' design/engineering roles.
 * - Always white main panel, very light gray (#f7f7f7) sidebar
 * - Left sidebar: name, contact, skills, education
 * - Right main: summary/about, experience
 * - Monospaced section labels for modern tech aesthetic
 */
export function MinimalTemplate() {
  const { basicInfo, experience, education, skills } = useForgeStore(
    (state) => state.resumeData
  );

  const SIDEBAR_W = "30%";
  const MAIN_W = "70%";

  const contactItems = [
    { label: basicInfo.email },
    { label: basicInfo.phone },
    { label: basicInfo.location },
    { label: basicInfo.linkedin },
    { label: basicInfo.website },
  ].filter((c) => c.label);

  return (
    <div
      className="relative min-h-full w-full print:p-0 print:overflow-visible"
      style={{
        backgroundColor: "#ffffff",
        color: "#1a1a1a",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        fontSize: "13px",
        lineHeight: "1.55",
        display: "flex",
      }}
    >
      {/* ── LEFT SIDEBAR ── */}
      <div
        style={{
          width: SIDEBAR_W,
          backgroundColor: "#f6f6f6",
          borderRight: "1px solid #e0e0e0",
          padding: "36px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          flexShrink: 0,
        }}
      >
        {/* Name & Title */}
        <div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#111111",
              letterSpacing: "-0.01em",
              lineHeight: "1.2",
              margin: "0 0 4px 0",
            }}
          >
            {basicInfo.firstName}
            <br />
            {basicInfo.lastName}
          </h1>
          {basicInfo.designation && (
            <p
              style={{
                fontSize: "12px",
                fontFamily: "'Courier New', monospace",
                color: "#777777",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                margin: "0",
              }}
            >
              {basicInfo.designation}
            </p>
          )}
        </div>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid #d0d0d0", margin: "0" }} />

        {/* Contact */}
        {contactItems.length > 0 && (
          <div>
            <SidebarLabel label="Contact" />
            <div style={{ marginTop: "6px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {contactItems.map((c, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "12px",
                    color: "#555555",
                    wordBreak: "break-all",
                    lineHeight: "1.4",
                  }}
                >
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <SidebarLabel label="Stack" />
            <div
              style={{
                marginTop: "6px",
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
              }}
            >
              {skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "#444444",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "2px",
                    padding: "4px 8px",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <SidebarLabel label="Education" />
            <div style={{ marginTop: "6px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {education.map((edu) => (
                <div key={edu.id} className="resume-item">
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#111111",
                      margin: "0 0 1px 0",
                    }}
                  >
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ""}
                  </p>
                  <p style={{ fontSize: "12px", color: "#666666", margin: "0 0 2px 0" }}>
                    {edu.institution}
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      fontFamily: "'Courier New', monospace",
                      color: "#888888",
                      margin: "0",
                    }}
                  >
                    {edu.startDate} – {edu.current ? "Present" : edu.endDate}
                    {edu.score ? `  ·  ${edu.score}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        style={{
          width: MAIN_W,
          backgroundColor: "#ffffff",
          padding: "36px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          overflow: "visible",
        }}
      >
        {/* About / Summary */}
        {basicInfo.summary && (
          <div>
            <MainLabel label="About" />
            <div
              dangerouslySetInnerHTML={{ __html: basicInfo.summary }}
              style={{
                fontSize: "13px",
                color: "#333333",
                lineHeight: "1.65",
                marginTop: "6px",
                maxWidth: "540px",
              }}
            />
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <MainLabel label="Experience" />
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {experience.map((job) => (
                <div key={job.id} className="resume-item">
                  {/* Role + Date */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "1px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#111111",
                      }}
                    >
                      {job.role}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontFamily: "'Courier New', monospace",
                        color: "#888888",
                        whiteSpace: "nowrap",
                        marginLeft: "8px",
                      }}
                    >
                      {job.startDate} – {job.current ? "Present" : job.endDate}
                    </span>
                  </div>

                  {/* Company */}
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#666666",
                      marginBottom: "5px",
                      fontWeight: "600",
                    }}
                  >
                    {job.company}
                    {job.location ? ` · ${job.location}` : ""}
                  </p>

                  {job.description && (
                    <div
                      dangerouslySetInnerHTML={{ __html: job.description }}
                      style={{
                        fontSize: "13px",
                        color: "#444444",
                        lineHeight: "1.55",
                        marginBottom: "4px",
                      }}
                    />
                  )}

                  {job.highlights && job.highlights.length > 0 && (
                    <ul
                      style={{
                        margin: "0",
                        paddingLeft: "13px",
                        listStyleType: "disc",
                      }}
                    >
                      {job.highlights.map((item, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: "13px",
                            color: "#444444",
                            lineHeight: "1.55",
                            marginBottom: "2px",
                            paddingLeft: "2px",
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
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarLabel({ label }: { label: string }) {
  return (
    <p
      className="resume-header"
      style={{
        fontSize: "11px",
        fontFamily: "'Courier New', monospace",
        fontWeight: "700",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "#888888",
        margin: "0",
        paddingBottom: "4px",
        borderBottom: "1px solid #d0d0d0",
      }}
    >
      {label}
    </p>
  );
}

function MainLabel({ label }: { label: string }) {
  return (
    <p
      className="resume-header"
      style={{
        fontSize: "11px",
        fontFamily: "'Courier New', monospace",
        fontWeight: "700",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "#999999",
        margin: "0",
        paddingBottom: "4px",
        borderBottom: "1px solid #e8e8e8",
      }}
    >
      {label}
    </p>
  );
}
