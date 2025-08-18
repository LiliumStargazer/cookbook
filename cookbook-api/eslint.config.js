const js = require('@eslint/js');
const eslintPluginImport = require('eslint-plugin-import');
const eslintPluginPromise = require('eslint-plugin-promise');
const prettier = require('eslint-config-prettier');

module.exports = [
  js, // Usa direttamente la configurazione base
  prettier,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      import: eslintPluginImport,
      promise: eslintPluginPromise,
    },
    rules: {
      'no-console': 'off',
    },
  },
];
