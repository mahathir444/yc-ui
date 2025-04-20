<template>
  <div
    :class="[
      'yc-skeleton-shape',
      animation ? 'yc-skeleton-animation' : '',
      SKELETON_SHAPE_SIZE_CLASS[size] ?? SKELETON_SHAPE_SIZE_CLASS['medium'],
      SKELETON_SHAPE_CLASS[shape],
    ]"
  ></div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import {
  SKELETON_SHAPE_SIZE_CLASS,
  SKELETON_SHAPE_CLASS,
  SKELETON_PROVIDE_KEY,
} from '@shared/constants';
import { SkeletonShapeProps, SkeletonProvide } from './type';
import { useConfigProvder } from '@shared/hooks';
defineOptions({
  name: 'SkeletonShape',
});
const props = withDefaults(defineProps<SkeletonShapeProps>(), {
  shape: 'sqaure',
  size: void 0,
});
// 获取全局配置
const { size } = useConfigProvder(props);
// 接收
const { animation } = inject<SkeletonProvide>(SKELETON_PROVIDE_KEY, {
  animation: ref(false),
  loading: ref(false),
});
</script>

<style lang="less" scoped>
@import './style/skeleton.less';
</style>
