# yc_ui - 现代化的 UI 组件库

`yc_ui` 是一个基于 [Vue.js](https://vuejs.org/) 的 UI 组件库，旨在为开发者提供一套高质量、可复用的组件，帮助快速构建现代化的 Web 应用。所有组件都经过精心设计，支持高度定制化，适合各种业务场景。

## 特性

- **开箱即用**：提供丰富的组件，覆盖常见业务需求。
- **高度可定制**：支持通过 Props 和 Slots 灵活定制组件样式和行为。
- **响应式设计**：所有组件均支持移动端和桌面端。
- **TypeScript 支持**：提供完整的类型定义，提升开发体验。
- **轻量高效**：按需加载，减少打包体积。

---

## 安装

使用 npm 或 yarn 安装 `yc_ui`：

```bash
npm install yc_ui
# 或
yarn add yc_ui
```

如果你希望按需加载组件，可以使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 插件：

```bash
npm install unplugin-vue-components -D
```

然后在 `vite.config.ts` 或 `webpack.config.js` 中配置：

```javascript
import Components from 'unplugin-vue-components/vite';
import { YcResolver } from 'yc_ui/resolver';

export default {
  plugins: [
    Components({
      resolvers: [YcResolver()],
    }),
  ],
};
```
---

## 贡献

欢迎贡献代码！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何参与项目开发。

## 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

---

如果你能提供更多关于组件的详细信息（例如更多组件的功能、API 文档等），我可以进一步完善这个 `README.md` 文件！