import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    // 定制主题
    Components({ resolvers: [ElementPlusResolver({ importStyle: "sass" })] })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    open: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;
        @use "@/styles//common/var.scss" as *;`,
      },
    },
  },
  build: {
    sourcemap: false,
  }
});
