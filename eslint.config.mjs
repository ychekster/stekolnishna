/**
 * ESLint flat config: Next.js core-web-vitals + TypeScript rules.
 * `eslint-config-prettier` goes last so formatting is owned by Prettier only.
 */
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      // Omitting props with a rest spread (`const { a, ...rest } = props`) is intentional.
      "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }],
    },
  },
  prettier,
  globalIgnores([
    ".next/**",
    ".open-next/**",
    ".wrangler/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "docs/design/**",
    ".playwright-mcp/**",
  ]),
]);

export default eslintConfig;
