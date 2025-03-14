import YcTrigger from "./index.vue.js";
import { getComponentPrefix } from "../_utils/global-config.js";
const Trigger = Object.assign(YcTrigger, {
  install: (app) => {
    app.component(getComponentPrefix() + YcTrigger.name, YcTrigger);
  }
});
export {
  Trigger as default
};
