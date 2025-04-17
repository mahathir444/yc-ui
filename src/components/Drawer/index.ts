import { App, render, h } from 'vue';
import { DrawerConfig, DrawerServiceData } from './type';
import _Drawer from './index.vue';
import _ServiceDrawer from './component/ServiceDrawer.vue';
('Yc');

export type DrawerInstance = InstanceType<typeof _Drawer>;
export * from './type';

const Drawer = Object.assign(_Drawer, {
  install: (app: App) => {
    app.component('Yc' + _Drawer.name, _Drawer);
  },
  drawerConfig: {
    id: 'ycServiceDrawerContainer',
    container: null,
  },
  open(props: DrawerConfig) {
    const drawerConfig = this.drawerConfig as DrawerServiceData;
    if (!drawerConfig.container) {
      const container = document.createElement('div');
      container.id = this.drawerConfig.id;
      drawerConfig.container = container;
      document.body.append(container);
    }
    // 关闭函数
    const close = () => {
      render(null, drawerConfig.container as HTMLDivElement);
    };
    const { onOk: _onOk, onCancel: _onCancel } = props;
    const vnode = h(_ServiceDrawer, {
      ...props,
      async onOk() {
        await _onOk?.();
        close();
      },
      async onCancel() {
        await _onCancel?.();
        close();
      },
    });
    // 渲染 VNode 到容器
    render(vnode, drawerConfig.container);
    return {
      close,
    };
  },
});

declare module 'vue' {
  export interface GlobalComponents {
    YcDrawer: typeof Drawer;
  }
}

export default Drawer;
