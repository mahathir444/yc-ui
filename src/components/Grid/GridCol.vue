<template>
  <div
    :class="{
      'yc-col': !div,
    }"
    :style="style"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { toRefs, computed, CSSProperties } from 'vue';
import { GridColProps, GridColSlots } from './type';
import { isNumber, isObject } from '@shared/utils';
import useProvide from './hooks/useProvide';
defineOptions({
  name: 'Col',
});
defineSlots<GridColSlots>();
const props = withDefaults(defineProps<GridColProps>(), {
  span: 24,
  offset: 0,
});
const {
  span: _span,
  order: _order,
  offset: _offset,
  flex: _flex,
} = toRefs(props);
// 接收注入属性
const { inject } = useProvide();
const { gutter, breakpoint, div } = inject();
// col-style
const style = computed<CSSProperties>(() => {
  const span = isNumber(_span.value)
    ? _span.value
    : _span.value?.[breakpoint.value];
  const order = isNumber(_order.value)
    ? _order.value
    : _order.value?.[breakpoint.value];
  const offset = isNumber(_offset.value)
    ? _offset.value
    : _offset.value?.[breakpoint.value];
  const flex = isObject(_flex.value)
    ? _flex.value?.[breakpoint.value]
    : _flex.value;
  return {
    width: `calc((100% / 24) * ${span})`,
    padding: `0 ${gutter?.value! / 2}px 0 ${gutter?.value! / 2}px`,
    marginLeft: `calc((100% / 24) * ${offset})`,
    order,
    flex,
  };
});
</script>
