<template>
  <div
    :class="[
      'yc-skeleton-shape',
      `yc-skeleton-shape-shape-${shape}`,
      `yc-skeleton-shape-size-${['small', 'medium', 'large'].includes(size) ? size : 'medium'}`,
    ]"
  ></div>
</template>

<script lang="ts" setup>
import { SkeletonShapeProps } from './type';
import { getGlobalConfig } from '@shared/utils';
defineOptions({
  name: 'SkeletonShape',
});
const props = withDefaults(defineProps<SkeletonShapeProps>(), {
  shape: 'sqaure',
  size: undefined,
});
// 获取全局配置
const { size } = getGlobalConfig(props);
</script>

<style lang="less" scoped>
@import './style/skeleton.less';
</style>
