<template>
  <svg aria-hidden="true" :class="['svg-icon', $attrs.class]">
    <use :xlink:href="symbolId" fill="currentColor" />
  </svg>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import is from '@/packages/_utils/is';
const props = withDefaults(
  defineProps<{
    name: string;
    prefix?: string;
    size?: number | string | Array<number | string>;
    color?: string;
  }>(),
  {
    prefix: 'icon',
    color: 'inherit',
  }
);
const { size, color, name, prefix } = toRefs(props);
// 计算图标id
const symbolId = computed(() => `#${prefix.value}-${name.value}`);
// 计算width
const width = computed(() => {
  if (is.undefined(size.value)) {
    return '1em';
  } else if (is.string(size.value)) {
    return `${size.value.replace('px', '')}px`;
  } else if (is.number(size.value)) {
    return `${size.value}px`;
  } else {
    return size.value[0] + 'px';
  }
});
// 计算height
const height = computed(() => {
  if (is.undefined(size.value)) {
    return '1em';
  } else if (is.string(size.value)) {
    return `${size.value.replace('px', '')}px`;
  } else if (is.number(size.value)) {
    return `${size.value}px`;
  } else {
    return size.value[1] + 'px';
  }
});
</script>

<style lang="less" scoped>
.svg-icon {
  display: inline-block;
  overflow: hidden;
  color: v-bind(color);
  width: v-bind(width);
  height: v-bind(height);
}
</style>
