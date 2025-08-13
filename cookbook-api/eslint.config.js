// eslint.config.js
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {
      import: require("eslint-plugin-import"),
      node: require("eslint-plugin-node"),
      promise: require("eslint-plugin-promise"),
    },
    extends: [
      require("eslint-config-standard"),
      require("eslint-config-prettier"),
    ],
    rules: {
      "no-console": "off",
    },
  },
];
