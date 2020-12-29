module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  ignorePatterns: ["node_modules/*", "build/*", "!.prettierrc.js"],
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    "@typescript-eslint/no-var-requires": "off",
    "import/extensions": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "class-methods-use-this": "off",
  },
}
