import { fileURLToPath, URL } from "url";
import vitePluginString from "vite-plugin-string";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import importCDN from 'vite-plugin-cdn-import'
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    vitePluginString(),
    visualizer(),
    viteCompression(),
    importCDN({
      modules:[
        {
          name:'vue',
          var:'Vue',
          path:`https://cdn.bootcdn.net/ajax/libs/vue/3.2.31/vue.runtime.global.prod.min.js`
        },
        {
          name:'vue-router',
          var:'VueRouter',
          path:`https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.14/vue-router.global.prod.min.js`
        },
        {
          name:'tone',
          var:'Tone',
          path:`https://cdn.bootcdn.net/ajax/libs/tone/14.8.38/Tone.min.js`
        }
      ]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
