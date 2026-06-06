// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import tailwindcss from 'eslint-plugin-tailwindcss'
import { defineConfig, globalIgnores } from 'eslint/config'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const constellationPlugin = {
  rules: {
    'no-arbitrary-tailwind': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow arbitrary Tailwind values',
        },
      },
      create(context) {
        return {
          Literal(node) {
            if (typeof node.value === 'string' && node.value.includes('-[')) {
              const line = node.loc.start.line;
              const sourceCode = context.sourceCode || context.getSourceCode();
              const comments = sourceCode.getAllComments();
              const hasOverride = comments.some(comment => 
                comment.loc.end.line === line - 1 && 
                comment.value.includes('constellation-override:')
              );
              if (!hasOverride) {
                context.report({
                  node,
                  message: "Arbitrary Tailwind values (e.g. -[...]) are prohibited. Emergency bypass: // constellation-override: <reason>",
                });
              }
            }
          },
          TemplateElement(node) {
            if (node.value.raw.includes('-[')) {
              const line = node.loc.start.line;
              const sourceCode = context.sourceCode || context.getSourceCode();
              const comments = sourceCode.getAllComments();
              const hasOverride = comments.some(comment => 
                comment.loc.end.line === line - 1 && 
                comment.value.includes('constellation-override:')
              );
              if (!hasOverride) {
                context.report({
                  node,
                  message: "Arbitrary Tailwind values (e.g. -[...]) are prohibited. Emergency bypass: // constellation-override: <reason>",
                });
              }
            }
          }
        };
      }
    }
  }
};

export default defineConfig([globalIgnores(['dist']), {
  files: ['**/*.{ts,tsx}'],
  ignores: ['src/components/carousel.tsx'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    ...tailwindcss.configs['flat/recommended'],
  ],
  plugins: {
    'constellation': constellationPlugin,
  },
  languageOptions: {
    globals: globals.browser,
  },
  settings: {
    tailwindcss: {
      config: resolve(__dirname, 'src/index.css'),
      callees: ["classnames", "clsx", "ctl", "cva", "tv"],
      whitelist: [
        "font-heading",
        "^(group|peer)(-.*)?$",
        "^animate-",
      ],
    },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "tailwindcss/no-custom-classname": "error",
    "constellation/no-arbitrary-tailwind": "error",
  },
}, ...storybook.configs["flat/recommended"]])
