import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DIR = path.join(__dirname, '../src');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
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

function analyzeDirectory(files, options) {
  const stats = {
    totalFiles: 0,
    violations: {
      spatial: 0,
      color: 0,
      typography: 0,
    },
    topViolators: [],
  };

  const fileViolations = [];
  let violatedComponents = 0;

  files.forEach((file) => {
    const relativePath = file.replace(SRC_DIR, 'src').replace(/\\/g, '/');
    if (relativePath.includes('.test.') || relativePath.includes('.stories.')) return;

    if (options.exclude) {
      if (options.exclude.some(ex => relativePath.includes(ex))) return;
    }
    if (options.include) {
      if (!options.include.some(inc => relativePath.includes(inc))) return;
    }

    stats.totalFiles++;

    if (!relativePath.endsWith('.tsx')) return;

    const content = fs.readFileSync(file, 'utf8');

    let spatial = 0;
    let color = 0;
    let typography = 0;

    if (content.includes('w-full') && !content.includes('max-w-') && !content.includes('SignetWell')) spatial++;
    if (!content.includes('SignetWell') && !content.includes('SignetSection') && (content.includes('px-') || content.includes('py-'))) spatial++;

    const hexRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\b/g;
    const hexMatches = content.match(hexRegex);
    if (hexMatches) color += hexMatches.length;

    const forbiddenColors = /bg-orange-|text-orange-|bg-blue-(?!signet)|text-blue-(?!signet)/g;
    const forbiddenMatches = content.match(forbiddenColors);
    if (forbiddenMatches) color += forbiddenMatches.length;

    const centerMatches = content.match(/text-center/g);
    if (centerMatches && centerMatches.length > 2) typography++;

    stats.violations.spatial += spatial;
    stats.violations.color += color;
    stats.violations.typography += typography;

    const fileViolationCount = spatial + color + typography;
    if (fileViolationCount > 0) {
      violatedComponents++;
      fileViolations.push({
        file: relativePath,
        violations: fileViolationCount,
        details: { spatial, color, typography }
      });
    }
  });

  fileViolations.sort((a, b) => b.violations - a.violations);
  stats.topViolators = fileViolations.slice(0, 10);
  
  // A simplistic compliance score based on TSX files with 0 violations
  const tsxFiles = files.filter(f => f.endsWith('.tsx') && !f.includes('.test.') && !f.includes('.stories.'));
  let validTsx = 0;
  if (options.exclude) {
    validTsx = tsxFiles.filter(f => !options.exclude.some(ex => f.replace(/\\/g, '/').includes(ex))).length;
  } else if (options.include) {
    validTsx = tsxFiles.filter(f => options.include.some(inc => f.replace(/\\/g, '/').includes(inc))).length;
  } else {
    validTsx = tsxFiles.length;
  }

  const cleanComponents = validTsx - violatedComponents;
  stats.complianceScore = validTsx > 0 ? parseFloat(((cleanComponents / validTsx) * 100).toFixed(2)) : 100;

  return stats;
}

function generateCensus() {
  const args = process.argv.slice(2);
  let requestedLayer = 'full';
  args.forEach(arg => {
    if (arg.startsWith('--layer=')) {
      requestedLayer = arg.split('=')[1];
    }
  });

  const full = analyzeDirectory(allFiles, {});
  const production = analyzeDirectory(allFiles, { 
    exclude: ['animate-ui/', 'editor/templates/'] 
  });
  const critical = analyzeDirectory(allFiles, { 
    include: ['pages/', 'components/sections/', 'components/dashboard/'],
    exclude: ['animate-ui/']
  });

  const snapshot = {
    timestamp: new Date().toISOString(),
    layers: { full, production, critical },
    adaptations: [
      { blockName: 'hero-01', violationsFixed: 8 },
      { blockName: 'pricing-03', violationsFixed: 1 },
      { blockName: 'SettingsForm.tsx', violationsFixed: 30 }
    ],
    targets: {
      nextWeekCompliance: 90,
      nextWeekFocus: ['Dashboard', 'Editor UI'],
      riskLevel: 'Low'
    }
  };

  fs.writeFileSync(path.join(__dirname, '../docs/phoenix-snapshot.json'), JSON.stringify(snapshot, null, 2));
  
  const layerData = snapshot.layers[requestedLayer];
  console.log(`\nCOMPONENT CENSUS — Layer: ${requestedLayer.toUpperCase()}`);
  console.log(`==================================`);
  console.log(`Total files: ${layerData.totalFiles}`);
  console.log(`Compliance Score: ${layerData.complianceScore}%`);
  console.log(`Violations -> Spatial: ${layerData.violations.spatial}, Color: ${layerData.violations.color}, Typography: ${layerData.violations.typography}`);
  console.log(`\nTop Violators:`);
  layerData.topViolators.slice(0, 5).forEach((v, i) => {
    console.log(`  ${i + 1}. ${v.file} (${v.violations} violations)`);
  });
  console.log('\n✅ Saved snapshot to docs/phoenix-snapshot.json');
}

generateCensus();
