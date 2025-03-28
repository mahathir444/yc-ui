import { computed, CSSProperties, Ref, ref, toRefs } from 'vue';
import { TriggerPostion, TriggerProps } from '@/components/Trigger';
import { ObjectData, RequiredDeep } from '../type';
import {
  BORDER_MAP,
  BORDER_RADIUS_MAP,
  TRANSLATE_MAP,
  TRANSFORM_ORIGIN_MAP,
} from '@/components/Trigger/constants';
import { useElementBounding, useElementSize } from '@vueuse/core';

export default (params: {
  props: ObjectData;
  popupRef: Ref<HTMLDivElement | undefined>;
  triggerRef: Ref<HTMLElement | undefined>;
  mouseX: Ref<number>;
  mouseY: Ref<number>;
}) => {
  const { props, popupRef, triggerRef, mouseX, mouseY } = params;
  // 解构需要使用的属性
  const {
    position,
    trigger,
    alignPoint,
    popupTranslate,
    popupOffset,
    updateAtScroll,
    autoFitPosition,
    autoFitPopupMinWidth,
    autoFitPopupWidth,
    needTransformOrigin,
    autoSetPosition,
    arrowStyle: _arrowStyle,
    contentStyle: _contentStyle,
  } = toRefs(props as RequiredDeep<TriggerProps>);
  // 动态计算当前的位置
  const curPosition = ref<TriggerPostion>(position.value);
  // 获取trigger元素bounding
  const {
    left,
    top,
    bottom,
    right,
    width: triggerWidth,
    height: triggerHeight,
  } = useElementBounding(triggerRef, {
    windowScroll: updateAtScroll.value,
  });
  // 获取弹出层元素的信息
  const { width: popupWidth, height: popupHeight } = useElementSize(
    popupRef,
    undefined,
    {
      box: 'border-box',
    }
  );
  // 计算trigger的位置
  const popupPosition = computed(() => {
    // 计算偏移量
    const { offsetX, offsetY } = calcOffset();
    // 是否是自由设置位置，或者跟随鼠标位置
    const isMousePosition =
      alignPoint.value && ['click', 'contextMenu'].includes(trigger.value);
    // 如果跟随鼠标点击位置
    if (autoSetPosition.value || isMousePosition) {
      return {
        top: `${mouseY.value + offsetY}px`,
        left: `${mouseX.value - (autoFitPosition.value ? 0 : popupWidth.value / 2) + offsetX}px`,
      };
    }
    let offsetTop = 0;
    let offsetLeft = 0;
    // 初始位置计算
    if (['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(position.value)) {
      offsetTop = position.value.startsWith('t')
        ? top.value - popupHeight.value
        : bottom.value;
      if (['top', 'bottom'].includes(position.value)) {
        offsetLeft = left.value + (triggerWidth.value - popupWidth.value) / 2;
      } else if (['tl', 'bl'].includes(position.value)) {
        offsetLeft = left.value;
      } else {
        offsetLeft = right.value - popupWidth.value;
      }
    } else {
      offsetLeft = position.value.startsWith('l')
        ? left.value - popupWidth.value
        : right.value;
      if (['left', 'right'].includes(position.value)) {
        offsetTop = top.value + (triggerHeight.value - popupHeight.value) / 2;
      } else if (['lt', 'rt'].includes(position.value)) {
        offsetTop = top.value;
      } else {
        offsetTop = bottom.value - popupHeight.value;
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
        offsetTop + popupHeight.value > window.innerHeight &&
        ['bottom', 'bl', 'br'].includes(position.value)
      ) {
        offsetTop = top.value - popupHeight.value;
      }
      // 左右检测
      if (offsetLeft < 0) {
        offsetLeft = left.value;
      } else if (offsetLeft + popupWidth.value > window.innerWidth) {
        offsetLeft = right.value - popupWidth.value;
      }
    } else {
      // 左右检测
      if (offsetLeft < 0 && ['left', 'lt', 'lb'].includes(position.value)) {
        offsetLeft = right.value;
      } else if (
        offsetLeft + popupWidth.value > window.innerWidth &&
        ['right', 'rt', 'rb'].includes(position.value)
      ) {
        offsetLeft = left.value - popupWidth.value;
      }
      // 上下检测
      if (offsetTop < 0) {
        offsetTop = top.value;
      } else if (offsetTop + popupHeight.value > window.innerHeight) {
        offsetTop = top.value - popupHeight.value;
      }
    }
    // 计算trigger当前的位置
    curPosition.value = calcCurrentPosition(
      offsetLeft,
      offsetTop
    ) as TriggerPostion;
    return {
      top: `${offsetTop + offsetY}px`,
      left: `${offsetLeft + offsetX}px`,
    };
  });
  // contentStyle
  const contentStyle = computed(() => {
    return {
      ..._contentStyle.value,
      width: autoFitPopupWidth.value ? `${triggerWidth.value}px` : '',
      minWidth: autoFitPopupMinWidth.value ? `${triggerWidth.value}px` : '',
      transformOrigin: needTransformOrigin.value
        ? TRANSFORM_ORIGIN_MAP[curPosition.value]
        : '',
    } as CSSProperties;
  });
  // arrowStyle
  const arrowStyle = computed(() => {
    let inset: CSSProperties;
    if (['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(curPosition.value)) {
      let arrowLeft: string | number = '';
      if (['top', 'bottom'].includes(curPosition.value)) {
        arrowLeft = popupWidth.value / 2;
      } else {
        arrowLeft = triggerWidth.value / 2;
      }
      inset = {
        top: curPosition.value.startsWith('b') ? '0' : '',
        bottom: curPosition.value.startsWith('t') ? '0' : '',
        left: `${arrowLeft}px`,
      };
    } else {
      let arrowTop: string | number = '';
      let arrowBottom: string | number = '';
      if (['left', 'right'].includes(curPosition.value)) {
        arrowTop = popupHeight.value / 2;
      } else if (['lt', 'rt'].includes(curPosition.value)) {
        arrowTop = triggerHeight.value / 2;
      } else {
        arrowBottom = triggerHeight.value / 2;
      }
      inset = {
        top: `${arrowTop}px`,
        right: curPosition.value.startsWith('l') ? '0' : '',
        bottom: `${arrowBottom}px`,
        left: curPosition.value.startsWith('r') ? '0' : '',
      };
    }
    return {
      ..._arrowStyle.value,
      ...inset,
      ...BORDER_MAP[curPosition.value],
      ...BORDER_RADIUS_MAP[curPosition.value],
      transform: `${TRANSLATE_MAP[curPosition.value]} rotate(45deg)`,
    } as CSSProperties;
  });
  // 计算偏移量
  function calcOffset() {
    const [translateX, translateY] = popupTranslate.value;
    // 计算偏移量
    let offsetX = translateX;
    let offsetY = translateY;
    if (curPosition.value.startsWith('t')) {
      offsetY = -popupOffset.value;
    } else if (curPosition.value.startsWith('b')) {
      offsetY = popupOffset.value;
    } else if (curPosition.value.startsWith('l')) {
      offsetX = -popupOffset.value;
    } else if (curPosition.value.startsWith('r')) {
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
        top.value - popupHeight.value,
        left.value + (triggerWidth.value - popupWidth.value) / 2,
        'top',
      ],
      [top.value - popupHeight.value, left.value, 'tl'],
      [top.value - popupHeight.value, right.value - popupWidth.value, 'tr'],
      //下
      [
        bottom.value,
        left.value + (triggerWidth.value - popupWidth.value) / 2,
        'bottom',
      ],
      [bottom.value, left.value, 'bl'],
      [bottom.value, right.value - popupWidth.value, 'br'],
      //左
      [
        top.value + (triggerHeight.value - popupHeight.value) / 2,
        left.value - popupWidth.value,
        'left',
      ],
      [top.value, left.value - popupWidth.value, 'lt'],
      [bottom.value - popupHeight.value, left.value - popupWidth.value, 'lb'],
      //右
      [
        top.value + (triggerHeight.value - popupHeight.value) / 2,
        right.value,
        'right',
      ],
      [top.value, right.value, 'rt'],
      [bottom.value - popupHeight.value, right.value, 'rb'],
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
    left,
    top,
    popupPosition,
    contentStyle,
    arrowStyle,
  };
};
