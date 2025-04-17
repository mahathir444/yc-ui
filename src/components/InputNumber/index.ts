import { App } from 'vue';
import _InputNumber from './index.vue';
('Yc');

export type InputNumberInstance = InstanceType<typeof _InputNumber>;
export * from './type';

const InputNumber = Object.assign(_InputNumber, {
  install: (app: App) => {
    app.component('Yc' + _InputNumber.name, _InputNumber);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcInputNumber: typeof InputNumber;
  }
}

export default InputNumber;
