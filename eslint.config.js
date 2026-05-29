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

export default defineConfig([globalIgnores(['dist']), {
  files: ['**/*.{ts,tsx}'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    ...tailwindcss.configs['flat/recommended'],
  ],
  languageOptions: {
    globals: globals.browser,
  },
  settings: {
    tailwindcss: {
      // tailwind-api-utils auto-detects Tailwind v4 and reads the config path
      // as a CSS file. Point it at src/index.css (the actual v4 entry point
      // with @theme inline) so it can resolve custom design tokens.
      config: resolve(__dirname, 'src/index.css'),
      callees: ["classnames", "clsx", "ctl", "cva", "tv"],
      whitelist: [
        // Font utility defined via @theme inline (--font-heading)
        "font-heading",
        // Allow arbitrary value / selector classes like [&_svg]:size-4
        "^\\[.*\\]",
        // Allow group/peer variant utilities
        "^(group|peer)(-.*)?$",
        // tw-animate-css utility classes (includes custom animate-reverse-spin)
        "^animate-",
      ],
    },
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
}, ...storybook.configs["flat/recommended"]])
