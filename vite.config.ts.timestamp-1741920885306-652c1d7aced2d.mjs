// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/desktop/yc-ui/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/desktop/yc-ui/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import autoprefixer from "file:///D:/desktop/yc-ui/node_modules/autoprefixer/lib/autoprefixer.js";
import { createSvgIconsPlugin } from "file:///D:/desktop/yc-ui/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import VueJsx from "file:///D:/desktop/yc-ui/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import AutoImport from "file:///D:/desktop/yc-ui/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/desktop/yc-ui/node_modules/unplugin-vue-components/dist/vite.js";
import { ArcoResolver } from "file:///D:/desktop/yc-ui/node_modules/unplugin-vue-components/dist/resolvers.js";
import { visualizer } from "file:///D:/desktop/yc-ui/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
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
        iconDirs: [
          path.resolve(process.cwd(), "src/assets/icons"),
          path.resolve(process.cwd(), "src/components")
        ],
        // 指定symbolId格式
        symbolId: "icon-[name]"
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src")
      }
    },
    server: {
      port,
      open: true
    },
    build: {
      outDir,
      // minify: false,
      minify: "terser",
      assetsDir: "static",
      // assetsInlineLimit: 1024 * 5,
      sourcemap: false,
      // 去除log
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      //忽略打包vue文件
      external: ["vue"],
      output: {
        // 为 UMD 格式提供全局变量
        globals: {
          vue: "Vue"
        }
      },
      lib: {
        entry: "./src/components/index.ts",
        name: "yc-ui",
        fileName: (format) => `yc-ui.${format}.js`,
        formats: ["es", "cjs", "umd"]
      },
      // rollup配置
      rollupOptions: {
        output: {
          // 指定样式文件名
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name;
            if ((name == null ? void 0 : name.endsWith(".css")) || name.endsWith(".less") || name.endsWith(".scss")) {
              return "index.css";
            }
            return "static/[name].[hash][extname]";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxkZXNrdG9wXFxcXHljLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxkZXNrdG9wXFxcXHljLXVpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9kZXNrdG9wL3ljLXVpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJztcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJztcbmltcG9ydCBWdWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHsgQXJjb1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKTtcbiAgY29uc3QgcG9ydCA9ICtlbnYuUE9SVDtcbiAgY29uc3Qgb3V0RGlyID0gZW52Lk9VVF9ESVI7XG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICBWdWVKc3goKSxcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICByZXNvbHZlcnM6IFtBcmNvUmVzb2x2ZXIoKV0sXG4gICAgICB9KSxcbiAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICByZXNvbHZlcnM6IFtcbiAgICAgICAgICBBcmNvUmVzb2x2ZXIoe1xuICAgICAgICAgICAgc2lkZUVmZmVjdDogdHJ1ZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgICAgdmlzdWFsaXplcih7XG4gICAgICAgIG9wZW46IHRydWUsXG4gICAgICB9KSxcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBXHU5NzAwXHU4OTgxXHU3RjEzXHU1QjU4XHU3Njg0XHU1NkZFXHU2ODA3XHU2NTg3XHU0RUY2XHU1OTM5XG4gICAgICAgIGljb25EaXJzOiBbXG4gICAgICAgICAgcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyksXG4gICAgICAgICAgcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvY29tcG9uZW50cycpLFxuICAgICAgICBdLFxuICAgICAgICAvLyBcdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW25hbWVdJyxcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0LFxuICAgICAgb3BlbjogdHJ1ZSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXIsXG4gICAgICAvLyBtaW5pZnk6IGZhbHNlLFxuICAgICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICAgIGFzc2V0c0RpcjogJ3N0YXRpYycsXG4gICAgICAvLyBhc3NldHNJbmxpbmVMaW1pdDogMTAyNCAqIDUsXG4gICAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgICAgLy8gXHU1M0JCXHU5NjY0bG9nXG4gICAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgLy9cdTVGRkRcdTc1NjVcdTYyNTNcdTUzMDV2dWVcdTY1ODdcdTRFRjZcbiAgICAgIGV4dGVybmFsOiBbJ3Z1ZSddLFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIC8vIFx1NEUzQSBVTUQgXHU2ODNDXHU1RjBGXHU2M0QwXHU0RjlCXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXG4gICAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgICB2dWU6ICdWdWUnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGxpYjoge1xuICAgICAgICBlbnRyeTogJy4vc3JjL2NvbXBvbmVudHMvaW5kZXgudHMnLFxuICAgICAgICBuYW1lOiAneWMtdWknLFxuICAgICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYHljLXVpLiR7Zm9ybWF0fS5qc2AsXG4gICAgICAgIGZvcm1hdHM6IFsnZXMnLCAnY2pzJywgJ3VtZCddLFxuICAgICAgfSxcbiAgICAgIC8vIHJvbGx1cFx1OTE0RFx1N0Y2RVxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAvLyBcdTYzMDdcdTVCOUFcdTY4MzdcdTVGMEZcdTY1ODdcdTRFRjZcdTU0MERcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGFzc2V0SW5mby5uYW1lO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBuYW1lPy5lbmRzV2l0aCgnLmNzcycpIHx8XG4gICAgICAgICAgICAgIG5hbWUuZW5kc1dpdGgoJy5sZXNzJykgfHxcbiAgICAgICAgICAgICAgbmFtZS5lbmRzV2l0aCgnLnNjc3MnKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnaW5kZXguY3NzJzsgLy8gXHU1QzA2XHU2ODM3XHU1RjBGXHU2NTg3XHU0RUY2XHU5MUNEXHU1NDdEXHU1NDBEXHU0RTNBIGluZGV4Lmxlc3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnc3RhdGljL1tuYW1lXS5baGFzaF1bZXh0bmFtZV0nO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwb3N0Y3NzOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICBhdXRvcHJlZml4ZXIoe1xuICAgICAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU2REZCXHU1MkEwXHU1MjREXHU3RjAwXG4gICAgICAgICAgICBvdmVycmlkZUJyb3dzZXJzbGlzdDogW1xuICAgICAgICAgICAgICAnQW5kcm9pZCA0LjEnLFxuICAgICAgICAgICAgICAnaU9TIDcuMScsXG4gICAgICAgICAgICAgICdDaHJvbWUgPiAzMScsXG4gICAgICAgICAgICAgICdmZiA+IDMxJyxcbiAgICAgICAgICAgICAgJ2llID49IDgnLFxuICAgICAgICAgICAgICAnbGFzdCAyIHZlcnNpb25zJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBncmlkOiB0cnVlLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgbGVzczoge1xuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIC8vIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIiR7cmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXNzZXRzL3N0eWxlcy92YXJpYWJsZXMubGVzcycpfVwiO2AsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd08sU0FBUyxjQUFjLGVBQWU7QUFDOVEsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGtCQUFrQjtBQUN6QixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxrQkFBa0I7QUFUM0IsSUFBTSxtQ0FBbUM7QUFZekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFFBQU0sT0FBTyxDQUFDLElBQUk7QUFDbEIsUUFBTSxTQUFTLElBQUk7QUFDbkIsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsV0FBVztBQUFBLFFBQ1QsV0FBVyxDQUFDLGFBQWEsQ0FBQztBQUFBLE1BQzVCLENBQUM7QUFBQSxNQUNELFdBQVc7QUFBQSxRQUNULFdBQVc7QUFBQSxVQUNULGFBQWE7QUFBQSxZQUNYLFlBQVk7QUFBQSxVQUNkLENBQUM7QUFBQSxRQUNIO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxNQUFNO0FBQUEsTUFDUixDQUFDO0FBQUEsTUFDRCxxQkFBcUI7QUFBQTtBQUFBLFFBRW5CLFVBQVU7QUFBQSxVQUNSLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0I7QUFBQSxVQUM5QyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsZ0JBQWdCO0FBQUEsUUFDOUM7QUFBQTtBQUFBLFFBRUEsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUNwQztBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOO0FBQUEsTUFDQSxNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0w7QUFBQTtBQUFBLE1BRUEsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBO0FBQUEsTUFFWCxXQUFXO0FBQUE7QUFBQSxNQUVYLGVBQWU7QUFBQSxRQUNiLFVBQVU7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLGVBQWU7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQTtBQUFBLE1BRUEsVUFBVSxDQUFDLEtBQUs7QUFBQSxNQUNoQixRQUFRO0FBQUE7QUFBQSxRQUVOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLE1BQ0EsS0FBSztBQUFBLFFBQ0gsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sVUFBVSxDQUFDLFdBQVcsU0FBUyxNQUFNO0FBQUEsUUFDckMsU0FBUyxDQUFDLE1BQU0sT0FBTyxLQUFLO0FBQUEsTUFDOUI7QUFBQTtBQUFBLE1BRUEsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBO0FBQUEsVUFFTixnQkFBZ0IsQ0FBQyxjQUFjO0FBQzdCLGtCQUFNLE9BQU8sVUFBVTtBQUN2QixpQkFDRSw2QkFBTSxTQUFTLFlBQ2YsS0FBSyxTQUFTLE9BQU8sS0FDckIsS0FBSyxTQUFTLE9BQU8sR0FDckI7QUFDQSxxQkFBTztBQUFBLFlBQ1Q7QUFDQSxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxRQUNQLFNBQVM7QUFBQSxVQUNQLGFBQWE7QUFBQTtBQUFBLFlBRVgsc0JBQXNCO0FBQUEsY0FDcEI7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLGNBQ0E7QUFBQSxjQUNBO0FBQUEsY0FDQTtBQUFBLFlBQ0Y7QUFBQSxZQUNBLE1BQU07QUFBQSxVQUNSLENBQUM7QUFBQSxRQUNIO0FBQUEsTUFDRjtBQUFBLE1BQ0EscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osbUJBQW1CO0FBQUE7QUFBQSxRQUVyQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
