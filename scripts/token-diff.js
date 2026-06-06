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
let hardcodedCount = 0;
let tokenCount = 0;

console.log('🔍 Running Token Diff Analysis...');

allFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const relativePath = file.replace(SRC_DIR, 'src').replace(/\\/g, '/');
  
  if (relativePath.includes('.test.') || relativePath.includes('.stories.')) return;
  // Ignore base configurations and assets
  if (relativePath === 'src/index.css' || relativePath === 'src/lib/color-tokenizer.ts') return;

  // Regex for hardcoded colors: #FFF, #FFFFFF, rgb(255,255,255), rgba(0,0,0,0.5)
  // And arbitrary tailwind like text-[#...] or bg-[rgb(...)]
  const hardcodedRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})(?!\w)|rgba?\([^)]+\)|bg-\[#[A-Fa-f0-9]+\]|text-\[#[A-Fa-f0-9]+\]/gi;
  const hardcodedMatches = content.match(hardcodedRegex);
  if (hardcodedMatches) {
    hardcodedCount += hardcodedMatches.length;
  }
  
  // Regex for Signet tokens and standard tailwind semantic classes
  // e.g., bg-primary, text-muted-foreground, var(--theme-primary), signet-cyan
  const tokenRegex = /var\(--[^)]+\)|bg-(primary|secondary|accent|destructive|muted|background|foreground|card|border|input|ring|emerald|cyan|amber|rose|violet|slate)[-\s'"]/gi;
  const tokenMatches = content.match(tokenRegex);
  if (tokenMatches) {
    tokenCount += tokenMatches.length;
  }
});

const totalColors = hardcodedCount + tokenCount;
const complianceScore = totalColors === 0 ? 100 : (tokenCount / totalColors) * 100;

console.log(`\n📊 TOKEN COMPLIANCE SCORE: ${complianceScore.toFixed(2)}%`);
console.log(`  - Standard Tokens Used: ${tokenCount}`);
console.log(`  - Hardcoded/Raw Hex Used: ${hardcodedCount}`);

if (complianceScore >= 80) {
  console.log('✅ PASS: Score is >= 80%. Token usage is healthy.');
  process.exit(0);
} else {
  console.error('❌ FAIL: Score is < 80%. Migrate more hardcoded colors to semantic tokens.');
  process.exit(1); // Set 1 to enforce CI gate failure
}
