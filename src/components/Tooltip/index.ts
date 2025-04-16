import { App } from 'vue';
import _Tooltip from './index.vue';
import { getComponentPrefix } from '@shared/utils';

export type TooltipInstance = InstanceType<typeof _Tooltip>;
export * from './type';

const Tooltip = Object.assign(_Tooltip, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Tooltip.name, _Tooltip);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcTooltip: typeof Tooltip;
  }
}

export default Tooltip;
