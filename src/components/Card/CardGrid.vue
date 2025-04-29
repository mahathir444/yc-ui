<template>
  <div
    :class="{
      'yc-card-grid': true,
      'yc-card-grid-hoverable': hoverable,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { CardGridProps, CardGridSlots } from './type';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'CardGrid',
});
defineSlots<CardGridSlots>();
withDefaults(defineProps<CardGridProps>(), {
  hoverable: false,
});
// 接收注入
const { inject } = useProvide();
inject('grid');
</script>

<style lang="less" scoped>
@import './style/card-grid.less';
</style>
