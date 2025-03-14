import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import useControlValue from "../_hooks/useControlValue.js";
import { isNumber } from "../_utils/is.js";
import { useElementSize } from "../../../node_modules/@vueuse/core/index.js";
import { vModelText } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
import { defineComponent, computed, resolveComponent, openBlock, createElementBlock, createCommentVNode, withDirectives, createElementVNode as createBaseVNode, createBlock } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref, unref, isRef } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { toDisplayString, normalizeStyle, normalizeClass } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = ["disabled", "readonly", "maxlength", "placeholder"];
const _hoisted_2 = {
  key: 1,
  class: "yc-input-word-limit"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Textarea"
  },
  __name: "index",
  props: {
    modelValue: { default: void 0 },
    defaultValue: { default: "" },
    placeholder: { default: "" },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    maxLength: { default: void 0 },
    showWordLimit: { type: Boolean, default: false },
    allowClear: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    autoSize: { type: [Boolean, Object], default: false }
  },
  emits: ["update:modelValue", "input", "change", "clear", "focus", "blur"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      modelValue,
      defaultValue,
      maxLength,
      showWordLimit,
      allowClear,
      disabled,
      readonly,
      autoSize
    } = toRefs(props);
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => {
        emits("update:modelValue", val);
      }
    );
    const showLimit = computed(
      () => isNumber(maxLength.value) && showWordLimit.value
    );
    const showClearBtn = computed(
      () => allowClear.value && !disabled.value && !readonly.value && computedValue.value.length
    );
    const mirrorRef = ref();
    const { height } = useElementSize(mirrorRef, void 0, {
      box: "border-box"
    });
    const heightRange = computed(() => {
      const _calcHeight = (rows) => {
        return rows * 14 * 1.5715 + 8;
      };
      const resizeRange = autoSize.value;
      if (!resizeRange) {
        return {
          minHeight: "",
          maxHeight: ""
        };
      }
      let minRows = (resizeRange == null ? void 0 : resizeRange.minRows) ?? 1;
      minRows = minRows <= 1 ? 1 : minRows;
      const minHeight = _calcHeight(minRows);
      if (resizeRange == null ? void 0 : resizeRange.maxRows) {
        let maxRows = (resizeRange == null ? void 0 : resizeRange.maxRows) ?? 1;
        maxRows = maxRows < minRows ? minRows : maxRows;
        const maxHeight = _calcHeight(maxRows);
        return {
          minHeight: minHeight + "px",
          height: (height.value > maxHeight ? maxHeight : height.value) + "px"
        };
      }
      return {
        minHeight: minHeight + "px",
        height: (height.value < minHeight ? minHeight : height.value) + "px"
      };
    });
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
    return (_ctx, _cache) => {
      const _component_yc_icon_button = resolveComponent("yc-icon-button");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({
          "yc-textarea-wrapper": true,
          "yc-textarea-disabled": unref(disabled),
          "yc-textarea-error": _ctx.error,
          "yc-textarea-hoverable": !unref(disabled),
          "yc-textarea-auto-size": unref(autoSize)
        })
      }, [
        unref(autoSize) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "yc-textarea-mirror",
          ref_key: "mirrorRef",
          ref: mirrorRef
        }, toDisplayString(unref(computedValue)), 513)) : createCommentVNode("", true),
        withDirectives(createBaseVNode("textarea", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(computedValue) ? computedValue.value = $event : null),
          disabled: unref(disabled),
          readonly: unref(readonly),
          maxlength: unref(maxLength),
          placeholder: _ctx.placeholder,
          style: normalizeStyle(heightRange.value),
          class: "yc-textarea",
          onInput: _cache[1] || (_cache[1] = (e) => handleEvent("input", e)),
          onChange: _cache[2] || (_cache[2] = (e) => handleEvent("change", e)),
          onFocus: _cache[3] || (_cache[3] = (e) => emits("focus", e)),
          onBlur: _cache[4] || (_cache[4] = (e) => emits("blur", e))
        }, null, 44, _hoisted_1), [
          [vModelText, unref(computedValue)]
        ]),
        showLimit.value ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(unref(computedValue).length) + " / " + toDisplayString(unref(maxLength)), 1)) : createCommentVNode("", true),
        showClearBtn.value ? (openBlock(), createBlock(_component_yc_icon_button, {
          key: 2,
          name: "close",
          class: "yc-textarea-clear-button",
          onClick: _cache[5] || (_cache[5] = (e) => handleEvent("clear", e))
        })) : createCommentVNode("", true)
      ], 2);
    };
  }
});
export {
  _sfc_main as default
};
