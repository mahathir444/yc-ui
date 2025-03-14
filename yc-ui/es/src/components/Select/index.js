import _Select from "./Select.vue.js";
import Option from "./Option.vue.js";
import Optgroup from "./Optgroup.vue.js";
import { getComponentPrefix } from "../_utils/global-config.js";
const Select = Object.assign(_Select, {
  option: Option,
  group: Optgroup,
  install: (app) => {
    app.component(getComponentPrefix() + _Select.name, _Select);
    app.component(getComponentPrefix() + Option.name, Option);
    app.component(getComponentPrefix() + Optgroup.name, Optgroup);
  }
});
export {
  Optgroup,
  Option,
  Select as default
};
