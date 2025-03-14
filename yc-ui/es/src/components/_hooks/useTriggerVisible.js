import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { onClickOutside } from "../../../node_modules/@vueuse/core/index.js";
import useControlValue from "./useControlValue.js";
import { inject, provide } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
import { ref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
const useTriggerVisible = (params) => {
  const {
    trigger,
    popupVisible,
    defaultPopupVisible,
    clickToClose,
    blurToClose,
    clickOutsideToClose,
    mouseEnterDelay,
    mouseLeaveDelay,
    focusDelay,
    preventFocus,
    contentRef,
    clickOutSideIngoreFn,
    mouseenterCallback,
    emits
  } = params;
  const computedVisible = useControlValue(
    popupVisible,
    defaultPopupVisible.value,
    (val) => {
      emits("update:popupVisible", val);
      emits("popup-visible-change", val);
    }
  );
  const timeout = inject("timeout", ref());
  provide("timeout", timeout);
  const mouseX = ref(0);
  const mouseY = ref(0);
  const handleClick = (e) => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (trigger.value != "click") {
      return;
    }
    const { pageX, pageY } = e;
    mouseX.value = pageX;
    mouseY.value = pageY;
    computedVisible.value = clickToClose.value ? !computedVisible.value : true;
  };
  const handleContextmenu = (e) => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (trigger.value != "contextMenu") {
      return;
    }
    const { pageX, pageY } = e;
    mouseX.value = pageX;
    mouseY.value = pageY;
    computedVisible.value = clickToClose.value ? !computedVisible.value : true;
  };
  const handleMousedown = (e) => {
    if (preventFocus.value) {
      e.preventDefault();
    }
  };
  const handleMouseenter = (isTrigger, e) => {
    if (mouseenterCallback) {
      mouseenterCallback(isTrigger, e);
    }
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (trigger.value != "hover" || computedVisible.value) {
      return;
    }
    timeout.value = setTimeout(() => {
      computedVisible.value = true;
    }, mouseEnterDelay.value);
  };
  const handleMouseleave = () => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (trigger.value != "hover" || !computedVisible.value) {
      return;
    }
    timeout.value = setTimeout(() => {
      computedVisible.value = false;
    }, mouseLeaveDelay.value);
  };
  const handleFocus = () => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (trigger.value != "focus" || computedVisible.value) {
      return;
    }
    timeout.value = setTimeout(() => {
      computedVisible.value = true;
    }, focusDelay.value);
  };
  const handleBlur = () => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (trigger.value != "focus" || !blurToClose.value || !computedVisible.value) {
      return;
    }
    computedVisible.value = false;
  };
  if (clickOutsideToClose.value) {
    onClickOutside(contentRef, async (e) => {
      const isIngore = clickOutSideIngoreFn && clickOutSideIngoreFn(e.target ?? e);
      if (!computedVisible.value || isIngore) {
        return;
      }
      timeout.value = setTimeout(() => {
        computedVisible.value = false;
      }, 0);
    });
  }
  return {
    mouseX,
    mouseY,
    computedVisible,
    handleMousedown,
    handleClick,
    handleMouseenter,
    handleMouseleave,
    handleFocus,
    handleBlur,
    handleContextmenu
  };
};
export {
  useTriggerVisible as default
};
