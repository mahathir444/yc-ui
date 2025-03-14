import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { useEventListener, useResizeObserver } from "../../../node_modules/@vueuse/core/index.js";
import useControlValue from "../_hooks/useControlValue.js";
import { defineComponent, computed, onMounted, resolveComponent, openBlock, createBlock, withCtx, resolveDynamicComponent, renderSlot, createElementBlock, renderList, createElementVNode as createBaseVNode, createVNode, Fragment } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { normalizeClass, normalizeStyle } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = ["id", "onMousedown"];
const _hoisted_2 = { class: "yc-resizebox-trigger-icon-wrapper" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "ResizeBox"
  },
  __name: "index",
  props: {
    directions: { default: () => ["right"] },
    width: {},
    height: {},
    component: { default: "div" }
  },
  emits: ["update:width", "update:height", "moving-start", "moving-end", "moving"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { width, height } = toRefs(props);
    const cWidth = useControlValue(width, width.value, (val) => {
      emits("update:width", val);
    });
    const cHeight = useControlValue(height, height.value, (val) => {
      emits("update:height", val);
    });
    const boxRef = ref();
    const triggerRefMap = {};
    const boxPadding = ref({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    });
    const resizingDrigger = ref();
    let oldPos = null;
    let defaultCursor = "auto";
    const setRef = (key, el) => {
      if (!el)
        return;
      triggerRefMap[key] = el;
    };
    const getDir = (dir) => {
      return ["right", "left"].includes(dir) ? "vertical" : "horizontal";
    };
    const observerTriggerSize = () => {
      useResizeObserver(
        () => {
          return Object.values(triggerRefMap);
        },
        (entries) => {
          entries.forEach((item) => {
            const direction = item.target.id.split(
              "direction-"
            )[1];
            if (["right", "left"].includes(direction)) {
              boxPadding.value[direction] = item.contentRect.width;
            } else {
              boxPadding.value[direction] = item.contentRect.height;
            }
          });
        },
        {
          box: "border-box"
        }
      );
    };
    const getSize = (v) => {
      if (v.includes("%"))
        return 0;
      const sizeStr = v.split("px")[0];
      const size = parseFloat(sizeStr);
      return isNaN(size) ? 0 : size;
    };
    const computedStyle = computed(() => {
      if (boxRef.value) {
        const style = window.getComputedStyle(boxRef.value);
        return {
          width: boxRef.value.offsetWidth,
          height: boxRef.value.offsetHeight,
          minWidth: getSize(style.minWidth),
          maxWidth: getSize(style.maxWidth),
          minHeight: getSize(style.minHeight),
          maxHeight: getSize(style.maxHeight)
        };
      }
      return {
        minWidth: 0,
        maxWidth: 0,
        minHeight: 0,
        maxHeight: 0
      };
    });
    const boxStyle = computed(() => {
      return {
        padding: `${boxPadding.value.top ?? 0}px ${boxPadding.value.right ?? 0}px ${boxPadding.value.bottom ?? 0}px ${boxPadding.value.left ?? 0}px`,
        width: cWidth.value + "px",
        height: cHeight.value + "px"
      };
    });
    const hanClickTrigger = (direction, e) => {
      resizingDrigger.value = direction;
      oldPos = {
        x: e.x,
        y: e.y
      };
      defaultCursor = window.getComputedStyle(document.body).cursor;
      document.body.style.cursor = ["right", "left"].includes(resizingDrigger.value) ? "col-resize" : "row-resize";
      emits("moving-start", e);
    };
    useEventListener("mousemove", (e) => {
      if (!resizingDrigger.value)
        return;
      if (!oldPos)
        return;
      if (["right", "left"].includes(resizingDrigger.value)) {
        const oldWidth = cWidth.value ?? computedStyle.value.width;
        const movementX = e.x - oldPos.x;
        let calcWidth = oldWidth + (resizingDrigger.value === "right" ? movementX : -movementX);
        if (calcWidth < computedStyle.value.minWidth)
          calcWidth = computedStyle.value.minWidth;
        if (computedStyle.value.maxWidth !== 0 && calcWidth > computedStyle.value.maxWidth)
          calcWidth = computedStyle.value.maxWidth;
        cWidth.value = calcWidth;
      } else {
        const movementY = e.y - oldPos.y;
        const oldHeight = cHeight.value ?? computedStyle.value.height;
        let calcHeight = oldHeight + (resizingDrigger.value === "bottom" ? movementY : -movementY);
        if (calcHeight < computedStyle.value.minHeight)
          calcHeight = computedStyle.value.minHeight;
        if (computedStyle.value.maxHeight !== 0 && calcHeight > computedStyle.value.maxHeight)
          calcHeight = computedStyle.value.maxHeight;
        cHeight.value = calcHeight;
      }
      oldPos = {
        x: e.x,
        y: e.y
      };
      emits("moving", e, { width: cWidth.value, height: cHeight.value });
    });
    useEventListener("mouseup", (e) => {
      if (!resizingDrigger.value)
        return;
      resizingDrigger.value = void 0;
      document.body.style.cursor = defaultCursor;
      emits("moving-end", e);
    });
    onMounted(() => {
      observerTriggerSize();
    });
    return (_ctx, _cache) => {
      const _component_yc_icon = resolveComponent("yc-icon");
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.component), {
        class: normalizeClass({
          "yc-resizebox": true,
          "no-select": resizingDrigger.value
        }),
        ref_key: "boxRef",
        ref: boxRef,
        style: normalizeStyle(boxStyle.value)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, void 0, true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.directions, (item) => {
            return openBlock(), createElementBlock("div", {
              key: item,
              class: normalizeClass([
                "yc-resizebox-trigger",
                `yc-resizebox-direction-${item}`,
                `direction-${getDir(item)}`
              ]),
              id: `direction-${item}`,
              ref_for: true,
              ref: (el) => setRef(item, el),
              onMousedown: (e) => hanClickTrigger(item, e)
            }, [
              renderSlot(_ctx.$slots, "resize-trigger", { direction: item }, () => [
                createBaseVNode("div", _hoisted_2, [
                  renderSlot(_ctx.$slots, "resize-trigger-icon", { direction: item }, () => [
                    createVNode(_component_yc_icon, {
                      name: getDir(item) === "vertical" ? "drag-dot-vertical" : "drag-dot",
                      size: 12
                    }, null, 8, ["name"])
                  ], true)
                ])
              ], true)
            ], 42, _hoisted_1);
          }), 128))
        ]),
        _: 3
      }, 8, ["class", "style"]);
    };
  }
});
export {
  _sfc_main as default
};
