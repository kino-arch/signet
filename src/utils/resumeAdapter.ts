import { useDataSlateStore } from '@/store/useDataSlateStore';
import type { ResumeData, ResumeSection } from '@/types/resume';

/**
 * Adapter to translate the flat DataSlateStore into the structured
 * ResumeData format expected by the Template System renderers.
 */
export function useTemplateData(): ResumeData {
  const { basics, work, skills, education, certifications } = useDataSlateStore();

  const sections: ResumeSection[] = [
    {
      id: 'work-1',
      type: 'work',
      label: 'Experience',
      visible: true,
      config: {},
      entries: work.map(w => ({
        title: w.name,
        subtitle: w.position,
        dateRange: `${w.startDate} - ${w.endDate}`,
        description: w.summary,
        url: w.url,
      }))
    },
    {
      id: 'skills-1',
      type: 'skills',
      label: 'Skills',
      visible: true,
      config: {},
      entries: skills.map(s => ({
        title: s.name,
        subtitle: s.level,
        dateRange: '',
        description: '',
        keywords: s.keywords,
      }))
    },
    {
      id: 'education-1',
      type: 'education',
      label: 'Education',
      visible: true,
      config: {},
      entries: education.map(e => ({
        title: e.institution,
        subtitle: `${e.studyType} in ${e.area}`,
        dateRange: `${e.startDate} - ${e.endDate}`,
        description: `Score: ${e.score}`,
      }))
    },
    {
      id: 'certifications-1',
      type: 'certifications',
      label: 'Certifications',
      visible: true,
      config: {},
      entries: certifications.map(c => ({
        title: c.name,
        subtitle: c.issuer,
        dateRange: c.date,
        description: '',
        url: c.url,
      }))
    }
  ];

  return {
    identity: {
      name: basics.name,
      title: basics.label,
      email: basics.email,
      phone: basics.phone,
      location: basics.location.city ? `${basics.location.city}, ${basics.location.countryCode}` : '',
      url: basics.url,
    },
    sections,
    meta: {
      // Stub for actual metadata persistence
    }
  };
}
