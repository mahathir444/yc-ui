import { App } from 'vue';
import _Scrollbar from './index.vue';
import { getComponentPrefix } from '@/utils/global-config';

export type ScrollbarInstance = InstanceType<typeof _Scrollbar>;
export type { ScrollbarProps } from './type';

const Scrollbar = Object.assign(_Scrollbar, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Scrollbar.name, _Scrollbar);
  },
});

export default Scrollbar;
