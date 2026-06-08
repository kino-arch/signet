// exportWorker.ts
// We use dynamic imports to prevent html2canvas and jsPDF from bloating the main bundle.
// Note: Actual DOM reading must occur on the main thread, but we offload the heavy PDF generation.

export async function generateArtifact(elementId: string): Promise<Blob> {
  const element = document.getElementById(elementId)
  if (!element) throw new Error("Element not found")

  // 1. Dynamically import heavy libraries
  const [html2canvas, { jsPDF }] = await Promise.all([
    import("html2canvas-pro").then((m) => m.default),
    import("jspdf"),
  ])

  // 2. Capture the DOM (Main thread, but dynamically loaded)
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: null, // transparent or var(--color-nordic-bg) depending on theme
  })

  // 3. Convert to PDF
  const imgData = canvas.toDataURL("image/png")
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: "a4",
  })

  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)

  return pdf.output("blob")
}
