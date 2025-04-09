import { App } from 'vue';
import _TimePicker from './index.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type TimePickerInstance = InstanceType<typeof _TimePicker>;
export * from './type';

const TimePicker = Object.assign(_TimePicker, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _TimePicker.name, _TimePicker);
  },
});

export default TimePicker;
