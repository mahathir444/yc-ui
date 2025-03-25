import { App } from 'vue';
import _Spin from './index.vue';
import { getComponentPrefix } from '@/components/_/utils/global-config';

export type SpinInstance = InstanceType<typeof _Spin>;
export type { SpinProps } from './type';

const Spin = Object.assign(_Spin, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Spin.name, _Spin);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcSpin: typeof Spin;
  }
}

export default Spin;
