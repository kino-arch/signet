/**
 * color-tokenizer.ts
 *
 * Converts arbitrary user-defined colors into Signet-approved semantic tokens.
 * This ensures that user customization inside the Editor doesn't break the Token Firewall.
 */

function hexToHue(hex: string): number {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  
  if (max === min) {
    h = 0; // achromatic
  } else {
    const d = max - min;
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return h * 360;
}

export function tokenizeColor(hex: string): string {
  if (!hex || !hex.startsWith('#')) return 'var(--theme-primary)';
  
  const normalized = hex.toLowerCase();
  
  // Exact matches for known defaults
  const exactMap: Record<string, string> = {
    'var(--color-nordic-bg)': 'var(--app-bg)',           // Navy 900
    'var(--color-nordic-accent)': 'var(--theme-primary)',    // Cyan 500
    'var(--color-nordic-warning)': 'var(--theme-secondary)',  // Amber 500
    'var(--color-nordic-text)': 'var(--app-fg)',
  };
  
  if (exactMap[normalized]) return exactMap[normalized];
  
  // Hue-based fallback
  const hue = hexToHue(normalized);
  
  // Warm colors -> Amber
  if (hue >= 20 && hue <= 60) return 'var(--theme-secondary)'; // amber
  
  // Cool colors -> Cyan
  if (hue >= 170 && hue <= 220) return 'var(--theme-primary)'; // cyan
  
  // Green -> Emerald/Cyan
  if (hue >= 100 && hue <= 160) return 'var(--theme-primary)'; 
  
  // Red/Pink -> Danger/Coral
  if (hue >= 330 || hue <= 15) return 'var(--theme-danger)';
  
  // Ultimate fallback: primary
  return 'var(--theme-primary)';
}
