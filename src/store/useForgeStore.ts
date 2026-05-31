import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TargetLockBriefing } from "@/lib/useTargetLock";

export interface BasicInfo {
  firstName: string;
  lastName: string;
  designation: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin?: string;
  summary: string;
  avatarUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  score: string;
}

export interface ResumeData {
  basicInfo: BasicInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

interface ForgeState {
  activeTemplate: string;
  setActiveTemplate: (template: string) => void;
  resumeData: ResumeData;
  updateBasicInfo: (info: Partial<BasicInfo>) => void;
  // Experience mutations
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  // Education mutations
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  // Skills mutation
  updateSkills: (skills: string[]) => void;
  // Onboarding initialization
  initializeWithOnboarding: (data: {
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
  }) => void;
  // Privacy
  persistConsent: boolean;
  setPersistConsent: (consent: boolean) => void;
  // Target Lock
  targetLockBriefing: TargetLockBriefing | null;
  targetLockCompany: string | null;
  targetLockJobTitle: string | null;
  setTargetLockBriefing: (briefing: TargetLockBriefing | null) => void;
  setTargetLockCompany: (company: string | null, jobTitle?: string | null) => void;
  applyTargetLock: () => void;
  clearTargetLock: () => void;
}

const defaultResumeData: ResumeData = {
  basicInfo: {
    firstName: "",
    lastName: "",
    designation: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
    avatarUrl: "",
  },
  experience: [],
  education: [],
  skills: [],
};

export const useForgeStore = create<ForgeState>()(
  persist(
    (set) => ({
      activeTemplate: 'operative',
      setActiveTemplate: (template) => set({ activeTemplate: template }),
      resumeData: defaultResumeData,
      persistConsent: false,
      setPersistConsent: (consent) => set({ persistConsent: consent }),
      targetLockBriefing: null,
      targetLockCompany: null,
      targetLockJobTitle: null,
      setTargetLockBriefing: (briefing) => set({ targetLockBriefing: briefing }),
      setTargetLockCompany: (company, jobTitle) => set({ targetLockCompany: company, targetLockJobTitle: jobTitle || null }),
      clearTargetLock: () => set({ targetLockBriefing: null, targetLockCompany: null, targetLockJobTitle: null }),
      applyTargetLock: () =>
        set((state) => {
          if (!state.targetLockBriefing) return state;
          
          const { summary_draft, skills_priority } = state.targetLockBriefing.resume_strategy;
          const targetDesignation = state.targetLockJobTitle || state.resumeData.basicInfo.designation;

          // Sentinel strings that identify fantasy / onboarding placeholder entries
          const PLACEHOLDER_COMPANIES = new Set([
            'The Outer Rim Guilds',
            'Your Company Name',
            'the outer rim guilds',
            'your company name',
          ]);
          const PLACEHOLDER_INSTITUTIONS = new Set([
            'The Academy of Mandalore',
            'Your University',
            'the academy of mandalore',
            'your university',
          ]);

          // Filter out placeholder experience entries
          const cleanedExperience = state.resumeData.experience.filter(
            exp => !PLACEHOLDER_COMPANIES.has(exp.company) && !PLACEHOLDER_COMPANIES.has(exp.company.toLowerCase())
          );

          // If ALL experience was placeholder (or empty), seed one blank entry for the target role
          const finalExperience = cleanedExperience.length > 0
            ? cleanedExperience
            : [{
                id: `exp-tl-${Date.now()}`,
                company: '',
                role: targetDesignation,
                startDate: '',
                endDate: '',
                current: false,
                description: '',
                highlights: [],
              }];

          // Filter out placeholder education entries
          const cleanedEducation = state.resumeData.education.filter(
            edu => !PLACEHOLDER_INSTITUTIONS.has(edu.institution) && !PLACEHOLDER_INSTITUTIONS.has(edu.institution.toLowerCase())
          );

          // If ALL education was placeholder (or empty), seed one blank entry
          const finalEducation = cleanedEducation.length > 0
            ? cleanedEducation
            : [{
                id: `edu-tl-${Date.now()}`,
                institution: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
                current: false,
                score: '',
              }];

          return {
            resumeData: {
              ...state.resumeData,
              basicInfo: {
                ...state.resumeData.basicInfo,
                summary: summary_draft || state.resumeData.basicInfo.summary,
                designation: targetDesignation,
              },
              skills: skills_priority,
              experience: finalExperience,
              education: finalEducation,
            }
          };
        }),
      updateBasicInfo: (info) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            basicInfo: { ...state.resumeData.basicInfo, ...info },
          },
        })),
      
      // Skills
      updateSkills: (skills) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills,
          },
        })),
      
      // Experience
      addExperience: (exp) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [...state.resumeData.experience, exp],
          },
        })),
      updateExperience: (id, updatedExp) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) =>
              exp.id === id ? { ...exp, ...updatedExp } : exp
            ),
          },
        })),
      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id),
          },
        })),

      // Education
      addEducation: (edu) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [...state.resumeData.education, edu],
          },
        })),
      updateEducation: (id, updatedEdu) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, ...updatedEdu } : edu
            ),
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id),
          },
        })),

      // Onboarding initialization
      initializeWithOnboarding: (data) => {
        type RoleDefaults = {
          designation: string;
          summary: string;
          experienceDescription: string;
          highlights: string[];
          skills: string[];
        };

        const roleDefaults: RoleDefaults = (() => {
          switch (data.role) {
            case "forge":
              return {
                designation: "Software Engineer / Designer",
                summary: "Results-driven engineer and designer with a passion for building scalable systems and intuitive interfaces. Thrives at the intersection of technical excellence and user experience. Adept at taking products from concept to production across the full stack.",
                experienceDescription: "Designed and engineered full-stack systems and customer-facing interfaces for a fast-growing SaaS platform.",
                highlights: [
                  "Architected a distributed microservices backend serving 50,000+ daily active users",
                  "Reduced page load times by 65% through frontend performance optimizations and caching strategies",
                  "Led a cross-functional team to ship a major redesign, increasing user activation by 40%",
                ],
                skills: ["Software Engineering", "UI/UX Design", "System Architecture", "Cloud Infrastructure", "TypeScript", "React"],
              };
            case "outpost":
              return {
                designation: "Customer Success Manager",
                summary: "Customer-obsessed professional with a proven track record of building long-term client relationships, driving product adoption, and reducing churn. Skilled at translating complex technical concepts into clear business value for stakeholders at every level.",
                experienceDescription: "Managed a portfolio of enterprise accounts and led onboarding programs for a B2B SaaS company.",
                highlights: [
                  "Maintained a 97% customer retention rate across a portfolio of 120+ enterprise accounts",
                  "Reduced average onboarding time by 35% by designing a scalable self-serve training program",
                  "Achieved NPS score of 72, ranking in the top 10% of the industry benchmark",
                ],
                skills: ["Client Relations", "Customer Success", "Churn Reduction", "Onboarding", "Stakeholder Communication", "CRM Tools"],
              };
            case "guild":
              return {
                designation: "Director of Operations",
                summary: "Operational leader with a track record of scaling teams, streamlining processes, and delivering complex multi-workstream initiatives on time and under budget. Bridges strategy and execution to align organizations around measurable outcomes.",
                experienceDescription: "Led cross-functional operations and program management for a high-growth technology company.",
                highlights: [
                  "Scaled the operations team from 12 to 45 people while maintaining quality and reducing cost-per-hire by 20%",
                  "Managed an annual operational budget of $4.2M, consistently delivering 10–15% under forecast",
                  "Implemented OKR framework across 6 departments, improving quarterly goal attainment by 30%",
                ],
                skills: ["Strategic Leadership", "Operations Management", "Resource Planning", "OKRs & KPIs", "Stakeholder Alignment", "Process Optimization"],
              };
            case "navigators":
              return {
                designation: "Growth & Strategy Analyst",
                summary: "Data-driven growth strategist with expertise in market analysis, campaign performance, and go-to-market execution. Transforms complex datasets into actionable insights that move revenue, market share, and brand awareness forward.",
                experienceDescription: "Led growth marketing and data analysis initiatives for a venture-backed technology startup.",
                highlights: [
                  "Grew organic user acquisition by 180% YoY through targeted SEO and content strategies",
                  "Built executive-level dashboards tracking 25+ KPIs across marketing, sales, and product",
                  "Launched 3 new market segments, contributing $1.2M in new ARR within the first two quarters",
                ],
                skills: ["Growth Marketing", "Data Analysis", "Market Research", "SQL", "A/B Testing", "Campaign Strategy"],
              };
            default:
              return {
                designation: "Professional",
                summary: "Motivated and adaptable professional with a strong work ethic and a commitment to continuous learning. Eager to contribute to a high-performing team and deliver meaningful results.",
                experienceDescription: "Contributed to cross-functional projects and operational initiatives within a dynamic team environment.",
                highlights: ["Delivered key project milestones on schedule", "Collaborated with cross-functional teams to resolve operational blockers"],
                skills: ["Project Coordination", "Problem Solving", "Adaptability", "Collaboration", "Communication"],
              };
          }
        })();

        const { designation, summary, experienceDescription, highlights, skills } = roleDefaults;

        set({
          resumeData: {
            basicInfo: {
              firstName: data.firstName,
              lastName: data.lastName,
              designation,
              email: data.email,
              phone: data.phone,
              location: data.location,
              website: data.website,
              summary,
            },
            experience: [
              {
                id: "exp-1",
                company: "Your Company Name",
                role: `Senior ${designation}`,
                startDate: "2021-01",
                endDate: "",
                current: true,
                description: experienceDescription,
                highlights,
              }
            ],
            education: [
              {
                id: "edu-1",
                institution: "Your University",
                degree: "Bachelor of Science",
                field: "Your Field of Study",
                startDate: "2015-09",
                endDate: "2019-06",
                current: false,
                score: "",
              }
            ],
            skills,
          }
        });
      },
    }),
    {
      name: "forge-resume-storage",
      version: 2, // Bump version to force migration and purge fantasy placeholder data
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as ForgeState;

        // Migration v0 → v1: scrub "Original base:" AI artifacts
        if (version === 0 && state?.resumeData) {
          if (state.resumeData.basicInfo?.summary) {
            state.resumeData.basicInfo.summary = state.resumeData.basicInfo.summary
              .replace(/Original base:.*$/s, "")
              .trim();
          }
          if (state.resumeData.experience) {
            state.resumeData.experience = state.resumeData.experience.map(exp => ({
              ...exp,
              description: (exp.description || "").replace(/Original base:.*$/s, "").trim(),
              highlights: (exp.highlights || []).map((hl: string) => hl.replace(/Original base:.*$/s, "").trim()),
            }));
          }
        }

        // Migration v1 → v2: purge all known Star Wars / onboarding fantasy placeholder data
        if (version <= 1 && state?.resumeData) {
          const PLACEHOLDER_COMPANIES = ['The Outer Rim Guilds', 'Your Company Name'];
          const PLACEHOLDER_INSTITUTIONS = ['The Academy of Mandalore', 'Your University'];

          // Scrub placeholder experience
          if (state.resumeData.experience) {
            state.resumeData.experience = state.resumeData.experience.filter(
              (exp: Experience) => !PLACEHOLDER_COMPANIES.some(p => exp.company?.toLowerCase() === p.toLowerCase())
            );
          }

          // Scrub placeholder education
          if (state.resumeData.education) {
            state.resumeData.education = state.resumeData.education.filter(
              (edu: Education) => !PLACEHOLDER_INSTITUTIONS.some(p => edu.institution?.toLowerCase() === p.toLowerCase())
            );
          }

          // Scrub known placeholder skills
          const PLACEHOLDER_SKILLS = new Set(['Freelance Consulting', 'Project Execution', 'Client Negotiation', 'Rapid Prototyping', 'Risk Mitigation', 'Contract Management']);
          if (state.resumeData.skills) {
            state.resumeData.skills = (state.resumeData.skills as string[]).filter(
              (s: string) => !PLACEHOLDER_SKILLS.has(s)
            );
          }

          // Scrub placeholder location / website that got mis-filled
          if (state.resumeData.basicInfo?.location === 'Giga Valley, Mando Corp') {
            state.resumeData.basicInfo.location = '';
          }
        }

        return state;
      }
    }
  )
);
