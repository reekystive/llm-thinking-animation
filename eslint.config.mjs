import cspellPlugin from '@cspell/eslint-plugin';
import css from '@eslint/css';
import { tailwindSyntax } from '@eslint/css/syntax';
import eslintJsPlugin from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import tsEslint from 'typescript-eslint';

/** @type {string[]} */
const TS_FILES = ['**/{,.}*.{,c,m}{j,t}s{,x}'];

/** @type {string[]} */
const CSS_FILES = ['**/*.css'];

const typescriptConfigs = /** @type {import('eslint').Linter.Config[]} */ (
  tsEslint.config({
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
    },
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.browser, ...globals.es2025 },
    },
    extends: [tsEslint.configs.strictTypeChecked, tsEslint.configs.stylisticTypeChecked],
  })
);

/**
 * @type {import('eslint').Linter.Config[]}
 */
const eslintConfig = [
  // config for all
  { ignores: ['node_modules', 'dist'] },
  { linterOptions: { reportUnusedDisableDirectives: true } },

  // config for javascript/typescript code
  {
    files: TS_FILES,
    ...eslintJsPlugin.configs.recommended,
  },
  ...typescriptConfigs.map((config) => ({
    files: TS_FILES,
    ...config,
  })),
  {
    files: TS_FILES,
    plugins: {
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    settings: {
      react: { version: '18.3.1' },
    },
  },
  {
    files: TS_FILES,
    ...eslintConfigPrettier,
  },
  {
    files: TS_FILES,
    plugins: { prettier: prettierPlugin },
    rules: { 'prettier/prettier': 'error' },
  },
  {
    files: TS_FILES,
    rules: {
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-confusing-void-expression': 'off',
    },
  },

  // config for css
  {
    files: CSS_FILES,
    plugins: { css },
    language: 'css/css',
    languageOptions: {
      customSyntax: tailwindSyntax,
    },
    rules: {
      ...css.configs.recommended.rules,
    },
  },
  {
    files: CSS_FILES,
    rules: {
      'css/no-invalid-at-rules': 'off',
      'css/prefer-logical-properties': 'warn',
      'css/use-layers': 'warn',
    },
  },

  // config for all
  {
    plugins: { '@cspell': cspellPlugin },
    rules: {
      '@cspell/spellchecker': [
        'warn',
        /** @type {import('@cspell/eslint-plugin').Options} */ ({
          autoFix: true,
          generateSuggestions: true,
          numSuggestions: 3,
          configFile: fileURLToPath(new URL('./cspell.config.yaml', import.meta.url)),
        }),
      ],
    },
  },
];

export default eslintConfig;
