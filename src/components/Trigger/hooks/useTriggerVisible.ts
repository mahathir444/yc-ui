import { nextTick, Ref, ref, toRefs, computed, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { TriggerEmits } from '../type';
import useTriggerNested, { TriggerProps } from './useTriggerNested';
import { Props } from '@shared/type';
import { useControlValue, useConfigProvder } from '@shared/hooks';
import { findFirstScrollableParent, unrefElement } from '@shared/utils';

export default (params: {
  props: Props;
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
    disabled,
    scrollToCloseDistance,
    autoSetPosition,
  } = toRefs(props as TriggerProps);
  // 接收全局属性
  const { scrollToClose } = useConfigProvder(props);
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
  let oldScrollLeft = 0;
  let oldScrollTop = 0;
  // 滚动容器
  const scrollContainer = computed(() => {
    return triggerRef.value
      ? findFirstScrollableParent(unrefElement(triggerRef.value))
      : null;
  });
  // 点击
  const handleClickEvent = (e: MouseEvent) => {
    if (!['click', 'contextMenu'].includes(trigger.value) || disabled.value)
      return;
    if (timeout.value) clearTimeout(timeout.value);
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
    setHoverLevel(mouseEnterDelay.value);
    if (trigger.value != 'hover' || disabled.value) return;
    if (timeout.value) clearTimeout(timeout.value);
    if (computedVisible.value) return;
    timeout.value = setTimeout(() => {
      computedVisible.value = true;
      // 触发enter事件
      onTriggerMouseenter?.();
    }, mouseEnterDelay.value);
  };
  // 鼠标离开
  const handleMouseleave = (e: MouseEvent) => {
    if (trigger.value != 'hover' || disabled.value) return;
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
    if (trigger.value != 'focus' || disabled.value) return;
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
    if (trigger.value != 'focus' || !blurToClose.value || disabled.value)
      return;
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
        if (disabled.value) return;
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
  // 处理滚动关闭,滚动关闭存在问题
  const handleScrollToClose = async () => {
    await nextTick();
    // 检测滚动关闭
    if (!scrollToClose.value || !scrollContainer.value) return;
    scrollContainer.value.addEventListener('scroll', () => {
      if (!computedVisible.value) return;
      const { scrollTop, scrollLeft } = scrollContainer.value!;
      if (
        Math.abs(scrollTop - oldScrollTop) >= scrollToCloseDistance.value ||
        Math.abs(scrollLeft - oldScrollLeft) >= scrollToCloseDistance.value
      ) {
        computedVisible.value = false;
        oldScrollTop = scrollTop;
        oldScrollLeft = oldScrollLeft;
      }
    });
  };
  // 检测visible确定第一次的left top
  watch(
    () => computedVisible.value,
    async () => {
      await nextTick();
      if (!scrollContainer.value) return;
      const { scrollTop, scrollLeft } = scrollContainer.value;
      oldScrollLeft = scrollLeft;
      oldScrollTop = scrollTop;
    }
  );
  // 处理关闭
  handleClickOutsideClose();
  handleScrollToClose();
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
  };
};
