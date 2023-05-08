/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['lcov'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
};
