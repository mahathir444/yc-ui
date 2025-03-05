import { watch, Ref, computed, ref } from 'vue';
import { TriggerType } from '@/packages/Trigger/type';
import { isUndefined } from '@/packages/_utils/is';
import { onClickOutside } from '@vueuse/core';
import { Fn } from '../_type';

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
  clickOutSideIngoreFn: Fn | undefined;
  clickOutsideCallback: Fn | undefined;
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
  // 计时器用于异步处理
  let timer: NodeJS.Timeout;
  // 点击
  const handleClick = () => {
    if (timer) clearTimeout(timer);
    if (trigger.value != 'click') return;
    computedVisible.value = clickToClose.value ? !computedVisible.value : true;
  };
  // 鼠标右击
  const handleContextmenu = () => {
    if (timer) clearTimeout(timer);
    if (trigger.value != 'contextMenu') return;
    computedVisible.value = clickToClose.value ? !computedVisible.value : true;
  };
  //处理鼠标按下事件，用于阻止content内的元素获取焦点
  const handleMousedown = (e: MouseEvent) => {
    if (preventFocus.value) {
      e.preventDefault();
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
  if (clickOutsideToClose.value) {
    onClickOutside(contentRef, async (e) => {
      const isIngore = clickOutSideIngoreFn && clickOutSideIngoreFn(e);
      if (!computedVisible.value || isIngore) {
        return;
      }
      timer = setTimeout(() => {
        if (clickOutsideCallback) {
          clickOutsideCallback(e);
        }
        computedVisible.value = false;
      }, 0);
    });
  }
  // 检测visible改变，触发事件
  watch(computedVisible, () => {
    emits('popup-visible-change');
  });

  return {
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
