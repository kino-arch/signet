import React from "react"
import type {
  Basics,
  WorkEntry,
  SkillEntry,
  EducationEntry,
  CertificationEntry,
} from "@/store/useDataSlateStore"
import { StandardTemplate } from "./StandardTemplate"
import { MinimalTemplate } from "./MinimalTemplate"
import { ModernTemplate } from "./ModernTemplate"
import { InteractiveTemplate } from "./InteractiveTemplate"
import { ExecutiveTemplate } from "./ExecutiveTemplate"
import { CreativeTemplate } from "./CreativeTemplate"

export interface SlateData {
  basics: Basics
  work: WorkEntry[]
  skills: SkillEntry[]
  education: EducationEntry[]
  certifications: CertificationEntry[]
}

export interface ResumeTemplateProps {
  data: SlateData
  variant: "preview" | "pdf" | "print"
  theme?: "dark" | "light" | "system"
  className?: string
}

export type TemplateId =
  | "standard"
  | "technical"
  | "minimal"
  | "modern"
  | "executive"
  | "creative"

export interface TemplateDefinition {
  id: TemplateId
  name: string
  nameCivilian: string
  category: "professional" | "modern" | "creative" | "technical"
  isPremium: boolean
  priceCredits: number
  description: string
  previewUrl: string
  rating: number
  usageCount: number
  tags: string[]
  colorVariants: string[]
  component: React.FC<ResumeTemplateProps>
  previewStyles: {
    aspectRatio: string
    maxHeight: string
  }
  thumbnail: string
  /** Estimated ATS parse accuracy (0-100) for this template layout */
  atsParseRate: number
  /** Target job roles / industries this template is designed for */
  targetRoles: string[]
  /** Warning displayed when user selects a template with low ATS compatibility */
  atsWarning?: string
}

export const TEMPLATE_REGISTRY: Record<TemplateId, TemplateDefinition> = {
  standard: {
    id: "standard",
    name: "Heavy Infantry",
    nameCivilian: "Classic",
    category: "professional",
    isPremium: false,
    priceCredits: 0,
    description: "Clean, timeless. Passes every ATS.",
    previewUrl: "/templates/classic-preview.png",
    thumbnail: "/thumbnails/standard-v2.png",
    rating: 4.8,
    usageCount: 45200,
    tags: ["ATS-friendly", "Single-page"],
    colorVariants: ["Slate", "Navy", "Black"],
    component: StandardTemplate,
    previewStyles: { aspectRatio: "210/297", maxHeight: "70vh" },
    atsParseRate: 100,
    targetRoles: ["FAANG", "Big Tech", "Fortune 500", "Finance", "Consulting"],
  },
  minimal: {
    id: "minimal",
    name: "Ghost",
    nameCivilian: "Minimal",
    category: "modern",
    isPremium: false,
    priceCredits: 0,
    description: "Typography driven, extreme whitespace, no borders.",
    previewUrl: "/templates/minimal-preview.png",
    thumbnail: "/thumbnails/minimal-v2.png",
    rating: 4.6,
    usageCount: 28400,
    tags: ["Minimalist", "Typography"],
    colorVariants: ["Gray on White"],
    component: MinimalTemplate,
    previewStyles: { aspectRatio: "210/297", maxHeight: "70vh" },
    atsParseRate: 98,
    targetRoles: [
      "SaaS Startups",
      "Y Combinator",
      "Stripe",
      "Vercel",
      "Product Engineer",
    ],
  },
  technical: {
    id: "technical",
    name: "Datacore",
    nameCivilian: "Technical",
    category: "technical",
    isPremium: true,
    priceCredits: 1,
    description: "Structured for engineers. Skills-first layout.",
    previewUrl: "/templates/datacore-preview.png",
    thumbnail: "/thumbnails/technical-v2.png",
    rating: 4.9,
    usageCount: 12800,
    tags: ["Skills-first", "Two-page", "Code-friendly"],
    colorVariants: ["Terminal", "Ocean", "Graphite"],
    component: InteractiveTemplate,
    previewStyles: { aspectRatio: "210/297", maxHeight: "70vh" },
    atsParseRate: 100,
    targetRoles: [
      "Software Engineer",
      "DevOps",
      "ML/AI Engineer",
      "SRE",
      "Backend Engineer",
    ],
  },
  modern: {
    id: "modern",
    name: "Vanguard",
    nameCivilian: "Modern",
    category: "professional",
    isPremium: true,
    priceCredits: 1,
    description: "Striking balance of layout and white space.",
    previewUrl: "/templates/modern-preview.png",
    thumbnail: "/thumbnails/modern-v2.png",
    rating: 4.7,
    usageCount: 15300,
    tags: ["Balanced", "Readable"],
    colorVariants: ["Slate", "Emerald"],
    component: ModernTemplate,
    previewStyles: { aspectRatio: "210/297", maxHeight: "70vh" },
    atsParseRate: 100,
    targetRoles: [
      "Product Manager",
      "Marketing",
      "Consulting",
      "Business Analyst",
    ],
  },
  executive: {
    id: "executive",
    name: "Imperial",
    nameCivilian: "Executive",
    category: "professional",
    isPremium: true,
    priceCredits: 1,
    description: "Authoritative design for leadership roles.",
    previewUrl: "/templates/executive-preview.png",
    thumbnail: "/thumbnails/executive-v2.png",
    rating: 4.9,
    usageCount: 8900,
    tags: ["Leadership", "Dense"],
    colorVariants: ["Charcoal", "Midnight"],
    component: ExecutiveTemplate,
    previewStyles: { aspectRatio: "210/297", maxHeight: "70vh" },
    atsParseRate: 95,
    targetRoles: [
      "VP/Director",
      "C-Suite",
      "Fortune 500",
      "McKinsey",
      "Goldman Sachs",
    ],
  },
  creative: {
    id: "creative",
    name: "Rebel",
    nameCivilian: "Creative",
    category: "creative",
    isPremium: true,
    priceCredits: 1,
    description: "Bold colors and unique typography scales.",
    previewUrl: "/templates/creative-preview.png",
    thumbnail: "/thumbnails/creative-v2.png",
    rating: 4.5,
    usageCount: 5200,
    tags: ["Visual", "Portfolio"],
    colorVariants: ["Neon", "Coral", "Yellow"],
    component: CreativeTemplate,
    previewStyles: { aspectRatio: "210/297", maxHeight: "70vh" },
    atsParseRate: 60,
    targetRoles: [
      "UX Designer",
      "Creative Director",
      "Brand Strategist",
      "Portfolio",
    ],
    atsWarning:
      "This template prioritizes visual impact over machine readability. Use it for networking and human hiring managers — not for blind ATS portal submissions.",
  },
}

export function getTemplateById(
  id: string | null | undefined
): TemplateDefinition {
  if (id && id in TEMPLATE_REGISTRY) {
    return TEMPLATE_REGISTRY[id as TemplateId]
  }
  return TEMPLATE_REGISTRY.standard
}
