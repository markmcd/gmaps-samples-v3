module.exports = {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: (data) => `/samples/${data.sample.fileSlug}/app/tsconfig.json`,
      pagination: {
        data: "collections.samples_ts",
        alias: "sample",
        size: 1,
      },
    };
  },

  render() {
    return JSON.stringify(
      {
        compilerOptions: {
          module: "esnext",
          target: "esnext",
          strict: true,
          noImplicitAny: false,
          lib: ["esnext", "es6", "dom", "dom.iterable"],
          moduleResolution: "Node",
          jsx: "preserve",
        },
      },
      null,
      2
    );
  },
};
