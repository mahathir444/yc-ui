import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import _Input from "./Input.vue.js";
import useControlValue from "../_hooks/useControlValue.js";
import { defineComponent, resolveComponent, openBlock, createBlock, createSlots, withCtx, mergeProps, renderSlot, createVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref, unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "InputPassword"
  },
  __name: "InputPassword",
  props: {
    visibility: { type: Boolean, default: void 0 },
    defaultVisibility: { type: Boolean, default: false },
    invisibleButton: { type: Boolean, default: true }
  },
  emits: ["update:modelValue", "update:visibility", "input", "change", "press-enter", "clear", "focus", "blur", "visibilityChange"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { defaultVisibility, visibility } = toRefs(props);
    const computedVisibility = useControlValue(
      visibility,
      defaultVisibility.value,
      (val) => {
        emits("update:visibility", val);
        emits("visibilityChange", val);
      }
    );
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
      const _component_yc_icon_button = resolveComponent("yc-icon-button");
      return openBlock(), createBlock(_Input, mergeProps({
        type: unref(computedVisibility) ? "text" : "password"
      }, _ctx.$attrs, {
        class: ["yc-input-password", _ctx.$attrs.class],
        ref_key: "inputBaseRef",
        ref: inputBaseRef,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = (v) => _ctx.$emit("update:modelValue", v)),
        onInput: _cache[2] || (_cache[2] = (v, e) => _ctx.$emit("input", v, e)),
        onChange: _cache[3] || (_cache[3] = (v, e) => _ctx.$emit("change", v, e)),
        onClear: _cache[4] || (_cache[4] = (e) => _ctx.$emit("clear", e)),
        onFocus: _cache[5] || (_cache[5] = (e) => emits("focus", e)),
        onBlur: _cache[6] || (_cache[6] = (e) => emits("blur", e)),
        onPressEnter: _cache[7] || (_cache[7] = (e) => emits("press-enter", e))
      }), createSlots({
        suffix: withCtx(() => [
          renderSlot(_ctx.$slots, "suffix")
        ]),
        _: 2
      }, [
        _ctx.$slots.prefix ? {
          name: "prefix",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "prefix")
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots.prepend ? {
          name: "prepend",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "prepend")
          ]),
          key: "1"
        } : void 0,
        _ctx.$slots.append ? {
          name: "append",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "append")
          ]),
          key: "2"
        } : void 0,
        _ctx.invisibleButton ? {
          name: "extra",
          fn: withCtx(() => [
            createVNode(_component_yc_icon_button, {
              name: unref(computedVisibility) ? "eye-open" : "eye-close",
              size: "14",
              onClick: _cache[0] || (_cache[0] = ($event) => computedVisibility.value = !unref(computedVisibility))
            }, null, 8, ["name"])
          ]),
          key: "3"
        } : void 0
      ]), 1040, ["type", "class"]);
    };
  }
});
export {
  _sfc_main as default
};
