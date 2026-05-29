/**
 * PDF Generation via native browser print.
 *
 * Why window.print()?
 * - Correctly renders ALL modern CSS including oklch(), oklab(), color-mix()
 * - Produces selectable, searchable text (not a raster image)
 * - Output is 10-100x smaller than html2canvas-based raster PDFs
 * - Zero third-party dependencies
 *
 * The print stylesheet in index.css handles hiding the app shell and
 * showing only the resume template at full width.
 */

export async function generatePDF(_elementId?: string, _filename?: string) {
  // Small delay to let any pending React state flush before printing
  await new Promise((resolve) => setTimeout(resolve, 150));
  window.print();
}
