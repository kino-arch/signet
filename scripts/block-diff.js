import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function run() {
  const args = process.argv.slice(2);
  let originalPath = '';
  let adaptedPath = '';
  let outputPath = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--original') originalPath = args[i + 1];
    if (args[i] === '--adapted') adaptedPath = args[i + 1];
    if (args[i] === '--output') outputPath = args[i + 1];
  }

  if (!originalPath || !adaptedPath || !outputPath) {
    console.error('Usage: node scripts/block-diff.js --original <path> --adapted <path> --output <path>');
    process.exit(1);
  }

  try {
    // We use git diff to generate the diff if possible, or a basic diff tool.
    // Easiest is to copy original to a temp dir, adapted to temp dir, and git diff them.
    // Since we just want a unified diff output:
    const diffCommand = `git diff --no-index --color=never "${originalPath}" "${adaptedPath}"`;
    let diffOutput = '';
    try {
      diffOutput = execSync(diffCommand, { encoding: 'utf-8' });
    } catch (e) {
      // git diff --no-index exits with 1 if there are differences
      diffOutput = e.stdout || '';
    }

    // Strip the diff header to just show the changes
    const diffLines = diffOutput.split('\n');
    const headerEndIndex = diffLines.findIndex(line => line.startsWith('@@'));
    const cleanDiff = headerEndIndex > -1 ? diffLines.slice(headerEndIndex).join('\n') : diffOutput;

    const report = `# Adaptation Diff: ${path.basename(originalPath)} → Signet Hero

## Full Diff
\`\`\`diff
${cleanDiff}
\`\`\`

Adaptation Score: pending
Violations Introduced: pending
`;

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, report);
    console.log(`✅ Diff generated at ${outputPath}`);
  } catch (err) {
    console.error('Failed to generate diff:', err);
    process.exit(1);
  }
}

run();
