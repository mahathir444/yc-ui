import "../../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import DotIcon from "./DotIcon.vue.js";
import { defineComponent, resolveComponent, openBlock, createElementBlock, renderSlot, createCommentVNode, Fragment, createBlock, createTextVNode } from "../../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toDisplayString } from "../../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = {
  key: 0,
  class: "yc-spin-icon"
};
const _hoisted_2 = {
  key: 1,
  class: "yc-spin-tip"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SpinIcon",
  props: {
    dot: { type: Boolean },
    tip: {},
    hideIcon: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_yc_icon = resolveComponent("yc-icon");
      return openBlock(), createElementBlock(Fragment, null, [
        !_ctx.hideIcon ? (openBlock(), createElementBlock("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "icon", {}, () => [
            !_ctx.dot ? (openBlock(), createBlock(_component_yc_icon, {
              key: 0,
              name: "loading"
            })) : (openBlock(), createBlock(DotIcon, { key: 1 }))
          ], true)
        ])) : createCommentVNode("", true),
        _ctx.tip ? (openBlock(), createElementBlock("div", _hoisted_2, [
          renderSlot(_ctx.$slots, "tip", {}, () => [
            createTextVNode(toDisplayString(_ctx.tip), 1)
          ], true)
        ])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
export {
  _sfc_main as default
};
