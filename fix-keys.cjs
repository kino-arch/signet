const fs = require('fs');
const path = require('path');

const templatesDir = './src/components/editor/templates';
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.tsx'));

files.forEach(filename => {
  const filePath = path.join(templatesDir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Fix highlights mapped with key={idx} inside a job.highlights.map — 
  // scope to job.id so they're globally unique across all jobs
  content = content.replace(
    /\{job\.highlights\.map\(\(item,\s*idx\)\s*=>\s*\(\s*<li\s*\n\s*key=\{idx\}/g,
    (match) => match.replace('key={idx}', 'key={`${job.id}-h-${idx}`}')
  );

  // Broader fallback: any li key={idx} inside a .map((item, idx) within highlights context
  // Using line-by-line approach for safety
  const lines = content.split('\n');
  let insideHighlights = false;
  let highlightsJobVar = '';

  const fixed = lines.map((line, i) => {
    // Detect entering highlights map
    if (line.includes('.highlights.map(')) {
      insideHighlights = true;
      // Extract job variable name (e.g. "job", "exp", "work")
      const m = line.match(/(\w+)\.highlights\.map\(/);
      highlightsJobVar = m ? m[1] : 'job';
    }
    // Detect leaving highlights map (closing the ul tag)
    if (insideHighlights && line.includes('</ul>')) {
      insideHighlights = false;
      highlightsJobVar = '';
    }

    // Fix key={idx} inside highlights map
    if (insideHighlights && line.match(/^\s*key=\{idx\}/)) {
      return line.replace('key={idx}', `key={\`\${${highlightsJobVar}.id}-h-\${idx}\`}`);
    }

    return line;
  });

  content = fixed.join('\n');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', filename);
  } else {
    console.log('No change:', filename);
  }
});
