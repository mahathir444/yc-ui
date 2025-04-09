<template>
  <div class="yc-skeleton-line">
    <div
      :class="{
        'yc-skeleton-line-row': true,
        'yc-skeleton-animation': animation,
      }"
      v-for="i in rows"
      :key="i"
      :style="{
        height: `${lineHeight}px`,
        width: widths[i] ? `${widths[i]}px` : '100%',
      }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, toRefs, computed } from 'vue';
import { SkeletonLineProps, SkeletonProvide } from './type';
import { SKELETON_PROVIDE_KEY } from '@shared/constants';
defineOptions({
  name: 'SkeletonLine',
});
const props = withDefaults(defineProps<SkeletonLineProps>(), {
  rows: 1,
  widths: () => [],
  lineHeight: 20,
  lineSpacing: 15,
});
const { lineSpacing } = toRefs(props);
// gap
const gap = computed(() => `${lineSpacing.value}px`);
// 接收
const { animation, loading } = inject<SkeletonProvide>(SKELETON_PROVIDE_KEY, {
  animation: ref(false),
  loading: ref(false),
});
</script>

<style lang="less" scoped>
@import './style/skeleton.less';
.yc-skeleton-line {
  gap: v-bind(gap);
}
</style>
