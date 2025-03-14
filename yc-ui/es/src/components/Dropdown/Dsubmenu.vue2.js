import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import YcScrollbar from "../Scrollbar/Scrollbar.vue.js";
import Doption from "./Doption.vue.js";
import useTriggerLevel from "../_hooks/useTriggerLevel.js";
import useControlValue from "../_hooks/useControlValue.js";
import { defineComponent, computed, inject, resolveComponent, openBlock, createElementBlock, createVNode, withCtx, createBlock, Teleport, Fragment, nextTick, renderSlot, createElementVNode as createBaseVNode, createCommentVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref, unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { Transition } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
import { normalizeStyle } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = ["data-group-id"];
const _hoisted_2 = { class: "yc-dropdown-list" };
const _hoisted_3 = {
  key: 0,
  class: "yc-dropdown-footer"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Dsubmenu"
  },
  __name: "Dsubmenu",
  props: {
    disabled: { type: Boolean, default: false },
    trigger: { default: "hover" },
    position: { default: "rt" },
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    mouseEnterDelay: { default: 150 },
    mouseLeaveDelay: { default: 150 }
  },
  emits: ["update:popupVisible", "popup-visible-change", "show", "hide"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      position,
      defaultPopupVisible,
      popupVisible,
      trigger,
      mouseEnterDelay,
      mouseLeaveDelay
    } = toRefs(props);
    const computedVisible = useControlValue(
      popupVisible,
      defaultPopupVisible.value,
      (val) => emits("update:popupVisible", val)
    );
    const contentStyle = ref({
      left: 0,
      top: 0,
      width: 0
    });
    const menuPotision = computed(() => {
      if (!["rt", "lt"].includes(position.value)) {
        return "rt";
      }
      return position.value;
    });
    const menuTrigger = computed(() => {
      if (!["click", "hover"].includes(trigger.value)) {
        return "hover";
      }
      return trigger.value;
    });
    const doptionRef = ref();
    const contentRef = ref();
    const handleCalcStyle = () => {
      var _a;
      const dom = (_a = doptionRef.value) == null ? void 0 : _a.getRef();
      if (!dom)
        return;
      const {
        left: offsetLeft,
        top: offsetTop,
        right: offsetRight,
        width
      } = dom.getBoundingClientRect();
      if (menuPotision.value == "rt") {
        contentStyle.value = {
          left: `${offsetRight + 4}px`,
          top: `${offsetTop - 5}px`,
          minWidth: `${width}px`
        };
      } else {
        contentStyle.value = {
          left: `${offsetLeft - width - 4}px`,
          top: `${offsetTop - 5}px`,
          minWidth: `${width}px`
        };
      }
    };
    const { isSameGroup, groupId } = useTriggerLevel(() => {
      if (menuTrigger.value != "hover")
        return;
      computedVisible.value = false;
    });
    const hide = inject("hide");
    const timeout = inject("timeout", ref());
    const handleMouseenter = async () => {
      if (timeout.value)
        clearTimeout(timeout.value);
      if (menuTrigger.value != "hover" || computedVisible.value)
        return;
      timeout.value = setTimeout(async () => {
        computedVisible.value = true;
        await nextTick();
        handleCalcStyle();
      }, mouseEnterDelay.value);
    };
    const handleMouseleave = (e) => {
      if (timeout.value)
        clearTimeout(timeout.value);
      if (menuTrigger.value != "hover" || !computedVisible.value)
        return;
      timeout.value = setTimeout(() => {
        console.log(isSameGroup(e.relatedTarget), "isSame");
        if (isSameGroup(e.relatedTarget)) {
          computedVisible.value = false;
        } else {
          hide();
        }
      }, mouseLeaveDelay.value);
    };
    const handleClick = async () => {
      if (menuTrigger.value != "click")
        return;
      computedVisible.value = !computedVisible.value;
      await nextTick();
      handleCalcStyle();
    };
    return (_ctx, _cache) => {
      const _component_yc_icon = resolveComponent("yc-icon");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(Doption, {
          disabled: _ctx.disabled,
          "is-submenu": "",
          value: "",
          ref_key: "doptionRef",
          ref: doptionRef,
          onClick: handleClick,
          onMouseenter: handleMouseenter,
          onMouseleave: _cache[0] || (_cache[0] = ($event) => handleMouseleave($event))
        }, {
          suffix: withCtx(() => [
            createVNode(_component_yc_icon, { name: "arrow-right" })
          ]),
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ]),
          _: 3
        }, 8, ["disabled"]),
        (openBlock(), createBlock(Teleport, { to: "body" }, [
          createVNode(Transition, { name: "fade" }, {
            default: withCtx(() => [
              unref(computedVisible) && !_ctx.disabled ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "yc-dropdown-submenu",
                "data-group-id": unref(groupId),
                style: normalizeStyle(contentStyle.value),
                ref_key: "contentRef",
                ref: contentRef,
                onMouseenter: handleMouseenter,
                onMouseleave: _cache[1] || (_cache[1] = ($event) => handleMouseleave($event))
              }, [
                createVNode(YcScrollbar, { style: { "max-height": "200px" } }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_2, [
                      renderSlot(_ctx.$slots, "content", {}, void 0, true)
                    ])
                  ]),
                  _: 3
                }),
                _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_3, [
                  renderSlot(_ctx.$slots, "footer", {}, void 0, true)
                ])) : createCommentVNode("", true)
              ], 44, _hoisted_1)) : createCommentVNode("", true)
            ]),
            _: 3
          })
        ]))
      ], 64);
    };
  }
});
export {
  _sfc_main as default
};
