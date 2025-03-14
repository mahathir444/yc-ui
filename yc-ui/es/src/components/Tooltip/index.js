import _sfc_main from "./index.vue.js";
import "./index.vue2.js";
import { getComponentPrefix } from "../_utils/global-config.js";
const Tooltip = Object.assign(_sfc_main, {
  install: (app) => {
    app.component(getComponentPrefix() + _sfc_main.name, _sfc_main);
  }
});
export {
  Tooltip as default
};
