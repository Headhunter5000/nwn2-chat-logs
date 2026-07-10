import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist']),
  {
    // Erweitert auf alle gängigen JS/TS Erweiterungen
    files: ['**/*.{ts,tsx,js,jsx,mts,mjs}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          extraHOCs: ['lazy'],
        },
      ],
      'max-len': ['error', { code: 120 }],
      'arrow-parens': ['error', 'as-needed'],
      'comma-dangle': ['error', 'always-multiline'],
      indent: ['error', 2],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'object-curly-spacing': ['error', 'always'],
      'quote-props': ['error', 'as-needed'],
      quotes: [2, 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
    },
  },
]);