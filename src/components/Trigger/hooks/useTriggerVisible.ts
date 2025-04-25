import { Ref, ref, toRefs, watchEffect } from 'vue';
import { TriggerPropsRequired, TriggerEmits } from '../type';
import { onClickOutside } from '@vueuse/core';
import { useControlValue, useConfigProvder } from '@shared/hooks';
import useTriggerNested from './useTriggerNested';
export default (params: {
  props: TriggerPropsRequired;
  emits: TriggerEmits;
  popupRef: Ref<HTMLDivElement | undefined>;
  triggerRef: Ref<HTMLElement | undefined>;
}) => {
  const { props, emits, popupRef, triggerRef } = params;
  // 解构属性
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
    scrollToCloseDistance,
    autoSetPosition,
  } = toRefs(props);
  // 接收全局属性
  const { scrollToClose } = useConfigProvder();
  console.log(scrollToClose.value, 'scrollTopClose');
  // 处理事件
  const {
    onTriggerMouseclick,
    onTriggerMouseenter,
    onTriggerMouseleave,
    onTriggerBlur,
    onTriggerFocus,
  } = props;
  // 处理嵌套
  const {
    isNested,
    level,
    curHoverLevel,
    timeout,
    groupId,
    setHoverLevel,
    isSameNestedGroup,
  } = useTriggerNested(trigger.value, () => {
    computedVisible.value = false;
  });
  // 记录鼠标操作的位置
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
  // 点击
  const handleClickEvent = (e: MouseEvent) => {
    if (timeout.value) clearTimeout(timeout.value);
    if (!['click', 'contextMenu'].includes(trigger.value)) return;
    if (!autoSetPosition.value) {
      const { pageX, pageY } = e;
      mouseX.value = pageX;
      mouseY.value = pageY;
    }
    console.log(computedVisible.value, 'computedVisible');
    computedVisible.value = clickToClose.value ? !computedVisible.value : true;
    console.log(computedVisible.value, 'computedVisible');
    // 触发click事件
    onTriggerMouseclick?.();
  };
  // 鼠标进入
  const handleMouseenter = () => {
    setHoverLevel(mouseEnterDelay.value);
    if (trigger.value != 'hover') return;
    if (timeout.value) clearTimeout(timeout.value);
    if (computedVisible.value) return;
    timeout.value = setTimeout(() => {
      computedVisible.value = true;
      console.log('进入函数触发了', computedVisible.value);
      // 触发enter事件
      onTriggerMouseenter?.();
    }, mouseEnterDelay.value);
  };
  // 鼠标离开
  const handleMouseleave = (e: MouseEvent) => {
    if (trigger.value != 'hover') return;
    if (timeout.value) clearTimeout(timeout.value);
    if (!computedVisible.value) return;
    timeout.value = setTimeout(() => {
      // 处理不嵌套的情况
      if (!isNested.value) {
        computedVisible.value = false;
      }
      // 处理嵌套情况
      else {
        const { isGroup } = isSameNestedGroup(
          e.relatedTarget as HTMLDivElement
        );
        // 如果在一个组则关闭
        isGroup && (computedVisible.value = false);
        // 不在一个组则关闭所有
        !isGroup && (curHoverLevel.value = -1);
      }
      // 处理leave事件
      onTriggerMouseleave?.();
    }, mouseLeaveDelay.value);
  };
  // 聚焦
  const handleFocus = () => {
    if (trigger.value != 'focus') return;
    if (timeout.value) clearTimeout(timeout.value);
    if (computedVisible.value) return;
    timeout.value = setTimeout(() => {
      computedVisible.value = true;
      // 触发foucs事件
      onTriggerFocus?.();
    }, focusDelay.value);
  };
  // 失焦
  const handleBlur = () => {
    if (trigger.value != 'focus' || !blurToClose.value) return;
    if (timeout.value) clearTimeout(timeout.value);
    if (!computedVisible.value) return;
    computedVisible.value = false;
    onTriggerBlur?.();
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
      popupRef,
      (e) => {
        let isIngore = false;
        // 处理dropdown或者嵌套情况
        if (isNested.value) {
          const { isGroup, level: _level } = isSameNestedGroup(
            (e.target ?? e) as HTMLElement
          );
          isIngore = isGroup;
          computedVisible.value = isIngore
            ? level <= _level
            : computedVisible.value;
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
