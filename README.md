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

## 快速开始

在项目中引入并使用组件：

```javascript
import { YcButton, YcInput } from 'yc_ui';

export default {
  components: {
    YcButton,
    YcInput,
  },
};
```

在模板中使用：

```html
<template>
  <div>
    <yc-button type="primary" @click="handleClick">点击我</yc-button>
    <yc-input v-model="inputValue" placeholder="请输入内容" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    handleClick() {
      alert('按钮被点击了！');
    },
  },
};
</script>
```

---

## 组件列表

以下是 `packages` 目录下的组件及其详细说明：

### 1. YcButton - 按钮组件

- **功能**：通用的按钮组件，支持多种样式、大小和状态。
- **Props**：
  - `type`：按钮类型，可选值为 `primary`、`success`、`warning`、`danger`，默认为 `primary`。
  - `size`：按钮大小，可选值为 `small`、`medium`、`large`，默认为 `medium`。
  - `disabled`：是否禁用按钮，默认为 `false`。
  - `loading`：是否显示加载状态，默认为 `false`。
- **Events**：
  - `click`：点击按钮时触发的事件。
- **Slots**：
  - `default`：按钮内容。

**示例**：

```html
<yc-button type="success" size="large" @click="handleClick">
  提交
</yc-button>
```

---

### 2. YcInput - 输入框组件

- **功能**：通用的输入框组件，支持文本、密码、数字等多种输入类型。
- **Props**：
  - `type`：输入类型，可选值为 `text`、`password`、`number`，默认为 `text`。
  - `placeholder`：输入框的占位符。
  - `disabled`：是否禁用输入框，默认为 `false`。
  - `clearable`：是否显示清除按钮，默认为 `false`。
  - `v-model`：双向绑定的值。
- **Events**：
  - `change`：输入值变化时触发的事件。
  - `focus`：输入框聚焦时触发的事件。
  - `blur`：输入框失焦时触发的事件。

**示例**：

```html
<yc-input v-model="inputValue" placeholder="请输入用户名" clearable />
```

---

### 3. YcModal - 模态框组件

- **功能**：用于显示对话框或弹出窗口，支持自定义标题、内容和操作按钮。
- **Props**：
  - `visible`：是否显示模态框，默认为 `false`。
  - `title`：模态框的标题。
  - `width`：模态框的宽度，默认为 `500px`。
  - `footer`：是否显示底部操作区域，默认为 `true`。
- **Slots**：
  - `default`：模态框的主要内容。
  - `footer`：自定义底部操作区域。
- **Events**：
  - `close`：模态框关闭时触发的事件。

**示例**：

```html
<yc-modal v-model:visible="isModalVisible" title="提示">
  <p>这是一个模态框的内容</p>
  <template #footer>
    <yc-button @click="isModalVisible = false">关闭</yc-button>
  </template>
</yc-modal>
```

---

## 开发指南

### 本地开发

1. 克隆仓库：

```bash
git clone https://gitee.com/boy-twilight/yc_ui.git
cd yc_ui
```

2. 安装依赖：

```bash
npm install
# 或
yarn install
```

3. 启动开发服务器：

```bash
npm run dev
# 或
yarn dev
```

4. 访问 `http://localhost:3000` 查看组件示例。

### 构建

构建生产环境的代码：

```bash
npm run build
# 或
yarn build
```

### 测试

运行单元测试：

```bash
npm run test
# 或
yarn test
```

---

## 贡献

欢迎贡献代码！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何参与项目开发。

## 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

---

如果你能提供更多关于组件的详细信息（例如更多组件的功能、API 文档等），我可以进一步完善这个 `README.md` 文件！