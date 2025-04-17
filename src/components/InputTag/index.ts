import { App } from 'vue';
import _InputTag from './index.vue';
('Yc');

export type InputTagInstance = InstanceType<typeof _InputTag>;
export * from './type';

const InputTag = Object.assign(_InputTag, {
  install: (app: App) => {
    app.component('Yc' + _InputTag.name, _InputTag);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcInputTag: typeof InputTag;
  }
}

export default InputTag;
