<template>
  <div
    :class="{
      'yc-scrollbar': true,
      'yc-scrollbar-auto-fill': autoFill,
      'yc-scrollbar-virtual': scrollbarType == 'virtual',
      'yc-scrollbar-both-track':
        type == 'track' &&
        thumbHeight &&
        thumbWidth &&
        scrollbarType == 'virtual',
      'yc-scrollbar-vertical-track':
        type == 'track' && thumbHeight && scrollbarType == 'virtual',
      'yc-scrollbar-horizontal-track':
        type == 'track' && thumbWidth && scrollbarType == 'virtual',
      outerClass,
    }"
    :style="outerStyle"
  >
    <div
      :style="style"
      class="yc-scrollbar-container"
      ref="scrollRef"
      @scroll="handleScroll"
    >
      <div class="yc-scrollbar-content" ref="contentRef">
        <slot />
      </div>
    </div>
    <!-- 纵向滚动条 -->
    <yc-track
      v-if="thumbHeight && scrollbarType == 'virtual'"
      direction="vertical"
      @drag="handleDrag"
    />
    <!-- 横向滚动条 -->
    <yc-track
      v-if="thumbWidth && scrollbarType == 'virtual'"
      direction="horizontal"
      @drag="handleDrag"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs, provide } from 'vue';
import { ScrollbarProps, ProvideType } from './type';
import { SCROLLBAR_PROVIDE_KEY } from '@/components/_constants';
import { useElementBounding, useElementSize } from '@vueuse/core';
import YcTrack from './Track.vue';
defineOptions({
  name: 'Scrollbar',
});
const props = withDefaults(defineProps<ScrollbarProps>(), {
  type: 'embed',
  scrollscrollbarType: 'virtual',
  outerClass: '',
  outerStyle: () => {
    return {};
  },
  style: () => {
    return {};
  },
  autoFill: false,
  scrollbarSize: () => {
    return {
      verticalTrack: 15,
      verticalThumb: 9,
      horizontalTrack: 15,
      horizontalThumb: 9,
    };
  },
});
const emits = defineEmits<{
  (e: 'scroll', left: number, top: number): void;
}>();
const { type, scrollbarType, scrollbarSize } = toRefs(props);
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
  top: minTop,
  left: minLeft,
  width: srcollWidth,
  height: srcollHeight,
} = useElementBounding(scrollRef);
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
  const width = +(
    (srcollWidth.value * srcollWidth.value) /
    contentWidth.value
  ).toFixed(0);
  return width <= 20 ? 20 : width;
});
// 计算top
const curTop = ref<number>(0);
//计算left
const curLeft = ref<number>(0);
// 可移动的top
const movableTop = computed(() => {
  // 横向track的宽度
  const horizontalTrack = scrollbarSize.value?.horizontalTrack || 15;
  // 如果有横向滚动条
  const track = thumbWidth.value ? horizontalTrack : 0;
  return srcollHeight.value - thumbHeight.value - track;
});
// 可移动的left
const movableLeft = computed(() => {
  // 纵向track的宽度
  const verticalTrack = scrollbarSize.value?.verticalTrack || 15;
  // 如果有纵向滚动条
  const track = thumbHeight.value ? verticalTrack : 0;
  return srcollWidth.value - thumbWidth.value - track;
});
// 提供数据
provide<ProvideType>(SCROLLBAR_PROVIDE_KEY, {
  curTop,
  curLeft,
  movableLeft,
  movableTop,
  thumbHeight,
  thumbWidth,
  minTop,
  minLeft,
  scrollbarSize,
});
// 处理容器滚动
const handleScroll = (e: Event) => {
  const { scrollTop, scrollLeft } = e.target as HTMLDivElement;
  emits('scroll', scrollLeft, scrollTop);
  if (scrollbarType.value != 'virtual') return;
  //计算top
  const top = +(
    ((scrollTop as number) / (contentHeight.value - srcollHeight.value)) *
    movableTop.value
  ).toFixed(1);
  // 计算left
  const left = +(
    ((scrollLeft as number) / (contentWidth.value - srcollWidth.value)) *
    movableLeft.value
  ).toFixed(1);
  curTop.value = top <= movableTop.value ? top : movableTop.value;
  curLeft.value = left <= movableLeft.value ? left : movableLeft.value;
};
// 处理滑块拖动
const handleDrag = (isVertical: boolean, value: number) => {
  if (isVertical) {
    curTop.value = value;
    const maxScrollbarMoveTop = contentHeight.value - srcollHeight.value;
    // 反向计算scrollTop
    const scrollTop = +(
      (curTop.value / movableTop.value) *
      maxScrollbarMoveTop
    ).toFixed(1);
    scrollRef.value!.scrollTop =
      scrollTop >= maxScrollbarMoveTop ? maxScrollbarMoveTop : scrollTop;
  } else {
    curLeft.value = value;
    // 反向计算scrollLeft
    const maxScrollbarMoveLeft = contentWidth.value - srcollWidth.value;
    const scrollLeft = +(
      (curLeft.value / movableLeft.value) *
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
