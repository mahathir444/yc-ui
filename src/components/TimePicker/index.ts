import { App } from 'vue';
import _TimePicker from './index.vue';
import { getComponentPrefix } from '@/components/_utils/global-config';

export type DrawerInstance = InstanceType<typeof _TimePicker>;

export type { } from './type';

const TimePicker = Object.assign(_TimePicker, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _TimePicker.name, _TimePicker);
  },
});

export default TimePicker;
