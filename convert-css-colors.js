import fs from "fs";
import { chromium } from "playwright";

async function run() {
  const cssPath = "src/index.css";
  let cssContent = fs.readFileSync(cssPath, "utf8");

  // Find all oklch patterns
  const oklchMatches = cssContent.match(/oklch\([^\)]+\)/gi) || [];
  const uniqueMatches = Array.from(new Set(oklchMatches));

  if (uniqueMatches.length === 0) {
    console.log("No oklch colors found in css.");
    return;
  }

  console.log(`Found ${uniqueMatches.length} unique oklch colors to convert...`);

  // Start Playwright
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Evaluate conversion for each color
  const colorMap = {};
  for (const oklch of uniqueMatches) {
    const rgb = await page.evaluate((color) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (!ctx) return color;
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      if (r === 0 && g === 0 && b === 0 && a === 0) return color; // failed
      if (a === 255) {
        return `rgb(${r}, ${g}, ${b})`;
      }
      return `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(3)})`;
    }, oklch);
    colorMap[oklch] = rgb;
    console.log(`Converted: ${oklch} -> ${rgb}`);
  }

  await browser.close();

  // Replace in css
  let replacedCount = 0;
  for (const [oklch, rgb] of Object.entries(colorMap)) {
    // Escape special characters in regex
    const escaped = oklch.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escaped, "g");
    cssContent = cssContent.replace(regex, rgb);
    replacedCount++;
  }

  fs.writeFileSync(cssPath, cssContent, "utf8");
  console.log(`Successfully converted ${replacedCount} oklch colors in ${cssPath}!`);
}

run().catch((err) => {
  console.error("Fatal error during CSS color conversion:", err);
  process.exit(1);
});
