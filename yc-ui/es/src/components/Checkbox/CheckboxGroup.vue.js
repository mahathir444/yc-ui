import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import useControlValue from "../_hooks/useControlValue.js";
import _Checkbox from "./Checkbox.vue.js";
import { defineComponent, provide, openBlock, createElementBlock, renderSlot, Fragment, renderList, createBlock, withCtx, createTextVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { normalizeClass, toDisplayString } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "CheckboxGroup"
  },
  __name: "CheckboxGroup",
  props: {
    modelValue: { default: void 0 },
    defaultValue: { default: () => [] },
    max: { default: void 0 },
    options: { default: () => [] },
    direction: { default: "horizontal" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { modelValue, defaultValue, disabled, max } = toRefs(props);
    const computedValue = useControlValue(
      modelValue,
      defaultValue.value,
      (val) => {
        emits("update:modelValue", val);
      }
    );
    provide("computedValue", computedValue);
    provide("max", max);
    provide("disabled", disabled);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({
          "yc-checkbox-group": true,
          "yc-checkbox-group-direction-horizontal": _ctx.direction == "horizontal",
          "yc-checkbox-group-direction-vertical": _ctx.direction == "vertical"
        })
      }, [
        renderSlot(_ctx.$slots, "default"),
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.options, (item) => {
          return openBlock(), createBlock(_Checkbox, {
            key: item.value,
            value: item.value,
            disabled: item.disabled,
            indeterminate: item.indeterminate
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(item.label), 1)
            ]),
            _: 2
          }, 1032, ["value", "disabled", "indeterminate"]);
        }), 128))
      ], 2);
    };
  }
});
export {
  _sfc_main as default
};
