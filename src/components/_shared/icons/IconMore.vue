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
      d="M38 25v-2h2v2h-2ZM23 25v-2h2v2h-2ZM8 25v-2h2v2H8Z"
    ></path>
    <path d="M38 25v-2h2v2h-2ZM23 25v-2h2v2h-2ZM8 25v-2h2v2H8Z"></path>
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
