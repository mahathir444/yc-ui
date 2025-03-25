import { App } from 'vue';
import _Scrollbar from './Scrollbar.vue';
import { getComponentPrefix } from '@/components/_/utils/global-config';

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

export default Scrollbar;
