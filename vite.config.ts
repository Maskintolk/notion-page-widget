import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "src/notion-page-widget.ts",
      formats: ["es"],
    },
    rollupOptions: {
      external: /^lit-element/,
    },
  },
});
