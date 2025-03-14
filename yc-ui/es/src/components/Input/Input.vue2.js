import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { SIZE_CLASS } from "./constants.js";
import { SIZE_MAP } from "../_constants/index.js";
import { isNumber } from "../_utils/is.js";
import useControlValue from "../_hooks/useControlValue.js";
import { vShow, vModelDynamic, withKeys } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
import { defineComponent, computed, resolveComponent, openBlock, createElementBlock, renderSlot, createCommentVNode, createElementVNode as createBaseVNode, withDirectives, mergeProps, createBlock } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref, unref, isRef } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { normalizeStyle, normalizeClass, toDisplayString } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = {
  key: 0,
  class: "yc-input-prepend"
};
const _hoisted_2 = {
  key: 0,
  class: "yc-input-prefix"
};
const _hoisted_3 = ["type", "disabled", "readonly", "maxlength", "placeholder"];
const _hoisted_4 = {
  key: 3,
  class: "yc-input-suffix"
};
const _hoisted_5 = {
  key: 0,
  class: "yc-input-word-limit"
};
const _hoisted_6 = {
  key: 1,
  class: "yc-input-append"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Input"
  },
  __name: "Input",
  props: {
    modelValue: { default: void 0 },
    defaultValue: { default: "" },
    size: { default: "medium" },
    allowClear: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    placeholder: { default: "" },
    maxLength: { default: void 0 },
    showWordLimit: { type: Boolean, default: false },
    inputAttrs: { default: () => {
      return {};
    } },
    type: { default: "text" },
    mode: { default: "input" },
    showInput: { type: Boolean, default: false },
    inputPlaceholder: { default: "" },
    labelValue: { default: "" }
  },
  emits: ["update:modelValue", "input", "change", "press-enter", "clear", "focus", "blur"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      size,
      showWordLimit,
      maxLength,
      allowClear,
      modelValue,
      defaultValue,
      disabled,
      readonly
    } = toRefs(props);
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => emits("update:modelValue", val)
    );
    const showLimit = computed(
      () => isNumber(maxLength.value) && showWordLimit.value
    );
    const showClearBtn = computed(
      () => allowClear.value && !disabled.value && !readonly.value && computedValue.value.length
    );
    const inputRef = ref();
    const handleEvent = (type, e) => {
      if (["input", "change"].includes(type)) {
        const target = e.target;
        const { value } = target;
        emits(type, value, e);
        if (computedValue.value == value)
          return;
        target.value = computedValue.value;
      } else {
        computedValue.value = "";
        emits("clear", e);
      }
    };
    __expose({
      focus() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.focus();
      },
      blur() {
        var _a;
        (_a = inputRef.value) == null ? void 0 : _a.blur();
      },
      getValue() {
        return computedValue.value;
      }
    });
    return (_ctx, _cache) => {
      const _component_yc_icon_button = resolveComponent("yc-icon-button");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          "yc-input-outer",
          unref(disabled) ? "yc-input-disabled" : "yc-input-hoverable",
          _ctx.error ? "yc-input-error" : "",
          unref(SIZE_CLASS)[unref(size)],
          _ctx.$slots.prepend ? "yc-input-has-prepend" : "",
          _ctx.$slots.append ? "yc-input-has-append" : ""
        ])
      }, [
        _ctx.$slots.prepend ? (openBlock(), createElementBlock("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "prepend", {}, void 0, true)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: "yc-input-wrapper",
          style: normalizeStyle({
            height: `${unref(SIZE_MAP)[unref(size)]}px`
          })
        }, [
          _ctx.$slots.prefix ? (openBlock(), createElementBlock("div", _hoisted_2, [
            renderSlot(_ctx.$slots, "prefix", {}, void 0, true)
          ])) : createCommentVNode("", true),
          withDirectives(createBaseVNode("input", mergeProps({
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(computedValue) ? computedValue.value = $event : null),
            type: _ctx.type,
            disabled: unref(disabled),
            readonly: unref(readonly),
            maxlength: unref(maxLength),
            placeholder: _ctx.mode == "select" ? _ctx.inputPlaceholder : _ctx.placeholder
          }, _ctx.inputAttrs, {
            class: "yc-input",
            ref_key: "inputRef",
            ref: inputRef,
            onInput: _cache[1] || (_cache[1] = ($event) => handleEvent("input", $event)),
            onChange: _cache[2] || (_cache[2] = ($event) => handleEvent("change", $event)),
            onFocus: _cache[3] || (_cache[3] = (e) => emits("focus", e)),
            onBlur: _cache[4] || (_cache[4] = (e) => emits("blur", e)),
            onKeydown: _cache[5] || (_cache[5] = withKeys((e) => emits("press-enter", e), ["enter"]))
          }), null, 16, _hoisted_3), [
            [vShow, _ctx.mode == "input" || _ctx.mode == "select" && _ctx.showInput],
            [vModelDynamic, unref(computedValue)]
          ]),
          _ctx.mode == "select" ? withDirectives((openBlock(), createElementBlock("div", {
            key: 1,
            style: normalizeStyle({
              color: _ctx.labelValue ? "inherit" : "rgb(134, 144, 156)"
            }),
            class: normalizeClass({
              "yc-input": true,
              "text-ellipsis": true
            })
          }, toDisplayString(_ctx.labelValue || _ctx.placeholder), 5)), [
            [vShow, !_ctx.showInput]
          ]) : createCommentVNode("", true),
          showClearBtn.value ? (openBlock(), createBlock(_component_yc_icon_button, {
            key: 2,
            name: "close",
            class: "yc-input-clear-button",
            onClick: _cache[6] || (_cache[6] = ($event) => handleEvent("clear", $event))
          })) : createCommentVNode("", true),
          _ctx.$slots.suffix || _ctx.$slots.extra || showLimit.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
            showLimit.value ? (openBlock(), createElementBlock("span", _hoisted_5, toDisplayString(unref(computedValue).length) + " / " + toDisplayString(unref(maxLength)), 1)) : createCommentVNode("", true),
            _ctx.$slots.extra ? renderSlot(_ctx.$slots, "extra", { key: 1 }, void 0, true) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
          ])) : createCommentVNode("", true)
        ], 4),
        _ctx.$slots.append ? (openBlock(), createElementBlock("div", _hoisted_6, [
          renderSlot(_ctx.$slots, "append", {}, void 0, true)
        ])) : createCommentVNode("", true)
      ], 2);
    };
  }
});
export {
  _sfc_main as default
};
