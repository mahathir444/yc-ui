<template>
  <div
    :class="[
      'yc-carousel-item',
      index == computedCurrent ? 'yc-carousel-item-current' : '',
      className,
    ]"
    :style="{
      transitionTimingFunction,
      animationTimingFunction: transitionTimingFunction,
      transitionDuration: moveSpeed + 'ms',
      animationDuration: moveSpeed + 'ms',
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { CarouselItemSlots } from './type';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'CarouselItem',
});
defineSlots<CarouselItemSlots>();
// 接收注入
const { inject } = useProvide();
const {
  index,
  moveType,
  preIndex,
  computedCurrent,
  direction,
  moveSpeed,
  animationName,
  transitionTimingFunction,
} = inject(true);
// 动态计算className
const className = computed(() => {
  if (
    computedCurrent.value == preIndex.value ||
    (preIndex.value != index && computedCurrent.value != index)
  ) {
    return;
  }
  if (animationName.value == 'slide') {
    return `yc-carousel-slide-${direction.value == 'horizontal' ? 'x' : 'y'}-${preIndex.value == index ? 'out' : 'in'}${moveType.value == 'positive' ? '' : '-reverse'}`;
  } else {
    return preIndex.value == index
      ? 'yc-carousel-fade-out'
      : 'yc-carousel-fade-in';
  }
});
</script>

<style lang="less" scoped>
@import './style/carousel.less';
@import './style/animation.less';
</style>
