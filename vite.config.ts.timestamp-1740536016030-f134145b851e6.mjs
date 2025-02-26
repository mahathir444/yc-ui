// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/desktop/yc-ui/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/desktop/yc-ui/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///D:/desktop/yc-ui/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/desktop/yc-ui/node_modules/unplugin-vue-components/dist/vite.js";
import { ArcoResolver } from "file:///D:/desktop/yc-ui/node_modules/unplugin-vue-components/dist/resolvers.js";
import { visualizer } from "file:///D:/desktop/yc-ui/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import autoprefixer from "file:///D:/desktop/yc-ui/node_modules/autoprefixer/lib/autoprefixer.js";
import { resolve } from "path";
import { createSvgIconsPlugin } from "file:///D:/desktop/yc-ui/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import VueJsx from "file:///D:/desktop/yc-ui/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\desktop\\yc-ui";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = +env.PORT;
  const outDir = env.OUT_DIR;
  return {
    plugins: [
      vue(),
      VueJsx(),
      AutoImport({
        resolvers: [ArcoResolver()]
      }),
      Components({
        resolvers: [
          ArcoResolver({
            sideEffect: true
          })
        ]
      }),
      visualizer({
        open: true
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]"
      })
    ],
    base: "./",
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src"),
        "@components": resolve(__vite_injected_original_dirname, "src/components"),
        "@assets": resolve(__vite_injected_original_dirname, "src/assets")
      }
    },
    server: {
      port,
      open: true
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:8080',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },
    build: {
      outDir,
      chunkSizeWarningLimit: 1e3,
      sourcemap: false,
      minify: "terser",
      assetsDir: "static",
      assetsInlineLimit: 1024 * 5,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.indexOf("node_modules") != -1) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split("/") : [];
            const fileName = facadeModuleId[facadeModuleId.length - 2] || "[name]";
            return `js/${fileName}/[name].[hash].js`;
          }
        }
      }
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            // 自动添加前缀
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8",
              "last 2 versions"
            ],
            grid: true
          })
        ]
      },
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
          // additionalData: `@import "${resolve(__dirname, 'src/assets/styles/variables.less')}";`,
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxkZXNrdG9wXFxcXHljLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxkZXNrdG9wXFxcXHljLXVpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9kZXNrdG9wL3ljLXVpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHsgQXJjb1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnO1xuaW1wb3J0IFZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4JztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJyk7XG4gIGNvbnN0IHBvcnQgPSArZW52LlBPUlQ7XG4gIGNvbnN0IG91dERpciA9IGVudi5PVVRfRElSO1xuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSgpLFxuICAgICAgVnVlSnN4KCksXG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgcmVzb2x2ZXJzOiBbQXJjb1Jlc29sdmVyKCldLFxuICAgICAgfSksXG4gICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgICAgQXJjb1Jlc29sdmVyKHtcbiAgICAgICAgICAgIHNpZGVFZmZlY3Q6IHRydWUsXG4gICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICB9KSxcbiAgICAgIHZpc3VhbGl6ZXIoe1xuICAgICAgICBvcGVuOiB0cnVlLFxuICAgICAgfSksXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAgIC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxuICAgICAgICBpY29uRGlyczogW3Jlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXG4gICAgICAgIC8vIFx1NjMwN1x1NUI5QXN5bWJvbElkXHU2ODNDXHU1RjBGXG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgICAgfSksXG4gICAgXSxcbiAgICBiYXNlOiAnLi8nLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcbiAgICAgICAgJ0Bjb21wb25lbnRzJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29tcG9uZW50cycpLFxuICAgICAgICAnQGFzc2V0cyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Fzc2V0cycpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgcG9ydCxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICAvLyBwcm94eToge1xuICAgICAgLy8gICAnL2FwaSc6IHtcbiAgICAgIC8vICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjgwODAnLFxuICAgICAgLy8gICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIC8vICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxuICAgICAgLy8gICB9LFxuICAgICAgLy8gfSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXIsXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsXG4gICAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICAgIGFzc2V0c0RpcjogJ3N0YXRpYycsXG4gICAgICBhc3NldHNJbmxpbmVMaW1pdDogMTAyNCAqIDUsXG4gICAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmRleE9mKCdub2RlX21vZHVsZXMnKSAhPSAtMSkge1xuICAgICAgICAgICAgICByZXR1cm4gaWRcbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgnbm9kZV9tb2R1bGVzLycpWzFdXG4gICAgICAgICAgICAgICAgLnNwbGl0KCcvJylbMF1cbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAoY2h1bmtJbmZvKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmYWNhZGVNb2R1bGVJZCA9IGNodW5rSW5mby5mYWNhZGVNb2R1bGVJZFxuICAgICAgICAgICAgICA/IGNodW5rSW5mby5mYWNhZGVNb2R1bGVJZC5zcGxpdCgnLycpXG4gICAgICAgICAgICAgIDogW107XG4gICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9XG4gICAgICAgICAgICAgIGZhY2FkZU1vZHVsZUlkW2ZhY2FkZU1vZHVsZUlkLmxlbmd0aCAtIDJdIHx8ICdbbmFtZV0nO1xuICAgICAgICAgICAgcmV0dXJuIGBqcy8ke2ZpbGVOYW1lfS9bbmFtZV0uW2hhc2hdLmpzYDtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcG9zdGNzczoge1xuICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgYXV0b3ByZWZpeGVyKHtcbiAgICAgICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NkRGQlx1NTJBMFx1NTI0RFx1N0YwMFxuICAgICAgICAgICAgb3ZlcnJpZGVCcm93c2Vyc2xpc3Q6IFtcbiAgICAgICAgICAgICAgJ0FuZHJvaWQgNC4xJyxcbiAgICAgICAgICAgICAgJ2lPUyA3LjEnLFxuICAgICAgICAgICAgICAnQ2hyb21lID4gMzEnLFxuICAgICAgICAgICAgICAnZmYgPiAzMScsXG4gICAgICAgICAgICAgICdpZSA+PSA4JyxcbiAgICAgICAgICAgICAgJ2xhc3QgMiB2ZXJzaW9ucycsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZ3JpZDogdHJ1ZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIGxlc3M6IHtcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAvLyBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCIke3Jlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Fzc2V0cy9zdHlsZXMvdmFyaWFibGVzLmxlc3MnKX1cIjtgLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdPLFNBQVMsY0FBYyxlQUFlO0FBQzlRLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGtCQUFrQjtBQUMzQixPQUFPLGtCQUFrQjtBQUN6QixTQUFTLGVBQWU7QUFDeEIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxZQUFZO0FBVG5CLElBQU0sbUNBQW1DO0FBWXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzQyxRQUFNLE9BQU8sQ0FBQyxJQUFJO0FBQ2xCLFFBQU0sU0FBUyxJQUFJO0FBQ25CLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFdBQVc7QUFBQSxRQUNULFdBQVcsQ0FBQyxhQUFhLENBQUM7QUFBQSxNQUM1QixDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXO0FBQUEsVUFDVCxhQUFhO0FBQUEsWUFDWCxZQUFZO0FBQUEsVUFDZCxDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBLFFBQ1QsTUFBTTtBQUFBLE1BQ1IsQ0FBQztBQUFBLE1BQ0QscUJBQXFCO0FBQUE7QUFBQSxRQUVuQixVQUFVLENBQUMsUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBO0FBQUEsUUFFckQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsUUFDN0IsZUFBZSxRQUFRLGtDQUFXLGdCQUFnQjtBQUFBLFFBQ2xELFdBQVcsUUFBUSxrQ0FBVyxZQUFZO0FBQUEsTUFDNUM7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTjtBQUFBLE1BQ0EsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFRUjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBLHVCQUF1QjtBQUFBLE1BQ3ZCLFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLG1CQUFtQixPQUFPO0FBQUEsTUFDMUIsZUFBZTtBQUFBLFFBQ2IsVUFBVTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsZUFBZTtBQUFBLFFBQ2pCO0FBQUEsTUFDRjtBQUFBLE1BQ0EsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFVBQ04sYUFBYSxJQUFJO0FBQ2YsZ0JBQUksR0FBRyxRQUFRLGNBQWMsS0FBSyxJQUFJO0FBQ3BDLHFCQUFPLEdBQ0osU0FBUyxFQUNULE1BQU0sZUFBZSxFQUFFLENBQUMsRUFDeEIsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUNaLFNBQVM7QUFBQSxZQUNkO0FBQUEsVUFDRjtBQUFBLFVBQ0EsZ0JBQWdCLENBQUMsY0FBYztBQUM3QixrQkFBTSxpQkFBaUIsVUFBVSxpQkFDN0IsVUFBVSxlQUFlLE1BQU0sR0FBRyxJQUNsQyxDQUFDO0FBQ0wsa0JBQU0sV0FDSixlQUFlLGVBQWUsU0FBUyxDQUFDLEtBQUs7QUFDL0MsbUJBQU8sTUFBTSxRQUFRO0FBQUEsVUFDdkI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxRQUNQLFNBQVM7QUFBQSxVQUNQLGFBQWE7QUFBQTtBQUFBLFlBRVgsc0JBQXNCO0FBQUEsY0FDcEI7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxZQUNBLE1BQU07QUFBQSxVQUNSLENBQUM7QUFBQSxRQUNIO0FBQUEsTUFDRjtBQUFBLE1BQ0EscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osbUJBQW1CO0FBQUE7QUFBQSxRQUVyQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
