const rules = {
  'no-continue': 'off',
  'no-loop-func': 'off',
  'class-methods-use-this': ['off', { enforceForClassFields: true }],
  'max-params': 'off',
  'consistent-return': 'off',
  'no-underscore-dangle': 'off',
  'import/prefer-default-export': 'off',
  // 'import/no-default-export': 'error',
  'import/first': 'off',
  'max-classes-per-file': ['error', 20],
  'no-console': 'off',
  'no-restricted-syntax': 'off',
  'import/extensions': ['error', { ts: 'never' }],
  // 'linebreak-style': 0,
  'linebreak-style': 'off',
  'import/no-unresolved': 'error',
};
const tsOverride = {
  files: ['*.ts', '*.*.ts'],
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    ...rules,
    'no-redeclare': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import/no-self-import': 'off',
    'import/no-unresolved': 'off', // typescript can check by itself
    'import/extensions': 'off',
    'no-dupe-class-members': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.spec.js',
          '**/*.test.ts',
          '**/*.spec.ts',
          '**/*.config.ts',
        ],
      },
    ],

    // '@typescript-eslint/no-restricted-imports': ['error', {
    //   paths: [{
    //     name: './**/**',
    //     message: 'Please use import-bar instead.',
    //     allowTypeImports: true,
    //   }, {
    //     name: 'import-baz',
    //     message: 'Please use import-quux instead.',
    //     allowTypeImports: true,
    //   }],
    // }],
    // 'no-restricted-imports': [
    //   'error',
    //   {
    //     paths: [
    //       {
    //         name: 'packages/core',
    //         message: 'Importing from core module is not allowed.',
    //       },
    //     ],
    //   },
    // ],
  },
};

module.exports = {
  root: true,
  ignorePatterns: ['packages/client/**', 'generated', '*.json', '*.lock', '*.md'],
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'import'],
  rules,
  overrides: [
    tsOverride,
    {
      files: ['stacks/*', 'stacks/helpers/**'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-new': 'off',
      },
    },
    {
      files: ['**/*.test.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
