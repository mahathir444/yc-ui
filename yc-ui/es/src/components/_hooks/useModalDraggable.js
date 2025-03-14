import "../../../node_modules/vue/dist/vue.runtime.esm-bundler.js";
import { sleep } from "../_utils/fn.js";
import { useDraggable, useEventListener } from "../../../node_modules/@vueuse/core/index.js";
import { ref } from "../../../node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js";
import { computed, watch } from "../../../node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js";
const useModalDraggable = (config) => {
  const {
    visible,
    triggerRef,
    modalRef,
    draggable,
    fullscreen,
    alignCenter,
    top
  } = config;
  const originX = ref(0);
  const originY = ref(0);
  const { x, y, isDragging } = useDraggable(triggerRef);
  const isDraggable = computed(() => draggable.value && !fullscreen.value);
  const dragStyle = computed(() => {
    return isDraggable.value && (x.value != originX.value || y.value != originY.value) ? {
      transform: `translate(${x.value}px,${y.value}px)`
    } : {
      left: `${originX.value}px`,
      top: `${originY.value}px`
    };
  });
  useEventListener("mousemove", () => {
    if (!isDragging.value || !isDraggable.value)
      return;
    const maxX = window.innerWidth - modalRef.value.offsetWidth;
    const maxY = window.innerHeight - modalRef.value.offsetHeight;
    x.value = x.value >= maxX ? maxX : x.value;
    x.value = x.value <= 0 ? 0 : x.value;
    y.value = y.value >= maxY ? maxY : y.value;
    y.value = y.value <= 0 ? 0 : y.value;
  });
  watch(
    () => visible.value,
    async (v) => {
      if (!v)
        return;
      await sleep(0);
      const offsetX = (window.innerWidth - modalRef.value.offsetWidth) / 2;
      const offsetY = (window.innerHeight - modalRef.value.offsetHeight) / 2;
      const finalX = offsetX <= 0 ? 0 : offsetX;
      const finalY = offsetY <= 0 ? 0 : offsetY;
      originX.value = finalX;
      originY.value = alignCenter.value ? finalY : top.value;
      x.value = originX.value;
      y.value = originY.value;
    },
    {
      immediate: true
    }
  );
  return {
    dragStyle,
    isDraggable
  };
};
export {
  useModalDraggable as default
};
