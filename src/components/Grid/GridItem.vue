<template>
  <div class="yc-grid-item" :style="style">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, CSSProperties } from 'vue';
import { GridItemProps, GridItemSlots } from './type';
import { isNumber } from '@shared/utils';
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
const { breakpoint, cols, colGap } = useContext().inject();
// offset
const offset = computed(() => {
  return isNumber(_offset.value)
    ? _offset.value
    : (_offset.value?.[breakpoint.value] as number);
});
// span
const span = computed(() => {
  const tempSpan = isNumber(_span.value)
    ? _span.value
    : (_span.value?.[breakpoint.value] as number);
  const resultSpan = tempSpan + offset.value;
  return resultSpan >= cols.value ? cols.value : resultSpan;
});
// 计算style
const style = computed<CSSProperties>(() => {
  return {
    gridColumn: `${`span ${suffix.value ? cols.value - span.value + 1 : span.value}`} / span ${span.value}`,
    marginLeft: offset.value
      ? `calc(${(100 / span.value) * offset.value}% + ${offset.value * colGap!.value}px )`
      : '',
  };
});
</script>
