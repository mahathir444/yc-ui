import { App } from 'vue';
import _ColorPicker from './index.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type ColorPickerInstance = InstanceType<typeof _ColorPicker>;
export * from './type';

const ColorPicker = Object.assign(_ColorPicker, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _ColorPicker.name, _ColorPicker);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcColorPicker: typeof ColorPicker;
  }
}

export default ColorPicker;
