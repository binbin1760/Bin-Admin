// vite.config.ts
import { defineConfig, loadEnv } from "file:///C:/Users/56927/Desktop/%E4%B8%AA%E4%BA%BA%E9%A1%B9%E7%9B%AE/Bin-Admin/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/56927/Desktop/%E4%B8%AA%E4%BA%BA%E9%A1%B9%E7%9B%AE/Bin-Admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///C:/Users/56927/Desktop/%E4%B8%AA%E4%BA%BA%E9%A1%B9%E7%9B%AE/Bin-Admin/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/56927/Desktop/%E4%B8%AA%E4%BA%BA%E9%A1%B9%E7%9B%AE/Bin-Admin/node_modules/unplugin-vue-components/dist/vite.js";
import { NaiveUiResolver } from "file:///C:/Users/56927/Desktop/%E4%B8%AA%E4%BA%BA%E9%A1%B9%E7%9B%AE/Bin-Admin/node_modules/unplugin-vue-components/dist/resolvers.js";
import { fileURLToPath } from "url";
import vueJsxPlugin from "file:///C:/Users/56927/Desktop/%E4%B8%AA%E4%BA%BA%E9%A1%B9%E7%9B%AE/Bin-Admin/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/56927/Desktop/%E4%B8%AA%E4%BA%BA%E9%A1%B9%E7%9B%AE/Bin-Admin/vite.config.ts";
var vite_config_default = defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_BASE_API } = env;
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [NaiveUiResolver()],
        imports: [
          "vue",
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar"
            ]
          },
          "vue-router",
          "pinia"
        ],
        dts: "src/dts/auto-import.d.ts",
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        deep: true,
        dirs: ["src/components", "src/layout"],
        dts: "src/dts/components.d.ts"
      }),
      vueJsxPlugin()
    ],
    css: {
      preprocessorOptions: {
        less: {
          math: "always",
          additionalData: '@import "./src/styles/global.less";'
        }
      }
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    server: {
      proxy: {
        "/api": {
          target: VITE_BASE_API,
          changeOrigin: true
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw1NjkyN1xcXFxEZXNrdG9wXFxcXFx1NEUyQVx1NEVCQVx1OTg3OVx1NzZFRVxcXFxCaW4tQWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDU2OTI3XFxcXERlc2t0b3BcXFxcXHU0RTJBXHU0RUJBXHU5ODc5XHU3NkVFXFxcXEJpbi1BZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvNTY5MjcvRGVza3RvcC8lRTQlQjglQUElRTQlQkElQkElRTklQTElQjklRTclOUIlQUUvQmluLUFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IE5haXZlVWlSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCdcclxuaW1wb3J0IHZ1ZUpzeFBsdWdpbiBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSwgY29tbWFuZCB9KSA9PiB7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxyXG4gIGNvbnN0IHsgVklURV9CQVNFX0FQSSB9ID0gZW52XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICByZXNvbHZlcnM6IFtOYWl2ZVVpUmVzb2x2ZXIoKV0sXHJcbiAgICAgICAgaW1wb3J0czogW1xyXG4gICAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICduYWl2ZS11aSc6IFtcclxuICAgICAgICAgICAgICAndXNlRGlhbG9nJyxcclxuICAgICAgICAgICAgICAndXNlTWVzc2FnZScsXHJcbiAgICAgICAgICAgICAgJ3VzZU5vdGlmaWNhdGlvbicsXHJcbiAgICAgICAgICAgICAgJ3VzZUxvYWRpbmdCYXInXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAndnVlLXJvdXRlcicsXHJcbiAgICAgICAgICAncGluaWEnXHJcbiAgICAgICAgXSxcclxuICAgICAgICBkdHM6ICdzcmMvZHRzL2F1dG8taW1wb3J0LmQudHMnLFxyXG4gICAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwubWQkL11cclxuICAgICAgfSksXHJcbiAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgIHJlc29sdmVyczogW05haXZlVWlSZXNvbHZlcigpXSxcclxuICAgICAgICBkZWVwOiB0cnVlLFxyXG4gICAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnLCAnc3JjL2xheW91dCddLFxyXG4gICAgICAgIGR0czogJ3NyYy9kdHMvY29tcG9uZW50cy5kLnRzJ1xyXG4gICAgICB9KSxcclxuICAgICAgdnVlSnN4UGx1Z2luKClcclxuICAgIF0sXHJcbiAgICBjc3M6IHtcclxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgIGxlc3M6IHtcclxuICAgICAgICAgIG1hdGg6ICdhbHdheXMnLFxyXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFwiLi9zcmMvc3R5bGVzL2dsb2JhbC5sZXNzXCI7J1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IFZJVEVfQkFTRV9BUEksXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlUsU0FBUyxjQUFjLGVBQWU7QUFDblgsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8sa0JBQWtCO0FBTm9LLElBQU0sMkNBQTJDO0FBUTlPLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsTUFBTSxRQUFRLE1BQU07QUFDakQsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUN2QyxRQUFNLEVBQUUsY0FBYyxJQUFJO0FBRTFCLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLFdBQVc7QUFBQSxRQUNULFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUFBLFFBQzdCLFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFlBQ0UsWUFBWTtBQUFBLGNBQ1Y7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsS0FBSztBQUFBLFFBQ0wsU0FBUyxDQUFDLFVBQVUsY0FBYyxPQUFPO0FBQUEsTUFDM0MsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1QsV0FBVyxDQUFDLGdCQUFnQixDQUFDO0FBQUEsUUFDN0IsTUFBTTtBQUFBLFFBQ04sTUFBTSxDQUFDLGtCQUFrQixZQUFZO0FBQUEsUUFDckMsS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUFBLE1BQ0QsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLE1BQU07QUFBQSxVQUNOLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixjQUFjO0FBQUEsUUFDaEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
