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
    <path d="M25 39h-2V18h2z"></path>
    <path fill="currentColor" stroke="none" d="M25 39h-2V18h2z"></path>
    <path d="M25 11h-2V9h2z"></path>
    <path fill="currentColor" stroke="none" d="M25 11h-2V9h2z"></path>
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
