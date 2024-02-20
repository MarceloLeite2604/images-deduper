// @ts-check

const tseslint = require('typescript-eslint');

module.exports =
  tseslint.config(
    ...tseslint.configs.recommendedTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          sourceType: "module",
          project: './tsconfig.json'
        }
      }
    }
  );