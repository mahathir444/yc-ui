import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import autoprefixer from 'autoprefixer';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import VueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueJsx(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
    visualizer({
      open: true,
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [
        path.resolve(process.cwd(), 'src/assets/icons'),
        path.resolve(process.cwd(), 'src/components'),
      ],
      // 指定symbolId格式
      symbolId: 'icon-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 4090,
    open: true,
  },
  build: {
    minify: 'terser',
    assetsDir: 'static',
    sourcemap: false,
    emptyOutDir: false,
    // 去除log
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    lib: {
      entry: path.join(__dirname, '/src/components/index.ts'),
      formats: ['es', 'cjs', 'umd'],
    },
    // rollup配置
    rollupOptions: {
      input: path.join(__dirname, '/src/components/index.ts'),
      //忽略打包vue文件
      // external: ['vue'],
      output: [
        {
          format: 'es',
          dir: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'components',
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
          format: 'commonjs',
          dir: 'lib',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: 'components',
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
      ],
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          // 自动添加前缀
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 8',
            'last 2 versions',
          ],
          grid: true,
        }),
      ],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // additionalData: `@import "${resolve(__dirname, 'src/assets/styles/variables.less')}";`,
      },
    },
  },
});
