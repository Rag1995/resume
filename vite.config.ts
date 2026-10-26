import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import VueRouter from 'vue-router/vite'

// https://vite.dev/config/
export default defineConfig({
  // 部署在 GitHub Pages 的 https://rag1995.github.io/my-resume/ 底下
  base: '/my-resume/',
  plugins: [
    vue(),
    VueRouter(),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'pinia',
        {
          from: '@vueuse/core',
          imports: ['createFetch'],
        },
      ],
    }),
    Components({
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
      dts: 'src/vue-components.d.ts',
      dirs: ['src/components'],
      // 模板中直接使用 <ITablerMail />，圖示在打包時轉成 inline SVG 元件
      resolvers: [IconsResolver({ enabledCollections: ['tabler'] })],
    }),
    Icons({ compiler: 'vue3' }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
