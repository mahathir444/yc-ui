import { App } from 'vue';
import _Checkbox from './Checkbox.vue';
import _CheckboxGroup from './CheckboxGroup.vue';
import { getComponentPrefix } from '@/components/_/utils/global-config';

export type CheckboxInstance = InstanceType<typeof _Checkbox>;
export type CheckboxGroupInstance = InstanceType<typeof _CheckboxGroup>;
export type {
  CheckboxProps,
  CheckboxGroupProps,
  CheckboxValue,
  CheckboxOption,
} from './type';

const Checkbox = Object.assign(_Checkbox, {
  group: _CheckboxGroup,
  install: (app: App) => {
    app.component(getComponentPrefix() + _Checkbox.name, _Checkbox);
    app.component(getComponentPrefix() + _CheckboxGroup.name, _CheckboxGroup);
  },
});
export { _CheckboxGroup as CheckboxGroup };

export default Checkbox;
