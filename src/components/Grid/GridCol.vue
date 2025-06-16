<template>
  <div
    :class="[
      {
        'yc-col': !div,
      },
    ]"
    :style="style"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, CSSProperties } from 'vue';
import { GridColProps, GridColSlots } from './type';
import { getBreakpointValue, valueToPx } from '@shared/utils';
import useContext from './hooks/useContext';
defineOptions({
  name: 'Col',
});
defineSlots<GridColSlots>();
const props = withDefaults(defineProps<GridColProps>(), {
  span: 24,
  offset: 0,
});
const { span, order, offset, flex } = toRefs(props);
// 接收注入属性
const { gutter, div, breakpoint } = useContext().inject();
// col-style
const style = computed<CSSProperties>(() => {
  return {
    width: `calc((100% / 24) * ${getBreakpointValue(breakpoint.value, span.value, 24)})`,
    padding: `${valueToPx(gutter.value[1] / 2)} ${valueToPx(gutter.value[0] / 2)}`,
    marginLeft: offset.value
      ? `calc((100% / 24) * ${getBreakpointValue(breakpoint.value, offset.value, 0)})`
      : '',
    order: getBreakpointValue(breakpoint.value, order.value as number),
    flex: getBreakpointValue(breakpoint.value, flex.value as string),
  };
});
</script>
