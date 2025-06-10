<template>
  <div class="yc-tabs-nav-ink" :style="sliderStyle"></div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { numberToPx } from '@shared/utils';
import useContext from './hooks/useContext';
const props = defineProps<{
  curIndex: number;
}>();
const { curIndex } = toRefs(props);
// 接收注入
const { titleRefs, direction, listRef, editable } = useContext().inject();
// 计算sliderWidth
const sliderStyle = computed(() => {
  if (direction.value == 'horizontal') {
    const listLeft = listRef.value?.getBoundingClientRect?.()?.left || 0;
    const targetLeft =
      titleRefs.value[curIndex.value]?.getBoundingClientRect?.()?.left || 0;
    const width =
      titleRefs.value[curIndex.value]?.offsetWidth + (editable.value ? 22 : 0);
    const left = targetLeft - listLeft;
    return {
      width: numberToPx(width),
      left: numberToPx(left),
    };
  } else {
    const listTop = listRef.value?.getBoundingClientRect?.()?.top || 0;
    const targetTop =
      titleRefs.value[curIndex.value]?.getBoundingClientRect?.()?.top || 0;
    const height =
      titleRefs.value[curIndex.value]?.offsetHeight + (editable.value ? 22 : 0);
    const top = targetTop - listTop;
    return {
      height: numberToPx(height),
      top: numberToPx(top),
    };
  }
});
</script>

<style lang="less" scoped>
@import './style/tabs.less';
</style>
