import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".next.turbopack-corrupt-cache/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "seed.js",
    "upload-pdfs.js",
  ]),
]);

export default eslintConfig;
