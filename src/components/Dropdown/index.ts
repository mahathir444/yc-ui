import { App } from 'vue';
import _Dropdown from './Dropdown.vue';
import _Doption from './Doption.vue';
import _Dgroup from './Dgroup.vue';
import _DropdownButton from './DropdownButton.vue';
import _Dsubmenu from './Dsubmenu.vue';
import { getComponentPrefix } from '@shared/utils/global-config';

export type DropdownInstance = InstanceType<typeof _Dropdown>;
export type DoptionInstance = InstanceType<typeof _Doption>;
export type DgroupInstance = InstanceType<typeof _Dgroup>;
export type DropdownButtonInstance = InstanceType<typeof _Dropdown>;
export type DsubmenuInstance = InstanceType<typeof _Dsubmenu>;
export type {
  DropdownProps,
  DoptionProps,
  DsubmenuProps,
  DgroupProps,
  DropdownButtonProps,
  DoptionValue,
} from './type';

const Dropdown = Object.assign(_Dropdown, {
  option: _Doption,
  group: _Dgroup,
  button: _DropdownButton,
  submenu: _Dsubmenu,
  install: (app: App) => {
    app.component(getComponentPrefix() + _Dropdown.name, _Dropdown);
    app.component(getComponentPrefix() + _Doption.name, _Doption);
    app.component(getComponentPrefix() + _Dgroup.name, _Dgroup);
    app.component(getComponentPrefix() + _DropdownButton.name, _DropdownButton);
    app.component(getComponentPrefix() + _Dsubmenu.name, _Dsubmenu);
  },
});
export {
  _Doption as Doption,
  _Dgroup as Dgroup,
  _DropdownButton as DropdownButton,
  _Dsubmenu as Dsubmenu,
};

declare module 'vue' {
  export interface GlobalComponents {
    YcDropdown: typeof Dropdown;
    YcDropdownButton: typeof _DropdownButton;
    YcDoption: typeof _Doption;
    YcDgroup: typeof _Dgroup;
    YcDsubmenu: typeof _Dsubmenu;
  }
}

export default Dropdown;
