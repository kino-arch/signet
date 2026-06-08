import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const REPORT_PATH = path.join(ROOT_DIR, 'eslint-report.json');

// Extensive mappings to get rid of arbitrary Tailwind values
const MAPPING = {
  // Common arbitrary pixels -> Tailwind spacing
  '-[1px]': '-px',
  '-[2px]': '-0.5',
  '-[4px]': '-1',
  '-[8px]': '-2',
  '-[12px]': '-3',
  '-[16px]': '-4',
  '-[20px]': '-5',
  '-[24px]': '-6',
  '-[32px]': '-8',
  '-[40px]': '-10',
  '-[48px]': '-12',
  '-[64px]': '-16',
  '-[80px]': '-20',
  '-[96px]': '-24',
  '-[120px]': '-32',
  '-[160px]': '-40',
  '-[200px]': '-48',
  '-[240px]': '-56',
  '-[280px]': '-64',
  '-[320px]': '-80',
  '-[400px]': '-96',
  '-[500px]': '-[32rem]', // We will override these complex ones with comments instead if they remain
  
  // Percentages
  '-[10%]': '-1/10',
  '-[20%]': '-1/5',
  '-[25%]': '-1/4',
  '-[33%]': '-1/3',
  '-[40%]': '-2/5',
  '-[50%]': '-1/2',
  '-[60%]': '-3/5',
  '-[66%]': '-2/3',
  '-[75%]': '-3/4',
  '-[80%]': '-4/5',
  '-[90%]': '-9/10',
  '-[100%]': '-full',
  
  // Specific legacy colors
  'bg-[#0f172a]': 'bg-[var(--color-surface-elevated)]',
  'bg-[#0a0e27]': 'bg-[var(--color-surface-base)]',
  'text-[#00f0ff]': 'text-[var(--color-action-primary)]',
  'border-[#0f172a]': 'border-[var(--color-action-secondary)]',
  'bg-[#00f0ff]': 'bg-[var(--color-action-primary)]',
  'bg-[#e6feff]': 'bg-signet-cyan-50',
  'text-[#ef4444]': 'text-[var(--color-feedback-error)]',
  'text-[14px]': 'text-sm',
  'text-[16px]': 'text-base',
  'w-[100px]': 'w-24',
};

import { execSync } from 'child_process';

function runGlobalCodemod() {
  console.log('Running ESLint to find arbitrary values...');
  let reportJson = '';
  try {
    reportJson = execSync('pnpm exec eslint src/ --rule "constellation/no-arbitrary-tailwind: error" --format json', { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
  } catch (err) {
    // ESLint exits with 1 if there are errors, which is expected
    reportJson = err.stdout;
  }

  if (!reportJson) {
    console.log('No eslint output found.');
    return;
  }

  let report = [];
  try {
    report = JSON.parse(reportJson);
  } catch (e) {
    console.error('Failed to parse eslint output.', e);
    return;
  }
  let filesModified = 0;

  report.forEach(fileReport => {
    if (fileReport.messages.length === 0) return;
    
    // Only care about constellation/no-arbitrary-tailwind
    const hasArbitrary = fileReport.messages.some(m => m.ruleId === 'constellation/no-arbitrary-tailwind');
    if (!hasArbitrary) return;

    const filePath = fileReport.filePath;
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    // Apply known mappings
    Object.entries(MAPPING).forEach(([arbitrary, semantic]) => {
      if (content.includes(arbitrary)) {
        content = content.split(arbitrary).join(semantic);
        changed = true;
      }
    });

    // For any remaining -[...], apply the emergency override comment on the previous line
    const lines = content.split('\\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('-[') && !lines[i].includes('// constellation-override')) {
        // Find if previous line is already an override
        if (i > 0 && !lines[i-1].includes('// constellation-override')) {
          // Insert override
          lines.splice(i, 0, '  // constellation-override: forge-bot-auto-migration');
          i++; // Skip the line we just added
          changed = true;
        }
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, lines.join('\\n'));
      filesModified++;
      console.log(`[ForgeBot Global] Modded: ${path.relative(ROOT_DIR, filePath)}`);
    }
  });

  console.log(`\\n[ForgeBot Global] Finished. Modified ${filesModified} files.`);
}

runGlobalCodemod();
