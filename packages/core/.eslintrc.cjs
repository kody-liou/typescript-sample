module.exports = {
  extends: ['../../.eslintrc.cjs'],
  rules: {
    '@typescript-eslint/no-restricted-imports': ['error', {
      paths: ['src/'],
      patterns: [
        {
          group: [
            './*',
            '../*',
            '../../*',
            '../../../*',
            '../../../../*',
            '../../../../../*',
            '../../../../../../*',
            '../../../../../../../*',
          ],
          message: 'To prevent an endless update loop, avoid importing other core modules within a core module.',
        },
      ],
    }],
  },
};
