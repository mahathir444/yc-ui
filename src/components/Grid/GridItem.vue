<template>
  <div
    class="yc-grid-item"
    :style="{
      gridColumn: `${suffix ? cols : `span ${span}`} / span ${span}`,
      marginLeft: offset
        ? `calc(${(100 / span) * offset}% + ${offset * colGap!}px )`
        : '',
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, inject } from 'vue';
import { GridItemProps, GridProvide } from './type';
import { isNumber } from '@shared/utils';
import { GRID_PROVIDE_KEY } from '@shared/constants';
defineOptions({
  name: 'GridItem',
});
const props = withDefaults(defineProps<GridItemProps>(), {
  span: 1,
  offset: 0,
  suffix: false,
});
const { span: _span, offset: _offset } = toRefs(props);
// span
const span = computed(() => {
  const tempSpan = isNumber(_span.value)
    ? _span.value
    : (_span.value?.[breakpoint.value] as number);
  const resultSpan = tempSpan + offset.value;
  return resultSpan >= cols!.value ? cols!.value : resultSpan;
});
// offset
const offset = computed(() => {
  return isNumber(_offset.value)
    ? _offset.value
    : (_offset.value?.[breakpoint.value] as number);
});
const { breakpoint, cols, colGap } = inject<GridProvide>(GRID_PROVIDE_KEY, {
  cols: ref(24),
  colGap: ref(0),
  breakpoint: ref('xs'),
});
</script>
