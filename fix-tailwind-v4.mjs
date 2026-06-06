import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uiDir = path.join(__dirname, 'src', 'components', 'ui');

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile() && fullPath.endsWith('.tsx') && !fullPath.includes('.stories.')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;

      // Fix has-data-[...] -> has-[data-...]
      content = content.replace(/has-data-\[([^\]]+)\]/g, 'has-[data-$1]');
      // Fix group-has-data-[...] -> group-has-[data-...]
      content = content.replace(/group-has-data-\[([^\]]+)\]/g, 'group-has-[data-$1]');
      // Fix data-open: -> data-[state=open]:
      content = content.replace(/data-open:/g, 'data-[state=open]:');
      // Fix data-closed: -> data-[state=closed]:
      content = content.replace(/data-closed:/g, 'data-[state=closed]:');
      // Fix data-active: -> data-[state=active]:
      content = content.replace(/data-active:/g, 'data-[state=active]:');
      
      // Fix has-data-checked -> has-[data-state=checked]
      content = content.replace(/has-data-checked/g, 'has-[data-state=checked]');

      // Fix button sizes (h-7 -> h-9, etc.) only in button.tsx if needed
      if (entry.name === 'button.tsx') {
         content = content.replace(/"h-7 gap-1 px-2 text-xs\/relaxed/g, '"h-9 gap-2 px-4 py-2 text-sm/relaxed');
         content = content.replace(/"h-5 gap-1 rounded-sm px-2 text-\[0\.625rem\]/g, '"h-8 gap-1 rounded-md px-3 text-xs');
         content = content.replace(/"h-6 gap-1 px-2 text-xs\/relaxed/g, '"h-8 gap-1.5 px-3 text-xs/relaxed');
         content = content.replace(/"h-8 gap-1 px-2\.5 text-xs\/relaxed/g, '"h-10 gap-2 px-8 text-base/relaxed');
         content = content.replace(/"size-7 /g, '"size-9 ');
      }

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${entry.name}`);
      }
    }
  }
}

processDir(uiDir);
