import { App } from 'vue';
import _Scrollbar from './Scrollbar.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type ScrollbarInstance = InstanceType<typeof _Scrollbar>;
export type {
  ScrollbarProps,
  ScrollbarSize,
  ScrollbarType,
  TackType,
} from './type';

const Scrollbar = Object.assign(_Scrollbar, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Scrollbar.name, _Scrollbar);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcScrollbar: typeof Scrollbar;
  }
}

export default Scrollbar;
