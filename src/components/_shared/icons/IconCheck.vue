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
    <path d="M41.678 11.05 19.05 33.678 6.322 20.95"></path>
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
