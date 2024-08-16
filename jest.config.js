
module.exports = {

  testEnvironment: "jsdom",

   transform: {

     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',

   },
       moduleFileExtensions: ["js", "jsx"],
       moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|svg)$': 'jest-transform-stub',
        '\\.(css|less|scss|sass)$': 'jest-transform-stub',
      },

  //  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],


 };