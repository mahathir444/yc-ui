<template>
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    aria-hidden="true"
    focusable="false"
    v-bind="attrs"
  >
    <path
      d="M43 7H5M24 20v23M24 13.96 30.453 21H17.546L24 13.96Zm.736-.804Z"
    ></path>
    <path d="m24 14-6 7h12l-6-7Z" fill="currentColor" stroke="none"></path>
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
