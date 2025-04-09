<template>
  <div
    :class="[
      'yc-skeleton-shape',
      animation ? 'yc-skeleton-shape-animation' : '',
      SIZE_CLASS[size],
      SHAPE_CLASS[shape],
    ]"
  ></div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import { SIZE_CLASS, SHAPE_CLASS } from './constants';
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
.yc-skeleton-shape {
  background-color: rgb(242, 243, 245);
}
// size
.yc-skeleton-shape-size-small {
  width: 36px;
  height: 36px;
}
.yc-skeleton-shape-size-medium {
  width: 48px;
  height: 48px;
}
.yc-skeleton-shape-size-large {
  width: 60px;
  height: 60px;
}
// shape
.yc-skeleton-shape-square {
  border-radius: 2px;
}
.yc-skeleton-shape-circle {
  border-radius: 50%;
}
// animation
@keyframes yc-skeleton-circle {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
.yc-skeleton-shape-animation {
  background: linear-gradient(
    90deg,
    rgb(242, 243, 245) 25%,
    rgb(229, 230, 235) 37%,
    rgb(242, 243, 245) 63%
  );
  background-size: 400% 100%;
  animation: yc-skeleton-circle 1.5s cubic-bezier(0, 0, 1, 1) infinite;
}
</style>
