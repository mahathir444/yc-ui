import { App } from 'vue';
import _Switch from './index.vue';
import { getComponentPrefix } from '@/components/_/utils/global-config';
export type SwitchInstance = InstanceType<typeof _Switch>;
export type { SwitchProps, SwitchSize, SwitchType, SwitchValue } from './type';

const Switch = Object.assign(_Switch, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Switch.name, _Switch);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcSwitch: typeof Switch;
  }
}
export default Switch;
