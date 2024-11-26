const resolveDeps = (pkg, deps) => {
  return Object.fromEntries(
    deps.map((dep) => [dep, pkg.dependencies[dep] || pkg.devDependencies[dep]])
  );
};

module.exports = {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: (data) => `/samples/${data.sample.fileSlug}/app/package.json`,
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
        ...pkg,
        name: sample.data.name,
        devDependencies: resolveDeps(pkg, sample.data.devDependencies),
        dependencies: resolveDeps(pkg, sample.data.dependencies),
        scripts: sample.data.scripts,
      },
      null,
      2
    );
  },
};
