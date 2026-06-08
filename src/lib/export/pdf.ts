import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';
import { createRoot } from 'react-dom/client';
import { StrictMode, createElement } from 'react';
import { getTemplateById, getAllTemplates } from '@/templates/registry';
import type { ResumeData } from '@/types/resume';

export async function exportPDF(
  data: ResumeData,
  templateId: string | null,
  onProgress: (p: number) => void
): Promise<Blob> {
  onProgress(10);

  // 1. Create visible-but-offscreen container
  const container = document.createElement('div');
  container.style.cssText = `
    position: absolute;
    left: -9999px;
    top: 0;
    width: 8.5in;
    z-index: -1;
  `;
  document.body.appendChild(container);

  // 2. Render template
  const template = templateId ? getTemplateById(templateId) : getAllTemplates()[0];
  if (!template) {
    throw new Error('Template not found for PDF export.');
  }

  const root = createRoot(container);
  
  // Wrap in strict mode to match app behavior
  root.render(
    createElement(StrictMode, null,
      createElement('div', { style: { width: '8.5in', background: 'var(--color-nordic-text)' } },
        createElement(template.component, { data, schema: template.schema })
      )
    )
  );

  // 3. Wait for fonts + layout
  await document.fonts.ready;
  await new Promise(r => setTimeout(r, 300)); // React hydration buffer
  onProgress(35);

  // 4. Capture
  const canvas = await html2canvas(container, {
    scale: 2,           // Retina
    useCORS: true,
    allowTaint: true,
    backgroundColor: 'var(--color-nordic-text)',
    logging: false,
    onclone: (clonedDoc) => {
      // Ensure glassmorphism doesn't leak into capture
      const glassElements = clonedDoc.querySelectorAll('.living-glass-surface');
      glassElements.forEach(el => {
        (el as HTMLElement).style.backdropFilter = 'none';
        (el as HTMLElement).style.background = 'var(--color-nordic-text)';
      });
    }
  });
  onProgress(65);

  // 5. Build PDF
  const pdf = new jsPDF('p', 'in', 'letter');
  const imgData = canvas.toDataURL('image/png', 1.0);
  const pageWidth = 8.5;
  const pageHeight = 11;
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Multi-page if needed
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  onProgress(90);

  // 6. Cleanup
  root.unmount();
  document.body.removeChild(container);
  onProgress(100);

  return pdf.output('blob');
}
