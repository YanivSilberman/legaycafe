module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
      "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node",
      "css"
  ],
  "setupFilesAfterEnv": [
    "./src/setupTests.ts"
  ],
  "testEnvironment": "node",
}
