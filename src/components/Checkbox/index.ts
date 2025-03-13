import { App } from 'vue';
import _Checkbox from './index.vue';
import { getComponentPrefix } from '@/components/_utils/global-config';

export type CheckboxInstance = InstanceType<typeof _Checkbox>;

export type { CheckboxProps } from './type';

const Checkbox = Object.assign(_Checkbox, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Checkbox.name, _Checkbox);
  },
});

export default Checkbox;
