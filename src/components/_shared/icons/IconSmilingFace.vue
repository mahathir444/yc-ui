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
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm7.321-26.873a2.625 2.625 0 1 1 0 5.25 2.625 2.625 0 0 1 0-5.25Zm-14.646 0a2.625 2.625 0 1 1 0 5.25 2.625 2.625 0 0 1 0-5.25ZM15.999 30a2 2 0 0 1 2-2h12a2 2 0 1 1 0 4H18a2 2 0 0 1-2-2Z"
      fill="currentColor"
      stroke="none"
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
