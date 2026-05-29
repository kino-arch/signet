import { create } from "zustand";
import { persist } from "zustand/middleware";
import rawData from "@/data/resumeData.json";

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
}

const defaultResumeData: ResumeData = {
  basicInfo: {
    firstName: rawData.profile.name.split(" ")[0] || "",
    lastName: rawData.profile.name.split(" ")[1] || "",
    designation: rawData.profile.title,
    email: rawData.profile.email,
    phone: rawData.profile.phone,
    location: rawData.profile.location,
    website: "",
    summary: rawData.profile.summary,
    avatarUrl: "",
  },
  experience: rawData.workExperience.map((exp, idx) => {
    const dates = exp.period.split(" - ");
    return {
      id: `exp-${idx + 1}`,
      company: exp.company,
      role: exp.role,
      startDate: dates[0] || "",
      endDate: dates[1] === "Present" ? "" : (dates[1] || ""),
      current: dates[1] === "Present",
      description: "",
      highlights: exp.highlights
    };
  }),
  education: rawData.education.map((edu, idx) => {
    const dates = edu.period.split(" - ");
    return {
      id: `edu-${idx + 1}`,
      institution: edu.institution,
      degree: edu.degree,
      field: "",
      startDate: dates[0] || "",
      endDate: dates[1] || "",
      current: false,
      score: "",
    };
  }),
  skills: rawData.technicalSkills
};

export const useForgeStore = create<ForgeState>()(
  persist(
    (set) => ({
      activeTemplate: 'operative',
      setActiveTemplate: (template) => set({ activeTemplate: template }),
      resumeData: defaultResumeData,
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
                summary: "Builder of digital and physical infrastructure. Passionate about architecting resilient systems, crafting intuitive interfaces, and turning ideas into production-ready products. Driven by craftsmanship and technical excellence.",
                experienceDescription: "Designed and engineered full-stack systems and visual interfaces for guild operations across the Outer Rim.",
                highlights: [
                  "Architected a distributed ledger system for tracking Beskar transactions across 12 sectors",
                  "Designed and shipped a helm-mounted HUD system used by 200+ Mandalorian operators",
                  "Reduced infrastructure deployment time by 60% through automated forge pipelines",
                ],
                skills: ["Software Engineering", "UI/UX Design", "System Architecture", "Cloud Infrastructure", "Prototyping & Iteration"],
              };
            case "outpost":
              return {
                designation: "Customer Success Manager",
                summary: "Frontline specialist in client relations, communication, and service delivery. Expert in managing high-stakes accounts, de-escalating tension in the field, and ensuring every client contract is honored with Beskar-grade integrity.",
                experienceDescription: "Managed guild-client relations and frontline communications for high-value asset recovery operations.",
                highlights: [
                  "Maintained a 98% client satisfaction rating across 300+ active guild contracts",
                  "Resolved critical service escalations within 2 hours average response time",
                  "Onboarded 50+ new guild clients, reducing time-to-first-mission by 40%",
                ],
                skills: ["Client Relations", "Customer Success", "Conflict Resolution", "Service Delivery", "Account Management"],
              };
            case "guild":
              return {
                designation: "Operations & Leadership Director",
                summary: "Strategic leader orchestrating cross-functional teams and large-scale operations. Expert at resource allocation, mission planning, and driving alignment across complex organizations. Commands from the war table with data and decisive action.",
                experienceDescription: "Led multi-covert operations and managed resource allocation for guild campaigns spanning the Outer Rim.",
                highlights: [
                  "Directed a team of 40+ operators across 3 concurrent high-priority campaigns",
                  "Managed annual resource budget of 50,000 Beskar tokens, delivering 15% under forecast",
                  "Implemented agile war-table rituals, improving mission delivery speed by 30%",
                ],
                skills: ["Strategic Leadership", "Operations Management", "Resource Planning", "Stakeholder Alignment", "Team Orchestration"],
              };
            case "navigators":
              return {
                designation: "Data & Growth Strategist",
                summary: "Intelligence analyst and growth specialist charting pathways through complex market terrains. Combines deep data analysis with growth execution to identify opportunities, decode competitor movements, and deliver measurable impact.",
                experienceDescription: "Analyzed hyperspace route intelligence and led growth campaigns targeting emerging Outer Rim markets.",
                highlights: [
                  "Grew guild's new sector acquisition by 150% through targeted intelligence campaigns",
                  "Built market analysis dashboards tracking 20+ KPIs across 5 key trade routes",
                  "Advised guild leadership on market timing, leading to 3 successful new territory launches",
                ],
                skills: ["Data Analysis", "Growth Marketing", "Market Research", "Financial Modeling", "Campaign Strategy"],
              };
            default:
              return {
                designation: "Guild Professional",
                summary: "Highly motivated professional seeking to contribute skills to a forward-thinking guild and expand capabilities through challenging projects.",
                experienceDescription: "Completed general contracts and training missions under guild supervision.",
                highlights: ["Accomplished mission targets under tight deadlines", "Collaborated with team members to resolve operational blockers"],
                skills: ["Guild Operations", "Problem Solving", "Adaptability", "Collaboration"],
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
                company: "The Outer Rim Guilds",
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
                institution: "The Academy of Mandalore",
                degree: "Sworn Adept",
                field: "The Way of the Creed",
                startDate: "2015-09",
                endDate: "2019-06",
                current: false,
                score: "A+",
              }
            ],
            skills,
          }
        });
      },
    }),
    {
      name: "forge-resume-storage",
    }
  )
);
