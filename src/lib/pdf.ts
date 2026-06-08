/**
 * PDF Generation via native Web-to-PDF pipeline.
 *
 * Triggers the browser's native print dialogue to generate a highly-optimized
 * Vector PDF. Text remains highlightable and parseable for ATS systems.
 * UI is hidden via @media print CSS rules.
 */

export async function generatePDF(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _elementId = "resume-document",
  filename = "resume.pdf"
) {
  // Temporarily change the document title so the default save filename is correct
  const originalTitle = document.title
  const printTitle = filename.replace(/\.pdf$/i, "")
  document.title = printTitle

  // Small delay to ensure any dynamic rendering is complete before printing
  await new Promise((resolve) => setTimeout(resolve, 150))

  window.print()

  // Restore the original title
  document.title = originalTitle
}
