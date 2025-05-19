<template>
  <div
    :class="[
      'yc-carousel-indicator',
      `yc-carousel-indicator-shape-${indicatorType}`,
      `yc-carousel-indicator-position-${indicatorPosition}`,
      indicatorClass,
    ]"
  >
    <div
      v-for="i in length"
      :key="i"
      :class="{
        'yc-carousel-indicator-item': true,
        'yc-carousel-indicator-item-active': computedCurrent == i,
      }"
      @mouseenter="
        trigger == 'hover' && computedCurrent != i && $emit('change', i)
      "
      @click="trigger == 'click' && computedCurrent != i && $emit('change', i)"
    ></div>
    <div
      v-if="indicatorType == 'slider'"
      class="yc-carousel-indicator-item-slider"
      :style="{
        width: ['top', 'bottom'].includes(indicatorPosition)
          ? 48 / length + 'px'
          : '',
        height: ['left', 'right'].includes(indicatorPosition)
          ? 48 / length + 'px'
          : '',
        transform: ['top', 'bottom'].includes(indicatorPosition)
          ? `translateX(calc(${(48 / length) * computedCurrent}px - 100%))`
          : `translateY(calc(${(48 / length) * computedCurrent}px - 100%))`,
      }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { IndicatorTrigger, IndicatorType, IndicatorPosition } from './type';
import useContext from './hooks/useContext';
defineProps<{
  trigger: IndicatorTrigger;
  indicatorType: IndicatorType;
  indicatorPosition: IndicatorPosition;
  indicatorClass: string;
}>();
defineEmits<{
  (e: 'change', index: number): void;
}>();
// 接收注入
const { inject } = useContext();
const { length, computedCurrent } = inject();
</script>

<style lang="less" scoped>
@import './style/carousel.less';
</style>
