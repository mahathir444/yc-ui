import { TriggerPostion } from '@/packages/Trigger/type';
import { computed, Ref } from 'vue';
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
  // 计算content的位置
  const contentPosition = computed(() => {
    let offsetTop: string | number = '';
    let offsetLeft: string | number = '';
    let offsetRight: string | number = '';
    const [offsetX, offsetY] = popupTranslate.value || [0, 0];
    if (['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(position.value)) {
      offsetTop = position.value.startsWith('t')
        ? top.value - contentHeight.value
        : top.value + triggerHeight.value;
      if (['top', 'bottom'].includes(position.value)) {
        offsetLeft = left.value + (triggerWidth.value - contentWidth.value) / 2;
      } else if (['tl', 'bl'].includes(position.value)) {
        offsetLeft = left.value;
      } else {
        offsetRight = right.value - triggerWidth.value;
      }
    } else {
      offsetLeft = position.value.startsWith('l')
        ? left.value - contentWidth.value
        : '';
      offsetRight = position.value.startsWith('r')
        ? right.value - triggerWidth.value - contentWidth.value
        : '';
      if (['left', 'right'].includes(position.value)) {
        offsetTop = top.value + (triggerHeight.value - contentHeight.value) / 2;
      } else if (['lt', 'rt'].includes(position.value)) {
        offsetTop = top.value;
      } else {
        offsetTop = top.value + triggerHeight.value - contentHeight.value;
      }
    }
    // 边界检测
    if (['top', 'tl', 'tr']) {
      if ((offsetTop as number) < 0) {
      }
    }
    return {
      left: `${!String(offsetLeft) ? offsetLeft : +offsetLeft + offsetX}px`,
      top: `${!String(offsetTop) ? offsetTop : +offsetTop + offsetY}px`,
      right: `${!String(offsetRight) ? offsetRight : +offsetRight - offsetX}px`,
    };
  });
  // 计算arrow的位置
  const arrowPostion = computed(() => {
    if (['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(position.value)) {
      let arrowLeft = '';
      let arrowRight = '';
      if (['top', 'bottom'].includes(position.value)) {
        arrowLeft = `${(contentWidth.value - arrowWidth.value) / 2}px`;
      } else if (['tl', 'bl'].includes(position.value)) {
        arrowLeft = `${(triggerWidth.value - arrowWidth.value) / 2}px`;
      } else {
        arrowRight = `${(triggerWidth.value - arrowWidth.value) / 2}px`;
      }
      return {
        top: position.value.startsWith('b')
          ? `${-arrowHeight.value / 2}px`
          : '',
        left: arrowLeft,
        bottom: position.value.startsWith('t')
          ? `${-arrowHeight.value / 2}px`
          : '',
        right: arrowRight,
      };
    } else {
      let arrowTop = '';
      let arrowBottom = '';
      if (['left', 'right'].includes(position.value)) {
        arrowTop = `${(contentHeight.value - arrowHeight.value) / 2}px`;
      } else if (['lt', 'rt'].includes(position.value)) {
        arrowTop = `${(triggerHeight.value - arrowHeight.value) / 2}px`;
      } else {
        arrowBottom = `${(triggerHeight.value - arrowHeight.value) / 2}px`;
      }
      return {
        top: arrowTop,
        left: position.value.startsWith('r')
          ? `${-arrowWidth.value / 2}px`
          : '',
        bottom: arrowBottom,
        right: position.value.startsWith('l')
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
