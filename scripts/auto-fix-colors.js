import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DIR = path.join(__dirname, '../src');

const hexMap = {
  '#737373': 'var(--color-nordic-text-tertiary)',
  '#020617': 'var(--color-nordic-bg)',
  '#1a1a2e': 'var(--color-nordic-bg)',
  '#FF5F57': 'var(--color-nordic-error)',
  '#FEBC2E': 'var(--color-nordic-warning)',
  '#28C840': 'var(--color-nordic-success)',
  '#3B82F6': 'var(--color-nordic-accent)',
  '#818CF8': 'var(--color-nordic-accent-hover)',
  '#60A5FA': 'var(--color-nordic-accent-hover)',
  '#FFFFFF': 'var(--color-nordic-text)',
  '#ffffff': 'var(--color-nordic-text)',
  '#fff': 'var(--color-nordic-text)',
  '#0a0e27': 'var(--color-nordic-bg)',
  '#00d9ff': 'var(--color-nordic-accent)',
  '#f59e0b': 'var(--color-nordic-warning)',
  '#000000': 'var(--color-nordic-bg)',
  '#000': 'var(--color-nordic-bg)',
  '#93C5FD': 'var(--color-nordic-accent-soft)',
  '#2563EB': 'var(--color-nordic-accent-hover)',
  '#E4E4E7': 'var(--color-nordic-border)',
  '#A1A1AA': 'var(--color-nordic-text-secondary)',
  '#52525B': 'var(--color-nordic-text-tertiary)',
  '#F4F4F5': 'var(--color-nordic-border-subtle)',
  '#22C55E': 'var(--color-nordic-success)',
  '#EF4444': 'var(--color-nordic-error)',
  '#0ea5e9': 'var(--color-nordic-accent)',
  '#ec4899': 'var(--color-nordic-error)',
  '#3b82f6': 'var(--color-nordic-accent)',
  '#1a1a1a': 'var(--color-nordic-surface)',
  '#0f172a': 'var(--color-nordic-surface-hover)',
  '#334155': 'var(--color-nordic-text-tertiary)',
  '#cbd5e1': 'var(--color-nordic-text-secondary)',
  '#64748b': 'var(--color-nordic-text-secondary)',
  '#475569': 'var(--color-nordic-text-tertiary)',
  '#e5e5e5': 'var(--color-nordic-border)',
  '#666': 'var(--color-nordic-text-secondary)',
  '#888': 'var(--color-nordic-text-secondary)',
  '#444': 'var(--color-nordic-text-tertiary)',
  '#555': 'var(--color-nordic-text-tertiary)',
  '#fafafa': 'var(--color-nordic-text)',
  '#e2e8f0': 'var(--color-nordic-border)',
  '#1e293b': 'var(--color-nordic-surface-hover)',
  '#00f0ff': 'var(--color-nordic-accent)',
  '#ffb800': 'var(--color-nordic-warning)',
  '#1a0b1f': 'var(--color-nordic-bg)',
  '#2d1b2e': 'var(--color-nordic-surface)',
  '#ff0055': 'var(--color-nordic-error)',
  '#FAFAFA': 'var(--color-nordic-text)',
  '#18181B': 'var(--color-nordic-surface)',
  '#1D4ED8': 'var(--color-nordic-accent-hover)',
  '#EFF6FF': 'var(--color-nordic-accent-soft)',
  '#16A34A': 'var(--color-nordic-success)',
  '#D97706': 'var(--color-nordic-warning)',
  '#DC2626': 'var(--color-nordic-error)',
};

const tailwindMap = {
  'text-blue-600': 'text-nordic-accent-hover',
  'text-blue-400': 'text-nordic-accent',
  'text-orange-500': 'text-nordic-warning',
};

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function (file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

const allFiles = getAllFiles(SRC_DIR);

allFiles.forEach((file) => {
  const relativePath = file.replace(SRC_DIR, 'src').replace(/\\/g, '/');
  if (relativePath.includes('.test.') || relativePath.includes('.stories.')) return;
  if (relativePath.endsWith('index.css')) return;

  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace Hex Codes
  Object.keys(hexMap).forEach(hex => {
    // Escape hex for regex, replace globally where it's not followed by a word character
    const regex = new RegExp(hex + '(?![a-zA-Z0-9])', 'gi');
    content = content.replace(regex, hexMap[hex]);
  });

  // Replace tailwind colors
  Object.keys(tailwindMap).forEach(tw => {
    const regex = new RegExp('\\b' + tw + '\\b', 'g');
    content = content.replace(regex, tailwindMap[tw]);
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Fixed ${relativePath}`);
  }
});
