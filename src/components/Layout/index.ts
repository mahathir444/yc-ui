import { App } from 'vue';
import _Layout from './Layout.vue';
import _Header from './LayoutHeader.vue';
import _Footer from './LayoutFooter.vue';
import _Content from './LayoutContent.vue';
import _Sider from './LayoutSider.vue';
export type LayoutInstance = InstanceType<typeof _Layout>;

const Layout = Object.assign(_Layout, {
  install: (app: App) => {
    app.component('Yc' + _Layout.name, _Layout);
    app.component('Yc' + _Header.name, _Header);
    app.component('Yc' + _Footer.name, _Footer);
    app.component('Yc' + _Content.name, _Content);
    app.component('Yc' + _Sider.name, _Sider);
  },
});

export {
  _Sider as LayoutSider,
  _Footer as LayoutFooter,
  _Content as LayoutContent,
};

declare module 'vue' {
  export interface GlobalComponents {
    YcLayout: typeof _Layout;
    YcLayoutHeader: typeof _Header;
    YcLayoutFooter: typeof _Footer;
    YcLayoutContent: typeof _Content;
    YcLayoutSider: typeof _Sider;
  }
}

export default Layout;
