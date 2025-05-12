<template>
  <li
    :class="{
      'yc-pagination-item': true,
      'yc-pagination-item-disabled': disabled,
      'yc-pagination-item-active': active,
    }"
    :style="{
      ...pageItemStyle,
      ...(active ? activePageItemStyle : {}),
    }"
    @click="handleClick"
  >
    <slot>
      <icon-arrow-right
        v-if="['pre', 'next'].includes(type)"
        :rotate="type == 'pre' ? 180 : 0"
      />
      <icon-more v-else-if="type == 'more'" />
    </slot>
  </li>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { IconArrowRight, IconMore } from '@shared/icons';
import useProvide from './hooks/useProvide';
const props = withDefaults(
  defineProps<{
    type: 'item' | 'pre' | 'next' | 'more';
    page?: number;
  }>(),
  {
    page: 1,
  }
);
const { type, page } = toRefs(props);
// 接收注入
const { inject } = useProvide();
const {
  computedCurrent,
  pageNumber,
  pageItemStyle,
  activePageItemStyle,
  disabled: _disabled,
  baseSize,
} = inject();
const active = computed(() => {
  return type.value == 'item' ? computedCurrent.value == page.value : false;
});
// 处理禁用
const disabled = computed(() => {
  if (['item', 'more'].includes(type.value)) {
    return _disabled.value;
  } else if (type.value == 'pre') {
    return computedCurrent.value <= 1;
  } else {
    return computedCurrent.value >= pageNumber.value;
  }
});
// 处理点击
const handleClick = () => {
  let i = 0;
  if (type.value == 'item') {
    i = page.value;
  } else if (type.value == 'pre') {
    i = computedCurrent.value - 1;
  } else if (type.value == 'next') {
    i = computedCurrent.value + 1;
  } else {
    i =
      computedCurrent.value + baseSize.value >= pageNumber.value
        ? pageNumber.value
        : computedCurrent.value + baseSize.value;
  }
  if (
    disabled.value ||
    (type.value == 'item' && i == computedCurrent.value) ||
    (type.value == 'pre' && i < 1) ||
    (type.value == 'next' && i > pageNumber.value)
  ) {
    return;
  }
  computedCurrent.value = page.value;
};
</script>

<style lang="less" scoped>
@import './style/pagination.less';
</style>
