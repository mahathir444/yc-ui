import { App } from 'vue';
import _Drawer from './index.vue';
import { getComponentPrefix } from '@/components/_/utils/global-config';

export type DrawerInstance = InstanceType<typeof _Drawer>;
export type { DrawerProps, DrawerPlacement } from './type';

const Drawer = Object.assign(_Drawer, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Drawer.name, _Drawer);
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcDrawer: typeof Drawer;
  }
}

export default Drawer;
