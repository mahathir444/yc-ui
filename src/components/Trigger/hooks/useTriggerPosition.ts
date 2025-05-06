import { computed, CSSProperties, Ref, ref, toRefs } from 'vue';
import { useElementBounding, useElementSize } from '@vueuse/core';
import { TriggerPostion, TriggerProps } from '../type';
import { TriggerPropsRequired } from './useTriggerNested';
import { useConfigProvder } from '@shared/hooks';

export default (params: {
  props: TriggerProps;
  popupRef: Ref<HTMLDivElement | undefined>;
  triggerRef: Ref<HTMLElement | undefined>;
  mouseX: Ref<number>;
  mouseY: Ref<number>;
}) => {
  const { props, popupRef, triggerRef, mouseX, mouseY } = params;
  // 解构需要使用的属性
  const {
    trigger,
    alignPoint,
    popupTranslate,
    popupOffset,
    autoFitPosition,
    autoFitPopupMinWidth,
    autoFitPopupWidth,
    autoSetPosition,
    position: _position,
    arrowStyle: _arrowStyle,
    contentStyle: _contentStyle,
  } = toRefs(props as TriggerPropsRequired);
  // 接收provider传入的属性
  const { updateAtScroll } = useConfigProvder(props);
  // 动态计算当前的位置
  const position = ref<TriggerPostion>(_position.value);
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
    updateTiming: 'next-frame',
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
  const popupStyle = computed(() => {
    // 计算偏移量
    const { offsetX, offsetY } = calcOffset(
      popupTranslate.value,
      popupOffset.value,
      position.value
    );
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
    // 计算初始位置
    const { offsetTop, offsetLeft } = calcPopupPosition({
      position: position.value,
      triggerWidth: triggerWidth.value,
      triggerHeight: triggerHeight.value,
      popupHeight: popupHeight.value,
      popupWidth: popupWidth.value,
      top: top.value,
      left: left.value,
      right: right.value,
      bottom: bottom.value,
    });
    // 如果不进行边界检测
    if (!autoFitPosition.value) {
      return {
        top: `${offsetTop + offsetY}px`,
        left: `${offsetLeft + offsetX}px`,
      };
    }
    // 边界检测
    const { newTop, newLeft } = calcCurPopupPosition({
      offsetLeft,
      offsetTop,
      position: position.value,
      triggerWidth: triggerWidth.value,
      triggerHeight: triggerHeight.value,
      popupHeight: popupHeight.value,
      popupWidth: popupWidth.value,
      top: top.value,
      left: left.value,
      right: right.value,
      bottom: bottom.value,
    });
    // 计算trigger当前的位置
    position.value = calcPositionRef({
      offsetLeft: newLeft,
      offsetTop: newTop,
      triggerWidth: triggerWidth.value,
      triggerHeight: triggerHeight.value,
      popupHeight: popupHeight.value,
      popupWidth: popupWidth.value,
      top: top.value,
      left: left.value,
      right: right.value,
      bottom: bottom.value,
    }) as TriggerPostion;
    console.log(position.value, 'newPosition');
    // 计算新的offset
    const { offsetX: newOffsetX, offsetY: newOffsetY } = calcOffset(
      popupTranslate.value,
      popupOffset.value,
      position.value
    );
    return {
      left: `${newLeft + newOffsetX}px`,
      top: `${newTop + newOffsetY}px`,
    };
  });
  // contentStyle
  const contentStyle = computed(() => {
    return {
      ..._contentStyle.value,
      width: autoFitPopupWidth.value ? `${triggerWidth.value}px` : '',
      minWidth: autoFitPopupMinWidth.value ? `${triggerWidth.value}px` : '',
    } as CSSProperties;
  });
  // arrowStyle
  const arrowStyle = computed(() => {
    return {
      ..._arrowStyle.value,
      ...calcArrowPosition({
        position: position.value,
        popupWidth: popupWidth.value,
        popupHeight: popupHeight.value,
        triggerHeight: triggerHeight.value,
        triggerWidth: triggerWidth.value,
      }),
    } as CSSProperties;
  });
  // 计算最初的pop位置
  const calcPopupPosition = (params: {
    position: TriggerPostion;
    triggerWidth: number;
    triggerHeight: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
    popupHeight: number;
    popupWidth: number;
  }) => {
    let offsetTop = 0;
    let offsetLeft = 0;
    const {
      position,
      triggerWidth,
      triggerHeight,
      popupWidth,
      popupHeight,
      left,
      top,
      right,
      bottom,
    } = params;
    // 初始位置计算
    if (['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(position)) {
      offsetTop = position.startsWith('t') ? top - popupHeight : bottom;
      if (['top', 'bottom'].includes(position)) {
        offsetLeft = left + (triggerWidth - popupWidth) / 2;
      } else if (['tl', 'bl'].includes(position)) {
        offsetLeft = left;
      } else {
        offsetLeft = right - popupWidth;
      }
    } else {
      offsetLeft = position.startsWith('l') ? left - popupWidth : right;
      if (['left', 'right'].includes(position)) {
        offsetTop = top + (triggerHeight - popupHeight) / 2;
      } else if (['lt', 'rt'].includes(position)) {
        offsetTop = top;
      } else {
        offsetTop = bottom - popupHeight;
      }
    }
    return {
      offsetTop,
      offsetLeft,
    };
  };
  // 计算边界
  const calcCurPopupPosition = (params: {
    offsetLeft: number;
    offsetTop: number;
    position: TriggerPostion;
    top: number;
    bottom: number;
    left: number;
    right: number;
    triggerWidth: number;
    triggerHeight: number;
    popupHeight: number;
    popupWidth: number;
  }) => {
    const {
      bottom,
      left,
      right,
      top,
      popupHeight,
      popupWidth,
      position,
      offsetLeft,
      offsetTop,
    } = params;
    let newLeft = offsetLeft;
    let newTop = offsetTop;
    if (['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(position)) {
      // 上下检测
      if (offsetTop < 0 && ['top', 'tl', 'tr'].includes(position)) {
        newTop = bottom;
      } else if (
        offsetTop + popupHeight > window.innerHeight &&
        ['bottom', 'bl', 'br'].includes(position)
      ) {
        newTop = top - popupHeight;
      }
      // 左右检测
      if (offsetLeft < 0) {
        newLeft = left;
      } else if (offsetLeft + popupWidth > window.innerWidth) {
        newLeft = right - popupWidth;
      }
    } else {
      // 左右检测
      if (offsetLeft < 0 && ['left', 'lt', 'lb'].includes(position)) {
        newLeft = right;
      } else if (
        offsetLeft + popupWidth > window.innerWidth &&
        ['right', 'rt', 'rb'].includes(position)
      ) {
        newLeft = left - popupWidth;
      }
      // 上下检测
      if (offsetTop < 0) {
        newTop = top;
      } else if (offsetTop + popupHeight > window.innerHeight) {
        newTop = top - popupHeight;
      }
    }
    return {
      newTop,
      newLeft,
    };
  };
  // 计算arrow的positon
  const calcArrowPosition = (params: {
    position: TriggerPostion;
    triggerWidth: number;
    triggerHeight: number;
    popupHeight: number;
    popupWidth: number;
  }) => {
    const { position, triggerWidth, triggerHeight, popupWidth, popupHeight } =
      params;
    let inset: CSSProperties;
    if (['top', 'tl', 'tr', 'bottom', 'bl', 'br'].includes(position)) {
      let arrowLeft: string | number = '';
      if (['top', 'bottom'].includes(position)) {
        arrowLeft = popupWidth / 2;
      } else {
        arrowLeft = triggerWidth / 2;
      }
      inset = {
        top: position.startsWith('b') ? '0' : '',
        bottom: position.startsWith('t') ? '0' : '',
        left: `${arrowLeft}px`,
      };
    } else {
      let arrowTop: string | number = '';
      let arrowBottom: string | number = '';
      if (['left', 'right'].includes(position)) {
        arrowTop = popupHeight / 2;
      } else if (['lt', 'rt'].includes(position)) {
        arrowTop = triggerHeight / 2;
      } else {
        arrowBottom = triggerHeight / 2;
      }
      inset = {
        top: `${arrowTop}px`,
        right: position.startsWith('l') ? '0' : '',
        bottom: `${arrowBottom}px`,
        left: position.startsWith('r') ? '0' : '',
      };
    }
    return inset;
  };
  // 计算偏移量
  function calcOffset(
    popupTranslate: number[],
    popupOffset: number,
    position: TriggerPostion
  ) {
    const [translateX, translateY] = popupTranslate;
    // 计算偏移量
    let offsetX = translateX;
    let offsetY = translateY;
    if (position.startsWith('t')) {
      offsetY = -popupOffset;
    } else if (position.startsWith('b')) {
      offsetY = popupOffset;
    } else if (position.startsWith('l')) {
      offsetX = -popupOffset;
    } else if (position.startsWith('r')) {
      offsetX = popupOffset;
    }
    return {
      offsetX,
      offsetY,
    };
  }
  // 根据offsettop与offsetleft反向计算当前的位置
  function calcPositionRef(params: {
    offsetLeft: number;
    offsetTop: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
    triggerWidth: number;
    triggerHeight: number;
    popupHeight: number;
    popupWidth: number;
  }) {
    const {
      offsetLeft,
      offsetTop,
      top,
      left,
      bottom,
      right,
      triggerWidth,
      triggerHeight,
      popupHeight,
      popupWidth,
    } = params;
    const epsilon = 0.00001; // 定义一个小的容差值
    const dirArray = [
      //上
      [top - popupHeight, left + (triggerWidth - popupWidth) / 2, 'top'],
      [top - popupHeight, left, 'tl'],
      [top - popupHeight, right - popupWidth, 'tr'],
      //下
      [bottom, left + (triggerWidth - popupWidth) / 2, 'bottom'],
      [bottom, left, 'bl'],
      [bottom, right - popupWidth, 'br'],
      //左
      [top + (triggerHeight - popupHeight) / 2, left - popupWidth, 'left'],
      [top, left - popupWidth, 'lt'],
      [bottom - popupHeight, left - popupWidth, 'lb'],
      //右
      [top + (triggerHeight - popupHeight) / 2, right, 'right'],
      [top, right, 'rt'],
      [bottom - popupHeight, right, 'rb'],
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
    bottom,
    right,
    popupWidth,
    popupHeight,
    triggerWidth,
    triggerHeight,
    position,
    popupStyle,
    contentStyle,
    arrowStyle,
  };
};
