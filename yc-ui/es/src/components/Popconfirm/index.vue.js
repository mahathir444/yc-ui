import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { TRANSFORM_ORIGIN_MAP } from "../Trigger/constants.js";
import { TYPE_CLASS } from "./constants.js";
import YcTrigger from "../Trigger/index.vue.js";
import YcButton from "../Button/Button.vue.js";
import { defineComponent, computed, resolveComponent, openBlock, createBlock, withCtx, mergeProps, createElementVNode as createBaseVNode, renderSlot, createElementBlock, createTextVNode, Fragment, createVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref, unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { normalizeClass, toDisplayString } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = { class: "yc-popconfirm-body" };
const _hoisted_2 = { class: "yc-popconfirm-content" };
const _hoisted_3 = { class: "yc-popconfirm-footer" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Popconfirm"
  },
  __name: "index",
  props: {
    content: { default: "" },
    position: { default: "bottom" },
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    type: { default: "info" },
    okText: { default: "确定" },
    cancelText: { default: "取消" },
    okLoading: { type: Boolean, default: false },
    okButtonProps: { default: () => {
      return {};
    } },
    cancelButtonProps: { default: () => {
      return {};
    } },
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
  emits: ["update:popupVisible", "popup-visible-change", "show", "hide", "ok", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { contentStyle } = toRefs(props);
    const triggerPostion = ref("bottom");
    const computedContentStyle = computed(() => {
      return {
        transformOrigin: TRANSFORM_ORIGIN_MAP[triggerPostion.value],
        ...contentStyle == null ? void 0 : contentStyle.value
      };
    });
    const triggerRef = ref();
    const handleOk = () => {
      var _a;
      emits("ok");
      (_a = triggerRef.value) == null ? void 0 : _a.hide();
    };
    const handleCancel = () => {
      var _a;
      emits("cancel");
      (_a = triggerRef.value) == null ? void 0 : _a.hide();
    };
    return (_ctx, _cache) => {
      const _component_yc_icon = resolveComponent("yc-icon");
      return openBlock(), createBlock(YcTrigger, mergeProps({
        position: _ctx.position,
        "popup-visible": _ctx.popupVisible,
        "default-popup-visible": _ctx.defaultPopupVisible,
        "popup-container": _ctx.popupContainer,
        "arrow-class": `${_ctx.arrowClass} yc-popoconfirm-popup-arrow `,
        "arrow-style": _ctx.arrowStyle,
        "content-class": `${_ctx.contentClass} yc-popconfirm-popup-content`,
        "content-style": computedContentStyle.value,
        "popup-offset": 10,
        "animation-name": "zoom-in-fade-out",
        trigger: "click",
        "show-arrow": ""
      }, _ctx.$attrs, {
        "wrapper-class": `yc-popoconfirm ${_ctx.$attrs.wrapperClass ?? ""}`,
        ref_key: "triggerRef",
        ref: triggerRef,
        onPopupVisibleChange: _cache[0] || (_cache[0] = (v) => _ctx.$emit("popup-visible-change", v)),
        "onUpdate:popupVisible": _cache[1] || (_cache[1] = (v) => _ctx.$emit("update:popupVisible", v)),
        onShow: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("show")),
        onHide: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("hide")),
        onPositionChange: _cache[4] || (_cache[4] = (v) => triggerPostion.value = v)
      }), {
        content: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", {
              class: normalizeClass(["yc-popconfirm-icon", unref(TYPE_CLASS)[_ctx.type]])
            }, [
              _ctx.$slots.icon ? renderSlot(_ctx.$slots, "icon", { key: 0 }) : (openBlock(), createBlock(_component_yc_icon, {
                key: 1,
                name: _ctx.type
              }, null, 8, ["name"]))
            ], 2),
            createBaseVNode("div", _hoisted_2, [
              _ctx.$slots.content ? renderSlot(_ctx.$slots, "content", { key: 0 }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(_ctx.content), 1)
              ], 64))
            ])
          ]),
          createBaseVNode("div", _hoisted_3, [
            createVNode(YcButton, mergeProps({ size: "mini" }, _ctx.cancelButtonProps, { onClick: handleCancel }), {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.cancelText), 1)
              ]),
              _: 1
            }, 16),
            createVNode(YcButton, mergeProps({
              size: "mini",
              type: "primary",
              loading: _ctx.okLoading
            }, _ctx.okButtonProps, { onClick: handleOk }), {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.okText), 1)
              ]),
              _: 1
            }, 16, ["loading"])
          ])
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["position", "popup-visible", "default-popup-visible", "popup-container", "arrow-class", "arrow-style", "content-class", "content-style", "wrapper-class"]);
    };
  }
});
export {
  _sfc_main as default
};
