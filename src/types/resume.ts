export interface ResumeIdentity {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  url?: string;
  /** Nordic fields */
  website?: string;
  city?: string;
  summary?: string;
}

export interface ResumeData {
  identity: ResumeIdentity;
  sections: ResumeSection[];
  meta?: {
    templateId?: string;
    templateTypography?: {
      headingFont: string;
      bodyFont: string;
      accentColor: string;
    };
  };
}

export interface ResumeSection {
  id: string;
  type: string;
  label: string;
  visible: boolean;
  entries: ResumeEntry[];
  config: Record<string, unknown>;
}

export interface ResumeEntry {
  title: string;
  dateRange: string;
  description: string;
  subtitle?: string;
  keywords?: string[];
  url?: string;
}

/** Default blank resume used as initial state in the Nordic editor. */
export const defaultResume: ResumeData = {
  identity: {
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    city: "",
    summary: "",
  },
  sections: [],
};
