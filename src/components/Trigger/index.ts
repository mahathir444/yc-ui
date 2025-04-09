import { App } from 'vue';
import _Trigger from './index.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type TriggerInstance = InstanceType<typeof _Trigger>;
export * from './type';

const Trigger = Object.assign(_Trigger, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Trigger.name, _Trigger);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcTrigger: typeof Trigger;
  }
}

export default Trigger;
