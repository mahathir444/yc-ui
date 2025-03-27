<template>
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 48 48"
    aria-hidden="true"
    focusable="false"
    :class="className"
    :style="style"
    :stroke-width="strokeWidth"
    :stroke-linecap="strokeLinecap"
    :stroke-linejoin="strokeLinejoin"
  >
    <path
      d="M24 37c6.627 0 12.627-4.333 18-13-5.373-8.667-11.373-13-18-13-6.627 0-12.627 4.333-18 13 5.373 8.667 11.373 13 18 13Z"
      clip-rule="evenodd"
    ></path>
    <path d="M29 24a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"></path>
  </svg>
</template>

<script lang="ts" setup>
import { IconProps } from '@shared/type';
import useIconStyle from '@shared/hooks/useIconStyle';
const props = withDefaults(defineProps<IconProps>(), {
  strokeWidth: 4,
  strokeLinecap: 'butt',
  strokeLinejoin: 'miter',
  spin: false,
  rotate: undefined,
  size: undefined,
});
const { style, className } = useIconStyle(props);
</script>
