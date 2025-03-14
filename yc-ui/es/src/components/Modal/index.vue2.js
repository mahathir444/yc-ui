import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import useModalDraggable from "../_hooks/useModalDraggable.js";
import useCloseCompt from "../_hooks/useCloseCompt.js";
import YcButton from "../Button/Button.vue.js";
import { defineComponent, computed, resolveComponent, openBlock, createBlock, withDirectives, createElementBlock, createVNode, withCtx, createElementVNode as createBaseVNode, createCommentVNode, Teleport, renderSlot, mergeProps, createTextVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref, unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { vShow, Transition, withModifiers } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
import { normalizeStyle, normalizeClass, toDisplayString } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = {
  key: 0,
  class: "yc-modal-container"
};
const _hoisted_2 = {
  key: 0,
  class: "yc-modal-footer"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Modal"
  },
  __name: "index",
  props: {
    visible: { type: Boolean, default: void 0 },
    defaultVisible: { type: Boolean, default: false },
    width: { default: 520 },
    top: { default: 100 },
    mask: { type: Boolean, default: true },
    title: { default: "" },
    titleAlign: { default: "center" },
    alignCenter: { type: Boolean, default: true },
    unmountOnClose: { type: Boolean, default: false },
    maskClosable: { type: Boolean, default: true },
    hideCancel: { type: Boolean, default: false },
    closable: { type: Boolean, default: true },
    okText: { default: "确认" },
    cancelText: { default: "取消" },
    okLoading: { type: Boolean, default: false },
    okButtonProps: { default: () => {
      return {};
    } },
    cancelButtonProps: { default: () => {
      return {};
    } },
    footer: { type: Boolean, default: true },
    renderToBody: { type: Boolean, default: true },
    popupContainer: { default: "body" },
    maskStyle: { default: () => {
      return {};
    } },
    modalClass: { default: "" },
    modalStyle: { default: () => {
      return {};
    } },
    escToClose: { type: Boolean, default: true },
    draggable: { type: Boolean, default: false },
    fullscreen: { type: Boolean, default: false },
    maskAnimationName: { default: "fade" },
    modalAnimationName: { default: "zoom-modal" },
    bodyClass: { default: "" },
    bodyStyle: { default: () => {
      return {};
    } },
    hideTitle: { type: Boolean, default: false }
  },
  emits: ["update:visible", "ok", "cancel", "open", "beforeOpen", "close", "beforeClose"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      visible,
      defaultVisible,
      width,
      top,
      alignCenter,
      maskClosable,
      escToClose,
      modalStyle,
      fullscreen,
      draggable
    } = toRefs(props);
    const { outerVisible, innerVisible, closeType, handleClose, handleAfterLeave } = useCloseCompt(emits, {
      visible,
      defaultVisible,
      escToClose,
      maskClosable
    });
    const headerRef = ref();
    const modalRef = ref();
    const { dragStyle, isDraggable } = useModalDraggable({
      visible: innerVisible,
      draggable,
      fullscreen,
      alignCenter,
      top,
      triggerRef: headerRef,
      modalRef
    });
    const modalCss = computed(() => {
      return {
        width: fullscreen.value ? "100%" : width.value + "px",
        ...dragStyle.value,
        ...modalStyle.value
      };
    });
    return (_ctx, _cache) => {
      const _component_yc_icon_button = resolveComponent("yc-icon-button");
      return openBlock(), createBlock(Teleport, {
        to: _ctx.popupContainer,
        disabled: !_ctx.renderToBody
      }, [
        !_ctx.unmountOnClose || unref(outerVisible) ? withDirectives((openBlock(), createElementBlock("div", _hoisted_1, [
          createVNode(Transition, {
            name: _ctx.maskAnimationName,
            appear: ""
          }, {
            default: withCtx(() => [
              _ctx.mask ? withDirectives((openBlock(), createElementBlock("div", {
                key: 0,
                class: "yc-modal-mask",
                style: normalizeStyle(_ctx.maskStyle)
              }, null, 4)), [
                [vShow, unref(innerVisible)]
              ]) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["name"]),
          createBaseVNode("div", {
            class: "yc-modal-wrapper",
            onClick: _cache[6] || (_cache[6] = ($event) => unref(handleClose)("mask"))
          }, [
            createVNode(Transition, {
              name: _ctx.modalAnimationName,
              appear: "",
              onBeforeEnter: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("beforeOpen")),
              onBeforeLeave: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("beforeClose", unref(closeType))),
              onAfterEnter: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("open")),
              onAfterLeave: unref(handleAfterLeave)
            }, {
              default: withCtx(() => [
                withDirectives(createBaseVNode("div", {
                  class: normalizeClass([
                    "yc-modal",
                    // 全屏
                    unref(fullscreen) ? "yc-modal-fullscreen" : "",
                    // 拖拽
                    unref(isDraggable) ? "yc-modal-draggable" : "",
                    // 外被类名
                    _ctx.modalClass
                  ]),
                  style: normalizeStyle(modalCss.value),
                  ref_key: "modalRef",
                  ref: modalRef,
                  onClick: withModifiers(() => {
                  }, ["stop"])
                }, [
                  createBaseVNode("div", {
                    class: "yc-modal-header",
                    ref_key: "headerRef",
                    ref: headerRef
                  }, [
                    !_ctx.hideTitle ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      class: normalizeClass({
                        "yc-modal-title": true,
                        "text-ellipsis": true,
                        "title-align-center": _ctx.titleAlign == "center"
                      })
                    }, [
                      renderSlot(_ctx.$slots, "title", {}, () => [
                        createBaseVNode("span", null, toDisplayString(_ctx.title), 1)
                      ], true)
                    ], 2)) : createCommentVNode("", true),
                    _ctx.closable ? (openBlock(), createBlock(_component_yc_icon_button, {
                      key: 1,
                      name: "close",
                      class: "yc-modal-close-button",
                      onClick: _cache[0] || (_cache[0] = ($event) => unref(handleClose)("closeBtn"))
                    })) : createCommentVNode("", true)
                  ], 512),
                  createBaseVNode("div", {
                    class: normalizeClass(["yc-modal-body", _ctx.bodyClass]),
                    style: normalizeStyle(_ctx.bodyStyle)
                  }, [
                    renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ], 6),
                  _ctx.footer ? (openBlock(), createElementBlock("div", _hoisted_2, [
                    renderSlot(_ctx.$slots, "footer", {}, () => [
                      !_ctx.hideCancel ? (openBlock(), createBlock(YcButton, mergeProps({ key: 0 }, _ctx.cancelButtonProps, {
                        onClick: _cache[1] || (_cache[1] = ($event) => unref(handleClose)("cancelBtn"))
                      }), {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.cancelText), 1)
                        ]),
                        _: 1
                      }, 16)) : createCommentVNode("", true),
                      createVNode(YcButton, mergeProps({
                        type: "primary",
                        loading: _ctx.okLoading
                      }, _ctx.okButtonProps, {
                        onClick: _cache[2] || (_cache[2] = ($event) => unref(handleClose)("confirmBtn"))
                      }), {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.okText), 1)
                        ]),
                        _: 1
                      }, 16, ["loading"])
                    ], true)
                  ])) : createCommentVNode("", true)
                ], 6), [
                  [vShow, unref(innerVisible)]
                ])
              ]),
              _: 3
            }, 8, ["name", "onAfterLeave"])
          ])
        ], 512)), [
          [vShow, unref(outerVisible)]
        ]) : createCommentVNode("", true)
      ], 8, ["to", "disabled"]);
    };
  }
});
export {
  _sfc_main as default
};
