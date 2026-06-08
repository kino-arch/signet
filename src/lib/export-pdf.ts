import html2canvas from "html2canvas-pro"
import jsPDF from "jspdf"

export async function exportResumeToPDF(
  elementId: string,
  filename: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _options: {
    scale?: number
    width?: number
    height?: number
  } = {}
) {
  const element = document.getElementById(elementId)
  if (!element) throw new Error("Resume preview element not found")

  // Explicit scale control: Use scale: 2 for Retina-quality output
  // but cap it to prevent excessively large files
  const scale = Math.min(window.devicePixelRatio, 2)

  const canvas = await html2canvas(element, {
    scale, // Explicitly set, don't rely on default
    useCORS: true,
    logging: false,
    backgroundColor: "var(--color-nordic-text)", // Force white background for print
    // width and height can be explicitly set if needed:
    // width: options.width || element.offsetWidth,
    // height: options.height || element.offsetHeight,
  })

  // Convert to PDF
  const imgData = canvas.toDataURL("image/png")
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [canvas.width / scale, canvas.height / scale], // Adjust for scale
  })

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    canvas.width / scale,
    canvas.height / scale
  )
  pdf.save(filename)

  return pdf
}
