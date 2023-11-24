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
    Components({ resolvers: [ElementPlusResolver({ importStyle: "sass" })] }),

  ],
 build: {
    assetsInlineLimit: 1024 // 将小于 4KB 的资源转为 base64
  }
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    // 导入时想要省略的扩展名列表
	extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  server: {
    open: true,
    port:5174,
    host: true // 监听所有地址
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;
        @use "@/styles//common/var.scss" as *;
        @use "@/styles/common/mixin.scss" as *;`,
      },
    },
  },

});
