import fs from 'fs';
import path from 'path';

// This script scans for hardcoded utility colors that violate the "Great Forge" taxonomy.
const bannedPatterns = [
    /text-(red|blue|green|yellow|purple|pink|indigo|teal|orange|gray|slate)-[0-9]{2,3}/,
    /bg-(red|blue|green|yellow|purple|pink|indigo|teal|orange|gray|slate)-[0-9]{2,3}/,
    /border-(red|blue|green|yellow|purple|pink|indigo|teal|orange|gray|slate)-[0-9]{2,3}/,
    /bg-\[#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\]/, // Hardcoded hex
    /text-\[#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\]/
];

const srcDir = path.join(process.cwd(), 'src');

function scanDirectory(directory: string) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            scanDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx') || fullPath.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const lines = content.split('\n');
            
            lines.forEach((line, index) => {
                bannedPatterns.forEach(pattern => {
                    const match = line.match(pattern);
                    if (match && !line.includes('// eslint-disable')) {
                        console.error(`\x1b[31m[THEME-VALIDATION-HOOK] Banned hardcoded utility class "${match[0]}" found in ${fullPath}:${index + 1}\x1b[0m`);
                        console.error(`\x1b[33mFix: Replace with a semantic taxonomy variable (e.g., bg-beskar-base, text-forge-molten).\x1b[0m`);
                        process.exit(1);
                    }
                });
            });
        }
    }
}

console.log("Running Theme Validation Hook...");
scanDirectory(srcDir);
console.log("\x1b[32mTheme Validation Passed. Semantic variable enforcement successful.\x1b[0m");
