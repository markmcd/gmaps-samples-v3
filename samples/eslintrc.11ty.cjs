module.exports = {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: (data) =>
        `/samples/${data.sample.fileSlug}/app/.eslintrc.json`,
      pagination: {
        data: "collections.samples_ts",
        alias: "sample",
        size: 1,
      },
    };
  },
  render({ pkg, sample }) {
    return JSON.stringify(
      {
        extends: ["plugin:@typescript-eslint/recommended"],
        parser: "@typescript-eslint/parser",
        rules: {
          "@typescript-eslint/ban-ts-comment": 0,
          "@typescript-eslint/no-this-alias": 1,
          "@typescript-eslint/no-empty-function": 1,
          "@typescript-eslint/explicit-module-boundary-types": 1,
          "@typescript-eslint/no-unused-vars": 1,
        },
      },
      null,
      2
    );
  },
};
