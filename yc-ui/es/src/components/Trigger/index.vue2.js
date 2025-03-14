import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { useElementBounding, useElementSize } from "../../../node_modules/@vueuse/core/index.js";
import useTriggerVisible from "../_hooks/useTriggerVisible.js";
import useTriggerPosition from "../_hooks/useTriggerPosition.js";
import { findFirstLegitChild } from "../_utils/vue-utils.js";
import { defineComponent, useSlots, computed, watchEffect, openBlock, createElementBlock, createBlock, resolveDynamicComponent, createVNode, withCtx, Teleport, Fragment, withDirectives, createElementVNode as createBaseVNode, renderSlot, createCommentVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { withModifiers, Transition, vShow } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
import { toRefs, ref, unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { normalizeClass, normalizeStyle } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Trigger"
  },
  __name: "index",
  props: {
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    trigger: { default: "hover" },
    position: { default: "bottom" },
    disabled: { type: Boolean, default: false },
    popupOffset: { default: 0 },
    popupTranslate: { default: () => [0, 0] },
    showArrow: { type: Boolean, default: false },
    popuphoverStay: { type: Boolean },
    blurToClose: { type: Boolean, default: true },
    clickToClose: { type: Boolean, default: true },
    clickOutsideToClose: { type: Boolean, default: true },
    unmountOnClose: { type: Boolean, default: true },
    wrapperClass: {},
    contentClass: { default: "" },
    contentStyle: { default: () => {
      return {};
    } },
    arrowClass: { default: "" },
    arrowStyle: { default: () => {
      return {};
    } },
    animationName: { default: "fade" },
    duration: { default: 400 },
    mouseEnterDelay: { default: 100 },
    mouseLeaveDelay: { default: 100 },
    focusDelay: { default: 0 },
    autoFitPopupWidth: { type: Boolean, default: false },
    autoFitPopupMinWidth: { type: Boolean, default: false },
    popupContainer: { default: "body" },
    renderToBody: { type: Boolean, default: true },
    autoFitPosition: { type: Boolean, default: true },
    updateAtScroll: { type: Boolean, default: true },
    preventFocus: { type: Boolean, default: false },
    alignPoint: { type: Boolean, default: false },
    scrollToClose: { type: Boolean, default: false },
    scrollToCloseDistance: { default: 0.1 },
    clickOutSideIngoreFn: {},
    mouseenterCallback: {}
  },
  emits: ["update:popupVisible", "popup-visible-change", "position-change", "show", "hide"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      popupVisible,
      defaultPopupVisible,
      trigger,
      position,
      popupTranslate,
      popupOffset,
      contentStyle,
      arrowStyle,
      clickToClose,
      blurToClose,
      clickOutsideToClose,
      mouseEnterDelay,
      mouseLeaveDelay,
      preventFocus,
      focusDelay,
      duration,
      autoFitPopupWidth,
      autoFitPopupMinWidth,
      updateAtScroll,
      scrollToClose,
      scrollToCloseDistance,
      autoFitPosition,
      alignPoint
    } = toRefs(props);
    const { clickOutSideIngoreFn, mouseenterCallback } = props;
    const contentRef = ref();
    const triggerRef = ref(null);
    const slots = useSlots();
    const vNodes = computed(() => {
      var _a;
      return ((_a = slots == null ? void 0 : slots.default) == null ? void 0 : _a.call(slots)) ?? [];
    });
    const {
      computedVisible,
      mouseX,
      mouseY,
      handleMouseenter,
      handleMouseleave,
      handleFocus,
      handleBlur,
      handleContextmenu,
      handleMousedown,
      handleClick
    } = useTriggerVisible({
      popupVisible,
      defaultPopupVisible,
      preventFocus,
      trigger,
      clickToClose,
      blurToClose,
      clickOutsideToClose,
      mouseEnterDelay,
      mouseLeaveDelay,
      focusDelay,
      contentRef,
      clickOutSideIngoreFn,
      mouseenterCallback,
      emits
    });
    const { wrapperPosition, contentCss, arrowCss } = initTrigger();
    function initTrigger() {
      if (!vNodes.value.length) {
        return {
          wrapperPosition: {},
          contentCss: {},
          arrowCss: {}
        };
      }
      const {
        left,
        top,
        bottom,
        right,
        width: triggerWidth,
        height: triggerHeight
      } = useElementBounding(triggerRef, {
        windowScroll: updateAtScroll.value
      });
      const { width: contentWidth, height: contentHeight } = useElementSize(
        contentRef,
        void 0,
        {
          box: "border-box"
        }
      );
      const { wrapperPosition: wrapperPosition2, arrowPostion } = useTriggerPosition({
        position,
        left,
        top,
        bottom,
        right,
        mouseX,
        mouseY,
        alignPoint,
        trigger,
        triggerHeight,
        triggerWidth,
        contentHeight,
        contentWidth,
        popupTranslate,
        popupOffset,
        autoFitPosition,
        emits
      });
      const contentCss2 = computed(() => {
        return {
          ...contentStyle.value,
          width: autoFitPopupWidth.value ? `${triggerWidth.value}px` : "",
          minWidth: autoFitPopupMinWidth.value ? `${triggerWidth.value}px` : ""
        };
      });
      const arrowCss2 = computed(() => {
        return {
          ...arrowPostion.value,
          ...arrowStyle.value
        };
      });
      if (scrollToClose.value) {
        let oldLeft = left.value;
        let oldTop = top.value;
        watchEffect(() => {
          if (!computedVisible.value)
            return;
          const distanceX = Math.abs(oldLeft - left.value);
          const distanceY = Math.abs(oldTop - top.value);
          if (distanceX >= scrollToCloseDistance.value || distanceY >= scrollToCloseDistance.value) {
            computedVisible.value = false;
          }
          oldLeft = left.value;
          oldTop = top.value;
        });
      }
      return {
        wrapperPosition: wrapperPosition2,
        contentCss: contentCss2,
        arrowCss: arrowCss2
      };
    }
    __expose({
      hide() {
        computedVisible.value = false;
      },
      show() {
        computedVisible.value = true;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        (openBlock(), createBlock(resolveDynamicComponent(unref(findFirstLegitChild)(vNodes.value)), {
          onClick: unref(handleClick),
          onContextmenu: withModifiers(unref(handleContextmenu), ["prevent"]),
          onMouseenter: _cache[0] || (_cache[0] = ($event) => unref(handleMouseenter)(true, $event)),
          onMouseleave: unref(handleMouseleave),
          onFocus: unref(handleFocus),
          onBlur: unref(handleBlur),
          ref_key: "triggerRef",
          ref: triggerRef
        }, null, 40, ["onClick", "onContextmenu", "onMouseleave", "onFocus", "onBlur"])),
        (openBlock(), createBlock(Teleport, {
          to: _ctx.popupContainer,
          disabled: !_ctx.renderToBody
        }, [
          createVNode(Transition, {
            name: _ctx.animationName,
            duration: unref(duration),
            onAfterLeave: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("hide")),
            onAfterEnter: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("show"))
          }, {
            default: withCtx(() => [
              !_ctx.unmountOnClose || unref(computedVisible) && !_ctx.disabled ? withDirectives((openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["yc-trigger", _ctx.wrapperClass]),
                style: normalizeStyle(unref(wrapperPosition)),
                ref_key: "contentRef",
                ref: contentRef,
                onMouseenter: _cache[1] || (_cache[1] = ($event) => unref(handleMouseenter)(false, $event)),
                onMouseleave: _cache[2] || (_cache[2] = //@ts-ignore
                (...args) => unref(handleMouseleave) && unref(handleMouseleave)(...args)),
                onMousedown: _cache[3] || (_cache[3] = //@ts-ignore
                (...args) => unref(handleMousedown) && unref(handleMousedown)(...args))
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["yc-trigger-content", _ctx.contentClass]),
                  style: normalizeStyle(unref(contentCss))
                }, [
                  renderSlot(_ctx.$slots, "content", {}, void 0, true)
                ], 6),
                _ctx.showArrow ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: normalizeClass(["yc-trigger-arrow", _ctx.arrowClass]),
                  style: normalizeStyle(unref(arrowCss))
                }, null, 6)) : createCommentVNode("", true)
              ], 38)), [
                [vShow, unref(computedVisible) && !_ctx.disabled]
              ]) : createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["name", "duration"])
        ], 8, ["to", "disabled"]))
      ], 64);
    };
  }
});
export {
  _sfc_main as default
};
