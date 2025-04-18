<template>
  <div class="yc-skeleton">
    <slot v-if="loading" />
    <slot v-else name="content" />
  </div>
</template>

<script lang="ts" setup>
import { provide, toRefs } from 'vue';
import { SkeletonProps, SkeletonProvide } from './type';
import { SKELETON_PROVIDE_KEY } from '@shared/constants';
defineOptions({
  name: 'Skeleton',
});
const props = withDefaults(defineProps<SkeletonProps>(), {
  animation: false,
  loading: false,
});
const { animation, loading } = toRefs(props);
// 提供
provide<SkeletonProvide>(SKELETON_PROVIDE_KEY, {
  loading,
  animation,
});
</script>
