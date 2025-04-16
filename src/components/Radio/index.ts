import { App } from 'vue';
import _Radio from './Radio.vue';
import _RadioGroup from './RadioGroup.vue';
import { getComponentPrefix } from '@shared/utils';

export type RadioInstance = InstanceType<typeof _Radio>;
export type RadioGroupInstance = InstanceType<typeof _RadioGroup>;
export * from './type';
const Radio = Object.assign(_Radio, {
  group: _RadioGroup,
  install: (app: App) => {
    app.component(getComponentPrefix() + _Radio.name, _Radio);
    app.component(getComponentPrefix() + _RadioGroup.name, _RadioGroup);
  },
});
export { _RadioGroup as RadioGroup };

declare module 'vue' {
  export interface GlobalComponents {
    YcRadio: typeof Radio;
    YcRadioGroup: typeof _RadioGroup;
  }
}

export default Radio;
