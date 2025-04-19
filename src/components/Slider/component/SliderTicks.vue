<template>
  <div :class="[TICKS_TYPE_CLASS[type]]">
    <span
      v-for="{ label, value } in data"
      :key="value"
      :style="{
        left: direction == 'horizontal' ? getPosition(value) : '',
        bottom: direction == 'vertical' ? getPosition(value) : '',
      }"
      :class="[
        TICK_TYPE_CLASS[type.replace('s', '')],
        type == 'dots' && isInRange(value) ? 'yc-slider-dot-active' : '',
        type == 'ticks' && isInRange(value) ? 'yc-slider-tick-active' : '',
      ]"
      @click="$emit('labelClick', value)"
    >
      {{ type == 'marks' ? label : '' }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, inject } from 'vue';
import { SliderProvide } from '../type';
import {
  SLIDER_PROVIDE_KEY,
  TICK_TYPE_CLASS,
  TICKS_TYPE_CLASS,
} from '@shared/constants';

const props = defineProps<{
  type: 'dots' | 'marks' | 'ticks';
  data: Record<string, any>[];
}>();
defineEmits<{
  (e: 'labelClick', value: number): void;
}>();
const { type } = toRefs(props);
// 解构父级属性
const {
  min,
  max,
  startValue,
  endValue,
  range,
  direction,
  step,
  handleRangeValue,
} = inject<SliderProvide>(SLIDER_PROVIDE_KEY, {
  startValue: ref(0),
  endValue: ref(0),
  tempEndValue: ref(0),
  tempStartValue: ref(0),
  min: ref(0),
  max: ref(0),
  step: ref(0),
  range: ref(false),
  direction: ref('horizontal'),
  disabled: ref(false),
  showTooltip: ref(true),
  trackRef: ref(),
  handleRangeValue: () => {},
});
// 计算position
const getPosition = (value: number) => {
  const curValue = handleRangeValue(value);
  if (type.value == 'ticks') {
    return `calc(${curValue}% - 0.5px)`;
  } else if (type.value == 'dots') {
    return `calc(${curValue}% - 4px)`;
  } else {
    return `calc(${curValue}% - 7px)`;
  }
};
// 是否在区间之内
const isInRange = (value: number) => {
  const curValue = handleRangeValue(value);
  const start = handleRangeValue(startValue.value);
  const end = handleRangeValue(endValue.value);
  const rangeMin = handleRangeValue(min.value);
  const rangeMax = handleRangeValue(min.value);
  if (!range.value) {
    return start >= curValue && curValue >= rangeMin && curValue <= rangeMax;
  } else {
    const minVal = Math.min(start, end);
    const maxVal = Math.max(start, end);
    return curValue >= minVal && curValue <= maxVal;
  }
};
</script>

<style lang="less" scoped>
@import '../style/slider.less';
</style>
