import { App } from 'vue';
import _Select from './Select.vue';
import _Option from './Option.vue';
import { getComponentPrefix } from '@/components/_utils/global-config';

export type SelectInstance = InstanceType<typeof _Select>;
export type OptionInstance = InstanceType<typeof _Option>;
export type { OptionProps, SelectProps, SelectValue } from './type';

const Select = Object.assign(_Select, {
  option: Option,
  install: (app: App) => {
    app.component(getComponentPrefix() + _Select.name, _Select);
    app.component(getComponentPrefix() + _Option.name, _Option);
  },
});

export { _Option as Option };

export default Select;
