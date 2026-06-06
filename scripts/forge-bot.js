import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

// Token mapping learned from the Token Architecture
const mapping = {
  // Colors
  'bg-[#0f172a]': 'bg-[var(--color-surface-elevated)]',
  'bg-[#0a0e27]': 'bg-[var(--color-surface-base)]',
  'text-[#00f0ff]': 'text-[var(--color-action-primary)]',
  'border-[#0f172a]': 'border-[var(--color-action-secondary)]',
  'bg-[#00f0ff]': 'bg-[var(--color-action-primary)]',
  'bg-[#e6feff]': 'bg-signet-cyan-50',
  'text-[#ef4444]': 'text-[var(--color-feedback-error)]',

  // Typography & Spacing defaults if used arbitrarily
  'text-[14px]': 'text-sm',
  'text-[16px]': 'text-base',
  'w-[100px]': 'w-24', // approximation
};

export function runCodemod(targetDir) {
  const dirPath = path.resolve(ROOT_DIR, targetDir);

  function processDir(currentPath) {
    const files = fs.readdirSync(currentPath);
    files.forEach(file => {
      const fullPath = path.join(currentPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        processDir(fullPath);
      } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
        let content = fs.readFileSync(fullPath, 'utf-8');
        let changed = false;

        Object.entries(mapping).forEach(([arbitrary, semantic]) => {
          if (content.includes(arbitrary)) {
            // Replace all instances using split/join or regex
            content = content.split(arbitrary).join(semantic);
            changed = true;
          }
        });

        // Use AI fallback placeholder logic:
        // Identify unmapped -[...] values and insert comment blocks for human review.
        const arbitraryRegex = /className="([^"]*-\[[^\]]+\][^"]*)"/g;
        content = content.replace(arbitraryRegex, (match, classList) => {
          // If there are arbitrary values remaining, and we haven't overridden
          if (classList.includes('-[') && !content.includes('// constellation-override')) {
             console.warn(`[ForgeBot] Found unmapped arbitrary value in ${file}: ${classList}`);
             // Note: In actual implementation, we would query the local LLM here.
          }
          return match;
        });

        if (changed) {
          fs.writeFileSync(fullPath, content);
          console.log(`[ForgeBot] Migrated: ${path.relative(ROOT_DIR, fullPath)}`);
        }
      }
    });
  }

  processDir(dirPath);
  console.log(`\n[ForgeBot] Codemod execution completed for ${targetDir}.`);
}

// Allow running directly from CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const target = process.argv[2] || 'src/components/landing';
  runCodemod(target);
}
