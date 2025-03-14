import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { SIZE_CLASS, COLOR_CLASS, COLOR_MAP } from "./constants.js";
import YcSpin from "../Spin/index.vue.js";
import useControlValue from "../_hooks/useControlValue.js";
import { defineComponent, resolveComponent, openBlock, createElementBlock, renderSlot, createCommentVNode, createBlock, createSlots, withCtx } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { normalizeClass, normalizeStyle } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = {
  key: 0,
  class: "yc-tag-icon"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Tag"
  },
  __name: "index",
  props: {
    color: { default: "default" },
    size: { default: "medium" },
    bordered: { type: Boolean, default: false },
    visible: { type: Boolean, default: void 0 },
    defaultVisible: { type: Boolean, default: true },
    loading: { type: Boolean, default: false },
    closable: { type: Boolean, default: false },
    checkable: { type: Boolean, default: false },
    checked: { type: Boolean, default: void 0 },
    defaultChecked: { type: Boolean, default: true },
    nowrap: { type: Boolean, default: false },
    value: { default: "" }
  },
  emits: ["update:visible", "update:checked", "close", "check"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { visible, defaultVisible, checked, defaultChecked, checkable } = toRefs(props);
    const computedVisible = useControlValue(
      visible,
      defaultVisible.value,
      (val) => emits("update:visible", val)
    );
    const computedChecked = useControlValue(
      checked,
      defaultChecked.value,
      (val) => emits("update:checked", val)
    );
    const handleClose = (ev) => {
      computedVisible.value = false;
      emits("close", ev, props.value);
    };
    const handleCheck = (ev) => {
      if (checkable.value) {
        computedChecked.value = !computedChecked.value;
        emits("check", computedChecked.value, ev);
      }
    };
    return (_ctx, _cache) => {
      const _component_yc_icon_button = resolveComponent("yc-icon-button");
      return unref(computedVisible) ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass([
          "yc-tag",
          "text-ellipsis",
          unref(SIZE_CLASS)[_ctx.size],
          unref(COLOR_CLASS)[_ctx.color] ?? "yc-tag-custom-color",
          _ctx.loading ? "yc-tag-loading" : "",
          _ctx.bordered ? "yc-tag-bordered" : "",
          unref(computedChecked) ? "yc-tag-checked" : ""
        ]),
        style: normalizeStyle({
          background: unref(COLOR_CLASS)[_ctx.color] ? "" : unref(COLOR_MAP)[_ctx.color] ?? _ctx.color,
          color: ["default", "white"].includes(_ctx.color) ? "rgb(29, 33, 41)" : ""
        }),
        onClick: handleCheck
      }, [
        _ctx.$slots.icon ? (openBlock(), createElementBlock("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "icon", {}, void 0, true)
        ])) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default", {}, void 0, true),
        _ctx.closable ? (openBlock(), createBlock(_component_yc_icon_button, {
          key: 1,
          name: "close",
          "hover-size": "16px",
          "hover-color": "rgba(255, 255, 255, 0.2)",
          class: "yc-tag-close-button",
          style: { "color": "inherit" },
          onClick: handleClose
        }, createSlots({ _: 2 }, [
          _ctx.$slots.closeIcon ? {
            name: "icon",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "closeIcon", {}, void 0, true)
            ]),
            key: "0"
          } : void 0
        ]), 1024)) : createCommentVNode("", true),
        _ctx.loading ? (openBlock(), createBlock(YcSpin, {
          key: 2,
          style: { "color": "inherit", "font-size": "inherit" },
          class: "yc-tag-loading-icon"
        })) : createCommentVNode("", true)
      ], 6)) : createCommentVNode("", true);
    };
  }
});
export {
  _sfc_main as default
};
