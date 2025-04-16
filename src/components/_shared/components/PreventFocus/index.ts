import { App } from 'vue';
import _PreventFocus from './index.vue';
import { getComponentPrefix } from '@shared/utils';

export type PreventFocusInstance = InstanceType<typeof _PreventFocus>;

const PreventFocus = Object.assign(_PreventFocus, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _PreventFocus.name, _PreventFocus);
  },
});

// 定义类型
declare module 'vue' {
  export interface GlobalComponents {
    YcPreventFocus: typeof PreventFocus;
  }
}

export default PreventFocus;
