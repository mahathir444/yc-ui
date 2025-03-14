import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { useDraggable, useEventListener } from "../../../node_modules/@vueuse/core/index.js";
import { defineComponent, computed, openBlock, createElementBlock, createElementVNode as createBaseVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref, unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { normalizeClass, normalizeStyle } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
import { withModifiers } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Track",
  props: {
    type: { default: "embed" },
    direction: { default: "vertical" },
    height: { default: 0 },
    width: { default: 0 },
    top: { default: 0 },
    left: { default: 0 },
    minTop: { default: 0 },
    maxTop: { default: 0 },
    minLeft: { default: 0 },
    maxLeft: { default: 0 },
    verticalTrackWidth: {},
    horizontalTrackHeight: {},
    verticalThumbWidth: {},
    horizontalThumbHeight: {}
  },
  emits: ["drag", "resize"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { minLeft, maxLeft, minTop, maxTop, top, left, direction } = toRefs(props);
    const dragRef = ref();
    const { x, y, isDragging } = useDraggable(dragRef);
    const isVertical = computed(() => direction.value == "vertical");
    useEventListener("mousemove", () => {
      if (!isDragging.value)
        return;
      if (isVertical.value) {
        y.value = y.value >= maxTop.value ? maxTop.value : y.value;
        y.value = y.value <= minTop.value ? minTop.value : y.value;
        emits("drag", true, y.value - minTop.value);
      } else {
        x.value = x.value >= maxLeft.value ? maxLeft.value : x.value;
        x.value = x.value <= minLeft.value ? minLeft.value : x.value;
        emits("drag", false, x.value - minLeft.value);
      }
    });
    const handleClick = (e) => {
      const { offsetX, offsetY } = e;
      if (isVertical.value) {
        const maxMovable = maxTop.value - minTop.value;
        const moveDistance = top.value < offsetY ? maxMovable / 9 : -maxMovable / 9;
        let value = +(top.value + moveDistance).toFixed(0);
        value = value > maxMovable ? maxMovable : value;
        value = value <= 0 ? 0 : value;
        emits("drag", true, value);
      } else {
        const maxMovable = maxLeft.value - minLeft.value;
        const moveDistance = left.value < offsetX ? maxMovable / 9 : -maxMovable / 9;
        let value = +(left.value + moveDistance).toFixed(0);
        value = value > maxMovable ? maxMovable : value;
        value = value <= 0 ? 0 : value;
        emits("drag", false, value);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(`yc-scrollbar-track yc-scrollbar-track-direction-${unref(direction)}`),
        style: normalizeStyle({
          width: isVertical.value ? `${_ctx.verticalTrackWidth}px` : "",
          height: isVertical.value ? "" : `${_ctx.horizontalTrackHeight}px`
        }),
        ref: "trackRef",
        onClick: withModifiers(handleClick, ["self"])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(`yc-scrollbar-thumb yc-scrollbar-thumb-direction-${unref(direction)}`),
          style: normalizeStyle({
            height: isVertical.value ? _ctx.height + "px" : "",
            top: isVertical.value ? unref(top) + "px" : "",
            width: !isVertical.value ? _ctx.width + "px" : "",
            left: !isVertical.value ? unref(left) + "px" : ""
          }),
          ref_key: "dragRef",
          ref: dragRef
        }, [
          createBaseVNode("div", {
            class: normalizeClass({
              "yc-scrollbar-thumb-bar": true,
              "is-dragging": unref(isDragging)
            }),
            style: normalizeStyle({
              width: isVertical.value ? `${_ctx.verticalThumbWidth}px` : "",
              height: isVertical.value ? "" : `${_ctx.horizontalThumbHeight}px`
            })
          }, null, 6)
        ], 6)
      ], 6);
    };
  }
});
export {
  _sfc_main as default
};
