import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import YcIconButton from "../_components/IconButton/index.vue.js";
import { defineComponent, useSlots, onUpdated, onMounted, computed, resolveComponent, openBlock, createElementBlock, createElementVNode as createBaseVNode, renderSlot, createCommentVNode, createVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { useTimeoutFn } from "../../../node_modules/@vueuse/shared/index.js";
import { ref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { normalizeClass } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = { class: "yc-notification-box" };
const _hoisted_2 = { class: "yc-notification-left" };
const _hoisted_3 = { class: "yc-notification-right" };
const _hoisted_4 = { class: "yc-notification-title" };
const _hoisted_5 = { class: "yc-notification-content" };
const _hoisted_6 = { class: "yc-notification-footer" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Notification"
  },
  __name: "index",
  props: {
    id: { default: "" },
    type: { default: "info" },
    showIcon: { type: Boolean, default: true },
    closable: { type: Boolean, default: false },
    duration: { default: 1e3 },
    resetFlag: { type: Boolean, default: false }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { start, stop } = useTimeoutFn(
      () => {
        emits("close");
      },
      () => props.duration,
      {
        immediate: false
      }
    );
    const resetFlag = ref(props.resetFlag);
    useSlots();
    onUpdated(() => {
      if (props.duration === 0)
        return;
      if (props.resetFlag === resetFlag.value)
        return;
      resetFlag.value = props.resetFlag;
      stop();
      start();
    });
    onMounted(async () => {
      if (props.duration === 0)
        return;
      start();
    });
    const hasIcon = computed(() => {
      return true;
    });
    return (_ctx, _cache) => {
      const _component_yc_icon = resolveComponent("yc-icon");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          hasIcon.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["yc-notification-icon", _ctx.type])
          }, [
            renderSlot(_ctx.$slots, "icon", {}, () => [
              createVNode(_component_yc_icon, { name: _ctx.type }, null, 8, ["name"])
            ], true)
          ], 2)) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            renderSlot(_ctx.$slots, "title", {}, void 0, true)
          ]),
          createBaseVNode("div", _hoisted_5, [
            renderSlot(_ctx.$slots, "content", {}, void 0, true)
          ]),
          createBaseVNode("div", _hoisted_6, [
            renderSlot(_ctx.$slots, "footer", {}, void 0, true)
          ])
        ]),
        _ctx.closable ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "yc-close-btn",
          onClick: _cache[0] || (_cache[0] = ($event) => emits("close"))
        }, [
          renderSlot(_ctx.$slots, "close-icon", {}, () => [
            createVNode(YcIconButton, {
              name: "close",
              class: "yc-close-icon"
            })
          ], true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
export {
  _sfc_main as default
};
