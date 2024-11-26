const YAML = require("yaml");

module.exports = {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: (data) =>
        `/samples/${data.sample.fileSlug}/jsfiddle/demo.details`,
      pagination: {
        data: "collections.samples_ts",
        alias: "sample",
        size: 1,
      },
    };
  },

  render({ sample }) {
    return YAML.stringify({
      name: sample.data.title,
      authors: ["Justin Poehnelt"],
      tags: ["google maps"],
      load_type: "h",
      description: "Sample code for Google Maps Platform JavaScript API",
    });
  },
};
