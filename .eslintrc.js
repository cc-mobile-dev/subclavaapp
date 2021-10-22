module.exports = {
  root: true,
  extends: '@react-native-community',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "universe/native",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    "react-hooks"
  ],
  rules: {
    'no-unused-expressions': ["error", { "allowShortCircuit": true, "allowTernary": true }],
    'react-hooks/rules-of-hooks': "error",
    'react-hooks/exhaustive-deps': 0,
    'import/default': 0,
    'no-case-declarations': 0
  }
};
