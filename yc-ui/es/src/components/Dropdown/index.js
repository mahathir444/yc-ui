import _Dropdown from "./Dropdown.vue.js";
import Doption from "./Doption.vue.js";
import Dgroup from "./Dgroup.vue.js";
import _sfc_main from "./DropdownButton.vue.js";
import Dsubmenu from "./Dsubmenu.vue.js";
import { getComponentPrefix } from "../_utils/global-config.js";
const Dropdown = Object.assign(_Dropdown, {
  option: Doption,
  group: Dgroup,
  button: _sfc_main,
  submenu: Dsubmenu,
  install: (app) => {
    app.component(getComponentPrefix() + _Dropdown.name, _Dropdown);
    app.component(getComponentPrefix() + Doption.name, Doption);
    app.component(getComponentPrefix() + Dgroup.name, Dgroup);
    app.component(getComponentPrefix() + _sfc_main.name, _sfc_main);
    app.component(getComponentPrefix() + Dsubmenu.name, Dsubmenu);
  }
});
export {
  Dgroup,
  Doption,
  _sfc_main as DropdownButton,
  Dsubmenu,
  Dropdown as default
};
