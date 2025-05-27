<template>
  <div
    :class="[
      'yc-card-grid',
      {
        'yc-card-grid-hoverable': hoverable,
      },
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { CardGridProps, CardGridSlots } from './type';
import useContext from './hooks/useContext';
defineOptions({
  name: 'CardGrid',
});
defineSlots<CardGridSlots>();
withDefaults(defineProps<CardGridProps>(), {
  hoverable: false,
});
// 接收注入
const { inject } = useContext();
inject('grid');
</script>

<style lang="less" scoped>
@import './style/card-grid.less';
</style>
