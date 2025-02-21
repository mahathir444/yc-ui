import { TriggerPostion } from '@/packages/Trigger/type';
import { computed, Ref } from 'vue';
import { useMouse } from '@vueuse/core';
import { isString } from '@/utils/is';
export default (params: {
  position: Ref<TriggerPostion>;
  alignPoint: Ref<boolean>;
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
    alignPoint,
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
    let offsetTop = '';
    let offsetLeft = '';
    let offsetRight = '';
    const [offsetX, offsetY] = popupTranslate.value || [0, 0];
    if (['top', 'bottom'].includes(position.value)) {
      offsetLeft = `${
        left.value + (triggerWidth.value - contentWidth.value) / 2
      }`;
      offsetTop =
        position.value == 'top'
          ? `${top.value - contentHeight.value}`
          : `${top.value + triggerHeight.value}`;
    } else if (['tl', 'bl'].includes(position.value)) {
      offsetLeft = `${left.value}`;
      offsetTop =
        position.value == 'tl'
          ? `${top.value - contentHeight.value}`
          : `${top.value + triggerHeight.value}`;
    } else if (['tr', 'br'].includes(position.value)) {
      offsetTop =
        position.value == 'tr'
          ? `${top.value - contentHeight.value}`
          : `${top.value + triggerHeight.value}`;
      offsetRight = `${right.value - triggerWidth.value}`;
    } else if (['left', 'right'].includes(position.value)) {
      offsetLeft =
        position.value == 'left' ? `${left.value - contentWidth.value}` : '';
      offsetTop = `${top.value + (triggerHeight.value - contentHeight.value) / 2}`;
      offsetRight =
        position.value == 'left'
          ? ''
          : `${right.value - triggerWidth.value - contentWidth.value}`;
    } else if (['lt', 'rt'].includes(position.value)) {
      offsetLeft =
        position.value == 'lt' ? `${left.value - contentWidth.value}` : '';
      offsetTop = `${top.value}`;
      offsetRight =
        position.value == 'lt'
          ? ''
          : `${right.value - triggerWidth.value - contentWidth.value}`;
    } else if (['lb', 'rb'].includes(position.value)) {
      offsetLeft =
        position.value == 'lb' ? `${left.value - contentWidth.value}` : '';
      offsetTop = `${top.value + triggerHeight.value - contentHeight.value}`;
      offsetRight =
        position.value == 'lb'
          ? ''
          : `${right.value - triggerWidth.value - contentWidth.value}`;
    }
    // 边界检测
    // if (offsetLeft.toString() && +offsetLeft < 0) {
    //   offsetRight = `${right.value - triggerWidth.value - contentWidth.value}`;
    // } else if (
    //   offsetRight.toString() &&
    //   +offsetRight > window.innerWidth - triggerWidth.value - contentWidth.value
    // ) {
    //   offsetLeft = `${left.value}`;
    // }
    // if (+offsetTop < 0) {
    //   offsetTop = `${top.value + triggerHeight.value}`;
    // } else if (
    //   +offsetTop >
    //   window.innerHeight - triggerHeight.value - contentHeight.value
    // ) {
    //   offsetTop = `${top.value - contentHeight.value}`;
    // }
    return {
      left: `${!offsetLeft.toString() ? offsetLeft : +offsetLeft + offsetX}px`,
      top: `${!offsetTop.toString() ? offsetTop : +offsetTop + offsetY}px`,
      right: `${!offsetRight.toString() ? offsetRight : +offsetRight - offsetX}px`,
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
