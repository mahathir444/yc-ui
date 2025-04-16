<template>
  <div
    :class="[
      'yc-skeleton-shape',
      animation ? 'yc-skeleton-animation' : '',
      SKELETON_SHAPE_SIZE_CLASS[size],
      SKELETON_SHAPE_CLASS[shape],
    ]"
  ></div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import {
  SKELETON_SHAPE_SIZE_CLASS,
  SKELETON_SHAPE_CLASS,
} from '@shared/constants';
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
