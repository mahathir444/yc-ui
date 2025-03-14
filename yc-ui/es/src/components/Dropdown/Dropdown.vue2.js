import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { TRANSFORM_ORIGIN_MAP } from "../Trigger/constants.js";
import YcTrigger from "../Trigger/index.vue.js";
import YcScrollbar from "../Scrollbar/Scrollbar.vue.js";
import useTriggerLevel from "../_hooks/useTriggerLevel.js";
import { defineComponent, computed, provide, openBlock, createBlock, withCtx, mergeProps, createElementVNode as createBaseVNode, createVNode, renderSlot, createElementBlock, createCommentVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref, unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
const _hoisted_1 = ["data-group-id"];
const _hoisted_2 = { class: "yc-dropdown-list" };
const _hoisted_3 = {
  key: 0,
  class: "yc-dropdown-footer"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Dropdown"
  },
  __name: "Dropdown",
  props: {
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    trigger: { default: "click" },
    position: { default: "bottom" },
    popupContainer: { default: "body" },
    hideOnSelect: { type: Boolean, default: false }
  },
  emits: ["update:popupVisible", "popup-visible-change", "show", "hide", "select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { hideOnSelect, position, trigger } = toRefs(props);
    const triggerRef = ref();
    const submenuPosition = computed(() => {
      if (!["top", "tl", "tr", "bottom", "bl", "br"].includes(position.value)) {
        return "bottom";
      }
      return position.value;
    });
    const triggerPostion = ref("bottom");
    provide("emits", emits);
    provide("hideOnSelect", hideOnSelect);
    provide("hide", () => {
      var _a;
      (_a = triggerRef.value) == null ? void 0 : _a.hide();
    });
    const { isSameGroup, level, curLevel, groupId } = useTriggerLevel(() => {
      var _a;
      if (trigger.value != "hover")
        return;
      (_a = triggerRef.value) == null ? void 0 : _a.hide();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcTrigger, mergeProps({
        "popup-offset": 4,
        "mouse-enter-delay": 150,
        "mouse-leave-delay": 150
      }, _ctx.$attrs, {
        "popup-visible": _ctx.popupVisible,
        "default-popup-visible": _ctx.defaultPopupVisible,
        trigger: unref(trigger),
        position: submenuPosition.value,
        "content-style": {
          ..._ctx.$attrs.contentStyle || {},
          transformOrigin: unref(TRANSFORM_ORIGIN_MAP)[triggerPostion.value]
        },
        "show-arrow": false,
        "click-out-side-ingore-fn": unref(isSameGroup),
        "mouseenter-callback": (isTrigger) => {
          if (isTrigger) {
            curLevel.value = unref(level);
          }
        },
        "animation-name": "slide-dynamic-origin",
        "auto-fit-popup-min-width": "",
        ref_key: "triggerRef",
        ref: triggerRef,
        onPopupVisibleChange: _cache[0] || (_cache[0] = (v) => _ctx.$emit("popup-visible-change", v)),
        "onUpdate:popupVisible": _cache[1] || (_cache[1] = (v) => _ctx.$emit("update:popupVisible", v)),
        onShow: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("show")),
        onHide: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("hide")),
        onPositionChange: _cache[4] || (_cache[4] = (v) => triggerPostion.value = v)
      }), {
        content: withCtx(() => [
          createBaseVNode("div", {
            class: "yc-dropdown",
            "data-group-id": unref(groupId)
          }, [
            createVNode(YcScrollbar, { style: { "max-height": "200px" } }, {
              default: withCtx(() => [
                createBaseVNode("div", _hoisted_2, [
                  renderSlot(_ctx.$slots, "content", {}, void 0, true)
                ])
              ]),
              _: 3
            }),
            _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_3, [
              renderSlot(_ctx.$slots, "footer", {}, void 0, true)
            ])) : createCommentVNode("", true)
          ], 8, _hoisted_1)
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ]),
        _: 3
      }, 16, ["popup-visible", "default-popup-visible", "trigger", "position", "content-style", "click-out-side-ingore-fn", "mouseenter-callback"]);
    };
  }
});
export {
  _sfc_main as default
};
