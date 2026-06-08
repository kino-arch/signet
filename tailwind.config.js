import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import plugin from 'tailwindcss/plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(fs.readFileSync(path.join(__dirname, 'packages', 'design-tokens', 'dist', 'tailwind.json'), 'utf-8'));

const themeTokens = {
  font: {
    body: 'var(--font-body)',
    heading: 'var(--font-heading)',
    display: 'var(--font-display)',
    mono: 'var(--font-mono)',
    serif: 'var(--font-serif)',
  }
};

const ghostClassGuard = plugin(function({ config }) {
  const definedFonts = Object.keys(config('theme.fontFamily') || {});
  console.log(`[Typography Guard] Active font families: ${definedFonts.join(', ')}`);
});

const typographyStyles = plugin(function({ addComponents, theme }) {
  addComponents({
    '.text-style-hero': {
      fontFamily: theme('fontFamily.display'),
      fontSize: theme('fontSize.6xl'),
      fontWeight: '800',
      lineHeight: theme('lineHeight.tight'),
      letterSpacing: theme('letterSpacing.tight'),
    },
    '.text-style-heading-lg': {
      fontFamily: theme('fontFamily.heading'),
      fontSize: theme('fontSize.4xl'),
      fontWeight: '600',
      lineHeight: theme('lineHeight.tight'),
    },
    '.text-style-heading': {
      fontFamily: theme('fontFamily.heading'),
      fontSize: theme('fontSize.2xl'),
      fontWeight: '600',
      lineHeight: theme('lineHeight.snug'),
    },
    '.text-style-body': {
      fontFamily: theme('fontFamily.sans'),
      fontSize: theme('fontSize.base'),
      fontWeight: '300',
      lineHeight: theme('lineHeight.relaxed'),
    },
    '.text-style-caption': {
      fontFamily: theme('fontFamily.mono'),
      fontSize: theme('fontSize.sm'),
      fontWeight: '500',
      lineHeight: theme('lineHeight.normal'),
      color: theme('colors.nordic.text-secondary'),
    },
  });
});

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: [themeTokens.font.body, 'system-ui', 'sans-serif'],
        heading: [themeTokens.font.heading, 'Georgia', 'serif'],
        display: [themeTokens.font.display, 'Impact', 'sans-serif'],
        mono: [themeTokens.font.mono, 'monospace'],
        serif: [themeTokens.font.serif, 'Georgia', 'serif'],
      },
      colors: {
        signet: tokens.signet,
        action: tokens.color.action,
        feedback: tokens.color.feedback,
        surface: tokens.color.surface,
        component: tokens.component,
        nordic: {
          'text-secondary': 'var(--color-nordic-text-secondary)',
        }
      },
      spacing: tokens.space,
      fontSize: tokens.fontSizes,
      animation: {
        "reverse-spin": "spin 1s linear infinite reverse",
      },
    },
  },
  plugins: [ghostClassGuard, typographyStyles],
}
