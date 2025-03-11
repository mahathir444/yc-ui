import { App } from 'vue';
import _Tooltip from './index.vue';
import { getComponentPrefix } from '@/components/_utils/global-config';

export type TooltipInstance = InstanceType<typeof _Tooltip>;
export type { TooltipProps } from './type';

const Tooltip = Object.assign(_Tooltip, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Tooltip.name, _Tooltip);
  },
});

export default Tooltip;
