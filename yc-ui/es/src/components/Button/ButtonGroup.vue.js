import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { GROUP_TYPE_CLASS, GROUP_STAUTS_CLASS } from "./constants.js";
import { defineComponent, provide, openBlock, createElementBlock, renderSlot } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { normalizeClass } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ButtonGroup"
  },
  __name: "ButtonGroup",
  props: {
    type: { default: "secondary" },
    status: { default: "normal" },
    shape: { default: "square" },
    size: { default: "medium" },
    disabled: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { type, status, size, shape, disabled } = toRefs(props);
    provide("type", type);
    provide("status", status);
    provide("size", size);
    provide("shape", shape);
    provide("disabled", disabled);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-button-group",
          unref(GROUP_TYPE_CLASS)[unref(type)],
          unref(GROUP_STAUTS_CLASS)[unref(status)]
        ])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
export {
  _sfc_main as default
};
