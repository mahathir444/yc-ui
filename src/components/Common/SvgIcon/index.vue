<template>
  <svg
    aria-hidden="true"
    :opacity="opacity"
    :class="['svg-icon', $attrs.class]"
  >
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import is from '@/utils/is';
import { toRefs } from 'vue';
import { computed } from 'vue';
const props = withDefaults(
  defineProps<{
    prefix?: string;
    name: string;
    size?: number | string | Array<number | string>;
    color?: string;
    opacity?: number | string;
  }>(),
  {
    prefix: 'icon',
    size: 16,
    color: '#333',
    opacity: 1,
  }
);
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const { size, color } = toRefs(props);
const width = computed(() => {
  if (is.string(size.value)) {
    return `${size.value.replace('px', '')}px`;
  } else if (is.number(size.value)) {
    return `${size.value}px`;
  } else {
    return size.value[0] + 'px';
  }
});
const height = computed(() => {
  if (is.string(size.value)) {
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
  width: v-bind(width);
  height: v-bind(height);
  color: v-bind(color);
}
</style>
