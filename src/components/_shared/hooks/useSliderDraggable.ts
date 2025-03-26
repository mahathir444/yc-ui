import { reactive, Ref, WritableComputedRef, watch, nextTick } from 'vue';
import { PositionData, RangeData } from '@/components/Slider';
import { Direction } from '@shared/type';
import { useDraggable, useEventListener } from '@vueuse/core';
export default (params: {
  trackRef: Ref<HTMLDivElement | undefined>;
  triggerRef: Ref<HTMLDivElement | undefined>;
  computedValue: WritableComputedRef<number>;
  direction: Ref<Direction>;
  max: Ref<number>;
  min: Ref<number>;
  step: Ref<number>;
}) => {
  const { trackRef, triggerRef, computedValue, direction, max, min, step } =
    params;
  // 处理Button拖动
  const { x, y, isDragging } = useDraggable(triggerRef);
  // 水平情况下的距离
  const position = reactive<PositionData>({
    top: '',
    bottom: '',
    left: '',
    right: '',
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
        ? ((sliderBottom - distance) / sliderHeight) * 100
        : ((distance - sliderLeft) / sliderWidth) * 100;
    // 处理步长
    return +(rate / step.value).toFixed(0) * step.value;
  };
  // 计算position
  const calcPositionFromValue = (distance: number) => {
    const {
      left: sliderLeft,
      bottom: sliderBottom,
      width: sliderWidth,
      height: sliderHeight,
    } = trackRef.value!.getBoundingClientRect();
    return direction.value == 'vertical'
      ? sliderBottom - (distance / 100) * sliderHeight
      : (distance / 100) * sliderWidth + sliderLeft;
  };
  // 设置位置
  const setPositionFromValue = (distance: number) => {
    // button的宽度
    const { offsetHeight: btnHeight, offsetWidth: btnWidth } =
      triggerRef.value!;
    if (direction.value == 'vertical') {
      position.top = 100 - distance + '%';
      position.bottom = `calc(${distance}% - ${btnHeight / 2}px)`;
    } else {
      position.left = `calc(${distance}% -  ${btnWidth / 2}px)`;
      position.right = 100 - distance + '%';
    }
  };
  // 设置最初的位置
  const setOriginPosition = () => {
    if (computedValue.value > max.value) {
      computedValue.value = max.value;
    } else if (computedValue.value < min.value) {
      computedValue.value = min.value;
    }
    position.top = max.value + '%';
    position.bottom = computedValue.value + '%';
    position.left = computedValue.value + '%';
    position.right = max.value + '%';
  };
  // 处理越界情况
  useEventListener('mousemove', () => {
    if (!isDragging.value) return;
    // 给出范围
    const { minTop, maxTop, minLeft, maxLeft } = moveRange;
    // 处理不同情况的拖动
    if (direction.value == 'vertical') {
      y.value = y.value > minTop ? minTop : y.value;
      y.value = y.value < maxTop ? maxTop : y.value;
      const value = calcValueFromPosition(y.value);
      setPositionFromValue(value);
      computedValue.value = value;
    } else {
      x.value = x.value < minLeft ? minLeft : x.value;
      x.value = x.value > maxLeft ? maxLeft : x.value;
      const value = calcValueFromPosition(x.value);
      setPositionFromValue(value);
      computedValue.value = value;
    }
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
      setOriginPosition();
    },
    {
      immediate: true,
    }
  );
  // 检测computedValue的改变重置位置
  watch(
    computedValue,
    async (v) => {
      if (isDragging.value) {
        return;
      }
      await nextTick();
      setPositionFromValue(v);
    },
    {
      immediate: true,
    }
  );
  return {
    position,
    isDragging,
  };
};
