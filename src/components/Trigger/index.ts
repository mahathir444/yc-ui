import { App } from 'vue';
import _Trigger from './index.vue';
import { getComponentPrefix } from '@/components/_utils/global-config';

export type TriggerInstance = InstanceType<typeof _Trigger>;
export type { TriggerPostion, TriggerProps, TriggerType } from './type';

const Trigger = Object.assign(_Trigger, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Trigger.name, _Trigger);
  },
});

export default Trigger;
