import _Drawer from "./index.vue.js";
import { getComponentPrefix } from "../_utils/global-config.js";
const Drawer = Object.assign(_Drawer, {
  install: (app) => {
    app.component(getComponentPrefix() + _Drawer.name, _Drawer);
  }
});
export {
  Drawer as default
};
