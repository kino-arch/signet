import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uiDir = path.join(__dirname, 'src', 'components', 'ui');

const toPascalCase = (str) =>
  str.replace(/(^\w|-\w)/g, clearAndUpper);

function clearAndUpper(text) {
  return text.replace(/-/, "").toUpperCase();
}

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isFile() && fullPath.endsWith('.tsx') && !fullPath.includes('.stories.')) {
      const storyName = entry.name.replace('.tsx', '.stories.tsx');
      const storyPath = path.join(dir, storyName);
      
      if (!fs.existsSync(storyPath)) {
        const compName = toPascalCase(entry.name.replace('.tsx', ''));
        const content = `import type { Meta, StoryObj } from "@storybook/react"
import { ${compName} } from "./${entry.name.replace('.tsx', '')}"

const meta = {
  title: "UI / ${compName}",
  component: ${compName},
  parameters: {
    layout: "centered",
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <${compName} />
}
`;
        fs.writeFileSync(storyPath, content, 'utf8');
        console.log(`Generated story for ${entry.name}`);
      }
    }
  }
}

processDir(uiDir);
