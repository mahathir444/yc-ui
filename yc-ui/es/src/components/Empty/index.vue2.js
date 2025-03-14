import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { defineComponent, resolveComponent, openBlock, createElementBlock, createElementVNode as createBaseVNode, renderSlot, createCommentVNode, createBlock } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toDisplayString } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = { class: "yc-empty" };
const _hoisted_2 = { class: "yc-empty-image" };
const _hoisted_3 = ["src"];
const _hoisted_4 = {
  key: 0,
  class: "yc-empty-description"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Empty"
  },
  __name: "index",
  props: {
    description: { default: "" },
    imgSrc: { default: "" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_yc_icon = resolveComponent("yc-icon");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          renderSlot(_ctx.$slots, "image", {}, () => [
            _ctx.imgSrc ? (openBlock(), createElementBlock("img", {
              key: 0,
              src: _ctx.imgSrc,
              alt: "图片加载失败"
            }, null, 8, _hoisted_3)) : (openBlock(), createBlock(_component_yc_icon, {
              key: 1,
              name: "empty"
            }))
          ], true)
        ]),
        _ctx.description ? (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString(_ctx.description), 1)) : createCommentVNode("", true)
      ]);
    };
  }
});
export {
  _sfc_main as default
};
