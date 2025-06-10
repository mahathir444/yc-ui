<template>
  <svg :style="style" class="yc-icon">
    <use v-if="type" :xlinkHref="`#${type}`" />
    <slot v-else />
  </svg>
</template>

<script lang="ts" setup>
import { computed, toRefs, CSSProperties } from 'vue';
import { IconProps, IconSlots } from './type';
import { isUndefined, isString, isNumber, numberToPx } from '@shared/utils';
defineOptions({
  name: 'Icon',
});
defineSlots<IconSlots>();
const props = withDefaults(defineProps<IconProps>(), {
  spin: false,
});
const { size, rotate, spin } = toRefs(props);
// 计算size
const calcSize = (type: 'width' | 'height') => {
  if (isUndefined(size.value)) {
    return '1em';
  } else if (Array.isArray(size.value)) {
    return numberToPx(size.value[type == 'height' ? 1 : 0]);
  } else {
    return numberToPx(size.value);
  }
};
// 计算内部style
const style = computed(() => {
  return {
    width: calcSize('width'),
    height: calcSize('height'),
    transform: isUndefined(rotate.value) ? '' : `rotate(${rotate.value}deg)`,
    animation: spin.value
      ? 'animation: spin 1s infinite cubic-bezier(0, 0, 1, 1)'
      : '',
  } as CSSProperties;
});
</script>

<style lang="less" scoped>
@import './style/icon.less';
</style>
