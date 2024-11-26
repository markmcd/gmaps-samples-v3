const _ = require("lodash");

const data = {
  ..._.pick(
    {
      GOOGLE_MAPS_API_KEY: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg",
      ...process.env,
    },
    ["GOOGLE_MAPS_API_KEY"]
  ),
  libraries: [],
  version: "weekly",
  mode: ["jsfiddle", "docs", "app", "playground"],
  availableTypings: [
    "@types/google.maps",
    "@types/geojson",
    "@types/google.visualization",
  ],
  devDependencies: ["@types/google.maps", "typescript", "vite"],
  dependencies: [],
  scripts: {
    dev: "vite",
    start: "vite",
    build: "vite build --outDir dist --base './'",
    test: "tsc --no-emit",
    preview: "vite preview",
  },
};

module.exports = data;
