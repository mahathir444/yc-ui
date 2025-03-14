import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import YcIconButton from "../_components/IconButton/index.vue.js";
import { useTimeoutFn } from "../../../node_modules/@vueuse/shared/index.js";
import { defineComponent, useSlots, onUpdated, onMounted, computed, resolveComponent, openBlock, createBlock, withCtx, createElementVNode as createBaseVNode, createElementBlock, renderSlot, createVNode, createCommentVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { ref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { Transition } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
import { normalizeClass, toDisplayString } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = { class: "yc-message-content" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Message"
  },
  __name: "index",
  props: {
    content: { default: "" },
    id: { default: "" },
    showIcon: { type: Boolean, default: false },
    closable: { type: Boolean, default: false },
    duration: { default: 1e3 },
    resetOnHover: { type: Boolean, default: false },
    type: { default: "info" },
    resetFlag: { type: Boolean, default: false }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { isPending, start, stop } = useTimeoutFn(
      () => {
        emits("close");
      },
      () => props.duration,
      {
        immediate: false
      }
    );
    const resetFlag = ref(props.resetFlag);
    const slots = useSlots();
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
    const handleMouseenter = () => {
      if (!props.resetOnHover)
        return;
      if (!isPending.value)
        return;
      stop();
    };
    const handleMouseleave = () => {
      if (!props.resetOnHover)
        return;
      if (isPending.value)
        return;
      if (props.duration === 0)
        return;
      start();
    };
    const hasIcon = computed(() => {
      return props.showIcon || !(props.type === "normal" && !slots.icon);
    });
    return (_ctx, _cache) => {
      const _component_yc_icon = resolveComponent("yc-icon");
      return openBlock(), createBlock(Transition, {
        name: "fade",
        appear: ""
      }, {
        default: withCtx(() => [
          createBaseVNode("div", {
            class: "yc-message-box",
            onMouseenter: handleMouseenter,
            onMouseleave: handleMouseleave
          }, [
            hasIcon.value ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(["yc-message-icon", _ctx.type])
            }, [
              renderSlot(_ctx.$slots, "icon", {}, () => [
                createVNode(_component_yc_icon, {
                  name: _ctx.type,
                  class: "svg-icon"
                }, null, 8, ["name"])
              ], true)
            ], 2)) : createCommentVNode("", true),
            createBaseVNode("span", _hoisted_1, toDisplayString(_ctx.content), 1),
            _ctx.closable ? (openBlock(), createBlock(YcIconButton, {
              key: 1,
              name: "close",
              class: "yc-message-close",
              onClick: _cache[0] || (_cache[0] = ($event) => emits("close"))
            })) : createCommentVNode("", true)
          ], 32)
        ]),
        _: 3
      });
    };
  }
});
export {
  _sfc_main as default
};
