<template>
  <div
    :class="[
      'yc-carousel-arrow',
      showArrow == 'hover' ? 'yc-carousel-arrow-show-hover' : '',
      positionClass,
      arrowClass,
    ]"
    @click="slideTo(type == 'next' ? computedCurrent + 1 : computedCurrent - 1)"
  >
    <icon-arrow-right :rotate="rotate" />
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { IconArrowRight } from '@shared/icons';
import useProvide from './hooks/useProvide';
const props = defineProps<{
  type: 'pre' | 'next';
}>();
const { type } = toRefs(props);
// 接收注入
const { inject } = useProvide();
const { showArrow, direction, arrowClass, computedCurrent, slideTo } = inject();
// 旋转角度
const rotate = computed(() => {
  if (type.value == 'next') {
    return direction.value == 'horizontal' ? 0 : 90;
  } else {
    return direction.value == 'horizontal' ? 180 : -90;
  }
});
//
const positionClass = computed(() => {
  if (type.value == 'next') {
    return direction.value == 'horizontal'
      ? 'yc-carousel-arrow-right'
      : 'yc-carousel-arrow-bottom';
  } else {
    return direction.value == 'horizontal'
      ? 'yc-carousel-arrow-left'
      : 'yc-carousel-arrow-top';
  }
});
</script>

<style lang="less" scoped>
@import './style/carousel.less';
</style>
