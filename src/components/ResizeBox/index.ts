import { App } from 'vue';
import _ResizeBox from './index.vue';
import { getComponentPrefix } from '@shared/utils';

export type ResizeBoxInstance = InstanceType<typeof _ResizeBox>;

export * from './type';

const ResizeBox = Object.assign(_ResizeBox, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _ResizeBox.name, _ResizeBox);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcResizeBox: typeof ResizeBox;
  }
}

export default ResizeBox;
