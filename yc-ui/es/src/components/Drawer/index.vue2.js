import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { DRAWER_POSTION_STYLE } from "./constants.js";
import useCloseCompt from "../_hooks/useCloseCompt.js";
import YcButton from "../Button/Button.vue.js";
import { defineComponent, computed, resolveComponent, openBlock, createBlock, withDirectives, createElementBlock, createVNode, withCtx, createCommentVNode, Teleport, createElementVNode as createBaseVNode, renderSlot, mergeProps, createTextVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { vShow, Transition } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
import { toRefs, unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { toDisplayString, normalizeStyle } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = {
  key: 0,
  class: "yc-drawer-wrapper"
};
const _hoisted_2 = {
  key: 0,
  class: "yc-drawer-header"
};
const _hoisted_3 = { class: "yc-drawer-title text-ellipsis" };
const _hoisted_4 = { class: "yc-drawer-body" };
const _hoisted_5 = {
  key: 0,
  class: "yc-drawer-footer"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Drawer"
  },
  __name: "index",
  props: {
    visible: { type: Boolean, default: void 0 },
    defaultVisible: { type: Boolean, default: false },
    placement: { default: "right" },
    title: { default: "" },
    mask: { type: Boolean, default: true },
    maskClosable: { type: Boolean, default: true },
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
    unmountOnClose: { type: Boolean, default: false },
    width: { default: 250 },
    height: { default: 250 },
    popupContainer: { default: "body" },
    drawerStyle: { default: () => {
      return {};
    } },
    escToClose: { type: Boolean, default: true },
    renderToBody: { type: Boolean, default: true },
    header: { type: Boolean, default: true },
    footer: { type: Boolean, default: true },
    hideCancel: { type: Boolean, default: false }
  },
  emits: ["update:visible", "ok", "cancel", "beforeOpen", "open", "beforeClose", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      visible,
      defaultVisible,
      width,
      height,
      placement,
      maskClosable,
      escToClose,
      drawerStyle
    } = toRefs(props);
    const drawerCss = computed(() => {
      return {
        ...DRAWER_POSTION_STYLE[placement.value],
        height: placement.value == "left" || placement.value == "right" ? "100%" : `${height.value}px`,
        width: placement.value == "left" || placement.value == "right" ? `${width.value}px` : `100%`,
        // 传入样式
        ...drawerStyle.value
      };
    });
    const { outerVisible, innerVisible, closeType, handleClose, handleAfterLeave } = useCloseCompt(emits, {
      visible,
      defaultVisible,
      escToClose,
      maskClosable
    });
    return (_ctx, _cache) => {
      const _component_yc_icon_button = resolveComponent("yc-icon-button");
      return openBlock(), createBlock(Teleport, {
        to: _ctx.popupContainer,
        disabled: !_ctx.renderToBody
      }, [
        !_ctx.unmountOnClose || unref(outerVisible) ? withDirectives((openBlock(), createElementBlock("div", _hoisted_1, [
          createVNode(Transition, {
            name: "fade",
            appear: ""
          }, {
            default: withCtx(() => [
              _ctx.mask ? withDirectives((openBlock(), createElementBlock("div", {
                key: 0,
                class: "yc-drawer-mask",
                onClick: _cache[0] || (_cache[0] = ($event) => unref(handleClose)("mask"))
              }, null, 512)), [
                [vShow, unref(innerVisible)]
              ]) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createVNode(Transition, {
            name: `slide-drawer-${unref(placement)}`,
            appear: "",
            onBeforeEnter: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("beforeOpen")),
            onBeforeLeave: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("beforeClose", unref(closeType))),
            onAfterEnter: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("open")),
            onAfterLeave: unref(handleAfterLeave)
          }, {
            default: withCtx(() => [
              withDirectives(createBaseVNode("div", {
                class: "yc-drawer-container",
                style: normalizeStyle(drawerCss.value)
              }, [
                renderSlot(_ctx.$slots, "header", {}, () => [
                  _ctx.header ? (openBlock(), createElementBlock("div", _hoisted_2, [
                    createBaseVNode("div", _hoisted_3, [
                      renderSlot(_ctx.$slots, "title", {}, () => [
                        createBaseVNode("span", null, toDisplayString(_ctx.title), 1)
                      ], true)
                    ]),
                    _ctx.closable ? (openBlock(), createBlock(_component_yc_icon_button, {
                      key: 0,
                      name: "close",
                      class: "yc-modal-close-button",
                      onClick: _cache[1] || (_cache[1] = ($event) => unref(handleClose)("closeBtn"))
                    })) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ], true),
                createBaseVNode("div", _hoisted_4, [
                  renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ]),
                renderSlot(_ctx.$slots, "footer", {}, () => [
                  _ctx.footer ? (openBlock(), createElementBlock("div", _hoisted_5, [
                    !_ctx.hideCancel ? (openBlock(), createBlock(YcButton, mergeProps({ key: 0 }, _ctx.cancelButtonProps, {
                      onClick: _cache[2] || (_cache[2] = ($event) => unref(handleClose)("cancelBtn"))
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
                      onClick: _cache[3] || (_cache[3] = ($event) => unref(handleClose)("confirmBtn"))
                    }), {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.okText), 1)
                      ]),
                      _: 1
                    }, 16, ["loading"])
                  ])) : createCommentVNode("", true)
                ], true)
              ], 4), [
                [vShow, unref(innerVisible)]
              ])
            ]),
            _: 3
          }, 8, ["name", "onAfterLeave"])
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
