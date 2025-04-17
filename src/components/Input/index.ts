import { App } from 'vue';
import _Input from './index.vue';
('Yc');

export type InputInstance = InstanceType<typeof _Input>;
export * from './type';

const Input = Object.assign(_Input, {
  install: (app: App) => {
    app.component('Yc' + _Input.name, _Input);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcInput: typeof Input;
  }
}

export default Input;
