import YcScrollbar from "./Scrollbar.vue.js";
import { getComponentPrefix } from "../_utils/global-config.js";
const Scrollbar = Object.assign(YcScrollbar, {
  install: (app) => {
    app.component(getComponentPrefix() + YcScrollbar.name, YcScrollbar);
  }
});
export {
  Scrollbar as default
};
