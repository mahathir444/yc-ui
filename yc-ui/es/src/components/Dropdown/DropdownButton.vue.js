import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import _Dropdown from "./Dropdown.vue.js";
import YcButton from "../Button/Button.vue.js";
import _sfc_main$1 from "../Button/ButtonGroup.vue.js";
import "../Button/ButtonGroup.vue2.js";
import { normalizeProps } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
import { defineComponent, resolveComponent, openBlock, createBlock, withCtx, createVNode, renderSlot, mergeProps, guardReactiveProps } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "DropdownButton"
  },
  __name: "DropdownButton",
  props: {
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    trigger: { default: "click" },
    position: { default: "br" },
    popupContainer: { default: "body" },
    disabled: { type: Boolean, default: false },
    type: { default: "secondary" },
    size: { default: "medium" },
    buttonProps: { default: () => {
      return {};
    } },
    hideOnSelect: { type: Boolean, default: true }
  },
  emits: ["popup-visible-change", "click", "select"],
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_yc_icon = resolveComponent("yc-icon");
      return openBlock(), createBlock(_sfc_main$1, {
        disabled: _ctx.disabled,
        type: _ctx.type,
        size: _ctx.size
      }, {
        default: withCtx(() => [
          createVNode(YcButton, mergeProps(_ctx.buttonProps, {
            onClick: _cache[0] || (_cache[0] = (ev) => _ctx.$emit("click", ev))
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16),
          createVNode(_Dropdown, mergeProps({
            "popup-visible": _ctx.popupVisible,
            "default-popup-visible": _ctx.defaultPopupVisible,
            trigger: _ctx.trigger,
            position: _ctx.position,
            "popup-container": _ctx.popupContainer,
            "hide-on-select": _ctx.hideOnSelect,
            disabled: _ctx.disabled
          }, _ctx.$attrs, {
            onSelect: _cache[1] || (_cache[1] = (v) => _ctx.$emit("select", v)),
            onPopupVisibleChange: _cache[2] || (_cache[2] = (v) => _ctx.$emit("popup-visible-change", v))
          }), {
            content: withCtx(() => [
              renderSlot(_ctx.$slots, "content")
            ]),
            default: withCtx(() => [
              createVNode(YcButton, normalizeProps(guardReactiveProps(_ctx.buttonProps)), {
                icon: withCtx(() => [
                  renderSlot(_ctx.$slots, "icon", {}, () => [
                    createVNode(_component_yc_icon, { name: "more" })
                  ])
                ]),
                _: 3
              }, 16)
            ]),
            _: 3
          }, 16, ["popup-visible", "default-popup-visible", "trigger", "position", "popup-container", "hide-on-select", "disabled"])
        ]),
        _: 3
      }, 8, ["disabled", "type", "size"]);
    };
  }
});
export {
  _sfc_main as default
};
