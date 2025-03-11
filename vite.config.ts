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
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = +env.PORT;
  const outDir = env.OUT_DIR;
  return {
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
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port,
      open: true,
    },
    build: {
      outDir,
      // minify: false,
      minify: 'terser',
      assetsDir: 'static',
      // assetsInlineLimit: 1024 * 5,
      sourcemap: false,
      // 去除log
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      //忽略打包vue文件
      external: ['vue'],
      output: {
        // 为 UMD 格式提供全局变量
        globals: {
          vue: 'Vue',
        },
      },
      lib: {
        entry: './src/components/index.ts',
        name: 'yc-ui',
        fileName: (format) => `yc-ui.${format}.js`,
        formats: ['es', 'cjs', 'umd'],
      },
      // rollup配置
      rollupOptions: {
        output: {
          // 指定样式文件名
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name;
            if (
              name?.endsWith('.css') ||
              name.endsWith('.less') ||
              name.endsWith('.scss')
            ) {
              return 'index.css'; // 将样式文件重命名为 index.less
            }
            return 'static/[name].[hash][extname]';
          },
        },
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
  };
});
