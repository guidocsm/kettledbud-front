import { defineConfig } from 'eslint/config'
import expoConfig from 'eslint-config-expo/flat.js'
import reactPlugin from 'eslint-plugin-react'
import rn from 'eslint-plugin-react-native'

const rnGlobals = rn.environments?.['react-native/react-native']?.globals ?? {}

export default defineConfig([
  ...expoConfig,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...rnGlobals,
        __DEV__: true,
      },
    },
    plugins: {
      'react-native': rn,
      'react': reactPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: { extensions: ['.js', '.jsx'] },
        alias: { map: [['@', './']], extensions: ['.js', '.jsx', '.json'] },
      },
    },
    rules: {
      'no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        args: 'after-used',
        vars: 'all',
        caughtErrors: 'all',
      }],
      'no-redeclare': 'error',
      'react/react-in-jsx-scope': 'off',
      'no-restricted-globals': ['error', 'event', 'fdescribe'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'jsx-quotes': ['error', 'prefer-double'],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-undef': 'error',
      'react/prop-types': 'off',
      'no-dupe-keys': 'error',
      'import/no-unresolved': 'off', // Se maneja con el resolver de alias
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [
            { pattern: '@/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      'import/newline-after-import': ['error', { count: 1 }],
      'react-native/no-inline-styles': 'off',
      'react-native/no-unused-styles': 'error',
      'react-native/split-platform-components': 'error',
      'react-native/no-raw-text': 'off',
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
