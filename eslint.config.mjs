import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores:["node_modules", "dist"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: "script",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "node/file-extension-in-import": "off",
      "class-methods-use-this": "off",
      "import/no-named-as-default-member": "off",
      "import/default": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",

      "@typescript-eslint/naming-convention": ["warn", {
        selector: "interface",
        format: ["PascalCase"],
        prefix: [],
      }, {
        selector: "typeAlias",
        format: ["PascalCase"],
        prefix: [],
      }],

      "object-shorthand": ["warn", "properties"],
    },
});
