module.exports = {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: (data) => `/samples/${data.sample.fileSlug}/app/env.d.ts`,
      pagination: {
        data: "collections.samples_ts",
        alias: "sample",
        size: 1,
      },
    };
  },

  render() {
    return `/// <reference types="vite/client" />

/**
 *  @external https://vitejs.dev/guide/env-and-mode.html
 */
interface ImportMetaEnv {
    readonly VITE_GOOGLE_MAPS_API_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}`;
  },
};
