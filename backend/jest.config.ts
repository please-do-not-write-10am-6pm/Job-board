export default {
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],

  testEnvironment: "node",

  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",

  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
