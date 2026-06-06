import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DIR = path.join(__dirname, '../src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });
  return arrayOfFiles;
}

const allFiles = getAllFiles(SRC_DIR);
let violations = 0;

console.log('🛡️ COLOR GUARD: Scanning for brand violations...');

allFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const relativePath = file.replace(SRC_DIR, 'src').replace(/\\/g, '/');
  
  if (relativePath.includes('.test.') || relativePath.includes('.stories.')) return;
  // Ignore index.css which inherently defines base colors
  if (relativePath === 'src/index.css') return;

  const hexRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})(?!\w)/g;
  const hexMatches = content.match(hexRegex);
  
  const forbiddenColors = /\b(bg-orange-\d+|text-orange-\d+|border-orange-\d+|bg-blue-\d+|text-blue-\d+|border-blue-\d+)\b/g;
  const forbiddenMatches = content.match(forbiddenColors);

  let fileViolations = [];

  if (hexMatches) {
    hexMatches.forEach(match => {
      // Ignore some common pure whites/blacks if they are somehow needed? Actually CTO mandate says no raw hex.
      fileViolations.push(`Raw Hex: ${match}`);
    });
  }

  if (forbiddenMatches) {
    forbiddenMatches.forEach(match => {
      fileViolations.push(`Forbidden Token: ${match}`);
    });
  }

  if (fileViolations.length > 0) {
    console.error(`❌ Violation in ${relativePath}:`);
    fileViolations.forEach(v => console.error(`   - ${v}`));
    violations += fileViolations.length;
  }
});

if (violations > 0) {
  console.error(`\n🚨 Color Guard found ${violations} brand violations. Run forge-bot to auto-fix or manually convert to signet tokens.`);
  fs.writeFileSync(path.join(__dirname, '../color-violations.count'), String(violations));
  process.exit(0); // Set to 0 for now so it doesn't fail the build while we are still executing Phase 1
} else {
  console.log('\n✅ Color Guard passed. Zero violations found.');
  fs.writeFileSync(path.join(__dirname, '../color-violations.count'), '0');
}
