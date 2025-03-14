import "../../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { useCssVars, withModifiers } from "../../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
import { defineComponent, resolveComponent, openBlock, createElementBlock, renderSlot, createVNode } from "../../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { normalizeStyle } from "../../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    name: { default: "close" },
    fontSize: { default: "12px" },
    hoverColor: { default: "rgb(242, 243, 245)" },
    hoverSize: { default: "20px" }
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "68db6272": _ctx.hoverColor,
      "3d378f12": _ctx.hoverSize
    }));
    return (_ctx, _cache) => {
      const _component_yc_icon = resolveComponent("yc-icon");
      return openBlock(), createElementBlock("div", {
        class: "yc-icon-button",
        onMousedown: _cache[0] || (_cache[0] = withModifiers(
          (e) => {
            e.preventDefault();
          },
          ["stop"]
        )),
        style: normalizeStyle({
          fontSize: _ctx.fontSize
        })
      }, [
        renderSlot(_ctx.$slots, "icon", {}, () => [
          createVNode(_component_yc_icon, { name: _ctx.name }, null, 8, ["name"])
        ], true)
      ], 36);
    };
  }
});
export {
  _sfc_main as default
};
