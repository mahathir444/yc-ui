<template>
  <div
    :class="
      div
        ? []
        : [
            'yc-row',
            `yc-row-justify-${justify}`,
            `yc-row-align-${align}`
            wrap ? 'flex-row-wrap' : '',
          ]
    "
    :style="style"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, CSSProperties } from 'vue';
import { GridRowProps, GridRowSlots } from './type';
import { mediaQueryHandler } from '@shared/utils';
import useProvide from './hooks/useProvide';
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
const { provide } = useProvide();
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
