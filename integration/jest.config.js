const { defaults } = require('jest-config')
console.log('Jest default config:')
console.log(JSON.stringify(defaults, null, '  '))

module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/', '/node_modules/'],
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
  },
  moduleNameMapper: {
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    // '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    // '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
}

// module.exports = {
//   preset: 'jest-puppeteer',
//   testRegex: './*\\.test\\.js$',
//   // setupFilesAfterEnv: ['./setupTests.js'],
// }
