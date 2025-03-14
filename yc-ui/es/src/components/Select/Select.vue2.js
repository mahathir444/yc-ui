import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { TRANSFORM_ORIGIN_MAP } from "../Trigger/constants.js";
import useSeletValue from "../_hooks/useSeletValue.js";
import { sleep } from "../_utils/fn.js";
import Input from "../Input/index.js";
import YcTrigger from "../Trigger/index.vue.js";
import YcScrollbar from "../Scrollbar/Scrollbar.vue.js";
import YcSpin from "../Spin/index.vue.js";
import _Empty from "../Empty/index.vue.js";
import Option from "./Option.vue.js";
import { defineComponent, provide, computed, resolveComponent, openBlock, createBlock, withCtx, mergeProps, createVNode, createElementVNode as createBaseVNode, createElementBlock, renderSlot, createCommentVNode, renderList, Fragment, createSlots } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { toRefs, ref, unref, isRef } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { withModifiers } from "../../../node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js";
import { normalizeClass } from "../../../node_modules/@vue/shared/dist/shared.esm-bundler.js";
const _hoisted_1 = { class: "yc-select-suffix-icon" };
const _hoisted_2 = {
  key: 0,
  class: "yc-select-search-icon"
};
const _hoisted_3 = { class: "yc-select-dropdown" };
const _hoisted_4 = {
  key: 0,
  class: "yc-select-dropdown-header"
};
const _hoisted_5 = { class: "yc-select-dropdown-list" };
const _hoisted_6 = {
  key: 1,
  class: "yc-select-dropdown-footer"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "Select"
  },
  __name: "Select",
  props: {
    multiple: { type: Boolean, default: false },
    modelValue: { type: [String, Number, Boolean, Array], default: void 0 },
    defaultValue: { type: [String, Number, Boolean, Array], default: "" },
    inputValue: { default: void 0 },
    defaultInputValue: { default: "" },
    size: { default: "medium" },
    placeholder: { default: "" },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    allowClear: { type: Boolean, default: false },
    allowSearch: { type: Boolean, default: true },
    allowCreate: { type: Boolean },
    popupContainer: { default: "body" },
    defaultActivefirstOption: { type: Boolean, default: false },
    popupVisible: { type: Boolean, default: void 0 },
    defaultPopupVisible: { type: Boolean, default: false },
    unmountonClose: { type: Boolean },
    filterOption: { type: Function, default: (inputValue, option) => {
      var _a;
      return (_a = option == null ? void 0 : option.label) == null ? void 0 : _a.includes(inputValue);
    } },
    options: { default: () => [] },
    triggerProps: { default: () => {
      return {
        contentStyle: {}
      };
    } },
    formatLabel: { type: Function, default: (option) => {
      return option.map((item) => item.value).join("、");
    } },
    searchDelay: { default: 500 },
    limit: { default: 0 },
    showHeaderOnEmpty: { type: Boolean, default: false },
    showFooterOnEmpty: { type: Boolean, default: false }
  },
  emits: ["change", "clear", "search", "input-value-change", "update:modelValue", "update:inputValue", "update:popupVisible", "popupVisibleChange", "exceed-limit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const {
      modelValue,
      defaultValue,
      inputValue,
      defaultInputValue,
      allowClear,
      disabled,
      loading,
      defaultPopupVisible,
      popupVisible,
      searchDelay,
      options,
      showFooterOnEmpty,
      showHeaderOnEmpty,
      limit,
      multiple
    } = toRefs(props);
    const { filterOption, formatLabel } = props;
    provide("filterOption", filterOption);
    provide("limit", limit);
    provide("multiple", multiple);
    provide("emits", emits);
    const triggerPostion = ref("bl");
    const inputRef = ref();
    const {
      computedLabel,
      computedVisible,
      computedInputValue,
      computedValue,
      isEmpty
    } = useSeletValue({
      popupVisible,
      defaultPopupVisible,
      modelValue,
      defaultValue,
      defaultInputValue,
      inputValue,
      formatLabel,
      emits
    });
    const showClearBtn = computed(
      () => allowClear.value && !disabled.value && !loading.value && String(computedValue.value).length
    );
    const isCloseButton = (el) => {
      const classList = el.classList;
      if (classList.contains("yc-select-clear-icon")) {
        return true;
      } else if (el.tagName == "BODY") {
        return false;
      } else {
        return isCloseButton(el.parentElement);
      }
    };
    const handleClick = async () => {
      var _a, _b;
      computedVisible.value = !computedVisible.value;
      if (computedVisible.value) {
        await sleep(0);
        (_a = inputRef.value) == null ? void 0 : _a.focus();
      } else {
        (_b = inputRef.value) == null ? void 0 : _b.blur();
      }
    };
    const handleClear = () => {
      computedValue.value = "";
      emits("clear");
    };
    const handleSearch = async (v) => {
      await sleep(searchDelay.value);
      emits("search", v);
    };
    return (_ctx, _cache) => {
      const _component_yc_icon = resolveComponent("yc-icon");
      const _component_yc_icon_button = resolveComponent("yc-icon-button");
      return openBlock(), createBlock(YcTrigger, mergeProps({
        "popup-visible": unref(computedVisible),
        "onUpdate:popupVisible": _cache[2] || (_cache[2] = ($event) => isRef(computedVisible) ? computedVisible.value = $event : null),
        trigger: "click",
        position: "bl",
        "animation-name": "slide-dynamic-origin",
        "popup-offset": 4,
        "unmount-on-close": _ctx.unmountonClose,
        "popup-container": _ctx.popupContainer,
        disabled: unref(disabled),
        "auto-fit-popup-width": "",
        "click-out-side-ingore-fn": isCloseButton
      }, _ctx.triggerProps, {
        "content-style": {
          transformOrigin: unref(TRANSFORM_ORIGIN_MAP)[triggerPostion.value],
          ..._ctx.triggerProps.contentStyle
        },
        onPositionChange: _cache[3] || (_cache[3] = (v) => triggerPostion.value = v),
        onPopupVisibleChange: _cache[4] || (_cache[4] = (v) => _ctx.$emit("popupVisibleChange", v))
      }), {
        content: withCtx(() => [
          createVNode(YcSpin, {
            loading: unref(loading),
            class: "yc-select-dropdown-loading"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_3, [
                _ctx.$slots.header && (unref(showHeaderOnEmpty) || !unref(isEmpty)) ? (openBlock(), createElementBlock("div", _hoisted_4, [
                  renderSlot(_ctx.$slots, "header", {}, void 0, true)
                ])) : createCommentVNode("", true),
                createVNode(YcScrollbar, { style: { "max-height": "200px" } }, {
                  default: withCtx(() => [
                    createBaseVNode("div", _hoisted_5, [
                      renderSlot(_ctx.$slots, "default", {}, void 0, true),
                      (openBlock(true), createElementBlock(Fragment, null, renderList(unref(options), (item) => {
                        return openBlock(), createBlock(Option, {
                          key: item.value,
                          value: item.value,
                          label: item.label,
                          disabled: item.disabled
                        }, null, 8, ["value", "label", "disabled"]);
                      }), 128)),
                      unref(isEmpty) ? renderSlot(_ctx.$slots, "empty", { key: 0 }, () => [
                        createVNode(_Empty, { description: "暂无数据" })
                      ], true) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 3
                }),
                _ctx.$slots.footer && (unref(showFooterOnEmpty) || !unref(isEmpty)) ? (openBlock(), createElementBlock("div", _hoisted_6, [
                  renderSlot(_ctx.$slots, "footer", {}, void 0, true)
                ])) : createCommentVNode("", true)
              ])
            ]),
            _: 3
          }, 8, ["loading"])
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "trigger", {}, () => [
            createBaseVNode("div", {
              class: normalizeClass([
                "yc-select-wrapper",
                _ctx.allowSearch ? "yc-select-allow-search" : "",
                showClearBtn.value ? "yc-select-allow-clear" : ""
              ]),
              onClick: handleClick
            }, [
              createVNode(unref(Input), {
                modelValue: unref(computedInputValue),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(computedInputValue) ? computedInputValue.value = $event : null),
                mode: "select",
                "show-input": unref(computedVisible),
                "label-value": unref(computedLabel),
                placeholder: _ctx.placeholder,
                "input-placeholder": unref(computedLabel),
                readonly: !_ctx.allowSearch || unref(loading),
                disabled: unref(disabled),
                size: _ctx.size,
                error: _ctx.error,
                ref_key: "inputRef",
                ref: inputRef,
                class: "yc-select",
                onBlur: _cache[1] || (_cache[1] = ($event) => computedInputValue.value = ""),
                onInput: handleSearch
              }, createSlots({
                suffix: withCtx(() => [
                  unref(loading) ? (openBlock(), createBlock(YcSpin, {
                    key: 0,
                    size: 12,
                    style: { "color": "inherit" },
                    class: "yc-select-loading-icon"
                  }, createSlots({ _: 2 }, [
                    _ctx.$slots["loading-icon"] ? {
                      name: "icon",
                      fn: withCtx(() => [
                        renderSlot(_ctx.$slots, "loading-icon", {}, void 0, true)
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1024)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createBaseVNode("div", _hoisted_1, [
                      renderSlot(_ctx.$slots, "arrow-icon", {}, () => [
                        createVNode(_component_yc_icon, { name: "arrow-right" })
                      ], true)
                    ]),
                    _ctx.allowSearch ? (openBlock(), createElementBlock("div", _hoisted_2, [
                      renderSlot(_ctx.$slots, "search-icon", {}, () => [
                        createVNode(_component_yc_icon, { name: "search" })
                      ], true)
                    ])) : createCommentVNode("", true),
                    showClearBtn.value ? (openBlock(), createBlock(_component_yc_icon_button, {
                      key: 1,
                      name: "close",
                      style: { "color": "inherit" },
                      class: "yc-select-clear-icon",
                      onClick: withModifiers(handleClear, ["stop"])
                    })) : createCommentVNode("", true)
                  ], 64))
                ]),
                _: 2
              }, [
                _ctx.$slots.prefix ? {
                  name: "prefix",
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, "prefix", {}, void 0, true)
                  ]),
                  key: "0"
                } : void 0
              ]), 1032, ["modelValue", "show-input", "label-value", "placeholder", "input-placeholder", "readonly", "disabled", "size", "error"])
            ], 2)
          ], true)
        ]),
        _: 3
      }, 16, ["popup-visible", "unmount-on-close", "popup-container", "disabled", "content-style"]);
    };
  }
});
export {
  _sfc_main as default
};
