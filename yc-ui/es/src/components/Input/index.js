import _Input from "./Input.vue.js";
import _sfc_main from "./InputPassword.vue.js";
import InputSearch from "./InputSearch.vue.js";
import { getComponentPrefix } from "../_utils/global-config.js";
const Input = Object.assign(_Input, {
  search: InputSearch,
  password: _sfc_main,
  install: (app) => {
    app.component(getComponentPrefix() + _Input.name, _Input);
    app.component(getComponentPrefix() + InputSearch.name, InputSearch);
    app.component(getComponentPrefix() + _sfc_main.name, _sfc_main);
  }
});
export {
  _sfc_main as InputPassword,
  InputSearch,
  Input as default
};
