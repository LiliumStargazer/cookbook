import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginNode from 'eslint-plugin-node';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      import: eslintPluginImport,
      node: eslintPluginNode,
      promise: eslintPluginPromise,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'no-console': 'off',
      'prettier/prettier': 'error',
    },
  },
];
