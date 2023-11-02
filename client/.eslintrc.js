module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    'scripts/**',
    'config/**',
  ],
  rules: {
    'react/function-component-definition': ['error', {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'none',
      },
    }],
    '@typescript-eslint/ban-types': ['error', {
      types: {
        '{}': false,
      },
      extendDefaults: true,
    }],
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'import/order': ['error', {
      alphabetize: {
        'order': 'asc',
        'caseInsensitive': true,
      },
      'newlines-between': 'always',
      warnOnUnassignedImports: true,
      groups: [
        ['builtin', 'external'],
        ['parent', 'sibling'],
      ],
      pathGroups:
        ['scss', 'sass', 'css', 'svg'].map(ext => ({
          pattern: `*.${ext}`,
          patternOptions: { matchBase: true },
          group: 'sibling',
          position: 'after',
        })),
    }],
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2, {
      'SwitchCase': 1,
    }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
  },
}
