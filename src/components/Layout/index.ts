import { App } from 'vue';
import _Layout from './Layout.vue';
import _Header from './Header.vue';
import _Footer from './Footer.vue';
import _Content from './Content.vue';
import _Sider from './Sider.vue';
import { getComponentPrefix } from '@shared/utils';

export type LayoutInstance = InstanceType<typeof _Layout>;

const Layout = Object.assign(_Layout, {
  install: (app: App) => {
    app.component(getComponentPrefix() + _Layout.name, _Layout);
    app.component(getComponentPrefix() + _Header.name, _Header);
    app.component(getComponentPrefix() + _Footer.name, _Footer);
    app.component(getComponentPrefix() + _Content.name, _Content);
    app.component(getComponentPrefix() + _Sider.name, _Sider);
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
