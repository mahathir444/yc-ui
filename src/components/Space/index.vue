<template>
  <div
    class="yc-space"
    :class="{
      'yc-space-direction-vertical': direction == 'vertical',
      'yc-space-direction-horizontal': direction == 'horizontal',
      'yc-space-wrap': wrap,
      'yc-space-fill': fill,
    }"
    :style="{
      alignItems,
      gap,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, useSlots } from 'vue';
import { SpaceProps } from './type';
import { isNumber } from '@shared/utils/is';
const props = withDefaults(defineProps<SpaceProps>(), {
  align: 'start',
  direction: 'horizontal',
  size: 'small',
  wrap: false,
  fill: false,
});
const { size, align: alignItems } = toRefs(props);
// 计算gap
const gap = computed(() => {
  if (isNumber(size.value)) {
    return size.value + 'px';
  }
  const map = {
    mini: 4,
    small: 8,
    medium: 16,
    large: 24,
  };
  return map[size.value] + 'px';
});
</script>

<style lang="less" scoped>
@import './style/space.less';
</style>
