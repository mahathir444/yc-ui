import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { getSlotFunction } from "../_utils/vue-utils.js";
import _Notification from "./index.vue.js";
import { defineComponent, computed, openBlock, createBlock, withCtx, createElementBlock, renderList, createSlots, resolveDynamicComponent, Fragment } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { normalizeStyle, normalizeClass } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
import { unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { TransitionGroup } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "NotificationContainer"
  },
  __name: "notificationList",
  props: {
    notificationList: {},
    position: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const fadeName = computed(() => {
      const dir = props.position.includes("Right") ? "right" : "left";
      return `slide-${dir}-notification`;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TransitionGroup, {
        name: fadeName.value,
        tag: "div",
        class: normalizeClass(["yc-notification-list", _ctx.position])
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.notificationList, (item) => {
            return openBlock(), createBlock(_Notification, {
              key: item.id,
              duration: item.duration,
              type: item.type,
              closable: item.closable,
              showIcon: item.showIcon,
              resetFlag: item.resetFlag,
              style: normalizeStyle(item.style),
              class: normalizeClass(item.class),
              onClose: ($event) => _ctx.$emit("close", item.id, _ctx.position)
            }, createSlots({
              title: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(unref(getSlotFunction)(item.title))))
              ]),
              content: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(unref(getSlotFunction)(item.content))))
              ]),
              footer: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(unref(getSlotFunction)(item.footer))))
              ]),
              _: 2
            }, [
              item.icon ? {
                name: "icon",
                fn: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(unref(getSlotFunction)(item.icon))))
                ]),
                key: "0"
              } : void 0,
              item.closeIcon ? {
                name: "closeIcon",
                fn: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(unref(getSlotFunction)(item.closeIcon))))
                ]),
                key: "1"
              } : void 0
            ]), 1032, ["duration", "type", "closable", "showIcon", "resetFlag", "style", "class", "onClose"]);
          }), 128))
        ]),
        _: 1
      }, 8, ["name", "class"]);
    };
  }
});
export {
  _sfc_main as default
};
