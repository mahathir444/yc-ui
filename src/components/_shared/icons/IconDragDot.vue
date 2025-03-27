<template>
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    :stroke-width="strokeWidth"
  >
    <path
      d="M40 17V19H38V17L40 17Z"
      fill="currentColor"
      stroke="none"
      stroke-width="none"
      :stroke-linecap="strokeLinecap"
    ></path>
    <path
      d="M25 17V19H23V17L25 17Z"
      fill="currentColor"
      stroke="none"
      stroke-width="none"
      :stroke-linecap="strokeLinecap"
    ></path>
    <path
      d="M10 17L10 19H8L8 17L10 17Z"
      fill="currentColor"
      stroke="none"
      stroke-width="none"
      :stroke-linecap="strokeLinecap"
    ></path>
    <path
      d="M40 29V31H38V29H40Z"
      fill="currentColor"
      stroke="none"
      stroke-width="none"
      :stroke-linecap="strokeLinecap"
    ></path>
    <path
      d="M25 29V31H23V29H25Z"
      fill="currentColor"
      stroke="none"
      stroke-width="none"
      :stroke-linecap="strokeLinecap"
    ></path>
    <path
      d="M10 29V31H8L8 29H10Z"
      fill="currentColor"
      stroke="none"
      stroke-width="none"
      :class="{
        'yc-icon': true,
        'yc-icon-spin': spin,
      }"
      :style="{
        transform: rotate ? `rotate(${rotate}deg)` : 'unset',
      }"
      :stroke-linecap="strokeLinecap"
    ></path>
    <path d="M40 17V19H38V17L40 17Z" :stroke-linecap="strokeLinecap"></path>
    <path d="M25 17V19H23V17L25 17Z" :stroke-linecap="strokeLinecap"></path>
    <path d="M10 17L10 19H8L8 17L10 17Z" :stroke-linecap="strokeLinecap"></path>
    <path d="M40 29V31H38V29H40Z" :stroke-linecap="strokeLinecap"></path>
    <path d="M25 29V31H23V29H25Z" :stroke-linecap="strokeLinecap"></path>
    <path d="M10 29V31H8L8 29H10Z" :stroke-linecap="strokeLinecap"></path>
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
