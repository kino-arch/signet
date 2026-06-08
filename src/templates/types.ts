import React from 'react';
import type { ResumeData } from '@/types/resume';

export interface SectionConfig {
  type: string;
  label: string;
  column?: 'main' | 'sidebar';
  config?: Record<string, unknown>;
}

export interface TemplateSchema {
  sections: SectionConfig[];
  typography: {
    headingFont: string;
    bodyFont: string;
    accentColor: string;
  };
  layout: 'single-column' | 'two-column' | 'sidebar';
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  tags: string[];
  thumbnailSvg: string;
  schema: TemplateSchema;
  defaultData: ResumeData;
  component: React.ComponentType<{ data: ResumeData; schema: TemplateSchema; preview?: boolean }>;
}
