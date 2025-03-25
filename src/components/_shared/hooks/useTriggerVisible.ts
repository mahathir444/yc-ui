import { Ref, ref, watchEffect } from 'vue';
import { TriggerType } from '@/components/Trigger';
import { Fn } from '../type';
import { onClickOutside } from '@vueuse/core';
import useTriggerNested from './useTriggerNested';
import useControlValue from './useControlValue';

export default (params: {
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
  triggerRef: Ref<HTMLElement | undefined>;
  isDropdown: Ref<boolean>;
  scrollToClose: Ref<boolean>;
  scrollToCloseDistance: Ref<number>;
  emits: Fn;
}) => {
  const {
    isDropdown,
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
    triggerRef,
    scrollToClose,
    scrollToCloseDistance,
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
  const {
    isNested,
    level,
    curHoverLevel,
    timeout,
    groupId,
    isSameNestedGroup,
  } = useTriggerNested(trigger.value, () => (computedVisible.value = false));
  // 点击
  const handleClickEvent = (e: MouseEvent, type: 'click' | 'contextMenu') => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (trigger.value != type) {
      return;
    }
    const { pageX, pageY } = e;
    mouseX.value = pageX;
    mouseY.value = pageY;
    computedVisible.value = clickToClose.value ? !computedVisible.value : true;
  };
  // 鼠标进入
  const handleMouseenter = (isTrigger: boolean) => {
    // 处理dropdown嵌套
    if (isDropdown.value) {
      curHoverLevel.value = isTrigger ? level : curHoverLevel.value;
    }
    // 处理trigger嵌套
    if (isNested.value) {
      curHoverLevel.value = level;
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
  const handleMouseleave = (e: MouseEvent) => {
    // 处理关闭
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
    if (trigger.value != 'hover' || !computedVisible.value) {
      return;
    }
    timeout.value = setTimeout(() => {
      // 处理不嵌套的情况
      if (!isNested.value || isDropdown.value) {
        computedVisible.value = false;
        return;
      }
      // 处理嵌套情况
      const { isGroup } = isSameNestedGroup(e.relatedTarget as HTMLDivElement);
      if (isGroup) {
        computedVisible.value = false;
      } else {
        curHoverLevel.value = -1;
      }
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
  const handleClickOutsideClose = () => {
    if (
      !clickOutsideToClose.value ||
      !['click', 'contextMenu'].includes(trigger.value)
    ) {
      return;
    }
    onClickOutside(
      contentRef,
      (e) => {
        let isIngore = false;
        // 处理dropdown或者嵌套情况
        if (isDropdown.value || isNested.value) {
          const { isGroup, level: _level } = isSameNestedGroup(
            (e.target ?? e) as HTMLElement
          );
          isIngore = isGroup;
          if (isIngore && !isDropdown.value) {
            computedVisible.value = level <= _level;
          }
        }
        // 处理正常逻辑
        if (!computedVisible.value || isIngore) {
          return;
        }
        computedVisible.value = false;
      },
      {
        ignore: [triggerRef],
      }
    );
  };
  // 处理滚动关闭
  const handleScrollToClose = (left: Ref<number>, top: Ref<number>) => {
    // 检测滚动关闭
    if (!scrollToClose.value) return;
    let oldLeft = left.value;
    let oldTop = top.value;
    watchEffect(() => {
      if (!computedVisible.value) return;
      const distanceX = Math.abs(oldLeft - left.value);
      const distanceY = Math.abs(oldTop - top.value);
      if (
        distanceX >= scrollToCloseDistance.value ||
        distanceY >= scrollToCloseDistance.value
      ) {
        computedVisible.value = false;
      }
      oldLeft = left.value;
      oldTop = top.value;
    });
  };
  return {
    level,
    groupId,
    mouseX,
    mouseY,
    computedVisible,
    handleClickEvent,
    handleMouseenter,
    handleMouseleave,
    handleFocus,
    handleBlur,
    handleClickOutsideClose,
    handleScrollToClose,
  };
};
