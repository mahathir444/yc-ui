import { TriggerPostion } from '@/packages/Trigger/type';
import { computed, Ref } from 'vue';
import { useMouse } from '@vueuse/core';
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
  popupTranslate: Ref<number[]>;
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
  // const { x, y } = useMouse();
  // 计算content的位置
  const contentPosition = computed(() => {
    // if (alignPoint.value) {
    //   return {
    //     left: `${x.value}px`,
    //     top: `${y.value}px`,
    //   };
    // }
    let offetTop = 'unset';
    let offetLeft = 'unset';
    let offetRight = 'unset';
    const [offsetX, offsetY] = popupTranslate.value;
    if (['top', 'bottom'].includes(position.value)) {
      offetLeft = `${
        left.value + (triggerWidth.value - contentWidth.value) / 2
      }`;
      offetTop =
        position.value == 'top'
          ? `${top.value - contentHeight.value}`
          : `${top.value + triggerHeight.value}`;
    } else if (['tl', 'bl'].includes(position.value)) {
      offetLeft = `${left.value}`;
      offetTop =
        position.value == 'tl'
          ? `${top.value - contentHeight.value}`
          : `${top.value + triggerHeight.value}`;
    } else if (['tr', 'br'].includes(position.value)) {
      offetTop =
        position.value == 'tr'
          ? `${top.value - contentHeight.value}`
          : `${top.value + triggerHeight.value}`;
      offetRight = `${right.value - triggerWidth.value}`;
    } else if (['left', 'right'].includes(position.value)) {
      offetLeft =
        position.value == 'left'
          ? `${left.value - contentWidth.value}`
          : 'unset';
      offetTop = `${top.value + (triggerHeight.value - contentHeight.value) / 2}`;
      offetRight =
        position.value == 'left'
          ? 'unset'
          : `${right.value - triggerWidth.value - contentWidth.value}`;
    } else if (['lt', 'rt'].includes(position.value)) {
      offetLeft =
        position.value == 'lt' ? `${left.value - contentWidth.value}` : 'unset';
      offetTop = `${top.value}`;
      offetRight =
        position.value == 'lt'
          ? 'unset'
          : `${right.value - triggerWidth.value - contentWidth.value}`;
    } else if (['lb', 'rb'].includes(position.value)) {
      offetLeft =
        position.value == 'lb' ? `${left.value - contentWidth.value}` : 'unset';
      offetTop = `${top.value + triggerHeight.value - contentHeight.value}`;
      offetRight =
        position.value == 'lb'
          ? 'unset'
          : `${right.value - triggerWidth.value - contentWidth.value}`;
    }
    return {
      left: `${offetLeft == 'unset' ? '' : +offetLeft + offsetX}px`,
      top: `${offetTop == 'unset' ? '' : +offetTop + offsetY}px`,
      right: `${offetRight == 'unset' ? '' : +offetRight - offsetX}px`,
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
