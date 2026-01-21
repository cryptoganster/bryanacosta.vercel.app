// @ts-check
import { defineConfig } from 'eslint/config'

export default defineConfig({
  ignores: ['.next/**', 'node_modules/**', 'public/**', '**/*.config.*'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      browser: true,
      node: true,
      es2022: true,
    },
  },
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': 'warn',
    'no-alert': 'warn',
  },
})
