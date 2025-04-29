<template>
  <div
    :class="[
      'yc-carousel',
      indicatorPosition == 'outer' ? 'yc-carousel-indicator-outer' : '',
      CAROUSEL_ANIMATION_CLASS[animationName],
    ]"
  >
    <div :class="['yc-carousel-slide', CAROUSEL_DIRECTION_MAP[direction]]">
      <slot />
    </div>
    <div v-if="indicatorType != 'never'" class="yc-carousel-indicator-wrapper">
      <carousel-indicator
        :indicator-class="indicatorClass"
        :trigger="trigger"
        :indicator-position="indicatorPosition"
        :indicator-type="indicatorType"
      />
    </div>
    <div v-if="showArrow != 'never'" class="yc-carousel-arrow-wrapper">
      <carousel-arrow type="pre" />
      <carousel-arrow type="next" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CarouselProps, CarouselEmits, CarouselSlots } from './type';
import {
  CAROUSEL_DIRECTION_MAP,
  CAROUSEL_ANIMATION_CLASS,
} from '@shared/constants';
import useProvide from './hooks/useProvide';
import CarouselArrow from './CarouselArrow.vue';
import CarouselIndicator from './CarouselIndicator.vue';
defineOptions({
  name: 'Carousel',
});
defineSlots<CarouselSlots>();
const props = withDefaults(defineProps<CarouselProps>(), {
  current: undefined,
  defaultCurrent: 1,
  autoPlay: false,
  moveSpeed: 500,
  animationName: 'slide',
  trigger: 'click',
  direction: 'horizontal',
  showArrow: 'always',
  arrowClass: '',
  indicatorType: 'dot',
  indicatorPosition: 'bottom',
  indicatorClass: '',
  transitionTimingFunction: 'cubic-bezier(0.34, 0.69, 0.1, 1)',
});
const emits = defineEmits<CarouselEmits>();
// 注入
const { provide } = useProvide();
provide(props, emits);
</script>

<style lang="less" scoped>
@import './style/carousel.less';
</style>
