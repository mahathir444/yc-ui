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
import { toRefs } from 'vue';
import { ObjectData } from '@shared/type';
import { TICK_TYPE_CLASS, TICKS_TYPE_CLASS } from '@shared/constants';
import useProvide from './hooks/useProvide';
const props = defineProps<{
  type: 'dots' | 'marks' | 'ticks';
  data: ObjectData[];
}>();
defineEmits<{
  (e: 'labelClick', value: number): void;
}>();
const { type } = toRefs(props);
// 接收注入
const { inject } = useProvide();
const { min, max, startValue, endValue, range, direction, handleRangeValue } =
  inject();
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
  const rangeMax = handleRangeValue(max.value);
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
@import './style/slider.less';
</style>
