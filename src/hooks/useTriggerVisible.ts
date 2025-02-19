import { watch, Ref, computed, ref } from 'vue';
import { Trigger } from '@/packages/Trigger/type';
import { isUndefined } from '@/utils/is';
import { onClickOutside } from '@vueuse/core';

export default (params: {
  trigger: Ref<Trigger>;
  popupVisible: Ref<boolean | undefined>;
  defaultPopupVisible: Ref<boolean>;
  clickToClose: Ref<boolean>;
  blurToClose: Ref<boolean>;
  clickOutsidetoClose: Ref<boolean>;
  mouseEnterDelay: Ref<number>;
  mouseLeaveDelay: Ref<number>;
  focusDelay: Ref<number>;
  contentRef: Ref<HTMLDivElement | undefined>;
  emits: (...args: any) => any;
}) => {
  const {
    trigger,
    popupVisible,
    defaultPopupVisible,
    clickToClose,
    blurToClose,
    clickOutsidetoClose,
    mouseEnterDelay,
    mouseLeaveDelay,
    focusDelay,
    contentRef,
    emits,
  } = params;
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
  // 计时器用于
  let timer: any;
  // 点击
  const handleClick = () => {
    if (timer) clearTimeout(timer);
    if (trigger.value != 'click') return;
    if (clickToClose.value) {
      computedVisible.value = !computedVisible.value;
    } else {
      computedVisible.value = true;
    }
  };
  // 鼠标右击
  const handleContextmenu = () => {
    if (trigger.value != 'contextMenu') return;
    if (clickToClose.value) {
      computedVisible.value = !computedVisible.value;
    } else {
      computedVisible.value = true;
    }
  };
  // 鼠标进入
  const handleMouseenter = async () => {
    if (timer) clearTimeout(timer);
    if (trigger.value != 'hover' || computedVisible.value) return;
    timer = setTimeout(() => {
      computedVisible.value = true;
    }, mouseEnterDelay.value);
  };
  // 鼠标离开
  const handleMouseleave = () => {
    if (timer) clearTimeout(timer);
    if (trigger.value != 'hover' || !computedVisible.value) return;
    timer = setTimeout(() => {
      computedVisible.value = false;
    }, mouseLeaveDelay.value);
  };
  // 聚焦
  const handleFocus = () => {
    if (timer) clearTimeout(timer);
    if (trigger.value != 'focus' || computedVisible.value) return;
    timer = setTimeout(() => {
      computedVisible.value = true;
    }, focusDelay.value);
  };
  // 失焦
  const handleBlur = () => {
    if (timer) clearTimeout(timer);
    if (
      trigger.value != 'focus' ||
      !blurToClose.value ||
      !computedVisible.value
    )
      return;
    computedVisible.value = false;
  };
  // 点击到contentRef外层关闭
  onClickOutside(contentRef, async () => {
    if (!computedVisible.value || !clickOutsidetoClose.value) return;
    timer = setTimeout(() => {
      computedVisible.value = false;
    }, 0);
  });
  // 检测visible改变，触发事件
  watch(computedVisible, () => {
    emits('popup-visible-change');
  });

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
