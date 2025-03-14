import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { TRANSFORM_ORIGIN_MAP } from "../Trigger/constants.js";
import YcTrigger from "../Trigger/index.vue.js";
import { defineComponent, computed, openBlock, createBlock, withCtx, mergeProps, createElementVNode as createBaseVNode, renderSlot } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Tooltip"
  },
  __name: "index",
  props: {
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    content: { default: "" },
    position: { default: "bottom" },
    mini: { type: Boolean, default: false },
    backgroundColor: { default: "rgb(29,33,41)" },
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
    const { arrowStyle, contentStyle, backgroundColor } = toRefs(props);
    const triggerPostion = ref("bottom");
    const computedContentStyle = computed(() => {
      return {
        transformOrigin: TRANSFORM_ORIGIN_MAP[triggerPostion.value],
        backgroundColor: backgroundColor.value,
        ...contentStyle.value
      };
    });
    const computedArrowStyle = computed(() => {
      return {
        backgroundColor: backgroundColor.value,
        ...arrowStyle.value
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(YcTrigger, mergeProps({
        "popup-visible": _ctx.popupVisible,
        "default-popup-visible": _ctx.defaultPopupVisible,
        "popup-container": _ctx.popupContainer,
        position: _ctx.position,
        "arrow-class": `yc-tooltip-popup-arrow ${_ctx.arrowClass}`,
        "arrow-style": computedArrowStyle.value,
        "content-class": `yc-tooltip-popup-content ${_ctx.contentClass} ${_ctx.mini ? "yc-tooltip-mini" : ""}`,
        "content-style": computedContentStyle.value,
        "popup-offset": 10,
        "animation-name": "zoom-in-fade-out",
        "show-arrow": ""
      }, _ctx.$attrs, {
        "wrapper-class": `yc-tooltip ${_ctx.$attrs.wrapperClass ?? ""}`,
        onPopupVisibleChange: _cache[0] || (_cache[0] = (v) => _ctx.$emit("popup-visible-change", v)),
        "onUpdate:popupVisible": _cache[1] || (_cache[1] = (v) => _ctx.$emit("update:popupVisible", v)),
        onShow: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("show")),
        onHide: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("hide")),
        onPositionChange: _cache[4] || (_cache[4] = (v) => triggerPostion.value = v)
      }), {
        content: withCtx(() => [
          createBaseVNode("div", null, [
            renderSlot(_ctx.$slots, "content")
          ])
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["popup-visible", "default-popup-visible", "popup-container", "position", "arrow-class", "arrow-style", "content-class", "content-style", "wrapper-class"]);
    };
  }
});
export {
  _sfc_main as default
};
