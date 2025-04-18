<template>
  <div
    class="yc-row"
    :style="{
      justifyContent: justify,
      alignItems: align,
      flexWrap: wrap ? 'wrap' : 'nowrap',
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, toRefs, computed } from 'vue';
import { RowProps, GridProvide, BreakpointName } from './type';
import { mediaQueryHandler, isObject } from '@shared/utils';
import { GRID_PROVIDE_KEY } from '@shared/constants';
defineOptions({
  name: 'Row',
});
const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0,
  justify: 'start',
  align: 'start',
  div: false,
  wrap: true,
});
const { gutter: _gutter } = toRefs(props);
// 断点
const breakpoint = ref<BreakpointName>('xxl');
// gutter
const gutter = computed(() => {
  return (
    isObject(_gutter.value)
      ? _gutter.value?.[breakpoint.value] || 0
      : _gutter.value
  ) as number;
});
// 媒体查询管理器
mediaQueryHandler((name) => {
  breakpoint.value = name;
});
provide<GridProvide>(GRID_PROVIDE_KEY, {
  gutter,
  breakpoint,
});
</script>

<style lang="less" scoped>
@import './style/grid.less';
</style>
