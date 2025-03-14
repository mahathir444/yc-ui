import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import useControlValue from "../_hooks/useControlValue.js";
import { defineComponent, inject, computed, resolveComponent, openBlock, createElementBlock, createElementVNode as createBaseVNode, renderSlot, createVNode, withCtx, withDirectives } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { normalizeClass } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
import { vShow, withModifiers } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
const _hoisted_1 = ["value", "disabled", "checked"];
const _hoisted_2 = { class: "yc-checkbox-icon" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Checkbox"
  },
  __name: "Checkbox",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    defaultChecked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    value: { type: [String, Number, Boolean], default: "" },
    indeterminate: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      modelValue,
      defaultChecked,
      disabled: _disabled,
      value: checkboxValue
    } = toRefs(props);
    const computedValue = inject("computedValue", ref(void 0));
    const max = inject("max", ref(void 0));
    const tempDisabled = inject("disabled", _disabled);
    const _checked = useControlValue(
      modelValue,
      defaultChecked.value,
      (val) => {
        emits("update:modelValue", val);
      }
    );
    const computedChecked = computed(() => {
      if (!computedValue.value)
        return _checked.value;
      return computedValue.value.includes(checkboxValue.value);
    });
    const disabled = computed(() => {
      if (!max.value || !computedValue.value)
        return tempDisabled.value;
      return computedValue.value.length >= max.value && !computedChecked.value;
    });
    const handleCollect = (e) => {
      var _a;
      if (!computedValue.value) {
        _checked.value = (_a = e.target) == null ? void 0 : _a.checked;
        emits("change", _checked.value, e);
      } else {
        const { value } = checkboxValue;
        if (!computedChecked.value) {
          computedValue.value = [...computedValue.value, value];
        } else {
          computedValue.value = computedValue.value.filter((item) => item != value);
        }
      }
    };
    return (_ctx, _cache) => {
      const _component_yc_icon = resolveComponent("yc-icon");
      const _component_yc_icon_button = resolveComponent("yc-icon-button");
      return openBlock(), createElementBlock("label", {
        class: normalizeClass({
          "yc-checkbox": true,
          "yc-checkbox-hoverable": !computedChecked.value && !disabled.value,
          "yc-checkbox-disabled": disabled.value,
          "yc-checkbox-checked": computedChecked.value && !_ctx.indeterminate,
          "yc-checkbox-indeterminate": _ctx.indeterminate && !computedChecked.value
        })
      }, [
        createBaseVNode("input", {
          type: "checkbox",
          class: "yc-checkbox-target",
          value: _ctx.value,
          disabled: disabled.value,
          checked: computedChecked.value,
          onChange: handleCollect
        }, null, 40, _hoisted_1),
        renderSlot(_ctx.$slots, "checkbox", {
          checked: computedChecked.value,
          disabled: disabled.value
        }, () => [
          createVNode(_component_yc_icon_button, {
            "hover-size": "24px",
            "hover-color": computedChecked.value || disabled.value ? "transparent" : "rgb(242, 243, 245)"
          }, {
            icon: withCtx(() => [
              createBaseVNode("span", _hoisted_2, [
                withDirectives(createVNode(_component_yc_icon, {
                  name: "checked",
                  size: [8, 10]
                }, null, 512), [
                  [vShow, computedChecked.value]
                ])
              ])
            ]),
            _: 1
          }, 8, ["hover-color"]),
          createBaseVNode("span", {
            onMousedown: _cache[0] || (_cache[0] = withModifiers(() => {
            }, ["prevent"])),
            class: "yc-checkbox-label text-ellipsis"
          }, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 32)
        ], true)
      ], 2);
    };
  }
});
export {
  _sfc_main as default
};
