<template>
  <div
    :class="[
      'yc-carousel-indicator',
      INDICATOR_POSITION_MAP[indicatorPosition],
      INDICATOR_SHAPE_CLASS[indicatorType],
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
      @mouseenter="trigger == 'hover' && slideTo(i)"
      @click="trigger == 'click' && slideTo(i)"
    ></div>
    <div
      v-if="indicatorType == 'slider'"
      class="yc-carousel-indicator-item-slider"
      :style="{
        width: 48 / length + 'px',
        transform: `translateX(calc(${(48 / length) * computedCurrent}px - 100%))`,
      }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import {
  INDICATOR_POSITION_MAP,
  INDICATOR_SHAPE_CLASS,
} from '@shared/constants';
import { IndicatorTrigger, IndicatorType, IndicatorPosition } from './type';
import useProvide from './hooks/useProvide';
defineProps<{
  trigger: IndicatorTrigger;
  indicatorType: IndicatorType;
  indicatorPosition: IndicatorPosition;
  indicatorClass: string;
}>();
// 接收注入
const { inject } = useProvide();
const { length, computedCurrent, slideTo } = inject();
</script>

<style lang="less" scoped>
@import './style/carousel.less';
</style>
