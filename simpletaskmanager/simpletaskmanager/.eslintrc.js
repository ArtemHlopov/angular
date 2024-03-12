module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base/legacy", "airbnb-typescript/base"],
  overrides: [],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
