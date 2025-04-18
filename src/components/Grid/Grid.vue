<template>
  <div
    class="yc-grid"
    :style="{
      gap: `${rowGap}px ${colGap}px`,
      gridTemplateColumns: `repeat(${cols}, minmax(0px, 1fr))`,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, provide } from 'vue';
import { GridProps, BreakpointName, GridProvide } from './type';
import { isNumber, mediaQueryHandler } from '@shared/utils';
import { GRID_PROVIDE_KEY } from '@shared/constants';
defineOptions({
  name: 'Grid',
});
const props = withDefaults(defineProps<GridProps>(), {
  cols: 24,
  rowGap: 0,
  colGap: 0,
  collapsed: false,
  collapsedRows: 1,
});
const { cols: _cols, rowGap: _rowGap, colGap: _colGap } = toRefs(props);
// 断点
const breakpoint = ref<BreakpointName>('xxl');
// cols
const cols = computed(() => {
  return isNumber(_cols.value)
    ? _cols.value
    : (_cols.value?.[breakpoint.value] as number);
});
// gap
const rowGap = computed(() => {
  return isNumber(_rowGap.value)
    ? _rowGap.value
    : _rowGap.value?.[breakpoint.value];
});
const colGap = computed(() => {
  return isNumber(_colGap.value)
    ? _colGap.value
    : (_colGap.value?.[breakpoint.value] as number);
});
// 媒体查询管理器
mediaQueryHandler((name) => {
  breakpoint.value = name;
});
provide<GridProvide>(GRID_PROVIDE_KEY, {
  cols,
  breakpoint,
  colGap,
});
</script>

<style lang="less" scoped>
@import './style/grid.less';
</style>
