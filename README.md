# yc-ui - 现代化的 UI 组件库

`yc-ui` 是一个基于 [Vue.js](https://vuejs.org/) 的 UI 组件库，旨在为开发者提供一套高质量、可复用的组件，帮助快速构建现代化的 Web 应用。所有组件都经过精心设计，支持高度定制化，适合各种业务场景。

## 特性

- **开箱即用**：提供丰富的组件，覆盖常见业务需求。
- **高度可定制**：支持通过 Props 和 Slots 灵活定制组件样式和行为。
- **响应式设计**：所有组件均支持移动端和桌面端。
- **TypeScript 支持**：提供完整的类型定义，提升开发体验。
- **轻量高效**：按需加载，减少打包体积。

---

## 使用
1. 下载依赖
```bash
npm i vite-plugin-svg-icons -D
npm i @vueuse/core dayjs nanoid
```
2. vite.config.ts配置插件 
```ts
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      iconDirs: [
        // 可以自定义自己icon的位置
        path.resolve(process.cwd(), 'src/assets/icons'),
        // 组件库默认icon
        path.resolve(process.cwd(), 'src/components/_shared'),
      ],
      symbolId: 'icon-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'src/components/_shared'),
    },
  },
});
```
3. main.ts配置vite-plugin-svg-icon
```ts
import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:svg-icons-register';
// 注入全局组件
import GlobalComponents from '@shared/components';
// 注入样式
import "@shared/style"

const app = createApp(App);
app.use(GlobalComponents)
app.mount('#app');

```
