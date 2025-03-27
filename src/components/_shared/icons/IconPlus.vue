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
    <path d="M5 24h38M24 5v38"></path>
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
