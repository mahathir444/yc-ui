import _Link from "./index.vue.js";
import { getComponentPrefix } from "../_utils/global-config.js";
const Link = Object.assign(_Link, {
  install: (app) => {
    app.component(getComponentPrefix() + _Link.name, _Link);
  }
});
export {
  Link as default
};
