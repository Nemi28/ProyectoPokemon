import { createDefaultPreset } from "ts-jest/presets";
import type { Config } from "jest";

const tsJestTransformCfg = createDefaultPreset().transform;

const config: Config = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;
