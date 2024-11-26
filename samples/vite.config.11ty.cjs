module.exports = {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: (data) =>
        `/samples/${data.sample.fileSlug}/app/vite.config.js`,
      pagination: {
        data: "collections.samples_ts",
        alias: "sample",
        size: 1,
      },
    };
  },

  render() {
    return `import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    hmr: (process.env.CODESANDBOX_SSE || process.env.GITPOD_WORKSPACE_ID) ? 443 : undefined,
  },
});
`;
  },
};
