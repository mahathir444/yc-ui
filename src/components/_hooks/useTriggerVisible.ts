import { provide, Ref, ref } from 'vue';
import { TriggerType } from '@/components/Trigger';
import { Fn } from '../_type';
import { onClickOutside } from '@vueuse/core';
import useTriggerNested from './useTriggerNested';
import useControlValue from './useControlValue';

export default (params: {
  isNested: Ref<boolean>;
  trigger: Ref<TriggerType>;
  popupVisible: Ref<boolean | undefined>;
  defaultPopupVisible: Ref<boolean>;
  clickToClose: Ref<boolean>;
  blurToClose: Ref<boolean>;
  clickOutsideToClose: Ref<boolean>;
  mouseEnterDelay: Ref<number>;
  mouseLeaveDelay: Ref<number>;
  focusDelay: Ref<number>;
  contentRef: Ref<HTMLDivElement | undefined>;
  emits: Fn;
}) => {
  const {
    isNested,
    trigger,
    popupVisible,
    defaultPopupVisible,
    clickToClose,
    blurToClose,
    clickOutsideToClose,
    mouseEnterDelay,
    mouseLeaveDelay,
    focusDelay,
    contentRef,
    emits,
  } = params;
  // 鼠标操作的位置
  const mouseX = ref<number>(0);
  const mouseY = ref<number>(0);
  // visible
  const computedVisible = useControlValue<boolean>(
    popupVisible,
    defaultPopupVisible.value,
    (val) => {
      emits('update:popupVisible', val);
      emits('popup-visible-change', val);
    }
  );
  // 处理嵌套
  const { level, curLevel, timeout, groupId, isSameGroup } = useTriggerNested(
    trigger.value,
    () => (computedVisible.value = false)
  );
  // 点击
  const handleClick = (e: MouseEvent) => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (trigger.value != 'click') {
      return;
    }
    const { pageX, pageY } = e;
    mouseX.value = pageX;
    mouseY.value = pageY;
    computedVisible.value = clickToClose.value ? !computedVisible.value : true;
  };
  // 鼠标右击
  const handleContextmenu = (e: MouseEvent) => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (trigger.value != 'contextMenu') {
      return;
    }
    const { pageX, pageY } = e;
    mouseX.value = pageX;
    mouseY.value = pageY;
    computedVisible.value = clickToClose.value ? !computedVisible.value : true;
  };
  // 鼠标进入
  const handleMouseenter = (isTrigger: boolean) => {
    // 处理嵌套情况
    if (isTrigger) {
      curLevel.value = level;
    }
    // 处理开启
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (trigger.value != 'hover' || computedVisible.value) {
      return;
    }
    timeout.value = setTimeout(() => {
      computedVisible.value = true;
    }, mouseEnterDelay.value);
  };
  // 鼠标离开
  const handleMouseleave = () => {
    // 处理关闭
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (trigger.value != 'hover' || !computedVisible.value) {
      return;
    }
    timeout.value = setTimeout(() => {
      computedVisible.value = false;
    }, mouseLeaveDelay.value);
  };
  // 聚焦
  const handleFocus = () => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (trigger.value != 'focus' || computedVisible.value) {
      return;
    }
    timeout.value = setTimeout(() => {
      computedVisible.value = true;
    }, focusDelay.value);
  };
  // 失焦
  const handleBlur = () => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (
      trigger.value != 'focus' ||
      !blurToClose.value ||
      !computedVisible.value
    ) {
      return;
    }
    computedVisible.value = false;
  };
  // 点击到contentRef外层关闭
  if (clickOutsideToClose.value) {
    onClickOutside(contentRef, async (e) => {
      // 是否忽略
      const isIngore =
        isNested.value && isSameGroup((e.target ?? e) as HTMLElement);
      if (!computedVisible.value || isIngore) {
        return;
      }
      timeout.value = setTimeout(() => {
        computedVisible.value = false;
      }, 0);
    });
  }
  return {
    groupId,
    mouseX,
    mouseY,
    computedVisible,
    handleClick,
    handleMouseenter,
    handleMouseleave,
    handleFocus,
    handleBlur,
    handleContextmenu,
  };
};
