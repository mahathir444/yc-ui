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
      fill="currentColor"
      stroke="none"
      d="M40 17v2h-2v-2h2ZM25 17v2h-2v-2h2ZM10 17v2H8v-2h2ZM40 29v2h-2v-2h2ZM25 29v2h-2v-2h2ZM10 29v2H8v-2h2Z"
    ></path>
    <path
      d="M40 17v2h-2v-2h2ZM25 17v2h-2v-2h2ZM10 17v2H8v-2h2ZM40 29v2h-2v-2h2ZM25 29v2h-2v-2h2ZM10 29v2H8v-2h2Z"
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
