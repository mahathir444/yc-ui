import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { STATUS_CLASS } from "./constants.js";
import YcSpin from "../Spin/index.vue.js";
import { defineComponent, computed, openBlock, createElementBlock, renderSlot, createBlock, createCommentVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { normalizeClass } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = ["href"];
const _hoisted_2 = {
  key: 0,
  class: "yc-link-icon"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Link"
  },
  __name: "index",
  props: {
    href: { default: "" },
    status: { default: "normal" },
    hoverable: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false }
  },
  emits: ["click", "dblclick", "contextmenu"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { disabled, loading, href } = toRefs(props);
    const resultHref = computed(() => {
      if (loading.value || disabled.value)
        return "javascript:void(0)";
      return href.value || "javascript:void(0)";
    });
    const handleEvent = (type, e) => {
      if (disabled.value || loading.value)
        return;
      emits(type, e);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("a", {
        href: resultHref.value,
        class: normalizeClass([
          "yc-link",
          // link是否hoverable
          _ctx.hoverable && !unref(disabled) && !unref(loading) ? "yc-link-hoverable" : "",
          // loading
          unref(loading) ? "yc-link-loading" : "",
          // disabled
          unref(disabled) ? "yc-link-disabled" : "",
          // status
          unref(STATUS_CLASS)[_ctx.status]
        ]),
        onClick: _cache[0] || (_cache[0] = ($event) => handleEvent("click", $event)),
        onDblclick: _cache[1] || (_cache[1] = ($event) => handleEvent("dblclick", $event)),
        onContextmenu: _cache[2] || (_cache[2] = ($event) => handleEvent("contextmenu", $event))
      }, [
        _ctx.$slots.icon || unref(loading) ? (openBlock(), createElementBlock("span", _hoisted_2, [
          !unref(loading) ? renderSlot(_ctx.$slots, "icon", { key: 0 }, void 0, true) : (openBlock(), createBlock(YcSpin, {
            key: 1,
            style: { "color": "inherit", "font-size": "inherit" }
          }))
        ])) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 42, _hoisted_1);
    };
  }
});
export {
  _sfc_main as default
};
