import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { defineComponent, openBlock, createElementBlock, createElementVNode as createBaseVNode, renderSlot, Fragment, createTextVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toDisplayString } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = { class: "yc-option-group-label text-ellipsis" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Optgroup"
  },
  __name: "Optgroup",
  props: {
    label: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1, [
          _ctx.$slots.label ? renderSlot(_ctx.$slots, "label", { key: 0 }, void 0, true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(_ctx.label), 1)
          ], 64))
        ]),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 64);
    };
  }
});
export {
  _sfc_main as default
};
