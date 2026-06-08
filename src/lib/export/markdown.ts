import type { ResumeData } from '@/types/resume';

export async function exportMarkdown(data: ResumeData): Promise<Blob> {
  const lines: string[] = [];
  
  lines.push(`# ${data.identity.name || 'Resume'}`);
  lines.push('');
  
  if (data.identity.title) {
    lines.push(`> ${data.identity.title}`);
    lines.push('');
  }
  
  // Contact block
  const contacts: string[] = [];
  if (data.identity.email) contacts.push(`📧 ${data.identity.email}`);
  if (data.identity.phone) contacts.push(`📞 ${data.identity.phone}`);
  if (data.identity.location) contacts.push(`📍 ${data.identity.location}`);
  if (data.identity.url) contacts.push(`🌐 ${data.identity.url}`);
  
  if (contacts.length) {
    lines.push(contacts.join(' · '));
    lines.push('');
  }
  
  // Sections
  for (const section of data.sections) {
    if (!section.visible) continue;
    
    lines.push(`## ${section.label}`);
    lines.push('');
    
    for (const entry of section.entries || []) {
      const header = [entry.title, entry.subtitle, entry.dateRange]
        .filter(Boolean)
        .join(' · ');
      
      if (header) {
        lines.push(`### ${header}`);
        lines.push('');
      }
      
      if (entry.description) {
        lines.push(entry.description);
        lines.push('');
      }
      
      if (entry.keywords?.length) {
        for (const keyword of entry.keywords) {
          lines.push(`- ${keyword}`);
        }
        lines.push('');
      }
    }
  }
  
  const md = lines.join('\n');
  return new Blob([md], { type: 'text/markdown' });
}
