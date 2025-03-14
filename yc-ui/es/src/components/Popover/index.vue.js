import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { TRANSFORM_ORIGIN_MAP } from "../Trigger/constants.js";
import YcTrigger from "../Trigger/index.vue.js";
import { defineComponent, computed, openBlock, createBlock, withCtx, mergeProps, createElementBlock, renderSlot, Fragment, createTextVNode, createCommentVNode, createElementVNode as createBaseVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { toDisplayString } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = {
  key: 0,
  class: "yc-popover-title"
};
const _hoisted_2 = { class: "'yc-popover-content'" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Popover"
  },
  __name: "index",
  props: {
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    title: { default: "" },
    content: { default: "" },
    trigger: { default: "hover" },
    position: { default: "bottom" },
    contentClass: { default: "" },
    contentStyle: { default: () => {
      return {};
    } },
    arrowClass: { default: "" },
    arrowStyle: { default: () => {
      return {};
    } },
    popupContainer: { default: "body" }
  },
  emits: ["update:popupVisible", "popup-visible-change", "show", "hide"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { contentStyle } = toRefs(props);
    const triggerPostion = ref("bottom");
    const computedContentStyle = computed(() => {
      return {
        transformOrigin: TRANSFORM_ORIGIN_MAP[triggerPostion.value],
        ...contentStyle == null ? void 0 : contentStyle.value
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcTrigger, mergeProps({
        "popup-visible": _ctx.popupVisible || void 0,
        "default-popup-visible": _ctx.defaultPopupVisible,
        trigger: _ctx.trigger,
        position: _ctx.position,
        "popup-container": _ctx.popupContainer,
        "arrow-class": `yc-popover-popup-arrow ${_ctx.arrowClass}`,
        "arrow-style": _ctx.arrowStyle,
        "content-class": `yc-popover-popup-content ${_ctx.contentClass}`,
        "content-style": computedContentStyle.value,
        "popup-offset": 10,
        "animation-name": "zoom-in-fade-out",
        "show-arrow": ""
      }, _ctx.$attrs, {
        "wrapper-class": `yc-popover ${_ctx.$attrs.wrapperClass ?? ""}`,
        onPopupVisibleChange: _cache[0] || (_cache[0] = (v) => _ctx.$emit("popup-visible-change", v)),
        "onUpdate:popupVisible": _cache[1] || (_cache[1] = (v) => _ctx.$emit("update:popupVisible", v)),
        onShow: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("show")),
        onHide: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("hide")),
        onPositionChange: _cache[4] || (_cache[4] = (v) => triggerPostion.value = v)
      }), {
        content: withCtx(() => [
          _ctx.$slots.title ? (openBlock(), createElementBlock("div", _hoisted_1, [
            _ctx.$slots.title ? renderSlot(_ctx.$slots, "title", { key: 0 }) : !_ctx.$slots.title && _ctx.title ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ], 64)) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_2, [
            _ctx.$slots.content ? renderSlot(_ctx.$slots, "content", { key: 0 }) : !_ctx.$slots.content && _ctx.content ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(_ctx.content), 1)
            ], 64)) : createCommentVNode("", true)
          ])
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["popup-visible", "default-popup-visible", "trigger", "position", "popup-container", "arrow-class", "arrow-style", "content-class", "content-style", "wrapper-class"]);
    };
  }
});
export {
  _sfc_main as default
};
