import { App } from 'vue';
import _Input from './Input.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type InputInstance = InstanceType<typeof _Input>;
export type {
  InputPasswordProps,
  InputProps,
  InputSearchProps,
  WordLength,
  WordSlice,
  InputEventType,
} from './type';

const Input = Object.assign(_Input, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Input.name, _Input);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcInput: typeof Input;
  }
}

export default Input;
