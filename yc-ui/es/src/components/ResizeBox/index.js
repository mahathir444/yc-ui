import _ResizeBox from "./index.vue.js";
import { getComponentPrefix } from "../_utils/global-config.js";
const ResizeBox = Object.assign(_ResizeBox, {
  install: (app) => {
    app.component(getComponentPrefix() + _ResizeBox.name, _ResizeBox);
  }
});
export {
  ResizeBox as default
};
