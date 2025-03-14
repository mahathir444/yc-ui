import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import _Checkbox from "../Checkbox/Checkbox.vue.js";
import { defineComponent, inject, computed, onMounted, withDirectives, openBlock, createElementBlock, renderSlot, createCommentVNode, createBlock, withCtx, createTextVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref, unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { vShow } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
import { toDisplayString, normalizeClass } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = {
  key: 0,
  class: "yc-select-option-icon"
};
const _hoisted_2 = {
  key: 3,
  class: "yc-select-option-suffix"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Option"
  },
  __name: "Option",
  props: {
    label: { default: "" },
    value: { type: [String, Number, Boolean], default: "" },
    disabled: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { label, value: optionValue, disabled } = toRefs(props);
    const option = { ...props };
    const dEmits = inject("emits");
    const filterOption = inject("filterOption");
    const multiple = inject("multiple", ref(false));
    const limit = inject("limit", ref(0));
    const computedValue = inject("computedValue");
    const computedInputValue = inject(
      "computedInputValue"
    );
    const computedVisible = inject(
      "computedVisible"
    );
    const curIndex = computed(() => {
      return computedValue.value.findIndex(
        (item) => item == optionValue.value
      );
    });
    const handleSingle = () => {
      if (disabled.value)
        return;
      computedValue.value = optionValue.value;
      computedVisible.value = false;
    };
    const handleMulti = (v) => {
      const curValue = computedValue.value;
      const { value } = optionValue;
      if (!v) {
        computedValue.value = curValue.filter((item) => item != value);
      }
      if (limit.value > 0 && curValue.length == limit.value) {
        return dEmits("exceed-limit", value);
      }
      computedValue.value = [...curValue, value];
    };
    onMounted(() => {
      const optionList = inject("optionList");
      optionList.value.push(option);
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", {
        class: normalizeClass({
          "yc-select-option": true,
          "yc-select-option-disabled": unref(disabled)
        })
      }, [
        _ctx.$slots.icon ? (openBlock(), createElementBlock("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "icon", {}, void 0, true)
        ])) : createCommentVNode("", true),
        unref(multiple) ? (openBlock(), createBlock(_Checkbox, {
          key: 1,
          class: "yc-select-option-content",
          "model-value": curIndex.value != -1,
          "onUpdate:modelValue": handleMulti
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(unref(label)), 1)
          ]),
          _: 1
        }, 8, ["model-value"])) : (openBlock(), createElementBlock("div", {
          key: 2,
          class: "yc-select-option-content text-ellipsis",
          onClick: handleSingle
        }, toDisplayString(unref(label)), 1)),
        _ctx.$slots.suffix ? (openBlock(), createElementBlock("div", _hoisted_2, [
          renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
        ])) : createCommentVNode("", true)
      ], 2)), [
        [vShow, unref(filterOption)(unref(computedInputValue), option)]
      ]);
    };
  }
});
export {
  _sfc_main as default
};
