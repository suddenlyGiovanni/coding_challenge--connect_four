module.exports = function(wallaby) {
  return {
    files: [
      'package.json',
      'tsconfig.json',
      'jest.config.js',
      'src/**/*.ts?(x)',
      '!src/**/*.test.ts?(x)',
      '!src/**/*.spec.ts?(x)',
    ],

    tests: ['src/**/*.spec.ts?(x)', 'src/**/*.test.ts?(x)'],

    env: {
      type: 'node',
      runner: 'node',
    },

    testFramework: 'jest',



    debug: true,

    reportConsoleErrorAsError: true,

    lowCoverageThreshold: 80,
  }
}
