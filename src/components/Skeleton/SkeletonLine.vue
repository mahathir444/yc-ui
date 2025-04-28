<template>
  <div class="yc-skeleton-line">
    <div
      class="yc-skeleton-line-row"
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
import { toRefs, computed } from 'vue';
import { SkeletonLineProps } from './type';
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
</script>

<style lang="less" scoped>
@import './style/skeleton.less';
.yc-skeleton-line {
  gap: v-bind(gap);
}
</style>
