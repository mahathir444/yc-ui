<template>
  <div class="yc-skeleton-line">
    <div
      :class="{
        'yc-skeleton-line-row': true,
        'yc-skeleton-line-animation': animation,
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
.yc-skeleton-line {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: v-bind(gap);
  .yc-skeleton-line-row {
    background-color: rgb(242, 243, 245);
  }
}

@keyframes yc-skeleton-circle {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
.yc-skeleton-line-animation {
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
