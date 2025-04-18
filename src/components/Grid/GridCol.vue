<template>
  <div
    class="yc-col"
    :style="{
      padding: `0 ${gutter / 2}px 0 ${gutter / 2}px`,
      width: `calc((100% / 24) * ${span})`,
      marginLeft: `calc((100% / 24) * ${offset})`,
      order,
      flex,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, toRefs, onBeforeUnmount, onMounted, computed } from 'vue';
import { ColProps, BreakpointName, GridProvide } from './type';
import { isNumber, isObject } from '@shared/utils';
import { GRID_PROVIDE_KEY } from '@shared/constants';
import { MediaQueryManager } from '@shared/utils';
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
// 断点
const breakpoint = ref<BreakpointName>('xxl');
// 媒体查询管理器
const mqm = new MediaQueryManager();
// 接收注入属性
const { gutter: _gutter } = inject<GridProvide>(GRID_PROVIDE_KEY, {
  gutter: ref(0),
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
// gutter
const gutter = computed(() => {
  return (
    isObject(_gutter.value)
      ? _gutter.value?.[breakpoint.value] || 0
      : _gutter.value
  ) as number;
});
onMounted(() => {
  mqm.addHandler((name) => {
    breakpoint.value = name;
  });
});
onBeforeUnmount(() => {
  mqm.destroy();
});
</script>
