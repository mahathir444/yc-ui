<template>
  <yc-icon viewBox="0 0 1024 1024" fill="currentColor">
    <path
      d="M877.44815445 206.10060629a64.72691371 64.72691371 0 0 0-95.14856334 4.01306852L380.73381888 685.46812814 235.22771741 533.48933518a64.72691371 64.72691371 0 0 0-92.43003222-1.03563036l-45.82665557 45.82665443a64.72691371 64.72691371 0 0 0-0.90617629 90.61767965l239.61903446 250.10479331a64.72691371 64.72691371 0 0 0 71.19960405 15.14609778 64.33855261 64.33855261 0 0 0 35.08198741-21.23042702l36.24707186-42.71976334 40.5190474-40.77795556-3.36579926-3.49525333 411.40426297-486.74638962a64.72691371 64.72691371 0 0 0-3.88361443-87.64024149l-45.3088404-45.43829334z"
      p-id="840"
    ></path>
  </yc-icon>
</template>

<script lang="ts" setup>
import { toRefs, computed, CSSProperties } from 'vue';
import YcIcon from './_Icon.vue';
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
  rotate: undefined,
  size: undefined,
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
