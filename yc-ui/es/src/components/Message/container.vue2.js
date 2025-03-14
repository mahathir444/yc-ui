import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import _Message from "./index.vue.js";
import { defineComponent, openBlock, createBlock, withCtx, createElementBlock, renderList, createSlots, resolveDynamicComponent, Fragment } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { TransitionGroup } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "MessageContainer"
  },
  __name: "container",
  props: {
    messageList: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(TransitionGroup, {
        name: "fade-message",
        moveClass: "flip-list-move",
        tag: "div",
        class: "yc-message-container"
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.messageList, (item) => {
            return openBlock(), createBlock(_Message, {
              key: item.id,
              duration: item.duration,
              resetOnHover: item.resetOnHover,
              resetFlag: item.resetFlag,
              type: item.type,
              content: item.content,
              closable: item.closable,
              showIcon: item.showIcon,
              onClose: ($event) => _ctx.$emit("close", item.id)
            }, createSlots({ _: 2 }, [
              item.icon ? {
                name: "icon",
                fn: withCtx(() => [
                  (openBlock(), createBlock(resolveDynamicComponent(item.icon)))
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["duration", "resetOnHover", "resetFlag", "type", "content", "closable", "showIcon", "onClose"]);
          }), 128))
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};
