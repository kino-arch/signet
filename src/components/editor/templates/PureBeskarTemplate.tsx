import { useForgeStore } from "@/store/useForgeStore";

/**
 * The FAANG Executive — Premium ATS-First Template
 *
 * The gold standard resume format for executives and senior ICs.
 * Single-column, reverse-chronological, maximum ATS compatibility.
 * - Elegant Charter/Garamond typography for executive class appeal.
 * - Generous margins to prevent the cramped "edge-to-edge" look.
 * - Centered architectural header, short accent underlines.
 * - 100% ATS compliant, maximum signal.
 */
export function PureBeskarTemplate() {
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

  const SERIF = "'Charter', 'Bitstream Charter', 'Sitka Text', Garamond, 'Times New Roman', serif";
  const SANS = "'Inter', 'Helvetica Neue', Arial, sans-serif";
  const INK = "#111111";
  const MUTED = "#444444";
  const SUBTLE = "#777777";

  return (
    <div
      className="relative min-h-full w-full bg-white print:overflow-visible print:p-0"
      style={{
        color: INK,
        fontFamily: SERIF,
        fontSize: "13.5px", // 10pt equivalent
        lineHeight: "1.65",
        padding: "64px 72px", // Generous margins
        boxSizing: "border-box",
      }}
    >
      {/* ── HEADER (CENTERED ARCHITECTURE) ── */}
      <div className="resume-header" style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "400",
            color: INK,
            margin: "0 0 8px 0",
            letterSpacing: "-0.02em",
            fontFamily: SERIF,
            lineHeight: "1",
          }}
        >
          {basicInfo.firstName || basicInfo.lastName ? `${basicInfo.firstName} ${basicInfo.lastName}` : "YOUR NAME"}
        </h1>

        {/* ── TITLE ── */}
        {basicInfo.designation && (
          <p
            style={{
            fontSize: "12px",
              fontFamily: SANS,
              fontWeight: "600",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: MUTED,
              margin: "0 0 12px 0",
            }}
          >
            {basicInfo.designation}
          </p>
        )}

        {/* ── CONTACT ROW ── */}
        {contactItems.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "0 12px",
              fontSize: "12px",
              color: MUTED,
              fontFamily: SANS,
              lineHeight: "1.4",
            }}
          >
            {contactItems.map((item, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center" }}>
                <span>{item}</span>
                {i < contactItems.length - 1 && (
                  <span style={{ margin: "0 12px", color: "#cccccc", fontWeight: "300" }}>|</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── SUMMARY ── */}
      {basicInfo.summary && (
        <section style={{ marginBottom: "24px" }}>
          <ExecutiveSectionHeader label="Professional Summary" />
          <div
            dangerouslySetInnerHTML={{ __html: basicInfo.summary }}
            style={{
              fontSize: "13.5px",
              color: INK,
              lineHeight: "1.7",
              fontFamily: SERIF,
              marginTop: "8px",
              marginBottom: "0",
              textAlign: "justify",
            }}
          />
        </section>
      )}

      {/* ── EXPERIENCE ── */}
      {experience.length > 0 && (
        <section style={{ marginBottom: "24px" }}>
          <ExecutiveSectionHeader label="Work Experience" />
          <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {experience.map((job) => (
              <div key={job.id} className="resume-item">
                {/* Role / Date header */}
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
                      fontSize: "14px",
                      fontWeight: "700",
                      color: INK,
                      fontFamily: SERIF,
                    }}
                  >
                    {job.role}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: MUTED,
                      fontFamily: SANS,
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                      marginLeft: "8px",
                    }}
                  >
                    {job.startDate} – {job.current ? "Present" : job.endDate}
                  </span>
                </div>

                {/* Company / Location info */}
                <p
                  style={{
                    fontSize: "13.5px",
                    fontWeight: "400",
                    fontStyle: "italic",
                    color: MUTED,
                    margin: "0 0 8px 0",
                    fontFamily: SERIF,
                  }}
                >
                  {job.company}
                  {job.location ? `  —  ${job.location}` : ""}
                </p>

                {/* Narrative description */}
                {job.description && (
                  <div
                    dangerouslySetInnerHTML={{ __html: job.description }}
                    style={{
                      fontSize: "13.5px",
                      color: INK,
                      lineHeight: "1.65",
                      marginBottom: "8px",
                      marginTop: "0",
                      fontFamily: SERIF,
                    }}
                  />
                )}

                {/* Bullets highlights */}
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
                        key={`${job.id}-h-${idx}`}
                        style={{
                          fontSize: "13.5px",
                          color: INK,
                          lineHeight: "1.6",
                          marginBottom: "4px",
                          paddingLeft: "14px",
                          position: "relative",
                          fontFamily: SERIF,
                        }}
                      >
                        <span style={{ position: "absolute", left: 0, color: SUBTLE }}>—</span>
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
        <section style={{ marginBottom: "24px" }}>
          <ExecutiveSectionHeader label="Technical Expertise" />
          <p
            style={{
              fontSize: "13.5px",
              color: INK,
              lineHeight: "1.7",
              fontFamily: SERIF,
              marginTop: "8px",
              marginBottom: "0",
            }}
          >
            {skills.join("  •  ")}
          </p>
        </section>
      )}

      {/* ── EDUCATION ── */}
      {education.length > 0 && (
        <section>
          <ExecutiveSectionHeader label="Education" />
          <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {education.map((edu) => (
              <div
                key={edu.id}
                className="resume-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <div>
                  <strong
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: INK,
                      fontFamily: SERIF,
                      display: "block",
                      marginBottom: "2px",
                    }}
                  >
                    {edu.institution}
                  </strong>
                  <span
                    style={{
                      fontSize: "13.5px",
                      fontWeight: "400",
                      color: MUTED,
                      fontFamily: SERIF,
                      fontStyle: "italic",
                    }}
                  >
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ""}
                    {edu.score ? `  |  ${edu.score}` : ""}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "13px",
                    color: MUTED,
                    whiteSpace: "nowrap",
                    marginLeft: "8px",
                    fontWeight: "500",
                    fontFamily: SANS,
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

function ExecutiveSectionHeader({ label }: { label: string }) {
  return (
    <div className="resume-header" style={{ marginBottom: "8px", marginTop: "16px" }}>
      <h2
        style={{
          fontSize: "14px",
          fontWeight: "700",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#111111",
          margin: "0 0 6px 0",
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        {label}
      </h2>
      {/* Short elegant underline instead of full-width edge-to-edge line */}
      <div style={{ width: "32px", height: "2px", backgroundColor: "#111111" }} />
    </div>
  );
}
