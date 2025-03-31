<template>
  <div
    v-if="!type"
    :class="{
      'yc-icon': true,
      'yc-icon-spin': spin,
    }"
    :style="style"
  >
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="m14.1 25.414-4.95 4.95a6 6 0 0 0 8.486 8.485l8.485-8.485a6 6 0 0 0 0-8.485m7.779.707 4.95-4.95a6 6 0 1 0-8.486-8.485l-8.485 8.485a6 6 0 0 0 0 8.485"
      ></path>
    </svg>
  </div>
  <svg
    v-else
    :class="{
      'yc-icon': true,
      'yc-icon-spin': spin,
    }"
    :style="style"
    fill="currentColor"
  >
    <use :xlinkHref="`#${type}`" />
  </svg>
</template>

<script lang="ts" setup>
import { computed, toRefs, CSSProperties } from 'vue';
import { IconProps } from './type';
import { isUndefined, isString, isNumber } from '@shared/utils/is';
defineOptions({
  name: 'Icon',
});
const props = withDefaults(defineProps<IconProps>(), {
  spin: false,
});
const { size, rotate, spin } = toRefs(props);
// 计算size
const calcSize = (type: 'width' | 'height') => {
  if (isUndefined(size.value)) {
    return '1em';
  } else if (isString(size.value)) {
    return `${size.value.replace('px', '')}px`;
  } else if (isNumber(size.value)) {
    return `${size.value}px`;
  } else {
    return size.value[type == 'height' ? 1 : 0] + 'px';
  }
};
// 计算内部style
const style = computed(() => {
  return {
    width: calcSize('width'),
    height: calcSize('height'),
    transform: isUndefined(rotate.value) ? '' : `rotate(${rotate.value}deg)`,
  } as CSSProperties;
});
</script>
