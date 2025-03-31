import { Ref, ref, toRefs, watchEffect } from 'vue';
import { TriggerProps, TriggerEmits } from '@/components/Trigger';
import { ObjectData, RequiredDeep } from '../type';
import { onClickOutside } from '@vueuse/core';
import useTriggerNested from './useTriggerNested';
import useControlValue from './useControlValue';
export default (params: {
  props: ObjectData;
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
    scrollToClose,
    scrollToCloseDistance,
    autoSetPosition,
  } = toRefs(props as RequiredDeep<TriggerProps>);
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
    isSameNestedGroup,
  } = useTriggerNested(trigger.value, () => (computedVisible.value = false));
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
  const handleClickEvent = (e: MouseEvent, type: 'click' | 'contextMenu') => {
    if (timeout.value) clearTimeout(timeout.value);
    if (!['click', 'contextMenu'].includes(type)) return;
    if (!autoSetPosition.value) {
      const { pageX, pageY } = e;
      mouseX.value = pageX;
      mouseY.value = pageY;
    }
    computedVisible.value = clickToClose.value ? !computedVisible.value : true;
    // 触发click事件
    onTriggerMouseclick?.();
  };
  // 鼠标进入
  const handleMouseenter = () => {
    // 处理trigger嵌套
    curHoverLevel.value = level;
    // 处理开启
    if (timeout.value) clearTimeout(timeout.value);
    if (trigger.value != 'hover' || computedVisible.value) return;
    timeout.value = setTimeout(() => {
      computedVisible.value = true;
      // 触发enter事件
      onTriggerMouseenter?.();
    }, mouseEnterDelay.value);
  };
  // 鼠标离开
  const handleMouseleave = (e: MouseEvent) => {
    // 处理关闭
    if (timeout.value) clearTimeout(timeout.value);
    if (trigger.value != 'hover' || !computedVisible.value) return;
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
    if (timeout.value) clearTimeout(timeout.value);
    if (trigger.value != 'focus' || computedVisible.value) return;
    timeout.value = setTimeout(() => {
      computedVisible.value = true;
      // 触发foucs事件
      onTriggerFocus?.();
    }, focusDelay.value);
  };
  // 失焦
  const handleBlur = () => {
    const disabledClose =
      trigger.value != 'focus' || !blurToClose.value || !computedVisible.value;
    if (timeout.value) clearTimeout(timeout.value);
    if (disabledClose) return;
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
