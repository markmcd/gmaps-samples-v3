const fs = require("fs");

function permalink(data) {
  return `/types/${this.slugify(data.name.split("/")[1])}/index.d.ts`;
}

module.exports = {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink,
      pagination: {
        data: "availableTypings",
        alias: "name",
        size: 1,
      },
    };
  },

  render({ name }) {
    return fs.readFileSync(`node_modules/${name}/index.d.ts`, "utf8");
  },
};
