<template>
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
      :class="className"
    :style="style"
    :stroke-width="strokeWidth"
  >
    <path
      d="M17 8H19V10H17V8Z"
      fill="currentColor"
      stroke="none"
      stroke-width="none"
      :stroke-linecap="strokeLinecap"
    ></path>
    <path
      d="M17 23H19V25H17V23Z"
      fill="currentColor"
      stroke="none"
      stroke-width="none"
      :stroke-linecap="strokeLinecap"
    ></path>
    <path
      d="M17 38H19V40H17V38Z"
      fill="currentColor"
      stroke="none"
      stroke-width="none"
      :stroke-linecap="strokeLinecap"
    ></path>
    <path
      d="M29 8H31V10H29V8Z"
      fill="currentColor"
      stroke="none"
      stroke-width="none"
      :stroke-linecap="strokeLinecap"
    ></path>
    <path
      d="M29 23H31V25H29V23Z"
      fill="currentColor"
      stroke="none"
      stroke-width="none"
      :stroke-linecap="strokeLinecap"
    ></path>
    <path
      d="M29 38H31V40H29V38Z"
      fill="currentColor"
      stroke="none"
      stroke-width="none"
      :stroke-linecap="strokeLinecap"
    ></path>
    <path d="M17 8H19V10H17V8Z" :stroke-linecap="strokeLinecap"></path>
    <path d="M17 23H19V25H17V23Z" :stroke-linecap="strokeLinecap"></path>
    <path d="M17 38H19V40H17V38Z" :stroke-linecap="strokeLinecap"></path>
    <path d="M29 8H31V10H29V8Z" :stroke-linecap="strokeLinecap"></path>
    <path d="M29 23H31V25H29V23Z" :stroke-linecap="strokeLinecap"></path>
    <path d="M29 38H31V40H29V38Z" :stroke-linecap="strokeLinecap"></path>
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
