module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'airbnb-typescript',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-implied-eval': 'off', // This shit is super slow for some reason
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'linebreak-style': 'off',
    'consistent-return': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],

    'import/prefer-default-export': 'off',
    'no-console': ['error', { allow: ['log', 'error', 'warn', 'info'] }],
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
}
