import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath } from 'url'
// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [NaiveUiResolver()],
        imports: [
          'vue',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          },
          'vue-router',
          'pinia'
        ],
        dts: 'src/dts/auto-import.d.ts',
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        deep: true,
        dirs: ['src/components', 'src/layout'],
        dts: 'src/dts/components.d.ts'
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          math: 'always',
          additionalData: '@import "./src/styles/global.less";'
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
