import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { SIZE_MAP } from "../_constants/index.js";
import { SIZE_CLASS, TYPE_CLASS, STATUS_CLASS, SHAPE_CLASS } from "./constants.js";
import YcSpin from "../Spin/index.vue.js";
import { toRefs, unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { defineComponent, inject, computed, openBlock, createElementBlock, renderSlot, createBlock, createCommentVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { normalizeStyle, normalizeClass } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = ["type", "disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Button"
  },
  __name: "Button",
  props: {
    type: { default: "secondary" },
    shape: { default: "square" },
    status: { default: "normal" },
    size: { default: "medium" },
    long: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    htmlType: { default: "button" }
  },
  emits: ["click", "dblclick", "contextmenu"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      loading,
      size: _size,
      disabled: _disabled,
      type: _type,
      status: _status,
      shape: _shape
    } = toRefs(props);
    const type = inject("type", _type);
    const status = inject("status", _status);
    const size = inject("size", _size);
    const shape = inject("shape", _shape);
    const disabled = inject("disabled", _disabled);
    const borderRadius = computed(() => {
      const map = {
        circle: "50%",
        round: SIZE_MAP[size.value] / 2 + "px",
        square: "2px"
      };
      return map[shape.value];
    });
    const handleEvent = (type2, e) => {
      if (disabled.value || loading.value)
        return;
      emits(type2, e);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        type: _ctx.htmlType,
        disabled: unref(disabled),
        class: normalizeClass([
          "yc-button",
          // button是否hoverable
          !unref(disabled) && !unref(loading) ? "yc-button-hoverable" : "",
          // long
          _ctx.long ? "yc-button-long" : "",
          // loading
          unref(loading) ? "yc-button-loading" : "",
          // disabled
          unref(disabled) ? "yc-button-disabled" : "",
          // size
          unref(SIZE_CLASS)[unref(size)],
          // type
          unref(TYPE_CLASS)[unref(type)],
          // status
          unref(STATUS_CLASS)[unref(status)],
          // shape
          unref(SHAPE_CLASS)[unref(shape)]
        ]),
        style: normalizeStyle({
          padding: !_ctx.$slots.default || unref(shape) == "circle" ? 0 : "",
          width: !_ctx.$slots.default || unref(shape) == "circle" ? `${unref(SIZE_MAP)[unref(size)]}px` : "fit-content",
          borderRadius: borderRadius.value
        }),
        onClick: _cache[0] || (_cache[0] = ($event) => handleEvent("click", $event)),
        onDblclick: _cache[1] || (_cache[1] = ($event) => handleEvent("dblclick", $event)),
        onContextmenu: _cache[2] || (_cache[2] = ($event) => handleEvent("contextmenu", $event))
      }, [
        _ctx.$slots.icon || unref(loading) ? (openBlock(), createElementBlock("span", {
          key: 0,
          style: normalizeStyle({
            margin: !_ctx.$slots.default ? 0 : ""
          }),
          class: "yc-button-icon"
        }, [
          !unref(loading) ? renderSlot(_ctx.$slots, "icon", { key: 0 }, void 0, true) : (openBlock(), createBlock(YcSpin, {
            key: 1,
            style: { "color": "inherit", "font-size": "inherit" }
          }))
        ], 4)) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 46, _hoisted_1);
    };
  }
});
export {
  _sfc_main as default
};
