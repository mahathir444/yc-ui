<template>
  <svg
    width="48"
    height="48"
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
const props = withDefaults(defineProps<IconProps>(), {
  strokeWidth: 4,
  strokeLinecap: 'butt',
  strokeLinejoin: 'miter',
  spin: false,
  rotate: undefined,
  size: undefined,
});
</script>
