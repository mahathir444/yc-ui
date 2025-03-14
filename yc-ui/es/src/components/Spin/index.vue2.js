import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import SpinIcon from "./component/SpinIcon.vue.js";
import { defineComponent, openBlock, createElementBlock, createBlock, createSlots, withCtx, createCommentVNode, createVNode, renderSlot } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { Transition } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
import { normalizeClass, normalizeStyle } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = {
  key: 0,
  class: "yc-spin-mask"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Spin"
  },
  __name: "index",
  props: {
    size: { default: 20 },
    loading: { type: Boolean, default: false },
    dot: { type: Boolean, default: false },
    tip: { default: "" },
    hideIcon: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["yc-spin", {
          "yc-spin": true,
          "yc-spin-loading": _ctx.loading
        }]),
        style: normalizeStyle({
          fontSize: _ctx.size + "px"
        })
      }, [
        !_ctx.$slots.default ? (openBlock(), createBlock(SpinIcon, {
          key: 0,
          "hide-icon": _ctx.hideIcon,
          dot: _ctx.dot,
          tip: _ctx.tip
        }, createSlots({ _: 2 }, [
          _ctx.$slots.icon ? {
            name: "icon",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "icon", {}, void 0, true)
            ]),
            key: "0"
          } : void 0,
          _ctx.$slots.tip ? {
            name: "tip",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "tip", {}, void 0, true)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["hide-icon", "dot", "tip"])) : createCommentVNode("", true),
        createVNode(Transition, { name: "fade" }, {
          default: withCtx(() => [
            _ctx.$slots.default && _ctx.loading ? (openBlock(), createElementBlock("div", _hoisted_1, [
              createVNode(SpinIcon, {
                "hide-icon": _ctx.hideIcon,
                dot: _ctx.dot,
                tip: _ctx.tip
              }, createSlots({ _: 2 }, [
                _ctx.$slots.icon ? {
                  name: "icon",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "icon", {}, void 0, true)
                  ]),
                  key: "0"
                } : void 0,
                _ctx.$slots.tip ? {
                  name: "tip",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "tip", {}, void 0, true)
                  ]),
                  key: "1"
                } : void 0
              ]), 1032, ["hide-icon", "dot", "tip"])
            ])) : createCommentVNode("", true)
          ]),
          _: 3
        }),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 6);
    };
  }
});
export {
  _sfc_main as default
};
