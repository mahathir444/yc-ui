<template>
  <svg aria-hidden="true" :class="['svg-icon', $attrs.class]">
    <use :xlink:href="symbolId" fill="currentColor" />
  </svg>
</template>

<script lang="ts" setup>
import is from '@/utils/is';
import { toRefs } from 'vue';
import { computed } from 'vue';
const props = withDefaults(
  defineProps<{
    name: string;
    prefix?: string;
    size?: number | string | Array<number | string>;
    color?: string;
  }>(),
  {
    prefix: 'icon',
    size: 16,
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
