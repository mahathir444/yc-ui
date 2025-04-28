<template>
  <div
    :class="[
      'yc-skeleton-shape',
      SKELETON_SHAPE_SIZE_CLASS[size] ?? SKELETON_SHAPE_SIZE_CLASS['medium'],
      SKELETON_SHAPE_CLASS[shape],
    ]"
  ></div>
</template>

<script lang="ts" setup>
import {
  SKELETON_SHAPE_SIZE_CLASS,
  SKELETON_SHAPE_CLASS,
} from '@shared/constants';
import { SkeletonShapeProps } from './type';
import { useConfigProvder } from '@shared/hooks';
defineOptions({
  name: 'SkeletonShape',
});
const props = withDefaults(defineProps<SkeletonShapeProps>(), {
  shape: 'sqaure',
  size: undefined,
});
// 获取全局配置
const { size } = useConfigProvder(props);
</script>

<style lang="less" scoped>
@import './style/skeleton.less';
</style>
