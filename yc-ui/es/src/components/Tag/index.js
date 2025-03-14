import _Tag from "./index.vue.js";
import { getComponentPrefix } from "../_utils/global-config.js";
const Tag = Object.assign(_Tag, {
  install: (app) => {
    app.component(getComponentPrefix() + _Tag.name, _Tag);
  }
});
export {
  Tag as default
};
