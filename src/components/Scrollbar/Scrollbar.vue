<template>
  <div
    :class="{
      'yc-scrollbar': true,
      'yc-scrollbar-both-track': type == 'track' && thumbHeight && thumbWidth,
      'yc-scrollbar-vertical-track': type == 'track' && thumbHeight,
      'yc-scrollbar-horizontal-track': type == 'track' && thumbWidth,
      outerClass,
    }"
    :style="outerStyle"
  >
    <div
      class="yc-scrollbar-container"
      :style="style"
      ref="scrollRef"
      @scroll="handleScroll"
    >
      <div class="yc-scrollbar-content" ref="contentRef">
        <slot />
      </div>
    </div>
    <!-- 横向滚动条 -->
    <yc-track
      v-if="srcollHeight < contentHeight"
      direction="vertical"
      :type="type"
      :height="thumbHeight"
      :top="thumbTop"
      :minTop="offsetTop"
      :maxTop="maxThumbTop + offsetTop"
      @drag="handleDrag"
      @resize="(width) => (trackWidth = width)"
    />
    <!-- 纵向滚动条 -->
    <yc-track
      v-if="srcollWidth < contentWidth"
      direction="horizontal"
      :type="type"
      :width="thumbWidth"
      :left="thumbLeft"
      :minLeft="offsetLeft"
      :maxLeft="maxThumbLeft + offsetLeft"
      @drag="handleDrag"
      @resize="(_, height) => (trackHeight = height)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { ScrollbarProps } from './type';
import { useElementBounding, useElementSize } from '@vueuse/core';
import YcTrack from './Track.vue';
defineOptions({
  name: 'Scrollbar',
});
const props = withDefaults(defineProps<ScrollbarProps>(), {
  type: 'embed',
  outerClass: '',
  outerStyle: () => {
    return {};
  },
  style: () => {
    return {};
  },
});
const emits = defineEmits<{
  (e: 'scroll', left: number, top: number): void;
}>();
const { type } = toRefs(props);
// contentRef
const contentRef = ref<HTMLElement>();
// scrollRef
const scrollRef = ref<HTMLDivElement>();
// 获取内容高度
const { width: contentWidth, height: contentHeight } = useElementSize(
  contentRef,
  undefined,
  {
    box: 'border-box',
  }
);
// 获取滚动容器高度
const {
  top: offsetTop,
  left: offsetLeft,
  width: srcollWidth,
  height: srcollHeight,
} = useElementBounding(scrollRef, {});
// 计算滚动条高度
const thumbHeight = computed(() => {
  if (contentHeight.value <= srcollHeight.value) return 0;
  const height = +(
    (srcollHeight.value * srcollHeight.value) /
    contentHeight.value
  ).toFixed(0);
  return height <= 20 ? 20 : height;
});
// 计算滚动条宽度
const thumbWidth = computed(() => {
  if (contentWidth.value <= srcollWidth.value) return 0;
  const width = Number.parseInt(
    ((srcollWidth.value * srcollWidth.value) / contentWidth.value).toFixed(0)
  );
  return width <= 20 ? 20 : width;
});
// 轨道宽度
const trackWidth = ref<number>(0);
// 轨道宽度
const trackHeight = ref<number>(0);
// 计算top
const thumbTop = ref<number>(0);
//计算left
const thumbLeft = ref<number>(0);
// 计算最大的top和Left
const maxThumbTop = computed(() => {
  if (thumbWidth.value) {
    return srcollHeight.value - thumbHeight.value - trackWidth.value;
  }
  return srcollHeight.value - thumbHeight.value;
});
const maxThumbLeft = computed(() => {
  if (thumbHeight.value) {
    return srcollWidth.value - thumbWidth.value - trackHeight.value;
  }
  return srcollWidth.value - thumbWidth.value;
});
// 处理容器滚动
const handleScroll = (e: any) => {
  const { scrollTop, scrollLeft } = e.target as HTMLDivElement;
  //计算top
  const top = +(
    ((scrollTop as number) / (contentHeight.value - srcollHeight.value)) *
    maxThumbTop.value
  ).toFixed(1);
  // 计算left
  const left = +(
    ((scrollLeft as number) / (contentWidth.value - srcollWidth.value)) *
    maxThumbLeft.value
  ).toFixed(1);
  thumbTop.value = top <= maxThumbTop.value ? top : maxThumbTop.value;
  thumbLeft.value = left <= maxThumbLeft.value ? left : maxThumbLeft.value;
};
// 处理滑块拖动
const handleDrag = (isVertical: boolean, value: number) => {
  if (isVertical) {
    thumbTop.value = value;
    const maxScrollbarMoveTop = contentHeight.value - srcollHeight.value;
    // 反向计算scrollTop
    const scrollTop = +(
      (thumbTop.value / maxThumbTop.value) *
      maxScrollbarMoveTop
    ).toFixed(1);
    scrollRef.value!.scrollTop =
      scrollTop >= maxScrollbarMoveTop ? maxScrollbarMoveTop : scrollTop;
  } else {
    thumbLeft.value = value;
    // 反向计算scrollLeft
    const maxScrollbarMoveLeft = contentWidth.value - srcollWidth.value;
    const scrollLeft = +(
      (thumbLeft.value / maxThumbLeft.value) *
      maxScrollbarMoveLeft
    ).toFixed(1);
    scrollRef.value!.scrollLeft =
      scrollLeft >= maxScrollbarMoveLeft ? maxScrollbarMoveLeft : scrollLeft;
  }
};

defineExpose({
  scrollTo(options: ScrollOptions) {
    scrollRef.value?.scrollTo(options);
  },
  scrollLeft(left: number) {
    scrollRef.value?.scrollTo({
      left,
    });
  },
  scrollTop(top: number) {
    scrollRef.value?.scrollTo({
      top,
    });
  },
});
</script>

<style lang="less" scoped>
@import './style/scrollbar.less';
</style>
