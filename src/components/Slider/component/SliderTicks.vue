<template>
  <div :class="[TICKS_TYPE_MAP[type]]">
    <span
      v-for="{ label, value } in data"
      :key="value"
      :style="{
        left: direction == 'horizontal' ? getPosition(value) : '',
        bottom: direction == 'vertical' ? getPosition(value) : '',
      }"
      :class="[
        TICK_TYPE_MAP[type.replace('s', '')],
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
import { TICK_TYPE_MAP, TICKS_TYPE_MAP } from '@shared/constants/slider';
import { SLIDER_PROVIDE_KEY } from '@shared/constants';

const props = defineProps<{
  type: 'dots' | 'marks' | 'ticks';
  data: Record<string, any>[];
}>();
defineEmits<{
  (e: 'labelClick', value: number): void;
}>();
const { type } = toRefs(props);
// 解构父级属性
const { min, max, startValue, endValue, range, direction, step } =
  inject<SliderProvide>(SLIDER_PROVIDE_KEY, {
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
  });
// 计算position
const getPosition = (value: number) => {
  if (type.value == 'ticks') {
    return `calc(${value * step.value}% - 0.5px)`;
  } else if (type.value == 'dots') {
    return `calc(${value * step.value}% - 4px)`;
  } else {
    return `calc(${value * step.value}% - 7px)`;
  }
};
// 是否在区间之内
const isInRange = (value: number) => {
  const curValue = value * step.value;
  if (!range.value) {
    return (
      startValue.value >= curValue &&
      curValue >= min.value &&
      curValue <= max.value
    );
  } else {
    const minVal = Math.min(startValue.value, endValue.value);
    const maxVal = Math.max(startValue.value, endValue.value);
    return curValue >= minVal && curValue <= maxVal;
  }
};
</script>

<style lang="less" scoped>
@import '../style/slider.less';
</style>
