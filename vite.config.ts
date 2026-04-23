import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@core": resolve(__dirname, "src/core"),
      "@widgets": resolve(__dirname, "src/widgets"),
      "@renderer": resolve(__dirname, "src/renderer"),
      "@ui": resolve(__dirname, "src/ui"),
      "@styles": resolve(__dirname, "src/styles"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
