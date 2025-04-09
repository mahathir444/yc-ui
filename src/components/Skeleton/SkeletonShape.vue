<template>
  <div
    :class="[
      'yc-skeleton-shape',
      animation ? 'yc-skeleton-animation' : '',
      SIZE_CLASS[size],
      SHAPE_CLASS[shape],
    ]"
  ></div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import { SIZE_CLASS, SHAPE_CLASS } from '@shared/constants/skeleton';
import { SkeletonShapeProps, SkeletonProvide } from './type';
import { SKELETON_PROVIDE_KEY } from '@shared/constants';
defineOptions({
  name: 'SkeletonShape',
});
withDefaults(defineProps<SkeletonShapeProps>(), {
  shape: 'sqaure',
  size: 'medium',
});
// 接收
const { animation, loading } = inject<SkeletonProvide>(SKELETON_PROVIDE_KEY, {
  animation: ref(false),
  loading: ref(false),
});
</script>

<style lang="less" scoped>
@import './style/skeleton.less';
</style>
