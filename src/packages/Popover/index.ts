import { App } from 'vue';
import _Popover from './index.vue';
import { getComponentPrefix } from '@/packages/_utils/global-config';

export type PopoverInstance = InstanceType<typeof _Popover>;
export type { PopoverProps } from './type';

const Popover = Object.assign(_Popover, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Popover.name, _Popover);
  },
});

export default Popover;
