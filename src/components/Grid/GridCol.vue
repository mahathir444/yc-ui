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
const {
  span: _span,
  order: _order,
  offset: _offset,
  flex: _flex,
} = toRefs(props);
// 接收注入属性
const { inject } = useContext();
const { gutter, breakpoint, div } = inject();
// 获取响应式数据
const getBreakpointValue = (value: ResponsiveValue) => {
  if (isNumber(value)) {
    return value;
  }
  const order = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
  const map = {
    xs: 0,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
    xxl: 5,
  };
};
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
