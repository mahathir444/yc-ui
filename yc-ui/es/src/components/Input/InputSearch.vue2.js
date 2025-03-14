import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import _Input from "./Input.vue.js";
import YcButton from "../Button/Button.vue.js";
import { defineComponent, resolveComponent, openBlock, createBlock, createSlots, withCtx, mergeProps, renderSlot, createVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { ref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "InputSearch"
  },
  __name: "InputSearch",
  props: {
    searchButton: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    size: { default: "medium" },
    buttonText: { default: "" },
    buttonProps: {}
  },
  emits: ["update:modelValue", "input", "change", "press-enter", "clear", "focus", "blur", "search"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emits = __emit;
    const inputBaseRef = ref();
    __expose({
      focus() {
        var _a;
        (_a = inputBaseRef.value) == null ? void 0 : _a.focus();
      },
      blur() {
        var _a;
        (_a = inputBaseRef.value) == null ? void 0 : _a.blur();
      }
    });
    return (_ctx, _cache) => {
      const _component_yc_icon = resolveComponent("yc-icon");
      const _component_yc_icon_button = resolveComponent("yc-icon-button");
      return openBlock(), createBlock(_Input, mergeProps(_ctx.$attrs, {
        class: [
          "yc-input-search",
          _ctx.searchButton ? "yc-input-search-append" : "",
          _ctx.$attrs.class
        ],
        ref_key: "inputBaseRef",
        ref: inputBaseRef,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = (v) => _ctx.$emit("update:modelValue", v)),
        onInput: _cache[3] || (_cache[3] = (v, e) => _ctx.$emit("input", v, e)),
        onChange: _cache[4] || (_cache[4] = (v, e) => _ctx.$emit("change", v, e)),
        onClear: _cache[5] || (_cache[5] = (e) => _ctx.$emit("clear", e)),
        onFocus: _cache[6] || (_cache[6] = (e) => emits("focus", e)),
        onBlur: _cache[7] || (_cache[7] = (e) => emits("blur", e)),
        onPressEnter: _cache[8] || (_cache[8] = (e) => emits("press-enter", e))
      }), createSlots({
        suffix: withCtx(() => [
          renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
        ]),
        _: 2
      }, [
        _ctx.$slots.prefix ? {
          name: "prefix",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "prefix", {}, void 0, true)
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots.prepend ? {
          name: "prepend",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "prepend", {}, void 0, true)
          ]),
          key: "1"
        } : void 0,
        _ctx.searchButton || _ctx.$slots.append ? {
          name: "append",
          fn: withCtx(() => [
            _ctx.searchButton ? (openBlock(), createBlock(YcButton, {
              key: 0,
              type: "primary",
              onClick: _cache[0] || (_cache[0] = ($event) => {
                var _a;
                return emits("search", ((_a = inputBaseRef.value) == null ? void 0 : _a.getValue()) || "");
              })
            }, {
              icon: withCtx(() => [
                createVNode(_component_yc_icon, {
                  name: "search",
                  size: "14"
                })
              ]),
              _: 1
            })) : renderSlot(_ctx.$slots, "append", { key: 1 }, void 0, true)
          ]),
          key: "2"
        } : void 0,
        !_ctx.searchButton ? {
          name: "extra",
          fn: withCtx(() => [
            createVNode(_component_yc_icon_button, {
              name: "search",
              "font-size": "14px",
              onClick: _cache[1] || (_cache[1] = ($event) => {
                var _a;
                return emits("search", ((_a = inputBaseRef.value) == null ? void 0 : _a.getValue()) || "");
              })
            })
          ]),
          key: "3"
        } : void 0
      ]), 1040, ["class"]);
    };
  }
});
export {
  _sfc_main as default
};
