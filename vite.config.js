import { fileURLToPath, URL } from "url";
import vitePluginString from "vite-plugin-string";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    vitePluginString(),
    visualizer(),
    viteCompression(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
