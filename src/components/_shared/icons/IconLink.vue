<template>
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    :class="{
      'yc-icon': true,
      'yc-icon-spin': spin,
    }"
    :style="{
      transform: rotate ? `rotate(${rotate}deg)` : 'unset',
      width: size ? `${(size as Number[])?.[0] ?? size}px` : '1em',
      height: size ? `${(size as Number[])?.[1] ?? size}px` : '1em',
    }"
    :stroke-width="strokeWidth"
    :stroke-linecap="strokeLinecap"
    :stroke-linejoin="strokeLinejoin"
  >
    <path
      d="m14.1 25.414-4.95 4.95a6 6 0 0 0 8.486 8.485l8.485-8.485a6 6 0 0 0 0-8.485m7.779.707 4.95-4.95a6 6 0 1 0-8.486-8.485l-8.485 8.485a6 6 0 0 0 0 8.485"
    ></path>
  </svg>
</template>

<script lang="ts" setup>
import { IconProps } from '@shared/type';
const props = withDefaults(defineProps<IconProps>(), {
  strokeWidth: 4,
  strokeLinecap: 'butt',
  strokeLinejoin: 'miter',
  spin: false,
  rotate: undefined,
  size: undefined,
});
</script>
