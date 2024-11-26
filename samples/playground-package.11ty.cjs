const resolveDeps = (pkg, deps) => {
  return Object.fromEntries(
    deps.map((dep) => [dep, pkg.dependencies[dep] || pkg.devDependencies[dep]])
  );
};

module.exports = {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: (data) =>
        `/samples/${data.sample.fileSlug}/playground/package.json`,
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
        dependencies: resolveDeps(pkg, sample.data.dependencies),
      },
      null,
      2
    );
  },
};
