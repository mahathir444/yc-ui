import { TriggerPostion } from '@/packages/Trigger/type';
import { isString } from '@/utils/is';
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
    const [offsetX, offsetY] = popupTranslate.value || [0, 0];
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
        : left.value + triggerWidth.value;
      if (['left', 'right'].includes(position.value)) {
        offsetTop = top.value + (triggerHeight.value - contentHeight.value) / 2;
      } else if (['lt', 'rt'].includes(position.value)) {
        offsetTop = top.value;
      } else {
        offsetTop = bottom.value - contentHeight.value;
      }
    }
    // 边界检测
    if (['top', 'tl', 'tr'].includes(position.value)) {
      if (+offsetTop < 0) {
        offsetTop = top.value + triggerHeight.value;
        +contentHeight.value <= window.innerHeight
          ? top.value + triggerHeight.value
          : offsetTop;
      }
      if (+offsetLeft < 0) {
        offsetLeft = left.value >= 0 ? left.value : offsetLeft;
      }
    } else if (['bottom', 'bl', 'br'].includes(position.value)) {
      if (+offsetTop + contentHeight.value > window.innerHeight) {
        offsetTop =
          top.value - contentHeight.value >= 0
            ? top.value - contentHeight.value
            : offsetTop;
      }
      if (+offsetLeft < 0) {
        offsetLeft = left.value >= 0 ? left.value : offsetLeft;
      }
    } else if (['left', 'lt', 'lb'].includes(position.value)) {
      if (+offsetLeft < 0) {
        const tempLeft = left.value + triggerWidth.value;
        offsetLeft = tempLeft >= 0 ? tempLeft : offsetLeft;
      }
      if (+offsetTop < 0) {
        offsetTop = top.value >= 0 ? top.value : offsetTop;
      }
    } else {
      if (+offsetLeft < 0) {
        offsetLeft =
          left.value - contentWidth.value >= 0
            ? left.value - contentWidth.value
            : offsetLeft;
      }
      if (+offsetTop < 0) {
        offsetTop = top.value >= 0 ? top.value : offsetTop;
      }
    }
    const res = {
      top: `${isString(offsetTop) ? offsetTop : `${offsetTop + offsetY}px`}`,
      left: `${isString(offsetLeft) ? offsetLeft : `${offsetLeft + offsetX}px`}`,
    };

    return res;
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
