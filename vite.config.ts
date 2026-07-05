import { defineConfig } from "vite";

// base: "./" makes all bundled asset URLs relative, so the build works
// unchanged whether it is served from a GitHub Pages project subpath
// (https://diskrot.github.io/www.anewsky.com/) or a domain root.
export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    // Assets live in public/ and are referenced at runtime by string paths,
    // so Vite copies them verbatim; nothing here needs inlining.
    assetsInlineLimit: 0,
  },
});
