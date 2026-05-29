import fs from 'fs';
import path from 'path';

// This script scans the src directory for raw HTML primitives that should be Shadcn components.
const bannedTags = ['<button', '<input', '<select', '<textarea', '<dialog'];
const srcDir = path.join(process.cwd(), 'src');

function scanDirectory(directory: string) {
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            scanDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const lines = content.split('\n');
            
            lines.forEach((line, index) => {
                bannedTags.forEach(tag => {
                    // Very rudimentary check for raw tags
                    if (line.includes(tag) && !line.includes('// eslint-disable')) {
                        console.error(`\x1b[31m[PRE-RENDER-LINT] Banned raw HTML tag "${tag}" found in ${fullPath}:${index + 1}\x1b[0m`);
                        console.error(`\x1b[33mFix: Replace with the equivalent Shadcn UI component (e.g., <Button>, <Input>).\x1b[0m`);
                        process.exit(1);
                    }
                });
            });
        }
    }
}

console.log("Running Pre-Render Lint...");
scanDirectory(srcDir);
console.log("\x1b[32mPre-Render Lint Passed. No raw HTML primitives detected.\x1b[0m");
