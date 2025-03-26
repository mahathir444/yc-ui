<template>
  <div
    :class="{
      'yc-slider': true,
      'yc-slider-horizontal': direction == 'horizontal',
      'yc-slider-vertical': direction == 'vertical',
      'yc-slider-show-input': direction == 'vertical' && showInput,
    }"
  >
    <div class="yc-slider-track" ref="trackRef">
      <!-- ticks -->
      <yc-ticks
        v-if="showTicks"
        type="ticks"
        :computed-value="computedValue"
        :data="ticks"
        :step="step"
        :direction="direction"
      />
      <yc-ticks
        v-if="marks.length"
        type="dots"
        :computed-value="computedValue"
        :data="marks"
        :step="step"
        :direction="direction"
      />
      <yc-ticks
        v-if="marks.length"
        type="marks"
        :computed-value="computedValue"
        :data="marks"
        :step="step"
        :direction="direction"
        @label-click="(v) => (computedValue = v)"
      />
      <!-- bar -->
      <div
        class="yc-slider-bar"
        role="slider"
        tabindex="0"
        :aria-disabled="disabled"
        :style="{
          top: direction == 'vertical' ? position.top : '',
          right: direction == 'horizontal' ? position.right : '',
        }"
      ></div>
      <!-- button -->
      <yc-tooltip
        :popup-visible="popupVisible || isDragging"
        :disabled="!showTooltip"
        :position="direction == 'vertical' ? 'right' : 'bottom'"
        :content="computedValue + ''"
        @update:popup-visible="(v) => (popupVisible = v)"
      >
        <div
          class="yc-slider-btn"
          ref="triggerRef"
          :style="{
            bottom: direction == 'vertical' ? position.bottom : '',
            left: direction == 'horizontal' ? position.left : '',
          }"
        ></div>
      </yc-tooltip>
    </div>
    <!-- input -->
    <yc-input-number
      v-if="showInput"
      :min="min"
      :max="max"
      hide-button
      text-center
      style="width: 60px"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  toRefs,
  computed,
  reactive,
  nextTick,
  watch,
  watchEffect,
} from 'vue';
import { SliderProps, PositionData, RangeData } from './type';
import { useDraggable, useEventListener } from '@vueuse/core';
import useControlValue from '@shared/hooks/useControlValue';
import YcTicks from './component/Ticks.vue';
import YcTooltip from '@/components/Tooltip';
import YcInputNumber from '@/components/InputNumber';
defineOptions({
  name: 'Slider',
});
const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: undefined,
  defaultValue: 0,
  step: 1,
  min: 0,
  marks: () => {
    return {};
  },
  max: 100,
  direction: 'horizontal',
  disabled: false,
  showTicks: false,
  showInput: false,
  showTooltip: true,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', value: number): void;
  (e: 'hoverChange', value: number): void;
}>();
const {
  direction,
  modelValue,
  defaultValue,
  step,
  min,
  max,
  marks: _marks,
  disabled,
} = toRefs(props);
// 控制值
const computedValue = useControlValue<number>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 刻度线
const ticks = computed(() => {
  const result = [];
  for (let i = 1; i <= Math.floor(100 / step.value) - 1; i++) {
    result.push({
      value: i,
      label: i,
    });
  }
  return result;
});
// 标注
const marks = computed(() => {
  return Object.entries(_marks.value).map(([key, value]) => {
    return {
      value: +key,
      label: value,
    };
  });
});
// trackRef
const trackRef = ref<HTMLDivElement>();
// buttonRef
const triggerRef = ref<HTMLDivElement>();
// 处理Button拖动
const { x, y, isDragging } = useDraggable(triggerRef);
// 可见性
const popupVisible = ref<boolean>(false);
// 水平情况下的距离
const position = reactive<PositionData>({
  top: '',
  bottom: '',
  left: '',
  right: '',
});
// 范围
const range = reactive<RangeData>({
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
// 设置 位置
const setPositionFromValue = (distance: number) => {
  // button的宽度
  const { offsetHeight: btnHeight, offsetWidth: btnWidth } = triggerRef.value!;
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
  const { minTop, maxTop, minLeft, maxLeft } = range;
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
watchEffect(async () => {
  await nextTick();
  range.minTop = calcPositionFromValue(min.value);
  range.maxTop = calcPositionFromValue(max.value);
  range.minLeft = calcPositionFromValue(min.value);
  range.maxLeft = calcPositionFromValue(max.value);
  setOriginPosition();
});
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
</script>

<style lang="less" scoped>
@import './style/slider.less';
</style>
