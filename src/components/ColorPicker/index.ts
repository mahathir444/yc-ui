import { App } from 'vue';
import _ColorPicker from './index.vue';
('Yc');

export type ColorPickerInstance = InstanceType<typeof _ColorPicker>;
export * from './type';

const ColorPicker = Object.assign(_ColorPicker, {
  install: (app: App) => {
    app.component('Yc' + _ColorPicker.name, _ColorPicker);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcColorPicker: typeof ColorPicker;
  }
}

export default ColorPicker;
