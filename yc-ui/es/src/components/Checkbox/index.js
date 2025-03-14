import _Checkbox from "./Checkbox.vue.js";
import _sfc_main from "./CheckboxGroup.vue.js";
import "./CheckboxGroup.vue2.js";
import { getComponentPrefix } from "../_utils/global-config.js";
const Checkbox = Object.assign(_Checkbox, {
  group: _sfc_main,
  install: (app) => {
    app.component(getComponentPrefix() + _Checkbox.name, _Checkbox);
    app.component(getComponentPrefix() + _sfc_main.name, _sfc_main);
  }
});
export {
  _sfc_main as CheckboxGroup,
  Checkbox as default
};
