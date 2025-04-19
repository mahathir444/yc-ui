import { reactive, Ref, watch, nextTick, computed } from 'vue';
import { PositionData, RangeData } from '@/components/Slider';
import { Direction, Fn } from '@shared/type';
import { useDraggable, useEventListener, debouncedWatch } from '@vueuse/core';
export default (params: {
  computedValue: Ref<number>;
  trackRef: Ref<HTMLDivElement | undefined>;
  triggerRef: Ref<HTMLDivElement | undefined>;
  max: Ref<number>;
  min: Ref<number>;
  step: Ref<number>;
  disabled: Ref<boolean>;
  direction: Ref<Direction>;
}) => {
  const {
    trackRef,
    triggerRef,
    computedValue,
    direction,
    max,
    min,
    step,
    disabled,
  } = params;
  // 处理Button拖动
  const { x, y, isDragging } = useDraggable(triggerRef);
  let oldX = x.value;
  let oldY = y.value;
  // 最大值
  const maxValue = computed(() => (max.value <= 100 ? 100 : max.value));
  // 水平情况下的距离
  const position = reactive<PositionData>({
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
  });
  // 范围
  const moveRange = reactive<RangeData>({
    minLeft: 0,
    maxLeft: 0,
    minTop: 0,
    maxTop: 0,
  });
  // 计算value
  const calcValueFromPosition = (distance: number) => {
    const {
      left: sliderLeft,
      bottom: sliderBottom,
      width: sliderWidth,
      height: sliderHeight,
    } = trackRef.value!.getBoundingClientRect();
    // 计算比例
    const rate =
      direction.value == 'vertical'
        ? ((sliderBottom - distance) / sliderHeight) * maxValue.value
        : ((distance - sliderLeft) / sliderWidth) * maxValue.value;
    // 处理步长
    return Math.floor(rate / step.value) * step.value;
  };
  // 计算position
  const calcPositionFromValue = (distance: number) => {
    const {
      left: sliderLeft,
      bottom: sliderBottom,
      width: sliderWidth,
      height: sliderHeight,
    } = trackRef.value!.getBoundingClientRect();
    // 处理步长
    distance = Math.floor(distance / step.value) * step.value;
    // 计算值
    return direction.value == 'vertical'
      ? sliderBottom - (distance / maxValue.value) * sliderHeight
      : (distance / maxValue.value) * sliderWidth + sliderLeft;
  };
  // 设置位置
  const setPositionFromValue = (distance: number) => {
    const { width: sliderWidth, height: sliderHeight } =
      trackRef.value!.getBoundingClientRect();
    // 处理比例问题
    distance = (distance / maxValue.value) * 100;
    // 计算偏移位置
    const translateY = (computedValue.value / maxValue.value) * sliderHeight;
    const translateX = (computedValue.value / maxValue.value) * sliderWidth;
    if (direction.value == 'vertical') {
      position.top = 100 - distance;
      position.bottom = distance;
      position.transform = `translate(-50%,calc(${-translateY}px + 50%))`;
    } else {
      position.left = distance;
      position.right = 100 - distance;
      position.transform = `translate(calc(${translateX}px - 50%),-50%)`;
    }
  };
  // 处理越界情况
  useEventListener('mousemove', () => {
    if (!isDragging.value) return;
    if (disabled.value) {
      y.value = oldY;
      x.value = oldX;
    }
    // 给出范围
    const { minTop, maxTop, minLeft, maxLeft } = moveRange;
    let value;
    // 处理不同情况的拖动
    if (direction.value == 'vertical') {
      y.value = y.value > minTop ? minTop : y.value;
      y.value = y.value < maxTop ? maxTop : y.value;
      oldY = y.value;
      value = calcValueFromPosition(y.value);
    } else {
      x.value = x.value < minLeft ? minLeft : x.value;
      x.value = x.value > maxLeft ? maxLeft : x.value;
      oldX = x.value;
      value = calcValueFromPosition(x.value);
    }
    setPositionFromValue(value);
    computedValue.value = value;
  });
  // 检测min,max计算范围
  watch(
    [min, max],
    async () => {
      await nextTick();
      moveRange.minTop = calcPositionFromValue(min.value);
      moveRange.maxTop = calcPositionFromValue(max.value);
      moveRange.minLeft = calcPositionFromValue(min.value);
      moveRange.maxLeft = calcPositionFromValue(max.value);
      if (computedValue.value > max.value) {
        computedValue.value = max.value;
      } else if (computedValue.value < min.value) {
        computedValue.value = min.value;
      }
      position.bottom = computedValue.value;
      position.left = computedValue.value;
    },
    {
      immediate: true,
    }
  );
  // 检测computedValue的改变重置位置
  debouncedWatch(
    computedValue,
    async (v) => {
      if (isDragging.value) {
        return;
      }
      await nextTick();
      setPositionFromValue(v);
    },
    {
      debounce: 50,
      immediate: true,
    }
  );
  return {
    isDragging,
    position,
  };
};
