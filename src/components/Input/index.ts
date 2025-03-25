import { App } from 'vue';
import _Input from './Input.vue';
import _InputPassword from './InputPassword.vue';
import _InputSearch from './InputSearch.vue';
import { getComponentPrefix } from '@/components/_/utils/global-config';

export type InputInstance = InstanceType<typeof _Input>;
export type InputSearchInstance = InstanceType<typeof _InputSearch>;
export type InputPasswordInstance = InstanceType<typeof _InputPassword>;
export type {
  InputPasswordProps,
  InputProps,
  InputSearchProps,
  WordLength,
  WordSlice,
  InputEventType,
} from './type';

const Input = Object.assign(_Input, {
  search: _InputSearch,
  password: _InputPassword,
  install: (app: App) => {
    app.component(getComponentPrefix() + _Input.name, _Input);
    app.component(getComponentPrefix() + _InputSearch.name, _InputSearch);
    app.component(getComponentPrefix() + _InputPassword.name, _InputPassword);
  },
});
export { _InputSearch as InputSearch, _InputPassword as InputPassword };

export default Input;
