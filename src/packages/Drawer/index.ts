import { App } from 'vue';
import _Drawer from './index.vue';
import { getComponentPrefix } from '@/utils/global-config';

export type DrawerInstance = InstanceType<typeof _Drawer>;

const Drawer = Object.assign(_Drawer, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Drawer.name, _Drawer);
  },
});

export default Drawer;
