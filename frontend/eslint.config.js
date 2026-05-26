// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const importPlugin = require("eslint-plugin-import-x");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    plugins: { prettier: prettierPlugin },
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "class",
          format: ["PascalCase"],
        },
        {
          selector: "function",
          format: ["camelCase"],
        },
        {
          selector: "method",
          format: ["camelCase"],
        },
        {
          selector: "variable",
          format: ["camelCase"],
        },
        {
          selector: "property",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "variable",
          modifiers: ["const"],
          format: ["UPPER_CASE", "camelCase"],
        },
        {
          selector: "objectLiteralProperty",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
        },
      ],
      'import-x/order': [
        'error',
        {
          'groups': ['builtin', 'external', ['internal', 'sibling', 'parent'], 'index', 'type'],
          'alphabetize': { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-inferrable-types": "off",
      "no-console": "error",
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {
      "@angular-eslint/template/alt-text": "error",
      "@angular-eslint/template/elements-content": "error",
      "@angular-eslint/template/label-has-associated-control": "error",
      "@angular-eslint/template/table-scope": "error",
      "@angular-eslint/template/valid-aria": "error",
    },
  },
]);
