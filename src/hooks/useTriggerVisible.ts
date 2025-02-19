import { WritableComputedRef, Ref, computed, ref } from 'vue';
import { Trigger } from '@/packages/Trigger/type';
import { isUndefined } from '@/utils/is';

export default (params: {
  trigger: Ref<Trigger>;
  popupVisible: Ref<boolean | undefined>;
  defaultPopupVisible: Ref<boolean>;
  emits: (...args: any) => any;
}) => {
  const { trigger, popupVisible, defaultPopupVisible, emits } = params;
  // 受控的visible
  const controlVisible = ref<boolean>(defaultPopupVisible.value);
  // visible
  const computedVisible = computed({
    get() {
      return !isUndefined(popupVisible.value)
        ? popupVisible.value
        : controlVisible.value;
    },
    set(val) {
      if (!isUndefined(popupVisible.value)) {
        emits('update:popupVisible', val);
      } else {
        controlVisible.value = val;
      }
    },
  });
  let timer: any;
  const handleClick = () => {
    if (trigger.value != 'click') return;
    computedVisible.value = true;
  };
  const handleMouseenter = () => {
    if (timer) clearTimeout(timer);
    if (trigger.value != 'hover' || computedVisible.value) return;
    computedVisible.value = true;
  };
  const handleMouseleave = () => {
    if (trigger.value != 'hover') return;
    timer = setTimeout(() => {
      computedVisible.value = false;
    }, 20);
  };
  const handleFocus = () => {
    if (trigger.value != 'focus') return;
    computedVisible.value = true;
  };
  const handleBlur = () => {
    if (trigger.value != 'focus') return;
    computedVisible.value = false;
  };
  const handleContextmenu = () => {
    if (trigger.value != 'contextMenu') return;
    computedVisible.value = true;
  };

  return {
    computedVisible,
    handleClick,
    handleMouseenter,
    handleMouseleave,
    handleFocus,
    handleBlur,
    handleContextmenu,
  };
};
