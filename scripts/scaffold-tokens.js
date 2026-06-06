import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const TOKENS_DIR = path.join(ROOT_DIR, 'packages', 'design-tokens');

const dirs = [
  path.join(TOKENS_DIR, 'tokens', 'primitives'),
  path.join(TOKENS_DIR, 'tokens', 'semantic'),
  path.join(TOKENS_DIR, 'tokens', 'component'),
  path.join(TOKENS_DIR, 'build')
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Write tokens
const primitives = {
  colors: {
    signet: {
      cyan: {
        50: { value: "#e6feff" },
        400: { value: "#00f0ff" },
        900: { value: "#002024" }
      },
      navy: {
        800: { value: "#0f172a" },
        900: { value: "#0a0e27" }
      },
      red: {
        400: { value: "#ef4444" },
        500: { value: "#ef4444" }
      }
    }
  },
  spacing: {
    space: {
      1: { value: "4px" },
      2: { value: "8px" },
      3: { value: "12px" },
      4: { value: "16px" }
    }
  },
  typography: {
    fontSizes: {
      body: { value: "1rem" },
      sm: { value: "0.875rem" }
    }
  }
};

fs.writeFileSync(path.join(TOKENS_DIR, 'tokens', 'primitives', 'colors.json'), JSON.stringify(primitives.colors, null, 2));
fs.writeFileSync(path.join(TOKENS_DIR, 'tokens', 'primitives', 'spacing.json'), JSON.stringify(primitives.spacing, null, 2));
fs.writeFileSync(path.join(TOKENS_DIR, 'tokens', 'primitives', 'typography.json'), JSON.stringify(primitives.typography, null, 2));

const semantic = {
  action: {
    primary: { value: "{signet.cyan.400}" },
    secondary: { value: "{signet.navy.800}" },
    danger: { value: "{signet.red.500}" }
  },
  surface: {
    base: { value: "{signet.navy.900}" },
    elevated: { value: "{signet.navy.800}" }
  },
  feedback: {
    error: { value: "{signet.red.400}" }
  }
};

fs.writeFileSync(path.join(TOKENS_DIR, 'tokens', 'semantic', 'action.json'), JSON.stringify({ color: { action: semantic.action } }, null, 2));
fs.writeFileSync(path.join(TOKENS_DIR, 'tokens', 'semantic', 'surface.json'), JSON.stringify({ color: { surface: semantic.surface } }, null, 2));
fs.writeFileSync(path.join(TOKENS_DIR, 'tokens', 'semantic', 'feedback.json'), JSON.stringify({ color: { feedback: semantic.feedback } }, null, 2));

const component = {
  button: {
    primary: {
      bg: { value: "{color.action.primary}" },
      text: { value: "{color.surface.base}" }
    }
  },
  input: {
    border: { value: "{signet.navy.800}" },
    focusRing: { value: "{color.action.primary}" }
  }
};

fs.writeFileSync(path.join(TOKENS_DIR, 'tokens', 'component', 'button.json'), JSON.stringify({ component: { button: component.button } }, null, 2));
fs.writeFileSync(path.join(TOKENS_DIR, 'tokens', 'component', 'input.json'), JSON.stringify({ component: { input: component.input } }, null, 2));

// Write style-dictionary.config.js
const sdConfig = `
import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables'
      }]
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/json/',
      files: [{
        destination: 'ios.json',
        format: 'json/nested'
      }]
    },
    tailwind: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [{
        destination: 'tailwind.json',
        format: 'json/nested'
      }]
    }
  }
});

await sd.buildAllPlatforms();
`;

fs.writeFileSync(path.join(TOKENS_DIR, 'build', 'style-dictionary.config.js'), sdConfig);

// Write package.json
const pkgJson = {
  name: "@signet/design-tokens",
  version: "0.1.0",
  private: true,
  type: "module",
  main: "dist/tailwind.json",
  scripts: {
    "build": "node ./build/style-dictionary.config.js"
  },
  dependencies: {
    "style-dictionary": "^4.0.0-prerelease.26"
  }
};
fs.writeFileSync(path.join(TOKENS_DIR, 'package.json'), JSON.stringify(pkgJson, null, 2));

fs.writeFileSync(path.join(TOKENS_DIR, 'README.md'), '# Signet Design Tokens\nThree-Layer Token Model (Primitives, Semantic, Component)');
console.log('Scaffolded packages/design-tokens');
