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
      } else if (
        offsetTop + contentHeight.value > window.innerHeight &&
        ['bottom', 'bl', 'br'].includes(position.value)
      ) {
        offsetTop = top.value - contentHeight.value;
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
        offsetLeft = right.value;
      } else if (
        offsetLeft + contentWidth.value > window.innerWidth &&
        ['right', 'rt', 'rb'].includes(position.value)
      ) {
        offsetLeft = left.value - contentWidth.value;
      }
      // 上下检测
      if (offsetTop < 0) {
        offsetTop = top.value;
      } else if (offsetTop + contentHeight.value > window.innerHeight) {
        offsetTop = top.value - contentHeight.value;
      }
    }
    curPostion.value = getCurrentPosition(
      offsetLeft,
      offsetTop
    ) as TriggerPostion;
    return {
      top: `${offsetTop + offsetY}px`,
      left: `${offsetLeft + offsetX}px`,
    };
  });
  // 计算arrow的位置
  const arrowPostion = computed(() => {
    if (['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(curPostion.value)) {
      let arrowLeft: string | number = '';
      let arrowRight: string | number = '';
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
        right: `${arrowRight}px`,
        bottom: curPostion.value.startsWith('t')
          ? `${-arrowHeight.value / 2}px`
          : '',
        left: `${arrowLeft}px`,
      };
    } else {
      let arrowTop: string | number = '';
      let arrowBottom: string | number = '';
      if (['left', 'right'].includes(curPostion.value)) {
        arrowTop = (contentHeight.value - arrowHeight.value) / 2;
      } else if (['lt', 'rt'].includes(curPostion.value)) {
        arrowTop = (triggerHeight.value - arrowHeight.value) / 2;
      } else {
        arrowBottom = (triggerHeight.value - arrowHeight.value) / 2;
      }
      return {
        top: `${arrowTop}px`,
        right: curPostion.value.startsWith('l')
          ? `${-arrowWidth.value / 2}px`
          : '',
        bottom: `${arrowBottom}px`,
        left: curPostion.value.startsWith('r')
          ? `${-arrowWidth.value / 2}px`
          : '',
        borderTopLeftRadius: curPostion.value.startsWith('b') ? '2px' : '',
        borderBottomLeftRadius:
          curPostion.value.startsWith('t') || curPostion.value.startsWith('r')
            ? '2px'
            : '',
        borderTopRightRadius: curPostion.value.startsWith('l') ? '2px' : '',
      };
    }
  });
  // 根据offsettop与offsetleft反向计算当前的位置
  function getCurrentPosition(offsetLeft: number, offsetTop: number) {
    const epsilon = 0.00001; // 定义一个小的容差值
    const dirArray = [
      //上
      [
        top.value - contentHeight.value,
        (triggerWidth.value - contentWidth.value) / 2,
        'top',
      ],
      [top.value - contentHeight.value, left.value, 'tl'],
      [top.value - contentHeight.value, right.value - contentWidth.value, 'tr'],
      //下
      [bottom.value, (triggerWidth.value - contentWidth.value) / 2, 'bottom'],
      [bottom.value, left.value, 'bl'],
      [bottom.value, right.value - contentWidth.value, 'br'],
      //左
      [
        top.value + (triggerHeight.value - contentHeight.value) / 2,
        left.value - contentWidth.value,
        'left',
      ],
      [top.value, left.value - contentWidth.value, 'lt'],
      [
        bottom.value - contentHeight.value,
        left.value - contentWidth.value,
        'lb',
      ],
      //右
      [
        top.value + (triggerHeight.value - contentHeight.value) / 2,
        right.value,
        'right',
      ],
      [top.value, right.value, 'rt'],
      [bottom.value - contentHeight.value, right.value, 'rb'],
    ];
    for (const [finalTop, finalLeft, dir] of dirArray) {
      if (
        Math.abs((finalTop as number) - offsetTop) < epsilon &&
        Math.abs((finalLeft as number) - offsetLeft) < epsilon
      ) {
        return dir;
      }
    }
    return position.value;
  }
  return {
    contentPosition,
    arrowPostion,
    curPostion,
  };
};
