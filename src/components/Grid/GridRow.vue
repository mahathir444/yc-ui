<template>
  <div
    :class="
      div
        ? []
        : [
            'yc-row',
            wrap ? 'flex-row-wrap' : '',
            ROW_JUSTIFY_MAP[justify],
            ROW_ALIGN_MAP[align],
          ]
    "
    :style="style"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, toRefs, computed, CSSProperties } from 'vue';
import { RowProps, GridProvide, BreakpointName } from './type';
import { mediaQueryHandler, isObject } from '@shared/utils';
import {
  GRID_PROVIDE_KEY,
  ROW_ALIGN_MAP,
  ROW_JUSTIFY_MAP,
} from '@shared/constants';
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
const { gutter: _gutter, div, wrap, justify, align } = toRefs(props);
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
// style
const style = computed<CSSProperties>(() => {
  return div.value
    ? {
        flexWrap: wrap.value ? 'wrap' : 'nowrap',
        justifyContent: justify.value,
        alignItems: align.value,
      }
    : {};
});
// 媒体查询管理器
mediaQueryHandler((name) => {
  breakpoint.value = name;
});
provide<GridProvide>(GRID_PROVIDE_KEY, {
  gutter,
  breakpoint,
  div,
});
</script>

<style lang="less" scoped>
@import './style/grid.less';
</style>
