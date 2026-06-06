import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, 'packages', 'design-tokens', 'dist', 'tailwind.json'), 'utf-8'));

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        signet: tokens.signet,
        action: tokens.color.action,
        feedback: tokens.color.feedback,
        surface: tokens.color.surface,
        component: tokens.component,
      },
      spacing: tokens.space,
      fontSize: tokens.fontSizes,
      animation: {
        "reverse-spin": "spin 1s linear infinite reverse",
      },
    },
  },
  plugins: [],
}
