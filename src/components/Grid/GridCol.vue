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
import { GridColProps, GridColSlots, ResponsiveValue } from './type';
import { isNumber, isObject } from '@shared/utils';
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
const { gutter, div, getBreakpointValue } = useContext().inject();
// col-style
const style = computed<CSSProperties>(() => {
  return {
    width: `calc((100% / 24) * ${getBreakpointValue(span.value, 24)})`,
    padding: `${gutter.value[1] / 2}px ${gutter.value[0] / 2}px`,
    marginLeft: offset.value
      ? `calc((100% / 24) * ${getBreakpointValue(offset.value, 0)})`
      : '',
    order: getBreakpointValue(order.value),
    flex: getBreakpointValue(flex.value),
  };
});
</script>
