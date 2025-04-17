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
import { provide, toRefs } from 'vue';
import { RowProps, GridProvide } from './type';
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
const { gutter } = toRefs(props);
provide<GridProvide>(GRID_PROVIDE_KEY, {
  gutter,
});
</script>

<style lang="less" scoped>
.yc-row {
  display: flex;
}
</style>
