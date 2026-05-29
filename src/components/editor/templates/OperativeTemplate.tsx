import type { ResumeData } from "@/store/useForgeStore";
import { Separator } from "@/components/ui/separator";

interface TemplateProps {
  data: ResumeData;
}

export function OperativeTemplate({ data }: TemplateProps) {
  const { basicInfo, experience, education, skills } = data;
  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`.trim();

  return (
    <div
      className="relative min-h-full w-full print:p-0 print:overflow-visible"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        color: "#1a1a2e",
        fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
        padding: "48px 56px",
        lineHeight: 1.5,
        position: "relative",
      }}
    >
      {/* Top accent border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #1a1a2e 0%, #2d2d44 40%, #4a4a6a 100%)",
        }}
      />

      {/* ═══ HEADER ═══ */}
      <header style={{ marginBottom: "28px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            color: "#0f0f1a",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          {fullName || "YOUR NAME"}
        </h1>

        {basicInfo.designation && (
          <p
            style={{
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "#4a4a6a",
              marginTop: "6px",
              textTransform: "uppercase",
            }}
          >
            {basicInfo.designation}
          </p>
        )}

        {/* Contact row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "6px 20px",
            marginTop: "14px",
            fontSize: "12px",
            color: "#555566",
            fontWeight: 500,
          }}
        >
          {basicInfo.email && <span>{basicInfo.email}</span>}
          {basicInfo.email && basicInfo.phone && (
            <span style={{ color: "#c0c0cc" }}>│</span>
          )}
          {basicInfo.phone && <span>{basicInfo.phone}</span>}
          {basicInfo.phone && basicInfo.location && (
            <span style={{ color: "#c0c0cc" }}>│</span>
          )}
          {basicInfo.location && <span>{basicInfo.location}</span>}
          {basicInfo.location && basicInfo.website && (
            <span style={{ color: "#c0c0cc" }}>│</span>
          )}
          {basicInfo.website && <span>{basicInfo.website}</span>}
        </div>
      </header>

      <Separator className="bg-slate-200" style={{ marginBottom: "22px" }} />

      {/* ═══ PROFESSIONAL SUMMARY ═══ */}
      {basicInfo.summary && (
        <section style={{ marginBottom: "24px" }}>
          <h2
            className="resume-header"
            style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#1a1a2e",
              textTransform: "uppercase",
              marginBottom: "10px",
              borderBottom: "1.5px solid #1a1a2e",
              paddingBottom: "5px",
            }}
          >
            Professional Summary
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: data.basicInfo.summary }}
            style={{
              fontSize: "13.5px",
              color: "#475569",
              lineHeight: "1.6",
              marginTop: "4px",
            }}
          />
        </section>
      )}

      {/* ═══ WORK EXPERIENCE ═══ */}
      {experience.length > 0 && (
        <section style={{ marginBottom: "24px" }}>
          <h2
            className="resume-header"
            style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#1a1a2e",
              textTransform: "uppercase",
              marginBottom: "10px",
              borderBottom: "1.5px solid #1a1a2e",
              paddingBottom: "5px",
            }}
          >
            Work Experience
          </h2>

          {experience.map((exp) => {
            const dateRange = `${exp.startDate}${exp.startDate && (exp.endDate || exp.current) ? " – " : ""}${exp.current ? "Present" : exp.endDate}`;
            return (
              <div key={exp.id} className="resume-item" style={{ marginBottom: "16px" }}>
                {/* Role + dates row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    gap: "4px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#0f0f1a",
                      margin: 0,
                    }}
                  >
                    {exp.role}
                  </h3>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#6a6a7a",
                      whiteSpace: "nowrap",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {dateRange}
                  </span>
                </div>

                {/* Company */}
                {exp.company && (
                  <p
                    style={{
                      fontSize: "13.5px",
                      color: "#4a4a6a",
                      fontWeight: 600,
                      fontStyle: "italic",
                      margin: "2px 0 0 0",
                    }}
                  >
                    {exp.company}
                  </p>
                )}

                {/* Narrative Description */}
                {exp.description && (
                  <div
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                    style={{
                      fontSize: "13.5px",
                      color: "#475569",
                      lineHeight: "1.55",
                      marginBottom: "6px",
                    }}
                  />
                )}

                {/* Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul
                    style={{
                      margin: "6px 0 0 0",
                      paddingLeft: "16px",
                      listStyleType: "disc",
                    }}
                  >
                    {exp.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: "13.5px",
                          color: "#3a3a4a",
                          lineHeight: 1.65,
                          marginBottom: "3px",
                          paddingLeft: "2px",
                        }}
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </section>
      )}

      {/* ═══ TECHNICAL SKILLS ═══ */}
      {skills.length > 0 && (
        <section style={{ marginBottom: "24px" }}>
          <h2
            className="resume-header"
            style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#1a1a2e",
              textTransform: "uppercase",
              marginBottom: "10px",
              borderBottom: "1.5px solid #1a1a2e",
              paddingBottom: "5px",
            }}
          >
            Technical Skills
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
            }}
          >
            {skills.map((skill, idx) => (
              <span
                key={idx}
                style={{
                  display: "inline-block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#2d2d44",
                  backgroundColor: "#f0f0f5",
                  border: "1px solid #dddde5",
                  borderRadius: "4px",
                  padding: "3px 10px",
                  letterSpacing: "0.02em",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ═══ EDUCATION ═══ */}
      {education.length > 0 && (
        <section>
          <h2
            className="resume-header"
            style={{
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#1a1a2e",
              textTransform: "uppercase",
              marginBottom: "10px",
              borderBottom: "1.5px solid #1a1a2e",
              paddingBottom: "5px",
            }}
          >
            Education
          </h2>

          {education.map((edu) => {
            const dateRange = `${edu.startDate}${edu.startDate && (edu.endDate || edu.current) ? " – " : ""}${edu.current ? "Present" : edu.endDate}`;
            return (
              <div key={edu.id} className="resume-item" style={{ marginBottom: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    gap: "4px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#0f0f1a",
                      margin: 0,
                    }}
                  >
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ""}
                  </h3>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#6a6a7a",
                      whiteSpace: "nowrap",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {dateRange}
                  </span>
                </div>
                {edu.institution && (
                  <p
                    style={{
                      fontSize: "13.5px",
                      color: "#4a4a6a",
                      fontWeight: 600,
                      fontStyle: "italic",
                      margin: "2px 0 0 0",
                    }}
                  >
                    {edu.institution}
                    {edu.score ? ` · ${edu.score}` : ""}
                  </p>
                )}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
