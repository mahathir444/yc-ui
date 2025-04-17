import { App } from 'vue';
import _Layout from './Layout.vue';
import _Header from './Header.vue';
import _Footer from './Footer.vue';
import _Content from './Content.vue';
import _Sider from './Sider.vue';
('Yc');

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

export { _Sider as Sider };

declare module 'vue' {
  export interface GlobalComponents {
    YcLayout: typeof _Layout;
    YcHeader: typeof _Header;
    YcFooter: typeof _Footer;
    YcContent: typeof _Content;
    YcSider: typeof _Sider;
  }
}

export default Layout;
