// jest.config.js

module.exports = {
  transform: {
    '^.+\\.mjs$': 'babel-jest',
  },
  testMatch: [
    "**/tests/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  testPathIgnorePatterns: ["/node_modules/"],
};
