<template>
  <div
    :class="{
      'yc-col': div,
    }"
    :style="{
      width: `calc((100% / 24) * ${span})`,
      padding: `0 ${gutter! / 2}px 0 ${gutter! / 2}px`,
      marginLeft: `calc((100% / 24) * ${offset})`,
      order,
      flex,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, toRefs, computed } from 'vue';
import { ColProps, GridProvide } from './type';
import { isNumber, isObject } from '@shared/utils';
import { GRID_PROVIDE_KEY } from '@shared/constants';
defineOptions({
  name: 'Col',
});
const props = withDefaults(defineProps<ColProps>(), {
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
const { gutter, breakpoint, div } = inject<GridProvide>(GRID_PROVIDE_KEY, {
  gutter: ref(0),
  breakpoint: ref('xs'),
  div: ref(false),
});
// span
const span = computed(() => {
  return isNumber(_span.value) ? _span.value : _span.value?.[breakpoint.value];
});
// order
const order = computed(() => {
  return isNumber(_order.value)
    ? _order.value
    : _order.value?.[breakpoint.value];
});
// offset
const offset = computed(() => {
  return isNumber(_offset.value)
    ? _offset.value
    : _offset.value?.[breakpoint.value];
});
// flex
const flex = computed(() => {
  return isObject(_flex.value) ? _flex.value?.[breakpoint.value] : _flex.value;
});
</script>
