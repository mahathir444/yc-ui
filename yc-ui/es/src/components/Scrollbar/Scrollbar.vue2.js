import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { useElementSize, useElementBounding } from "../../../node_modules/@vueuse/core/index.js";
import YcTrack from "./Track.vue.js";
import { defineComponent, computed, openBlock, createElementBlock, createElementVNode as createBaseVNode, renderSlot, createBlock, createCommentVNode } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref, unref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { normalizeStyle, normalizeClass } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Scrollbar"
  },
  __name: "Scrollbar",
  props: {
    type: { default: "embed" },
    outerClass: { default: "" },
    outerStyle: { default: () => {
      return {};
    } },
    style: { default: () => {
      return {};
    } },
    autoFill: { type: Boolean, default: false },
    verticalTrackWidth: { default: 15 },
    horizontalTrackHeight: { default: 15 },
    verticalThumbWidth: { default: 9 },
    horizontalThubmHeight: { default: 9 }
  },
  emits: ["scroll"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const { type, verticalTrackWidth, horizontalTrackHeight } = toRefs(props);
    const contentRef = ref();
    const scrollRef = ref();
    const { width: contentWidth, height: contentHeight } = useElementSize(
      contentRef,
      void 0,
      {
        box: "border-box"
      }
    );
    const {
      top: offsetTop,
      left: offsetLeft,
      width: srcollWidth,
      height: srcollHeight
    } = useElementBounding(scrollRef);
    const thumbHeight = computed(() => {
      if (contentHeight.value <= srcollHeight.value)
        return 0;
      const height = +(srcollHeight.value * srcollHeight.value / contentHeight.value).toFixed(0);
      return height <= 20 ? 20 : height;
    });
    const thumbWidth = computed(() => {
      if (contentWidth.value <= srcollWidth.value)
        return 0;
      const width = +(srcollWidth.value * srcollWidth.value / contentWidth.value).toFixed(0);
      return width <= 20 ? 20 : width;
    });
    const thumbTop = ref(0);
    const thumbLeft = ref(0);
    const maxThumbTop = computed(() => {
      const track = thumbWidth.value ? horizontalTrackHeight.value : 0;
      return srcollHeight.value - thumbHeight.value - track;
    });
    const maxThumbLeft = computed(() => {
      const track = thumbHeight.value ? verticalTrackWidth.value : 0;
      return srcollWidth.value - thumbWidth.value - track;
    });
    const handleScroll = (e) => {
      const { scrollTop, scrollLeft } = e.target;
      const top = +(scrollTop / (contentHeight.value - srcollHeight.value) * maxThumbTop.value).toFixed(1);
      const left = +(scrollLeft / (contentWidth.value - srcollWidth.value) * maxThumbLeft.value).toFixed(1);
      thumbTop.value = top <= maxThumbTop.value ? top : maxThumbTop.value;
      thumbLeft.value = left <= maxThumbLeft.value ? left : maxThumbLeft.value;
    };
    const handleDrag = (isVertical, value) => {
      if (isVertical) {
        thumbTop.value = value;
        const maxScrollbarMoveTop = contentHeight.value - srcollHeight.value;
        const scrollTop = +(thumbTop.value / maxThumbTop.value * maxScrollbarMoveTop).toFixed(1);
        scrollRef.value.scrollTop = scrollTop >= maxScrollbarMoveTop ? maxScrollbarMoveTop : scrollTop;
      } else {
        thumbLeft.value = value;
        const maxScrollbarMoveLeft = contentWidth.value - srcollWidth.value;
        const scrollLeft = +(thumbLeft.value / maxThumbLeft.value * maxScrollbarMoveLeft).toFixed(1);
        scrollRef.value.scrollLeft = scrollLeft >= maxScrollbarMoveLeft ? maxScrollbarMoveLeft : scrollLeft;
      }
    };
    __expose({
      scrollTo(options) {
        var _a;
        (_a = scrollRef.value) == null ? void 0 : _a.scrollTo(options);
      },
      scrollLeft(left) {
        var _a;
        (_a = scrollRef.value) == null ? void 0 : _a.scrollTo({
          left
        });
      },
      scrollTop(top) {
        var _a;
        (_a = scrollRef.value) == null ? void 0 : _a.scrollTo({
          top
        });
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({
          "yc-scrollbar": true,
          "yc-scrollbar-auto-fill": _ctx.autoFill,
          "yc-scrollbar-both-track": unref(type) == "track" && thumbHeight.value && thumbWidth.value,
          "yc-scrollbar-vertical-track": unref(type) == "track" && thumbHeight.value,
          "yc-scrollbar-horizontal-track": unref(type) == "track" && thumbWidth.value,
          outerClass: _ctx.outerClass
        }),
        style: normalizeStyle(_ctx.outerStyle)
      }, [
        createBaseVNode("div", {
          class: "yc-scrollbar-container",
          style: normalizeStyle(_ctx.style),
          ref_key: "scrollRef",
          ref: scrollRef,
          onScroll: handleScroll
        }, [
          createBaseVNode("div", {
            class: "yc-scrollbar-content",
            ref_key: "contentRef",
            ref: contentRef
          }, [
            renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 512)
        ], 36),
        unref(srcollHeight) < unref(contentHeight) ? (openBlock(), createBlock(YcTrack, {
          key: 0,
          direction: "vertical",
          type: unref(type),
          height: thumbHeight.value,
          top: thumbTop.value,
          minTop: unref(offsetTop),
          maxTop: maxThumbTop.value + unref(offsetTop),
          verticalTrackWidth: unref(verticalTrackWidth),
          horizontalTrackHeight: unref(horizontalTrackHeight),
          verticalThumbWidth: _ctx.verticalThumbWidth,
          verticalThubmHeight: _ctx.horizontalThubmHeight,
          horizontalThumbHeight: _ctx.horizontalThubmHeight,
          onDrag: handleDrag
        }, null, 8, ["type", "height", "top", "minTop", "maxTop", "verticalTrackWidth", "horizontalTrackHeight", "verticalThumbWidth", "verticalThubmHeight", "horizontalThumbHeight"])) : createCommentVNode("", true),
        unref(srcollWidth) < unref(contentWidth) ? (openBlock(), createBlock(YcTrack, {
          key: 1,
          direction: "horizontal",
          type: unref(type),
          width: thumbWidth.value,
          left: thumbLeft.value,
          minLeft: unref(offsetLeft),
          maxLeft: maxThumbLeft.value + unref(offsetLeft),
          verticalTrackWidth: unref(verticalTrackWidth),
          horizontalTrackHeight: unref(horizontalTrackHeight),
          verticalThumbWidth: _ctx.verticalThumbWidth,
          horizontalThubmHeight: _ctx.horizontalThubmHeight,
          onDrag: handleDrag
        }, null, 8, ["type", "width", "left", "minLeft", "maxLeft", "verticalTrackWidth", "horizontalTrackHeight", "verticalThumbWidth", "horizontalThubmHeight"])) : createCommentVNode("", true)
      ], 6);
    };
  }
});
export {
  _sfc_main as default
};
