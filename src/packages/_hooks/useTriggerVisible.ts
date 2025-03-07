import { Ref, computed, ref, provide, inject } from 'vue';
import { TriggerType } from '@/packages/Trigger/type';
import { isUndefined } from '@/packages/_utils/is';
import { onClickOutside } from '@vueuse/core';
import { Fn } from '../_type';
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
  preventFocus: Ref<boolean>;
  contentRef: Ref<HTMLDivElement | undefined>;
  clickOutSideIngoreFn?: Fn;
  clickOutsideCallback?: Fn;
  mouseenterCallback?: Fn;
  emits: Fn;
}) => {
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
    clickOutsideCallback,
    mouseenterCallback,
    emits,
  } = params;
  // visible
  const computedVisible = useControlValue<boolean>(
    popupVisible,
    defaultPopupVisible,
    (val: boolean) => {
      emits('update:popupVisible', val);
      emits('popup-visible-change', val);
    }
  );
  // 计时器用于异步处理
  const timeout = inject('timeout', ref<NodeJS.Timeout>());
  provide('timeout', timeout);
  // 鼠标操作的位置
  const mouseX = ref<number>(0);
  const mouseY = ref<number>(0);
  // 点击
  const handleClick = (e: MouseEvent) => {
    if (timeout.value) clearTimeout(timeout.value);
    if (trigger.value != 'click') return;
    const { pageX, pageY } = e;
    mouseX.value = pageX;
    mouseY.value = pageY;
    computedVisible.value = clickToClose.value ? !computedVisible.value : true;
  };
  // 鼠标右击
  const handleContextmenu = (e: MouseEvent) => {
    if (timeout.value) clearTimeout(timeout.value);
    if (trigger.value != 'contextMenu') return;
    const { pageX, pageY } = e;
    mouseX.value = pageX;
    mouseY.value = pageY;
    computedVisible.value = clickToClose.value ? !computedVisible.value : true;
  };
  //处理鼠标按下事件，用于阻止content内的元素获取焦点
  const handleMousedown = (e: MouseEvent) => {
    if (preventFocus.value) {
      e.preventDefault();
    }
  };
  // 鼠标进入
  const handleMouseenter = (isTrigger: boolean, e: MouseEvent) => {
    if (mouseenterCallback) mouseenterCallback(isTrigger, e);
    if (timeout.value) clearTimeout(timeout.value);
    if (trigger.value != 'hover' || computedVisible.value) return;
    timeout.value = setTimeout(() => {
      computedVisible.value = true;
    }, mouseEnterDelay.value);
  };
  // 鼠标离开
  const handleMouseleave = () => {
    if (timeout.value) clearTimeout(timeout.value);
    if (trigger.value != 'hover' || !computedVisible.value) return;
    timeout.value = setTimeout(() => {
      computedVisible.value = false;
    }, mouseLeaveDelay.value);
  };
  // 聚焦
  const handleFocus = () => {
    if (timeout.value) clearTimeout(timeout.value);
    if (trigger.value != 'focus' || computedVisible.value) return;
    timeout.value = setTimeout(() => {
      computedVisible.value = true;
    }, focusDelay.value);
  };
  // 失焦
  const handleBlur = () => {
    if (timeout.value) clearTimeout(timeout.value);
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
      const isIngore =
        clickOutSideIngoreFn && clickOutSideIngoreFn(e.target ?? e);
      if (!computedVisible.value || isIngore) {
        return;
      }
      timeout.value = setTimeout(() => {
        if (clickOutsideCallback) {
          clickOutsideCallback(computedVisible, e.target ?? e);
        } else {
          computedVisible.value = false;
        }
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
    handleContextmenu,
  };
};
