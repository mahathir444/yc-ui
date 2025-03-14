import _Textarea from "./index.vue.js";
import { getComponentPrefix } from "../_utils/global-config.js";
const Textarea = Object.assign(_Textarea, {
  install: (app) => {
    app.component(getComponentPrefix() + _Textarea.name, _Textarea);
  }
});
export {
  Textarea as default
};
