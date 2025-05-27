<template>
  <div
    :class="[
      {
        'yc-row': !div,
        [`yc-row-align-${align}`]: !div,
        [`yc-row-justify-${justify}`]: !div,
        'yc-row-wrap': wrap && !div,
      },
    ]"
    :style="style"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, CSSProperties } from 'vue';
import { GridRowProps, GridRowSlots } from './type';
import { mediaQueryHandler } from '@shared/utils';
import useContext from './hooks/useContext';
defineOptions({
  name: 'Row',
});
defineSlots<GridRowSlots>();
const props = withDefaults(defineProps<GridRowProps>(), {
  gutter: 0,
  justify: 'start',
  align: 'start',
  div: false,
  wrap: true,
});
const { div, wrap, justify, align } = toRefs(props);
// 注入
const { provide } = useContext();
const { breakpoint } = provide(props);
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
</script>

<style lang="less" scoped>
@import './style/grid.less';
</style>
