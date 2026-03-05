import { defineConfig } from 'eslint/config.js'

export default defineConfig([
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        __DEV__: true,
      },
    },
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
    },
    ignores: [
      'dist',
      'build',
      'coverage',
      'android',
      'ios',
      '.expo',
      'expo',
      'node_modules',
      '*.yaml',
    ],
  },
])
