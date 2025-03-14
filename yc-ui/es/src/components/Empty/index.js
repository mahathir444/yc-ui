import _Empty from "./index.vue.js";
import { getComponentPrefix } from "../_utils/global-config.js";
const Empty = Object.assign(_Empty, {
  install: (app) => {
    app.component(getComponentPrefix() + _Empty.name, _Empty);
  }
});
export {
  Empty as default
};
