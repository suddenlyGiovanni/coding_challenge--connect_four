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

    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({ module: 'commonjs' }),
    },

    preprocessors: {
      '**/*.js?(x)': file =>
        require('@babel/core').transform(file.content, {
          sourceMap: true,
          filename: file.path,
          presets: [require('babel-preset-jest')],
        }),
    },
  }
}
