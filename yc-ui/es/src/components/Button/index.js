import YcButton from "./Button.vue.js";
import _sfc_main from "./ButtonGroup.vue.js";
import "./ButtonGroup.vue2.js";
import { getComponentPrefix } from "../_utils/global-config.js";
const Button = Object.assign(YcButton, {
  buttongroup: _sfc_main,
  install: (app) => {
    app.component(getComponentPrefix() + YcButton.name, YcButton);
    app.component(getComponentPrefix() + _sfc_main.name, _sfc_main);
  }
});
export {
  _sfc_main as ButtonGroup,
  Button as default
};
