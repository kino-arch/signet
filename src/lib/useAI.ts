import { useState } from "react";

export type ReforgeType = "bullet" | "summary" | "ats-diagnostic" | "ats-fix";

const fetchOpenRouter = async (
  prompt: string,
  options: {
    temperature?: number;
    maxTokens?: number;
  },
  models: string[] = [
    "google/gemma-4-31b-it:free",
    "nvidia/nemotron-3-super-120b-a12b:free"
  ],
  currentModelIndex = 0,
  retries = 1,
  backoff = 2000
): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || "";
  if (!apiKey) throw new Error("VITE_OPENROUTER_API_KEY not found in environment.");

  const model = models[currentModelIndex];
  
  const body: any = {
    model: model,
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: options.temperature ?? 0.7,
  };
  
  if (options.maxTokens) body.max_tokens = options.maxTokens;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Signet Covert Sector",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "<unreadable>");
      console.error(`OpenRouter ${response.status} on ${model}:`, errorBody);
      if (retries > 0) {
        console.warn(`Retrying in ${backoff}ms...`);
        await new Promise((resolve) => setTimeout(resolve, backoff));
        return fetchOpenRouter(prompt, options, models, currentModelIndex, retries - 1, backoff * 2);
      } else if (currentModelIndex < models.length - 1) {
        console.warn(`Model ${model} exhausted retries. Falling back to next model...`);
        return fetchOpenRouter(prompt, options, models, currentModelIndex + 1, 1, 2000);
      } else {
        throw new Error(`OpenRouter API failed on all models. Last status: ${response.status}. Body: ${errorBody}`);
      }
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new Error("Invalid response structure from OpenRouter API");
    }
    return content;
  } catch (err: any) {
    if (currentModelIndex < models.length - 1) {
      console.warn(`Model ${model} threw error: ${err.message}. Falling back...`);
      return fetchOpenRouter(prompt, options, models, currentModelIndex + 1, 1, 2000);
    }
    throw err;
  }
};

export interface AtsDiagnosticResult {
  status: "warning" | "pass";
  category: "Summary" | "Experience" | "Skills" | "General";
  message: string;
  autoFixable: boolean;
  field?: string; // e.g. "summary" or "experience.[id].highlights.[index]" or "skills"
  originalValue?: string;
}

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reforgeBullet = async (bullet: string, role: string, company: string): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const prompt = `You are a legendary tech industry armorer who reforges resume bullets into pure Beskar-grade excellence. 
Your goal is to optimize the user's draft bullet point into a high-impact, professional accomplishments-focused, metrics-quantified (FAANG-style) bullet point.

Context:
Role: ${role || "Professional"}
Company: ${company || "Signet Covert"}
Original Bullet: "${bullet}"

Instructions:
- Use strong action verbs (e.g., Spearheaded, Engineered, Orchestrated, Optimized, Designed).
- Focus on accomplishments, actions, and quantifiable impact (e.g., "by [X]%", "reduced latency by [Y]ms", "saved [Z] hours").
- If the original bullet lacks exact numbers, inject realistic placeholder metrics in brackets like [20%] or [15%] or [5-person] to guide the user on where to fill in their own metrics.
- Keep the tone elite, professional, and crisp.
- Return ONLY the enhanced bullet point text. Do not wrap in quotes or add prefix/suffix comments.`;

      const resultText = await fetchOpenRouter(prompt, { temperature: 0.7, maxTokens: 150 });
      return resultText.replace(/^"|"$/g, "");
    } catch (err: any) {
      console.error("AI Reforge Bullet failed:", err);
      setError(err.message || "Failed to reforge bullet point.");
      return mockReforgeBullet(bullet, role, company);
    } finally {
      setLoading(false);
    }
  };

  const reforgeSummary = async (summary: string, designation: string): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const prompt = `You are a legendary tech industry armorer who reforges professional summaries into highly strategic, impactful, Beskar-grade templates.
Optimize the following summary to sound extremely compelling, executive-level, and aligned to their professional identity.

Professional Designation: ${designation || "Operative"}
Original Summary: "${summary}"

Instructions:
- Write a concise paragraph (2-3 sentences max).
- Focus on key value propositions, major skill areas, and professional trajectory.
- Ensure the tone is elite, professional, and confident.
- Do NOT use fluff. Rely on high-impact industry verbs.
- Return ONLY the enhanced summary text. Do not wrap in quotes or add comments.`;

      const resultText = await fetchOpenRouter(prompt, { temperature: 0.7, maxTokens: 250 });
      return resultText.replace(/^"|"$/g, "");
    } catch (err: any) {
      console.error("AI Reforge Summary failed:", err);
      setError(err.message || "Failed to reforge summary.");
      return mockReforgeSummary(summary, designation);
    } finally {
      setLoading(false);
    }
  };

  const reforgeDescription = async (
    description: string,
    role: string,
    company: string
  ): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const prompt = `You are a legendary tech industry armorer who transforms role overview descriptions into polished, executive-caliber narratives.
Optimize the following role description so that it reads as a high-impact, strategic, professional paragraph fit for senior-level resumes.

Role: ${role || "Professional"}
Company: ${company || "Covert Sector"}
Original Description: "${description}"

Instructions:
- Write a concise 2-3 sentence paragraph maximum.
- Emphasize strategic ownership, scope of impact, and cross-functional collaboration.
- Use strong leadership and technical vocabulary aligned to ${role || "the role"}.
- Inject realistic placeholder metrics in brackets like [X+] or [Y%] where impact could be quantified.
- Maintain the core facts but elevate the tone to sound elite and results-driven.
- Return ONLY the enhanced description text. Do not wrap in quotes or add commentary.`;

      const resultText = await fetchOpenRouter(prompt, { temperature: 0.7, maxTokens: 250 });
      return resultText.replace(/^"|"$/g, "");
    } catch (err: any) {
      console.error("AI Reforge Description failed:", err);
      setError(err.message || "Failed to reforge description.");
      return mockReforgeDescription(description, role, company);
    } finally {
      setLoading(false);
    }
  };

  const runAtsDiagnostic = async (resumeData: any): Promise<AtsDiagnosticResult[]> => {
    setLoading(true);
    setError(null);
    try {
      // Trim payload to strictly the necessary ATS fields to avoid context overflow (token limit)
      const slimData = {
        summary: resumeData.basicInfo?.summary,
        experience: resumeData.experience?.map((exp: any) => ({
          id: exp.id,
          role: exp.role,
          description: exp.description,
          highlights: exp.highlights,
        })),
        skills: resumeData.skills,
      };

      const prompt = `You are an elite ATS (Applicant Tracking System) compiler scanner. Your task is to perform a strict system scan on the provided resume data and output a structured analysis JSON array.

Resume Data:
${JSON.stringify(slimData)}

Instructions:
- Scan for weak spots, specifically:
  1. Professional summary lacking strong industry-specific keywords.
  2. Experience highlight bullet points lacking quantifiable metrics or strong action verbs.
  3. Underpopulated sections (e.g. less than 3 skills, or empty summary).
- Create a list of 4-6 checks, combining both Passes ("pass") and Warnings ("warning").
- Return a valid, parseable JSON array. Each object in the array MUST strictly follow this type structure:
  {
    "status": "warning" | "pass",
    "category": "Summary" | "Experience" | "Skills" | "General",
    "message": "Clear explanation of the diagnostic or check results. Include theming keywords (sigil, ledger, covert, vanguard, specs etc. to fit Signet)",
    "autoFixable": boolean,
    "field": "summary" | "experience.[exp-id].highlights.[index]" | "skills",
    "originalValue": "the exact original value of the field being warning-checked, if applicable"
  }
- Return ONLY the parseable JSON array. Do not write markdown tags (like \`\`\`json) or standard text before/after. Return pure raw JSON string.`;

      const resultText = await fetchOpenRouter(prompt, { temperature: 0.2, maxTokens: 2500 });
      
      // Strip markdown code block wrappers if ignored instructions and added them
      const cleanedJson = resultText.replace(/^\`\`\`(json)?/i, "").replace(/\`\`\`$/i, "").trim();
      return JSON.parse(cleanedJson);
    } catch (err: any) {
      console.error("ATS Diagnostic failed:", err);
      setError(err.message || "Failed to run ATS diagnostic.");
      return mockAtsDiagnostic(resumeData);
    } finally {
      setLoading(false);
    }
  };

  const autoFixAtsWarning = async (
    field: string,
    originalValue: string,
    category: string,
    message: string
  ): Promise<string> => {
    setLoading(true);
    setError(null);
    try {
      const prompt = `You are a legendary ATS Optimization mainframe. Resolve the following warning by rewriting/fixing the original value.

Field Category: ${category}
Warning Message: ${message}
Original Value: "${originalValue}"

Instructions:
- Address the warning fully (e.g., inject industry keywords, optimize phrasing, or insert quantifiable metric placeholders).
- Maintain factual details from the original value but elevate their impact significantly.
- Return ONLY the fixed string value. Do not wrap in quotes or add commentary.`;

      const resultText = await fetchOpenRouter(prompt, { temperature: 0.7, maxTokens: 250 });
      return resultText.replace(/^"|"$/g, "");
    } catch (err: any) {
      console.error("AI ATS Auto-Fix failed:", err);
      setError(err.message || "Failed to auto-fix ATS vulnerability.");
      return mockAtsFix(field, originalValue);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    reforgeBullet,
    reforgeSummary,
    reforgeDescription,
    runAtsDiagnostic,
    autoFixAtsWarning,
  };
}

// ============================================================================
// GRACEFUL MOCK FALLBACKS
// ============================================================================

function mockReforgeBullet(_bullet: string, role: string, company: string): string {
  return `Spearheaded high-velocity client deliverables for ${company || "The Outer Rim Guilds"} as a ${role || "Senior Consultant"}, scaling project throughput by 25% and directing a 5-person crew.`;
}

function mockReforgeDescription(_description: string, role: string, company: string): string {
  return `As ${role || "Operative"} at ${company || "The Outer Rim Guilds"}, architected and delivered mission-critical initiatives across 4 cross-functional sectors, driving a 20% uplift in operational efficiency while maintaining full compliance across all assigned mandates.`;
}

function mockReforgeSummary(_summary: string, designation: string): string {
  return `Elite ${designation || "Software Specialist"} with 5+ years of verified field operations. Demonstrated expertise in architecting high-impact deliverables, optimizing cross-functional metrics, and leading strategic missions under tight deadlines. Committed to engineering premium, Beskar-grade infrastructure.`;
}

function mockAtsDiagnostic(resumeData: any): AtsDiagnosticResult[] {
  const results: AtsDiagnosticResult[] = [];
  const basicInfo = resumeData.basicInfo || {};
  const experience = resumeData.experience || [];
  const skills = resumeData.skills || [];

  // 1. Check summary
  if (!basicInfo.summary || basicInfo.summary.length < 50) {
    results.push({
      status: "warning",
      category: "Summary",
      message: "Identity core summary is under-forged. Needs high-impact keywords to clear industry ATS gatekeepers.",
      autoFixable: true,
      field: "summary",
      originalValue: basicInfo.summary || "",
    });
  } else {
    results.push({
      status: "pass",
      category: "Summary",
      message: "Creed summary cleared. Loaded with primary strategic verbs.",
      autoFixable: false,
    });
  }

  // 2. Check experience bullets
  let warnedBullets = false;
  experience.forEach((exp: any) => {
    (exp.highlights || []).forEach((hl: string, idx: number) => {
      if (!warnedBullets && (!hl.includes("%") && !hl.match(/\d+/) && hl.length > 5)) {
        warnedBullets = true;
        results.push({
          status: "warning",
          category: "Experience",
          message: `Vanguard highlight point for ${exp.company || "Guild"} is missing quantified impact metrics (e.g. percentages, ledger totals).`,
          autoFixable: true,
          field: `experience.${exp.id}.highlights.${idx}`,
          originalValue: hl,
        });
      }
    });
  });

  if (!warnedBullets) {
    results.push({
      status: "pass",
      category: "Experience",
      message: "Bounty deliverables verified. Accomplishment metrics fully forged.",
      autoFixable: false,
    });
  }

  // 3. Check skills
  if (skills.length < 5) {
    results.push({
      status: "warning",
      category: "Skills",
      message: "Combat arsenal contains less than 5 primary technical proficiencies. Expand your stack to trigger recruiter alerts.",
      autoFixable: false,
      field: "skills",
    });
  } else {
    results.push({
      status: "pass",
      category: "Skills",
      message: "Technical arsenal successfully calibrated. All crucial coordinates established.",
      autoFixable: false,
    });
  }

  // 4. General check
  results.push({
    status: "pass",
    category: "General",
    message: "Armor signatures authenticated. No formatting vulnerabilities detected.",
    autoFixable: false,
  });

  return results;
}

function mockAtsFix(_field: string, _originalValue: string): string {
  if (_field === "summary") {
    return "Accomplished operative specializing in high-stakes mission execution and cross-functional team coordination. Shipped 4 major system releases, improving performance by 30% while enforcing rigorous compliance guidelines.";
  }
  return `Optimized operational performance for key guild assets, resulting in a 15% increase in overall throughput and 100% compliance across sectors.`;
}
