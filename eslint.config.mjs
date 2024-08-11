import pluginJs from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['node_modules/**', 'dist/**'], // Add your ignore patterns here
  },

  {
    files: ['**/*.ts'], // Specify file extensions to lint
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        ...globals.browser, // Include browser globals
      },
    },
    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      // 'prettier/prettier': 'error', // Add Prettier as an ESLint rule
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    // Prettier configuration
    plugins: {
      prettier: ['prettier'],
    },
  },

  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];