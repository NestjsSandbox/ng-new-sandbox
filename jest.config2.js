module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '\\.(css|scss)$': 'jest-css-modules-transform',
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
    '^.+\\.js$': 'babel-jest',
  },
};