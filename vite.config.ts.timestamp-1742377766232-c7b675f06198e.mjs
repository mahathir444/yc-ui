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
      iconDirs: [
        path.resolve(process.cwd(), "src/assets/icons"),
        path.resolve(process.cwd(), "src/components/_assets")
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxkZXNrdG9wXFxcXHljLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxkZXNrdG9wXFxcXHljLXVpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9kZXNrdG9wL3ljLXVpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJztcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJztcbmltcG9ydCBWdWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHsgQXJjb1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIFZ1ZUpzeCgpLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgcmVzb2x2ZXJzOiBbQXJjb1Jlc29sdmVyKCldLFxuICAgIH0pLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIEFyY29SZXNvbHZlcih7XG4gICAgICAgICAgc2lkZUVmZmVjdDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICBdLFxuICAgIH0pLFxuICAgIHZpc3VhbGl6ZXIoe1xuICAgICAgb3BlbjogdHJ1ZSxcbiAgICB9KSxcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAvLyBcdTYzMDdcdTVCOUFcdTk3MDBcdTg5ODFcdTdGMTNcdTVCNThcdTc2ODRcdTU2RkVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcbiAgICAgIGljb25EaXJzOiBbXG4gICAgICAgIHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucycpLFxuICAgICAgICBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9jb21wb25lbnRzL19hc3NldHMnKSxcbiAgICAgIF0sXG4gICAgICAvLyBcdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxuICAgICAgc3ltYm9sSWQ6ICdpY29uLVtuYW1lXScsXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogNDA5MCxcbiAgICBvcGVuOiB0cnVlLFxuICB9LFxuICBidWlsZDoge1xuICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgYXNzZXRzRGlyOiAnc3RhdGljJyxcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgIGVtcHR5T3V0RGlyOiBmYWxzZSxcbiAgICAvLyBcdTUzQkJcdTk2NjRsb2dcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogcGF0aC5qb2luKF9fZGlybmFtZSwgJy9zcmMvY29tcG9uZW50cy9pbmRleC50cycpLFxuICAgICAgZm9ybWF0czogWydlcycsICdjanMnLCAndW1kJ10sXG4gICAgfSxcbiAgICAvLyByb2xsdXBcdTkxNERcdTdGNkVcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDogcGF0aC5qb2luKF9fZGlybmFtZSwgJy9zcmMvY29tcG9uZW50cy9pbmRleC50cycpLFxuICAgICAgLy9cdTVGRkRcdTc1NjVcdTYyNTNcdTUzMDV2dWVcdTY1ODdcdTRFRjZcbiAgICAgIC8vIGV4dGVybmFsOiBbJ3Z1ZSddLFxuICAgICAgb3V0cHV0OiBbXG4gICAgICAgIHtcbiAgICAgICAgICBmb3JtYXQ6ICdlcycsXG4gICAgICAgICAgZGlyOiAnZXMnLFxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLmpzJyxcbiAgICAgICAgICBwcmVzZXJ2ZU1vZHVsZXM6IHRydWUsXG4gICAgICAgICAgcHJlc2VydmVNb2R1bGVzUm9vdDogJ2NvbXBvbmVudHMnLFxuICAgICAgICAgIC8vIGFzc2V0RmlsZU5hbWVzOiAoeyBuYW1lIH0pID0+IHtcbiAgICAgICAgICAvLyAgIGNvbnN0IGlzU3R5bGVGaWxlID0gWycuY3NzJywgJy5sZXNzJywgJy5zY3NzJ10uc29tZSgoZXh0KSA9PlxuICAgICAgICAgIC8vICAgICBuYW1lLmVuZHNXaXRoKGV4dClcbiAgICAgICAgICAvLyAgICk7XG4gICAgICAgICAgLy8gICBpZiAoaXNTdHlsZUZpbGUpIHtcbiAgICAgICAgICAvLyAgICAgcmV0dXJuICdpbmRleC5jc3MnOyAvLyBcdTVDMDZcdTY4MzdcdTVGMEZcdTY1ODdcdTRFRjZcdTkxQ0RcdTU0N0RcdTU0MERcdTRFM0EgaW5kZXgubGVzc1xuICAgICAgICAgIC8vICAgfVxuICAgICAgICAgIC8vICAgcmV0dXJuICdzdGF0aWMvW25hbWVdLltoYXNoXVtleHRuYW1lXSc7XG4gICAgICAgICAgLy8gfSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGZvcm1hdDogJ2NvbW1vbmpzJyxcbiAgICAgICAgICBkaXI6ICdsaWInLFxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLmpzJyxcbiAgICAgICAgICBwcmVzZXJ2ZU1vZHVsZXM6IHRydWUsXG4gICAgICAgICAgcHJlc2VydmVNb2R1bGVzUm9vdDogJ2NvbXBvbmVudHMnLFxuICAgICAgICAgIC8vIGFzc2V0RmlsZU5hbWVzOiAoeyBuYW1lIH0pID0+IHtcbiAgICAgICAgICAvLyAgIGNvbnN0IGlzU3R5bGVGaWxlID0gWycuY3NzJywgJy5sZXNzJywgJy5zY3NzJ10uc29tZSgoZXh0KSA9PlxuICAgICAgICAgIC8vICAgICBuYW1lLmVuZHNXaXRoKGV4dClcbiAgICAgICAgICAvLyAgICk7XG4gICAgICAgICAgLy8gICBpZiAoaXNTdHlsZUZpbGUpIHtcbiAgICAgICAgICAvLyAgICAgcmV0dXJuICdpbmRleC5jc3MnOyAvLyBcdTVDMDZcdTY4MzdcdTVGMEZcdTY1ODdcdTRFRjZcdTkxQ0RcdTU0N0RcdTU0MERcdTRFM0EgaW5kZXgubGVzc1xuICAgICAgICAgIC8vICAgfVxuICAgICAgICAgIC8vICAgcmV0dXJuICdzdGF0aWMvW25hbWVdLltoYXNoXVtleHRuYW1lXSc7XG4gICAgICAgICAgLy8gfSxcbiAgICAgICAgfSxcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgIGZvcm1hdDogJ3VtZCcsXG4gICAgICAgIC8vICAgZW50cnlGaWxlTmFtZXM6IGBpbmRleC5qc2AsXG4gICAgICAgIC8vICAgc291cmNlbWFwOiB0cnVlLFxuICAgICAgICAvLyAgIGdsb2JhbHM6IHtcbiAgICAgICAgLy8gICAgIHZ1ZTogJ1Z1ZScsXG4gICAgICAgIC8vICAgICAnQGFyY28tZGVzaWduL3dlYi12dWUnOiAnQXJjb1Z1ZScsXG4gICAgICAgIC8vICAgICAnQGFyY28tZGVzaWduL3dlYi12dWUvZXMvaWNvbic6ICdBcmNvVnVlSWNvbicsXG4gICAgICAgIC8vICAgfSxcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgIGZvcm1hdDogJ3VtZCcsXG4gICAgICAgIC8vICAgZW50cnlGaWxlTmFtZXM6IGBpbmRleC5taW4uanNgLFxuICAgICAgICAvLyAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICAgICAgLy8gICBnbG9iYWxzOiB7XG4gICAgICAgIC8vICAgICB2dWU6ICdWdWUnLFxuICAgICAgICAvLyAgICAgJ0BhcmNvLWRlc2lnbi93ZWItdnVlJzogJ0FyY29WdWUnLFxuICAgICAgICAvLyAgICAgJ0BhcmNvLWRlc2lnbi93ZWItdnVlL2VzL2ljb24nOiAnQXJjb1Z1ZUljb24nLFxuICAgICAgICAvLyAgIH0sXG4gICAgICAgIC8vICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAvLyAgIHBsdWdpbnM6IFt0ZXJzZXIoKV0sXG4gICAgICAgIC8vIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgYXV0b3ByZWZpeGVyKHtcbiAgICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTZERkJcdTUyQTBcdTUyNERcdTdGMDBcbiAgICAgICAgICBvdmVycmlkZUJyb3dzZXJzbGlzdDogW1xuICAgICAgICAgICAgJ0FuZHJvaWQgNC4xJyxcbiAgICAgICAgICAgICdpT1MgNy4xJyxcbiAgICAgICAgICAgICdDaHJvbWUgPiAzMScsXG4gICAgICAgICAgICAnZmYgPiAzMScsXG4gICAgICAgICAgICAnaWUgPj0gOCcsXG4gICAgICAgICAgICAnbGFzdCAyIHZlcnNpb25zJyxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGdyaWQ6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIGxlc3M6IHtcbiAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXG4gICAgICAgIC8vIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIiR7cmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvYXNzZXRzL3N0eWxlcy92YXJpYWJsZXMubGVzcycpfVwiO2AsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd08sU0FBUyxvQkFBNkI7QUFDOVEsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGtCQUFrQjtBQUN6QixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxrQkFBa0I7QUFUM0IsSUFBTSxtQ0FBbUM7QUFZekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLGFBQWEsQ0FBQztBQUFBLElBQzVCLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVc7QUFBQSxRQUNULGFBQWE7QUFBQSxVQUNYLFlBQVk7QUFBQSxRQUNkLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxNQUFNO0FBQUEsSUFDUixDQUFDO0FBQUEsSUFDRCxxQkFBcUI7QUFBQTtBQUFBLE1BRW5CLFVBQVU7QUFBQSxRQUNSLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0I7QUFBQSxRQUM5QyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsd0JBQXdCO0FBQUEsTUFDdEQ7QUFBQTtBQUFBLE1BRUEsVUFBVTtBQUFBLElBQ1osQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsSUFDWCxhQUFhO0FBQUE7QUFBQSxJQUViLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILE9BQU8sS0FBSyxLQUFLLGtDQUFXLDBCQUEwQjtBQUFBLE1BQ3RELFNBQVMsQ0FBQyxNQUFNLE9BQU8sS0FBSztBQUFBLElBQzlCO0FBQUE7QUFBQSxJQUVBLGVBQWU7QUFBQSxNQUNiLE9BQU8sS0FBSyxLQUFLLGtDQUFXLDBCQUEwQjtBQUFBO0FBQUE7QUFBQSxNQUd0RCxRQUFRO0FBQUEsUUFDTjtBQUFBLFVBQ0UsUUFBUTtBQUFBLFVBQ1IsS0FBSztBQUFBLFVBQ0wsZ0JBQWdCO0FBQUEsVUFDaEIsaUJBQWlCO0FBQUEsVUFDakIscUJBQXFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFVdkI7QUFBQSxRQUNBO0FBQUEsVUFDRSxRQUFRO0FBQUEsVUFDUixLQUFLO0FBQUEsVUFDTCxnQkFBZ0I7QUFBQSxVQUNoQixpQkFBaUI7QUFBQSxVQUNqQixxQkFBcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQVV2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUF1QkY7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ1AsYUFBYTtBQUFBO0FBQUEsVUFFWCxzQkFBc0I7QUFBQSxZQUNwQjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFVBQ0EsTUFBTTtBQUFBLFFBQ1IsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsSUFDQSxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixtQkFBbUI7QUFBQTtBQUFBLE1BRXJCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
