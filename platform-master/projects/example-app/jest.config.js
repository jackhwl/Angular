module.exports = {
  displayName: 'Example App',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/example-app',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  transform: { '^.+\\.(ts|js|mjs|html)$': 'jest-preset-angular' },
  transformIgnorePatterns: ['node_modules/(?!@angular|tslib)'],
  moduleNameMapper: {
    tslib: '<rootDir>../../node_modules/tslib/tslib.es6.js',
  },
  testRunner: 'jest-circus/runner',
};
