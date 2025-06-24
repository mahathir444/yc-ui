import { App } from 'vue';
import _Cascader from './Cascader.vue';

export type CascaderInstance = InstanceType<typeof _Cascader>;
export * from './type';

const Cascader = Object.assign(_Cascader, {
  install: (app: App) => {
    app.component('Yc' + _Cascader.name, _Cascader);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcCascader: typeof Cascader;
  }
}

export default Cascader;
