/**
 * JSON Resume Standard Export
 *
 * Maps Signet's internal useDataSlateStore state to the open-source
 * JSON Resume Schema (https://jsonresume.org/schema/).
 *
 * This enables machine-readable resume export that forward-thinking
 * companies and tools can ingest directly.
 */

import type {
  Basics,
  WorkEntry,
  SkillEntry,
  EducationEntry,
  CertificationEntry,
} from "@/store/useDataSlateStore"

/** JSON Resume Schema v1.0.0 compliant output */
interface JSONResumeSchema {
  $schema: string
  basics: {
    name: string
    label: string
    email: string
    phone: string
    url: string
    summary: string
    location: {
      city: string
      countryCode: string
      region: string
    }
    profiles: Array<{
      network: string
      username: string
      url: string
    }>
  }
  work: Array<{
    name: string
    position: string
    url: string
    startDate: string
    endDate: string
    summary: string
    highlights: string[]
  }>
  education: Array<{
    institution: string
    area: string
    studyType: string
    startDate: string
    endDate: string
    score: string
  }>
  skills: Array<{
    name: string
    level: string
    keywords: string[]
  }>
  certificates: Array<{
    name: string
    issuer: string
    date: string
    url: string
  }>
  meta: {
    canonical: string
    version: string
    lastModified: string
    generator: string
  }
}

/**
 * Strip HTML tags from a string, preserving plain text content.
 * Resume summaries may contain basic HTML from rich-text editors.
 */
function stripHtml(html: string): string {
  if (!html) return ""
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

/**
 * Maps Signet internal state → JSON Resume Schema.
 */
export function toJSONResume(
  basics: Basics,
  work: WorkEntry[],
  skills: SkillEntry[],
  education: EducationEntry[],
  certifications: CertificationEntry[]
): JSONResumeSchema {
  return {
    $schema:
      "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: basics.name || "",
      label: basics.label || "",
      email: basics.email || "",
      phone: basics.phone || "",
      url: basics.url || "",
      summary: stripHtml(basics.summary || ""),
      location: {
        city: basics.location?.city || "",
        countryCode: basics.location?.countryCode || "",
        region: basics.location?.region || "",
      },
      profiles: (basics.profiles || []).map((p) => ({
        network: p.network || "",
        username: p.username || "",
        url: p.url || "",
      })),
    },
    work: work.map((w) => ({
      name: w.name || "",
      position: w.position || "",
      url: w.url || "",
      startDate: w.startDate || "",
      endDate: w.endDate || "",
      summary: stripHtml(w.summary || ""),
      highlights: (w.highlights || []).filter(Boolean),
    })),
    education: education.map((e) => ({
      institution: e.institution || "",
      area: e.area || "",
      studyType: e.studyType || "",
      startDate: e.startDate || "",
      endDate: e.endDate || "",
      score: e.score || "",
    })),
    skills: skills.map((s) => ({
      name: s.name || "",
      level: s.level || "",
      keywords: (s.keywords || []).filter(Boolean),
    })),
    certificates: certifications.map((c) => ({
      name: c.name || "",
      issuer: c.issuer || "",
      date: c.date || "",
      url: c.url || "",
    })),
    meta: {
      canonical: "https://jsonresume.org/schema/",
      version: "v1.0.0",
      lastModified: new Date().toISOString(),
      generator: "Signet Reforge Datacore",
    },
  }
}

/**
 * Triggers a browser download of the JSON Resume file.
 */
export function downloadJSONResume(
  basics: Basics,
  work: WorkEntry[],
  skills: SkillEntry[],
  education: EducationEntry[],
  certifications: CertificationEntry[],
  filename?: string
): void {
  const jsonResume = toJSONResume(
    basics,
    work,
    skills,
    education,
    certifications
  )
  const blob = new Blob([JSON.stringify(jsonResume, null, 2)], {
    type: "application/json",
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download =
    filename || `${basics.name?.replace(/\s+/g, "_") || "resume"}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
