import { App } from 'vue';
import _InputNumber from './index.vue';
import { getComponentPrefix } from '@/components/_utils/global-config';

export type InputNumberInstance = InstanceType<typeof _InputNumber>;
export type {
  InputNumberProps,
  InputNumberValue,
  InputNumberMode,
  ModelEvent,
} from './type';

const InputNumber = Object.assign(_InputNumber, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _InputNumber.name, _InputNumber);
  },
});

export default InputNumber;
