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
      clip-rule="evenodd"
      d="M24 37c6.627 0 12.627-4.333 18-13-5.373-8.667-11.373-13-18-13-6.627 0-12.627 4.333-18 13 5.373 8.667 11.373 13 18 13Z"
    ></path>
    <path d="M29 24a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"></path>
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
