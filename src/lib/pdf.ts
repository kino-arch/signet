/**
 * PDF Generation via html2canvas + jsPDF.
 *
 * Captures the hidden off-screen resume element and downloads it directly
 * as a PDF — no browser print dialog.
 */

export async function generatePDF(elementId = "resume-document", filename = "resume.pdf") {
  // Small delay to let any pending React state flush
  await new Promise((resolve) => setTimeout(resolve, 150));

  const { toJpeg } = await import("html-to-image");
  const { default: jsPDF } = await import("jspdf");

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`[generatePDF] Element #${elementId} not found.`);
  }

  try {
    // html-to-image uses SVG foreignObject, which natively supports modern CSS like oklch()
    const imgData = await toJpeg(element, {
      quality: 0.95,
      pixelRatio: 2, // 2x for crisp high-DPI output
      backgroundColor: "#ffffff",
      skipFonts: true, // Bypass Firefox strict mode font CORS blocks which cause blank SVGs
      cacheBust: true, // Ensure fresh rendering
    });

    // A4 dimensions in mm
    const pdfWidth = 210;
    const pdfHeight = 297;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  } catch (error) {
    console.error("[generatePDF] html-to-image error:", error);
    throw error;
  }
}
