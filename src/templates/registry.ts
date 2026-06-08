import type { ResumeTemplate, TemplateSchema } from './types';
import { MinimalTemplate } from './renderers/MinimalTemplate';
import { TechnicalTemplate } from './renderers/TechnicalTemplate';
import { CreativeTemplate } from './renderers/CreativeTemplate';
import type { ResumeData } from '@/types/resume';

const minimalSchema: TemplateSchema = {
  sections: [
    { type: 'work', label: 'Experience' },
    { type: 'education', label: 'Education' },
    { type: 'skills', label: 'Skills' },
    { type: 'certifications', label: 'Certifications' }
  ],
  typography: {
    headingFont: 'Helvetica, sans-serif',
    bodyFont: 'Georgia, serif',
    accentColor: '#000000',
  },
  layout: 'single-column'
};

const technicalSchema: TemplateSchema = {
  sections: [
    { type: 'work', label: 'Experience', column: 'main' },
    { type: 'education', label: 'Education', column: 'sidebar' },
    { type: 'skills', label: 'Skills', column: 'sidebar' },
    { type: 'certifications', label: 'Certifications', column: 'sidebar' }
  ],
  typography: {
    headingFont: 'Inter, sans-serif',
    bodyFont: 'Inter, sans-serif',
    accentColor: '#0ea5e9',
  },
  layout: 'two-column'
};

const creativeSchema: TemplateSchema = {
  sections: [
    { type: 'work', label: 'Experience' },
    { type: 'skills', label: 'Skills' },
    { type: 'education', label: 'Education' },
    { type: 'certifications', label: 'Certifications' }
  ],
  typography: {
    headingFont: 'Playfair Display, serif',
    bodyFont: 'Inter, sans-serif',
    accentColor: '#ec4899',
  },
  layout: 'single-column'
};

const emptyData: ResumeData = {
  identity: { name: '', title: '', email: '', phone: '', location: '' },
  sections: [],
};

// Structural abstraction SVG thumbnails as requested by the CTO
const minimalSvg = `
<svg viewBox="0 0 320 400" style="width: 100%; height: auto;">
  <rect x="20" y="20" width="280" height="24" fill="rgba(255,255,255,0.8)" rx="2" />
  <rect x="100" y="52" width="120" height="8" fill="rgba(255,255,255,0.4)" rx="2" />
  <rect x="20" y="80" width="280" height="1" fill="rgba(255,255,255,0.1)" />
  <rect x="20" y="100" width="80" height="12" fill="rgba(255,255,255,0.7)" rx="2" />
  <rect x="20" y="120" width="280" height="6" fill="rgba(255,255,255,0.3)" rx="2" />
  <rect x="20" y="132" width="260" height="6" fill="rgba(255,255,255,0.3)" rx="2" />
  <rect x="20" y="144" width="240" height="6" fill="rgba(255,255,255,0.3)" rx="2" />
</svg>`;

const technicalSvg = `
<svg viewBox="0 0 320 400" style="width: 100%; height: auto;">
  <rect x="20" y="20" width="160" height="20" fill="rgba(255,255,255,0.8)" rx="2" />
  <rect x="20" y="48" width="100" height="8" fill="rgba(255,255,255,0.4)" rx="2" />
  <rect x="220" y="20" width="80" height="400" fill="rgba(255,255,255,0.05)" />
  <rect x="230" y="20" width="60" height="6" fill="rgba(255,255,255,0.4)" rx="2" />
  <rect x="20" y="80" width="180" height="6" fill="rgba(255,255,255,0.3)" rx="2" />
  <rect x="20" y="92" width="160" height="6" fill="rgba(255,255,255,0.3)" rx="2" />
</svg>`;

const creativeSvg = `
<svg viewBox="0 0 320 400" style="width: 100%; height: auto;">
  <rect x="0" y="0" width="320" height="100" fill="rgba(255,255,255,0.1)" />
  <rect x="0" y="0" width="8" height="100" fill="#ec4899" />
  <rect x="20" y="30" width="200" height="32" fill="rgba(255,255,255,0.9)" rx="2" />
  <rect x="20" y="70" width="120" height="10" fill="rgba(255,255,255,0.5)" rx="2" />
  <rect x="80" y="120" width="220" height="8" fill="rgba(255,255,255,0.4)" rx="2" />
  <rect x="20" y="120" width="40" height="12" fill="#ec4899" rx="2" />
</svg>`;

export const TEMPLATE_REGISTRY: ResumeTemplate[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, highly legible single-column layout.',
    tags: ['Traditional', 'Clean'],
    thumbnailSvg: minimalSvg,
    schema: minimalSchema,
    defaultData: emptyData,
    component: MinimalTemplate,
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Dense two-column layout optimized for developers.',
    tags: ['Tech', 'Dense'],
    thumbnailSvg: technicalSvg,
    schema: technicalSchema,
    defaultData: emptyData,
    component: TechnicalTemplate,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern, bold typography with accent colors.',
    tags: ['Design', 'Bold'],
    thumbnailSvg: creativeSvg,
    schema: creativeSchema,
    defaultData: emptyData,
    component: CreativeTemplate,
  }
];

export function getTemplateById(id: string): ResumeTemplate | undefined {
  return TEMPLATE_REGISTRY.find(t => t.id === id);
}

export function getAllTemplates(): ResumeTemplate[] {
  return TEMPLATE_REGISTRY;
}
