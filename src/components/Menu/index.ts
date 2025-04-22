import { App } from 'vue';
import _Menu from './Menu.vue';
import _MenuItem from './MenuItem.vue';
import _SubMenu from './SubMenu.vue';
export type MenuInstance = InstanceType<typeof _Menu>;
export type MenuItemInstance = InstanceType<typeof _MenuItem>;
export * from './type';

const Menu = Object.assign(_Menu, {
  install: (app: App) => {
    app.component('Yc' + _Menu.name, _Menu);
    app.component('Yc' + _MenuItem.name, _MenuItem);
    app.component('Yc' + _SubMenu.name, _SubMenu);
  },
});

export { _MenuItem as MenuItem };

declare module 'vue' {
  export interface GlobalComponents {
    YcMenu: typeof _Menu;
    YcSubMenu: typeof _SubMenu;
    YcMenuItem: typeof _MenuItem;
  }
}

export default Menu;
