<template>
  <div class="yc-grid-item" :style="style">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, CSSProperties } from 'vue';
import { GridItemProps, GridItemSlots } from './type';
import useContext from './hooks/useContext';
defineOptions({
  name: 'GridItem',
});
defineSlots<GridItemSlots>();
const props = withDefaults(defineProps<GridItemProps>(), {
  span: 1,
  offset: 0,
  suffix: false,
});
const { span: _span, offset: _offset, suffix } = toRefs(props);
// 接收数据
const { cols, colGap, getBreakpointValue } = useContext().inject();
// offset
const offset = computed(() => {
  return getBreakpointValue(_offset.value);
});
// span
const span = computed(() => {
  const resultSpan = getBreakpointValue(_span.value) + offset.value;
  return resultSpan >= cols.value ? cols.value : resultSpan;
});
// 计算style
const style = computed<CSSProperties>(() => {
  const start = suffix.value
    ? cols.value - span.value + 1
    : `span ${span.value}`;
  return {
    gridColumn: `${start} / span ${span.value}`,
    marginLeft: offset.value
      ? `calc(${(100 / span.value) * offset.value}% + ${offset.value * colGap!.value}px )`
      : '',
  };
});
</script>
