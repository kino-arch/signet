import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const REPORT_PATH = path.join(ROOT_DIR, 'docs', 'gravity-well-baseline.md');

// Helper to recursively get all files
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const allFiles = getAllFiles(SRC_DIR);

let arbitraryCount = 0;
let primitiveAdoptionCount = 0;
let componentsWithArbitrary = new Set();
let allComponents = new Set();

const arbitraryRegex = /-\[[^\]]+\]/g;
const signetRegex = /signet-/g;

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  
  if (file.endsWith('.tsx')) {
    allComponents.add(file);
  }

  const arbitraryMatches = content.match(arbitraryRegex);
  if (arbitraryMatches) {
    arbitraryCount += arbitraryMatches.length;
    if (file.endsWith('.tsx')) {
      componentsWithArbitrary.add(file);
    }
  }

  const signetMatches = content.match(signetRegex);
  if (signetMatches) {
    primitiveAdoptionCount += signetMatches.length;
  }
});

const adoptionRate = allComponents.size === 0 ? 0 : 
  (((allComponents.size - componentsWithArbitrary.size) / allComponents.size) * 100).toFixed(2);

const reportContent = `# Gravity Well Baseline Report

**Generated on:** ${new Date().toISOString()}

## Core Metrics
- **Arbitrary Value Count**: ${arbitraryCount}
- **Primitive Adoption Rate**: ${adoptionRate}% (${allComponents.size - componentsWithArbitrary.size} / ${allComponents.size} components free of arbitrary values)
- **Figma Drift**: TBD (Placeholder metric, will be populated after Token Diffusion)

## Breakdown
- Total arbitrary \`-[...]\` patterns found: ${arbitraryCount}
- Components requiring migration: ${componentsWithArbitrary.size}

*Note: The arbitrary value count is the key metric we will trend to zero over the next 13 weeks.*
`;

if (!fs.existsSync(path.join(ROOT_DIR, 'docs'))) {
  fs.mkdirSync(path.join(ROOT_DIR, 'docs'));
}

fs.writeFileSync(REPORT_PATH, reportContent);

console.log('Gravity Well Baseline generated at docs/gravity-well-baseline.md');
