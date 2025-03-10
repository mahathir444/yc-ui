import { TriggerPostion, TriggerType } from '@/components/Trigger/type';
import {
  BORDER_MAP,
  BORDER_RADIUS_MAP,
  TRANSLATE_MAP,
} from '@/components/Trigger/constants';
import { computed, CSSProperties, Ref, ref } from 'vue';
export default (params: {
  position: Ref<TriggerPostion>;
  left: Ref<number>;
  top: Ref<number>;
  bottom: Ref<number>;
  right: Ref<number>;
  trigger: Ref<TriggerType>;
  mouseX: Ref<number>;
  mouseY: Ref<number>;
  alignPoint: Ref<boolean>;
  triggerWidth: Ref<number>;
  triggerHeight: Ref<number>;
  contentWidth: Ref<number>;
  contentHeight: Ref<number>;
  popupTranslate: Ref<number[]>;
  popupOffset: Ref<number>;
  autoFitPosition: Ref<boolean>;
  emits: (...args: any) => any;
}) => {
  const {
    position,
    left,
    top,
    bottom,
    right,
    trigger,
    mouseX,
    mouseY,
    alignPoint,
    triggerHeight,
    triggerWidth,
    contentHeight,
    contentWidth,
    popupTranslate,
    popupOffset,
    autoFitPosition,
    emits,
  } = params;
  // 动态计算当前的位置
  const triggerPosition = ref<TriggerPostion>(position.value);
  // 计算content的位置
  const wrapperPosition = computed(() => {
    // 计算偏移量
    const { offsetX, offsetY } = calcOffset();
    // 如果跟随鼠标点击位置
    if (alignPoint.value && ['click', 'contextMenu'].includes(trigger.value)) {
      return {
        top: `${mouseY.value + offsetX + offsetY}px`,
        left: `${mouseX.value - contentWidth.value / 2 + offsetY + offsetX}px`,
      };
    }
    let offsetTop = 0;
    let offsetLeft = 0;
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
    // 如果不进行边界检测
    if (!autoFitPosition.value) {
      return {
        top: `${offsetTop + offsetY}px`,
        left: `${offsetLeft + offsetX}px`,
      };
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
    // 计算trigger当前的位置
    triggerPosition.value = calcCurrentPosition(
      offsetLeft,
      offsetTop
    ) as TriggerPostion;
    emits('position-change', triggerPosition.value);
    return {
      top: `${offsetTop + offsetY}px`,
      left: `${offsetLeft + offsetX}px`,
    };
  });
  // 计算arrow的位置
  const arrowPostion = computed(() => {
    let inset: CSSProperties;
    if (
      ['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(triggerPosition.value)
    ) {
      let arrowLeft: string | number = '';
      if (['top', 'bottom'].includes(triggerPosition.value)) {
        arrowLeft = contentWidth.value / 2;
      } else {
        arrowLeft = triggerWidth.value / 2;
      }
      inset = {
        top: triggerPosition.value.startsWith('b') ? '0' : '',
        bottom: triggerPosition.value.startsWith('t') ? '0' : '',
        left: `${arrowLeft}px`,
      };
    } else {
      let arrowTop: string | number = '';
      let arrowBottom: string | number = '';
      if (['left', 'right'].includes(triggerPosition.value)) {
        arrowTop = contentHeight.value / 2;
      } else if (['lt', 'rt'].includes(triggerPosition.value)) {
        arrowTop = triggerHeight.value / 2;
      } else {
        arrowBottom = triggerHeight.value / 2;
      }
      inset = {
        top: `${arrowTop}px`,
        right: triggerPosition.value.startsWith('l') ? '0' : '',
        bottom: `${arrowBottom}px`,
        left: triggerPosition.value.startsWith('r') ? '0' : '',
      };
    }
    return {
      ...inset,
      ...BORDER_MAP[triggerPosition.value],
      ...BORDER_RADIUS_MAP[triggerPosition.value],
      transform: `${TRANSLATE_MAP[triggerPosition.value]} rotate(45deg)`,
    } as CSSProperties;
  });
  // 计算偏移量
  function calcOffset() {
    const [translateX, translateY] = popupTranslate.value;
    // 计算偏移量
    let offsetX = translateX;
    let offsetY = translateY;
    if (triggerPosition.value.startsWith('t')) {
      offsetY = -popupOffset.value;
    } else if (triggerPosition.value.startsWith('b')) {
      offsetY = popupOffset.value;
    } else if (triggerPosition.value.startsWith('l')) {
      offsetX = -popupOffset.value;
    } else if (triggerPosition.value.startsWith('r')) {
      offsetX = popupOffset.value;
    }

    return {
      offsetX,
      offsetY,
    };
  }
  // 根据offsettop与offsetleft反向计算当前的位置
  function calcCurrentPosition(offsetLeft: number, offsetTop: number) {
    const epsilon = 0.00001; // 定义一个小的容差值
    const dirArray = [
      //上
      [
        top.value - contentHeight.value,
        left.value + (triggerWidth.value - contentWidth.value) / 2,
        'top',
      ],
      [top.value - contentHeight.value, left.value, 'tl'],
      [top.value - contentHeight.value, right.value - contentWidth.value, 'tr'],
      //下
      [
        bottom.value,
        left.value + (triggerWidth.value - contentWidth.value) / 2,
        'bottom',
      ],
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
    wrapperPosition,
    arrowPostion,
  };
};
