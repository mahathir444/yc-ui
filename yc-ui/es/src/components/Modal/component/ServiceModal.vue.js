import "../../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import _Modal from "../index.vue.js";
import { defineComponent, openBlock, createBlock, withCtx, createElementVNode as createBaseVNode } from "../../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { ref } from "../../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { toDisplayString } from "../../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = { class: "yc-modal-body-content" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ServiceModal",
  props: {
    content: { default: "" },
    onOk: {},
    onCancel: {},
    onOpen: {},
    onClose: {},
    onBeforeOpen: {},
    onBeforeClose: {},
    defaultVisible: { type: Boolean },
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
    modalClass: {},
    modalStyle: { default: () => {
      return {};
    } },
    escToClose: { type: Boolean, default: true },
    draggable: { type: Boolean, default: false },
    fullscreen: { type: Boolean, default: false },
    maskAnimationName: {},
    modalAnimationName: {},
    bodyClass: {},
    bodyStyle: { default: () => {
      return {};
    } },
    hideTitle: { type: Boolean, default: false }
  },
  setup(__props) {
    const visible = ref(true);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_Modal, {
        visible: visible.value,
        "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => visible.value = $event),
        title: _ctx.title,
        width: _ctx.width,
        "render-to-body": false,
        "title-align": "start",
        class: "yc-service-modal",
        onClose: _cache[1] || (_cache[1] = ($event) => _ctx.onClose && _ctx.onClose()),
        onOpen: _cache[2] || (_cache[2] = ($event) => _ctx.onOpen && _ctx.onOpen()),
        onBeforeClose: _cache[3] || (_cache[3] = ($event) => _ctx.onBeforeClose && _ctx.onBeforeClose()),
        onBeforeOpen: _cache[4] || (_cache[4] = ($event) => _ctx.onBeforeOpen && _ctx.onBeforeOpen()),
        onOk: _cache[5] || (_cache[5] = ($event) => _ctx.onOk && _ctx.onOk()),
        onCancel: _cache[6] || (_cache[6] = ($event) => _ctx.onCancel && _ctx.onCancel())
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("span", null, toDisplayString(_ctx.content), 1)
          ])
        ]),
        _: 1
      }, 8, ["visible", "title", "width"]);
    };
  }
});
export {
  _sfc_main as default
};
