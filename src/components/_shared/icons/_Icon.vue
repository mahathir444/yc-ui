<template>
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    v-bind="attrs"
  >
    <slot></slot>
  </svg>
</template>

<script lang="ts" setup>
import { toRefs, computed, CSSProperties, useAttrs } from 'vue';
type IconProps = {
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'bevel' | 'miter' | 'round' | 'inherit';
  rotate?: number;
  spin?: boolean;
  size?: number | number[];
  color?: string;
};
const props = withDefaults(defineProps<IconProps>(), {
  strokeWidth: 4,
  strokeLinecap: 'butt',
  strokeLinejoin: 'miter',
  spin: false,
});
const {
  size,
  spin,
  rotate,
  color,
  strokeLinecap,
  strokeLinejoin,
  strokeWidth,
} = toRefs(props);
const $attrs = useAttrs();
// 计算style
const style = computed(() => {
  let width = '';
  let height = '';
  if (Array.isArray(size.value)) {
    width = size.value[0] + 'px';
    height = size.value[1] + 'px';
  } else {
    width = size.value ? size.value + 'px' : '1em';
    height = size.value ? size.value + 'px' : '1em';
  }
  return {
    color: color.value ? color.value : 'inherit',
    width,
    height,
    transform: rotate ? `rotate(${rotate.value}deg)` : 'unset',
  } as CSSProperties;
});
// 计算className
const className = computed(() => {
  return {
    'yc-icon': true,
    'yc-icon-spin': spin.value,
  };
});
// 计算attrs
const attrs = computed(() => {
  return {
    class: className.value,
    style: style.value,
    'stroke-width': strokeWidth.value,
    'stroke-linecap': strokeLinecap.value,
    'stroke-linejoin': strokeLinejoin.value,
    ...($attrs || {}),
  };
});
</script>

<style lang="less" scoped>
// 旋转
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// icon
.yc-icon {
  display: inline-block;
  overflow: hidden;
  width: 1em;
  height: 1em;
  color: inherit;
}
// spin-icon
.yc-icon-spin {
  animation: spin 1s infinite cubic-bezier(0, 0, 1, 1);
}
</style>
