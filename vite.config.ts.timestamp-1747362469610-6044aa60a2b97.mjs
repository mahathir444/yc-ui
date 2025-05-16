// vite.config.ts
import { defineConfig } from "file:///D:/desktop/yc-ui/node_modules/vite/dist/node/index.js";
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
var vite_config_default = defineConfig({
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
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      // 指定symbolId格式
      symbolId: "icon-[name]"
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src"),
      "@shared": path.resolve(__vite_injected_original_dirname, "src/components/_shared")
    }
  },
  server: {
    port: 4090,
    open: true
  },
  build: {
    minify: "terser",
    assetsDir: "static",
    sourcemap: false,
    emptyOutDir: false,
    // 去除log
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    lib: {
      entry: path.join(__vite_injected_original_dirname, "/src/components/index.ts"),
      formats: ["es", "cjs", "umd"]
    },
    // rollup配置
    rollupOptions: {
      input: path.join(__vite_injected_original_dirname, "/src/components/index.ts"),
      //忽略打包vue文件
      // external: ['vue'],
      output: [
        {
          format: "es",
          dir: "es",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "components"
          // assetFileNames: ({ name }) => {
          //   const isStyleFile = ['.css', '.less', '.scss'].some((ext) =>
          //     name.endsWith(ext)
          //   );
          //   if (isStyleFile) {
          //     return 'index.css'; // 将样式文件重命名为 index.less
          //   }
          //   return 'static/[name].[hash][extname]';
          // },
        },
        {
          format: "commonjs",
          dir: "lib",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "components"
          // assetFileNames: ({ name }) => {
          //   const isStyleFile = ['.css', '.less', '.scss'].some((ext) =>
          //     name.endsWith(ext)
          //   );
          //   if (isStyleFile) {
          //     return 'index.css'; // 将样式文件重命名为 index.less
          //   }
          //   return 'static/[name].[hash][extname]';
          // },
        }
        // {
        //   format: 'umd',
        //   entryFileNames: `index.js`,
        //   sourcemap: true,
        //   globals: {
        //     vue: 'Vue',
        //     '@arco-design/web-vue': 'ArcoVue',
        //     '@arco-design/web-vue/es/icon': 'ArcoVueIcon',
        //   },
        // },
        // {
        //   format: 'umd',
        //   entryFileNames: `index.min.js`,
        //   sourcemap: true,
        //   globals: {
        //     vue: 'Vue',
        //     '@arco-design/web-vue': 'ArcoVue',
        //     '@arco-design/web-vue/es/icon': 'ArcoVueIcon',
        //   },
        //   // @ts-ignore
        //   plugins: [terser()],
        // },
      ]
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
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxkZXNrdG9wXFxcXHljLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxkZXNrdG9wXFxcXHljLXVpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9kZXNrdG9wL3ljLXVpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJztcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJztcbmltcG9ydCBWdWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHsgQXJjb1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIFZ1ZUpzeCgpLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgcmVzb2x2ZXJzOiBbQXJjb1Jlc29sdmVyKCldLFxuICAgIH0pLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEFyY29SZXNvbHZlcih7XG4gICAgICAgICAgc2lkZUVmZmVjdDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pLFxuICAgIHZpc3VhbGl6ZXIoe1xuICAgICAgb3BlbjogdHJ1ZSxcbiAgICB9KSxcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAvLyBcdTYzMDdcdTVCOUFcdTk3MDBcdTg5ODFcdTdGMTNcdTVCNThcdTc2ODRcdTU2RkVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcbiAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgLy8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcbiAgICAgIHN5bWJvbElkOiAnaWNvbi1bbmFtZV0nLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgICAgJ0BzaGFyZWQnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbXBvbmVudHMvX3NoYXJlZCcpLFxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDQwOTAsXG4gICAgb3BlbjogdHJ1ZSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxuICAgIGFzc2V0c0RpcjogJ3N0YXRpYycsXG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICBlbXB0eU91dERpcjogZmFsc2UsXG4gICAgLy8gXHU1M0JCXHU5NjY0bG9nXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGxpYjoge1xuICAgICAgZW50cnk6IHBhdGguam9pbihfX2Rpcm5hbWUsICcvc3JjL2NvbXBvbmVudHMvaW5kZXgudHMnKSxcbiAgICAgIGZvcm1hdHM6IFsnZXMnLCAnY2pzJywgJ3VtZCddLFxuICAgIH0sXG4gICAgLy8gcm9sbHVwXHU5MTREXHU3RjZFXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHBhdGguam9pbihfX2Rpcm5hbWUsICcvc3JjL2NvbXBvbmVudHMvaW5kZXgudHMnKSxcbiAgICAgIC8vXHU1RkZEXHU3NTY1XHU2MjUzXHU1MzA1dnVlXHU2NTg3XHU0RUY2XG4gICAgICAvLyBleHRlcm5hbDogWyd2dWUnXSxcbiAgICAgIG91dHB1dDogW1xuICAgICAgICB7XG4gICAgICAgICAgZm9ybWF0OiAnZXMnLFxuICAgICAgICAgIGRpcjogJ2VzJyxcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ1tuYW1lXS5qcycsXG4gICAgICAgICAgcHJlc2VydmVNb2R1bGVzOiB0cnVlLFxuICAgICAgICAgIHByZXNlcnZlTW9kdWxlc1Jvb3Q6ICdjb21wb25lbnRzJyxcbiAgICAgICAgICAvLyBhc3NldEZpbGVOYW1lczogKHsgbmFtZSB9KSA9PiB7XG4gICAgICAgICAgLy8gICBjb25zdCBpc1N0eWxlRmlsZSA9IFsnLmNzcycsICcubGVzcycsICcuc2NzcyddLnNvbWUoKGV4dCkgPT5cbiAgICAgICAgICAvLyAgICAgbmFtZS5lbmRzV2l0aChleHQpXG4gICAgICAgICAgLy8gICApO1xuICAgICAgICAgIC8vICAgaWYgKGlzU3R5bGVGaWxlKSB7XG4gICAgICAgICAgLy8gICAgIHJldHVybiAnaW5kZXguY3NzJzsgLy8gXHU1QzA2XHU2ODM3XHU1RjBGXHU2NTg3XHU0RUY2XHU5MUNEXHU1NDdEXHU1NDBEXHU0RTNBIGluZGV4Lmxlc3NcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyAgIHJldHVybiAnc3RhdGljL1tuYW1lXS5baGFzaF1bZXh0bmFtZV0nO1xuICAgICAgICAgIC8vIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBmb3JtYXQ6ICdjb21tb25qcycsXG4gICAgICAgICAgZGlyOiAnbGliJyxcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ1tuYW1lXS5qcycsXG4gICAgICAgICAgcHJlc2VydmVNb2R1bGVzOiB0cnVlLFxuICAgICAgICAgIHByZXNlcnZlTW9kdWxlc1Jvb3Q6ICdjb21wb25lbnRzJyxcbiAgICAgICAgICAvLyBhc3NldEZpbGVOYW1lczogKHsgbmFtZSB9KSA9PiB7XG4gICAgICAgICAgLy8gICBjb25zdCBpc1N0eWxlRmlsZSA9IFsnLmNzcycsICcubGVzcycsICcuc2NzcyddLnNvbWUoKGV4dCkgPT5cbiAgICAgICAgICAvLyAgICAgbmFtZS5lbmRzV2l0aChleHQpXG4gICAgICAgICAgLy8gICApO1xuICAgICAgICAgIC8vICAgaWYgKGlzU3R5bGVGaWxlKSB7XG4gICAgICAgICAgLy8gICAgIHJldHVybiAnaW5kZXguY3NzJzsgLy8gXHU1QzA2XHU2ODM3XHU1RjBGXHU2NTg3XHU0RUY2XHU5MUNEXHU1NDdEXHU1NDBEXHU0RTNBIGluZGV4Lmxlc3NcbiAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAvLyAgIHJldHVybiAnc3RhdGljL1tuYW1lXS5baGFzaF1bZXh0bmFtZV0nO1xuICAgICAgICAgIC8vIH0sXG4gICAgICAgIH0sXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICBmb3JtYXQ6ICd1bWQnLFxuICAgICAgICAvLyAgIGVudHJ5RmlsZU5hbWVzOiBgaW5kZXguanNgLFxuICAgICAgICAvLyAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICAgICAgLy8gICBnbG9iYWxzOiB7XG4gICAgICAgIC8vICAgICB2dWU6ICdWdWUnLFxuICAgICAgICAvLyAgICAgJ0BhcmNvLWRlc2lnbi93ZWItdnVlJzogJ0FyY29WdWUnLFxuICAgICAgICAvLyAgICAgJ0BhcmNvLWRlc2lnbi93ZWItdnVlL2VzL2ljb24nOiAnQXJjb1Z1ZUljb24nLFxuICAgICAgICAvLyAgIH0sXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICBmb3JtYXQ6ICd1bWQnLFxuICAgICAgICAvLyAgIGVudHJ5RmlsZU5hbWVzOiBgaW5kZXgubWluLmpzYCxcbiAgICAgICAgLy8gICBzb3VyY2VtYXA6IHRydWUsXG4gICAgICAgIC8vICAgZ2xvYmFsczoge1xuICAgICAgICAvLyAgICAgdnVlOiAnVnVlJyxcbiAgICAgICAgLy8gICAgICdAYXJjby1kZXNpZ24vd2ViLXZ1ZSc6ICdBcmNvVnVlJyxcbiAgICAgICAgLy8gICAgICdAYXJjby1kZXNpZ24vd2ViLXZ1ZS9lcy9pY29uJzogJ0FyY29WdWVJY29uJyxcbiAgICAgICAgLy8gICB9LFxuICAgICAgICAvLyAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgLy8gICBwbHVnaW5zOiBbdGVyc2VyKCldLFxuICAgICAgICAvLyB9LFxuICAgICAgXSxcbiAgICB9LFxuICB9LFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbXG4gICAgICAgIGF1dG9wcmVmaXhlcih7XG4gICAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU2REZCXHU1MkEwXHU1MjREXHU3RjAwXG4gICAgICAgICAgb3ZlcnJpZGVCcm93c2Vyc2xpc3Q6IFtcbiAgICAgICAgICAgICdBbmRyb2lkIDQuMScsXG4gICAgICAgICAgICAnaU9TIDcuMScsXG4gICAgICAgICAgICAnQ2hyb21lID4gMzEnLFxuICAgICAgICAgICAgJ2ZmID4gMzEnLFxuICAgICAgICAgICAgJ2llID49IDgnLFxuICAgICAgICAgICAgJ2xhc3QgMiB2ZXJzaW9ucycsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBncmlkOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBsZXNzOiB7XG4gICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAvLyBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCIke3Jlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Fzc2V0cy9zdHlsZXMvdmFyaWFibGVzLmxlc3MnKX1cIjtgLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdPLFNBQVMsb0JBQW9CO0FBQ3JRLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsT0FBTyxrQkFBa0I7QUFDekIsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsa0JBQWtCO0FBVDNCLElBQU0sbUNBQW1DO0FBWXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxhQUFhLENBQUM7QUFBQSxJQUM1QixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXO0FBQUEsUUFDVCxhQUFhO0FBQUEsVUFDWCxZQUFZO0FBQUEsUUFDZCxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsTUFBTTtBQUFBLElBQ1IsQ0FBQztBQUFBLElBQ0QscUJBQXFCO0FBQUE7QUFBQSxNQUVuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUE7QUFBQSxNQUUxRCxVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ2xDLFdBQVcsS0FBSyxRQUFRLGtDQUFXLHdCQUF3QjtBQUFBLElBQzdEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQTtBQUFBLElBRWIsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsT0FBTyxLQUFLLEtBQUssa0NBQVcsMEJBQTBCO0FBQUEsTUFDdEQsU0FBUyxDQUFDLE1BQU0sT0FBTyxLQUFLO0FBQUEsSUFDOUI7QUFBQTtBQUFBLElBRUEsZUFBZTtBQUFBLE1BQ2IsT0FBTyxLQUFLLEtBQUssa0NBQVcsMEJBQTBCO0FBQUE7QUFBQTtBQUFBLE1BR3RELFFBQVE7QUFBQSxRQUNOO0FBQUEsVUFDRSxRQUFRO0FBQUEsVUFDUixLQUFLO0FBQUEsVUFDTCxnQkFBZ0I7QUFBQSxVQUNoQixpQkFBaUI7QUFBQSxVQUNqQixxQkFBcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQVV2QjtBQUFBLFFBQ0E7QUFBQSxVQUNFLFFBQVE7QUFBQSxVQUNSLEtBQUs7QUFBQSxVQUNMLGdCQUFnQjtBQUFBLFVBQ2hCLGlCQUFpQjtBQUFBLFVBQ2pCLHFCQUFxQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBVXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQXVCRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsUUFDUCxhQUFhO0FBQUE7QUFBQSxVQUVYLHNCQUFzQjtBQUFBLFlBQ3BCO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsVUFDQSxNQUFNO0FBQUEsUUFDUixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxJQUNBLHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLG1CQUFtQjtBQUFBO0FBQUEsTUFFckI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
