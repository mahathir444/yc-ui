<template>
  <div
    :class="{
      'yc-skeleton': true,
      'yc-skeleton-animation': animation,
    }"
  >
    <slot v-if="loading" />
    <slot v-else name="content" />
  </div>
</template>

<script lang="ts" setup>
import { provide, toRefs } from 'vue';
import { SkeletonProps } from './type';
defineOptions({
  name: 'Skeleton',
});
const props = withDefaults(defineProps<SkeletonProps>(), {
  animation: false,
  loading: false,
});
const { animation, loading } = toRefs(props);
</script>
