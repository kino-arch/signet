import type { ResumeData } from '@/types/resume';

export async function exportJSON(data: ResumeData): Promise<Blob> {
  const json = JSON.stringify(data, null, 2);
  return new Blob([json], { type: 'application/json' });
}
