module.exports = {
  preset: "jest-preset-angular",
  roots: ["<rootDir>/src/"],
  setupTestFrameworkScriptFile: "<rootDir>/src/setup-jest.ts",
  collectCoverage: true,
  coverageDirectory: "reports/jest",
  testURL: "http://localhost/",
  globals: {
    "ts-jest": {
      tsConfigFile: "src/tsconfig.spec.json",
      useBabelrc: true
    },
    __TRANSFORM_HTML__: true
  },
  transform: {
    "^.+\\.(ts|tsx|html)$": "<rootDir>/node_modules/jest-preset-angular/preprocessor.js",
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  testMatch: [
    "**/+(*.)+(spec|test).+(ts|js)?(x)"
  ],
  moduleFileExtensions: [
    "js", "jsx", "ts", "tsx", "html"
  ],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!@ngrx)"
  ]
};
