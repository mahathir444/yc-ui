import { App } from 'vue';
import _Divider from './index.vue';
import { getComponentPrefix } from '@shared/utils';

export type DividerInstance = InstanceType<typeof _Divider>;
export * from './type';

const Divider = Object.assign(_Divider, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Divider.name, _Divider);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcDivider: typeof Divider;
  }
}

export default Divider;
