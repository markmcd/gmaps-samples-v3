module.exports = {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: (data) =>
        `/samples/${data.sample.fileSlug}/playground/playground.ts.json`,
      pagination: {
        data: "collections.samples_ts",
        alias: "sample",
        size: 1,
      },
    };
  },

  render({ availableTypings, sample }) {
    const files = {
      "index.ts": {
        label: "TypeScript",
      },
      "style.css": {
        label: "CSS",
      },
      "index.html": {
        label: "HTML",
      },
      ...Object.fromEntries(
        sample.data.devDependencies
          .filter(
            (dep) => dep.startsWith("@types") && availableTypings.includes(dep)
          )
          .map((dep) => [
            `../../../types/${this.slugify(dep.split("/")[1])}/index.d.ts`,
            { label: dep, hidden: true },
          ])
      ),
    };

    if (sample.data.dependencies.length) {
      files["package.json"] = {
        label: "Dependencies",
      };
    }

    return JSON.stringify(
      {
        files,
      },
      null,
      2
    );
  },
};
