import type { Config } from "jest";

const config: Config = {
  verbose: true,
  testMatch: ["**/*.test.ts"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};

export default config;
