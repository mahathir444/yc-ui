import "../../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import is from "../../_utils/is.js";
import { defineComponent, computed, openBlock, createElementBlock, createElementVNode as createBaseVNode } from "../../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { useCssVars } from "../../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
import { toRefs, unref } from "../../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { normalizeClass } from "../../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = ["xlink:href"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    name: {},
    prefix: { default: "icon" },
    size: {},
    color: { default: "inherit" }
  },
  setup(__props) {
    useCssVars((_ctx) => ({
      "3492486c": unref(color),
      "32644ba6": width.value,
      "4dc31cc0": height.value
    }));
    const props = __props;
    const { size, color, name, prefix } = toRefs(props);
    const symbolId = computed(() => `#${prefix.value}-_icons/${name.value}`);
    const width = computed(() => {
      if (is.undefined(size.value)) {
        return "1em";
      } else if (is.string(size.value)) {
        return `${size.value.replace("px", "")}px`;
      } else if (is.number(size.value)) {
        return `${size.value}px`;
      } else {
        return size.value[0] + "px";
      }
    });
    const height = computed(() => {
      if (is.undefined(size.value)) {
        return "1em";
      } else if (is.string(size.value)) {
        return `${size.value.replace("px", "")}px`;
      } else if (is.number(size.value)) {
        return `${size.value}px`;
      } else {
        return size.value[1] + "px";
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("svg", {
        "aria-hidden": "true",
        class: normalizeClass(["svg-icon", _ctx.$attrs.class])
      }, [
        createBaseVNode("use", {
          "xlink:href": symbolId.value,
          fill: "currentColor"
        }, null, 8, _hoisted_1)
      ], 2);
    };
  }
});
export {
  _sfc_main as default
};
