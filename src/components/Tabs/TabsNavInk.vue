<template>
  <div class="yc-tabs-nav-ink" :style="sliderStyle"></div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { valueToPx, isUndefined } from '@shared/utils';
import { ObjectData } from '@shared/type';
import useContext from './hooks/useContext';
const props = defineProps<{
  curIndex: number;
  panes: ObjectData[];
}>();
const { curIndex, panes } = toRefs(props);
// 接收注入
const { titleRefs, listRef, direction, editable } = useContext().inject();
// 计算sliderWidth
const sliderStyle = computed(() => {
  // 当前的pane
  const curPane = panes.value[curIndex.value];
  const isClosable =
    editable.value && (isUndefined(curPane.closable) || curPane.closable);
  const closeWidth = isClosable ? 22 : 0;
  // 当前的title
  const titleRef = titleRefs.value[curIndex.value];
  // 分方向计算
  if (direction.value == 'horizontal') {
    const titleLeft = titleRef?.getBoundingClientRect?.()?.left ?? 0;
    const listLeft = listRef.value?.getBoundingClientRect?.()?.left ?? 0;
    return {
      width: valueToPx(titleRef?.offsetWidth + closeWidth),
      left: valueToPx(titleLeft - listLeft),
    };
  } else {
    const titleTop = titleRef?.getBoundingClientRect?.()?.top || 0;
    return {
      height: valueToPx(titleRef?.offsetHeight),
      top: valueToPx(titleTop),
    };
  }
});
</script>

<style lang="less" scoped>
@import './style/tabs.less';
</style>
