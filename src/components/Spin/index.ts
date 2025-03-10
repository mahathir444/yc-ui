import { App } from 'vue';
import _Spin from './index.vue';
import { getComponentPrefix } from '@/components/_utils/global-config';

export type SpinInstance = InstanceType<typeof _Spin>;
export type { SpinProps } from './type';

const Spin = Object.assign(_Spin, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Spin.name, _Spin);
  },
});

export default Spin;
