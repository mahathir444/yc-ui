import YcSpin from "./index.vue.js";
import { getComponentPrefix } from "../_utils/global-config.js";
const Spin = Object.assign(YcSpin, {
  install: (app) => {
    app.component(getComponentPrefix() + YcSpin.name, YcSpin);
  }
});
export {
  Spin as default
};
