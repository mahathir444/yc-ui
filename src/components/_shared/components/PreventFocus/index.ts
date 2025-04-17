import { App } from 'vue';
import _PreventFocus from './index.vue';
('Yc');

export type PreventFocusInstance = InstanceType<typeof _PreventFocus>;

const PreventFocus = Object.assign(_PreventFocus, {
  install: (app: App) => {
    app.component('Yc' + _PreventFocus.name, _PreventFocus);
  },
});

// 定义类型
declare module 'vue' {
  export interface GlobalComponents {
    YcPreventFocus: typeof PreventFocus;
  }
}

export default PreventFocus;
