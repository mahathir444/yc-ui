import { App, Plugin } from 'vue';
import IconButton from '@shared/components/IconButton';
import PreventFocus from '@shared/components/PreventFocus';
// 全局组件
const components: Record<string, Plugin> = {
  IconButton,
  PreventFocus,
};
export default {
  ...components,
  install: (app: App) => {
    for (const key of Object.keys(components)) {
      app.use(components[key]);
    }
  },
};
