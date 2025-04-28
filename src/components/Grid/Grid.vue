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
import { toRefs, computed } from 'vue';
import { GridProps } from './type';
import { isNumber, mediaQueryHandler } from '@shared/utils';
import useProvide from './hooks/useProvide';
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
const { rowGap: _rowGap } = toRefs(props);
// 注入
const { provide } = useProvide();
const { breakpoint } = provide(props);
// gap
const rowGap = computed(() => {
  return isNumber(_rowGap.value)
    ? _rowGap.value
    : _rowGap.value?.[breakpoint.value];
});
// 媒体查询管理器
mediaQueryHandler((name) => {
  breakpoint.value = name;
});
</script>

<style lang="less" scoped>
@import './style/grid.less';
</style>
