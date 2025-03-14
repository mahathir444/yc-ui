import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { defineComponent, inject, openBlock, createElementBlock, renderSlot, createCommentVNode, createElementVNode as createBaseVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref, unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { normalizeClass } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = {
  key: 0,
  class: "yc-dropdown-option-icon"
};
const _hoisted_2 = { class: "yc-dropdown-option-content text-ellipsis" };
const _hoisted_3 = {
  key: 1,
  class: "yc-dropdown-option-suffix"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Doption"
  },
  __name: "Doption",
  props: {
    value: { type: [String, Number, Boolean] },
    disabled: { type: Boolean, default: false },
    isSubmenu: { type: Boolean, default: false }
  },
  emits: ["click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { value, disabled, isSubmenu } = toRefs(props);
    const hideOnSelect = inject("hideOnSelect", ref(false));
    const dEmits = inject("emits");
    const hide = inject("hide");
    const level = inject("level", -1);
    const curLevel = inject("curLevel", ref(0));
    const doptionRef = ref();
    const handleClick = (ev) => {
      if (disabled.value)
        return;
      emits("click", ev);
      if (isSubmenu.value)
        return;
      dEmits("select", value.value, ev);
      if (!hideOnSelect.value)
        return;
      hide();
    };
    const handleMouseenter = () => {
      curLevel.value = isSubmenu.value ? level - 1 : level;
    };
    __expose({
      getRef() {
        return doptionRef.value;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({
          "yc-dropdown-option": true,
          "yc-dropdown-option-disabled": unref(disabled),
          "yc-dropdown-option-has-suffix": _ctx.$slots.suffix
        }),
        ref_key: "doptionRef",
        ref: doptionRef,
        onClick: handleClick,
        onMouseenter: handleMouseenter
      }, [
        _ctx.$slots.icon ? (openBlock(), createElementBlock("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "icon", {}, void 0, true)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_2, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _ctx.$slots.suffix ? (openBlock(), createElementBlock("div", _hoisted_3, [
          renderSlot(_ctx.$slots, "suffix", {}, void 0, true)
        ])) : createCommentVNode("", true)
      ], 34);
    };
  }
});
export {
  _sfc_main as default
};
