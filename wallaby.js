// @ts-ignore
// eslint-disable-next-line no-undef
module.exports = function(wallaby) {
  return {
    files: [
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
    filesWithNoCoverageCalculated: ['jest.config.js'],

    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({ module: 'commonjs' }),
    },

    preprocessors: {
      // @ts-ignore
      '**/*.js?(x)': file =>
        require('@babel/core').transform(file.content, {
          // @ts-ignore
          sourceMap: true,
          filename: file.path,
          // @ts-ignore
          presets: [require('babel-preset-jest')],
        }),
    },
  }
}
