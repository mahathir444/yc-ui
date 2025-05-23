<template>
  <div class="yc-tabs-nav-ink" :style="sliderStyle"></div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import useContext from './hooks/useContext';
const props = defineProps<{
  curIndex: number;
}>();
const { curIndex } = toRefs(props);
// 接收注入
const { inject } = useContext();
const { titleRefs, direction, listRef, editable } = inject();
// 计算sliderWidth
const sliderStyle = computed(() => {
  if (direction.value == 'horizontal') {
    const listLeft = listRef.value?.getBoundingClientRect?.()?.left || 0;
    const targetLeft =
      titleRefs.value[curIndex.value]?.getBoundingClientRect?.()?.left || 0;
    return {
      width: `${titleRefs.value[curIndex.value]?.offsetWidth + (editable.value ? 22 : 0)}px`,
      left: `${targetLeft - listLeft}px`,
    };
  } else {
    const listTop = listRef.value?.getBoundingClientRect?.()?.top || 0;
    const targetTop =
      titleRefs.value[curIndex.value]?.getBoundingClientRect?.()?.top || 0;
    return {
      height: `${titleRefs.value[curIndex.value]?.offsetHeight + (editable.value ? 22 : 0)}px`,
      top: `${targetTop - listTop}px`,
    };
  }
});
</script>

<style lang="less" scoped>
@import './style/tabs.less';
</style>
