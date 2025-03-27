<template>
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 48 48"
    aria-hidden="true"
    focusable="false"
    v-bind="attrs"
  >
    <path
      d="m14.1 25.414-4.95 4.95a6 6 0 0 0 8.486 8.485l8.485-8.485a6 6 0 0 0 0-8.485m7.779.707 4.95-4.95a6 6 0 1 0-8.486-8.485l-8.485 8.485a6 6 0 0 0 0 8.485"
    ></path>
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
const { attrs } = useIconStyle(props);
</script>
