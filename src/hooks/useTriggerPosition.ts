import { TriggerPostion } from '@/packages/Trigger/type';
import { computed, Ref, ref } from 'vue';
export default (params: {
  position: Ref<TriggerPostion>;
  left: Ref<number>;
  top: Ref<number>;
  bottom: Ref<number>;
  right: Ref<number>;
  triggerWidth: Ref<number>;
  triggerHeight: Ref<number>;
  contentWidth: Ref<number>;
  contentHeight: Ref<number>;
  arrowWidth: Ref<number>;
  arrowHeight: Ref<number>;
  popupTranslate: Ref<number[] | undefined>;
}) => {
  const {
    position,
    left,
    top,
    bottom,
    right,
    triggerHeight,
    triggerWidth,
    contentHeight,
    contentWidth,
    arrowWidth,
    arrowHeight,
    popupTranslate,
  } = params;
  // 动态计算当前的位置
  const curPostion = ref<TriggerPostion>(position.value);
  // 计算content的位置
  const contentPosition = computed(() => {
    let offsetTop = 0;
    let offsetLeft = 0;
    const [offsetX, offsetY] = popupTranslate.value || [0, 0];
    // 初始位置计算
    if (['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(position.value)) {
      offsetTop = position.value.startsWith('t')
        ? top.value - contentHeight.value
        : bottom.value;
      if (['top', 'bottom'].includes(position.value)) {
        offsetLeft = left.value + (triggerWidth.value - contentWidth.value) / 2;
      } else if (['tl', 'bl'].includes(position.value)) {
        offsetLeft = left.value;
      } else {
        offsetLeft = right.value - contentWidth.value;
      }
    } else {
      offsetLeft = position.value.startsWith('l')
        ? left.value - contentWidth.value
        : right.value;
      if (['left', 'right'].includes(position.value)) {
        offsetTop = top.value + (triggerHeight.value - contentHeight.value) / 2;
      } else if (['lt', 'rt'].includes(position.value)) {
        offsetTop = top.value;
      } else {
        offsetTop = bottom.value - contentHeight.value;
      }
    }
    // 边界检测
    if (['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(position.value)) {
      // 上下检测
      if (offsetTop < 0 && ['top', 'tl', 'tr'].includes(position.value)) {
        offsetTop = bottom.value;
        curPostion.value =
          position.value == 'top'
            ? 'bottom'
            : (position.value.replace('t', 'b') as TriggerPostion);
      } else if (
        offsetTop + contentHeight.value > window.innerHeight &&
        ['bottom', 'bl', 'br'].includes(position.value)
      ) {
        offsetTop = top.value - contentHeight.value;
        curPostion.value =
          position.value == 'bottom'
            ? 'top'
            : (position.value.replace('b', 't') as TriggerPostion);
      }
      // 左右检测
      if (offsetLeft < 0) {
        offsetLeft = left.value;
      } else if (offsetLeft + contentWidth.value > window.innerWidth) {
        offsetLeft = right.value - contentWidth.value;
      }
    } else {
      // 左右检测
      if (offsetLeft < 0 && ['left', 'lt', 'lb'].includes(position.value)) {
        offsetLeft = right.value - contentHeight.value;
        curPostion.value =
          position.value == 'left'
            ? 'right'
            : (position.value.replace('l', 'r') as TriggerPostion);
      } else if (
        offsetLeft + contentWidth.value > window.innerWidth &&
        ['right', 'rt', 'rb'].includes(position.value)
      ) {
        offsetLeft = left.value;
        curPostion.value =
          position.value == 'right'
            ? 'left'
            : (position.value.replace('r', 'l') as TriggerPostion);
      }
      // 上下检测
      if (offsetTop < 0) {
        offsetTop = top.value;
      } else if (offsetTop + contentHeight.value > window.innerHeight) {
        offsetTop = top.value - contentHeight.value;
      }
    }
    console.log(curPostion.value, 'cur');

    return {
      top: `${offsetTop + offsetY}px`,
      left: `${offsetLeft + offsetX}px`,
    };
  });
  // 计算arrow的位置
  const arrowPostion = computed(() => {
    if (['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(curPostion.value)) {
      let arrowLeft = 0;
      let arrowRight = 0;
      if (['top', 'bottom'].includes(curPostion.value)) {
        arrowLeft = (contentWidth.value - arrowWidth.value) / 2;
      } else if (['tl', 'bl'].includes(curPostion.value)) {
        arrowLeft = (triggerWidth.value - arrowWidth.value) / 2;
      } else {
        arrowRight = (triggerWidth.value - arrowWidth.value) / 2;
      }
      return {
        top: curPostion.value.startsWith('b')
          ? `${-arrowHeight.value / 2}px`
          : '',
        right: arrowRight,
        bottom: curPostion.value.startsWith('t')
          ? `${-arrowHeight.value / 2}px`
          : '',
        left: arrowLeft,
      };
    } else {
      let arrowTop = 0;
      let arrowBottom = 0;
      if (['left', 'right'].includes(curPostion.value)) {
        arrowTop = (contentHeight.value - arrowHeight.value) / 2;
      } else if (['lt', 'rt'].includes(curPostion.value)) {
        arrowTop = (triggerHeight.value - arrowHeight.value) / 2;
      } else {
        arrowBottom = (triggerHeight.value - arrowHeight.value) / 2;
      }
      return {
        top: arrowTop,
        right: curPostion.value.startsWith('l')
          ? `${-arrowWidth.value / 2}px`
          : '',
        bottom: arrowBottom,
        left: curPostion.value.startsWith('r')
          ? `${-arrowWidth.value / 2}px`
          : '',
      };
    }
  });
  return {
    contentPosition,
    arrowPostion,
  };
};
