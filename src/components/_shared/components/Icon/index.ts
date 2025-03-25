import { App } from 'vue';
import _Icon from './index.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type IconInstance = InstanceType<typeof _Icon>;
export type { IconProps } from './type';

const Icon = Object.assign(_Icon, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Icon.name, _Icon);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcIcon: typeof Icon;
  }
}

export default Icon;
