<template>
  <div
    :class="{
      'yc-scrollbar': true,
      'yc-scrollbar-auto-fill': autoFill,
      'yc-scrollbar-both-track':
        type == 'track' && hasVerticalBar && hashorizontalBar,
      'yc-scrollbar-vertical-track': type == 'track' && hasVerticalBar,
      'yc-scrollbar-horizontal-track': type == 'track' && hashorizontalBar,
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
    <!-- 纵向滚动条 -->
    <yc-track
      v-if="hasVerticalBar"
      direction="vertical"
      @drag="handleDrag"
      @resize="(val) => (trackWidth = val)"
    />
    <!-- 横向滚动条 -->
    <yc-track
      v-if="hashorizontalBar"
      direction="horizontal"
      @drag="handleDrag"
      @resize="(val) => (trackHeight = val)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs, provide, watch } from 'vue';
import { ScrollbarProps, ScrollbarEmits } from './type';
import { useElementSize, useScroll } from '@vueuse/core';
import { SCROLLBAR_PROVIDE_KEY, ScrollbarProvide } from './hooks/useProvide';
import YcTrack from './component/Track.vue';
defineOptions({
  name: 'Scrollbar',
  inheritAttrs: false,
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
  autoFill: false,
});
const emits = defineEmits<ScrollbarEmits>();
const { type } = toRefs(props);
// contentRef
const contentRef = ref<HTMLElement>();
// scrollRef
const scrollRef = ref<HTMLDivElement>();
// 轨道的信息
const trackWidth = ref<number>(0);
const trackHeight = ref<number>(0);
// 滚动状态
const { arrivedState } = useScroll(scrollRef);
// 判断是否触底
watch(arrivedState, () => {
  if (scrollRef.value?.scrollTop && arrivedState.bottom) {
    emits('reachBottom');
  }
  if (scrollRef.value?.scrollLeft && arrivedState.right) {
    emits('reachRight');
  }
});
// 初始化需要计算的属性
// 获取内容的高度
const { width: contentWidth, height: contentHeight } = useElementSize(
  contentRef,
  undefined,
  {
    box: 'border-box',
  }
);
// 获取滚动的高度
const { width: scrollWidth, height: scrollHeight } = useElementSize(
  scrollRef,
  undefined,
  {
    box: 'border-box',
  }
);
// 计算top
const curTop = ref<number>(0);
//计算left
const curLeft = ref<number>(0);
// 是否有纵向滚动条
const hasVerticalBar = computed(() => {
  return contentHeight.value > scrollHeight.value;
});
// 是否有很想滚动条
const hashorizontalBar = computed(() => {
  return contentWidth.value > scrollWidth.value;
});
// 计算滚动条高度
const thumbHeight = computed(() => {
  if (!hasVerticalBar.value) return 0;
  const height = +(
    (scrollHeight.value * scrollHeight.value) /
    contentHeight.value
  ).toFixed(0);
  return height <= 20 ? 20 : height;
});
// 计算滚动条宽度
const thumbWidth = computed(() => {
  if (!hashorizontalBar.value) return 0;
  const width = +(
    (scrollWidth.value * scrollWidth.value) /
    contentWidth.value
  ).toFixed(0);
  return width <= 20 ? 20 : width;
});
// 可移动的top
const movableTop = computed(() => {
  // 横向track的宽度
  const track = hashorizontalBar.value ? trackHeight.value : 0;
  return scrollHeight.value - thumbHeight.value - track;
});
// 可移动的left
const movableLeft = computed(() => {
  // 纵向track的宽度
  const track = hasVerticalBar.value ? trackWidth.value : 0;
  return scrollWidth.value - thumbWidth.value - track;
});
// 提供数据
provide<ScrollbarProvide>(SCROLLBAR_PROVIDE_KEY, {
  curTop,
  curLeft,
  movableLeft,
  movableTop,
  thumbHeight,
  thumbWidth,
  scrollRef,
});
// 处理容器滚动
const handleScroll = (e: Event) => {
  const { scrollTop, scrollLeft } = e.target as HTMLDivElement;
  emits('scroll', scrollLeft, scrollTop);
  //计算top
  const top =
    (scrollTop / (contentHeight.value - scrollHeight.value)) * movableTop.value;
  curTop.value = top <= movableTop.value ? top : movableTop.value;
  // 计算left
  const left =
    (scrollLeft / (contentWidth.value - scrollWidth.value)) * movableLeft.value;
  curLeft.value = left <= movableLeft.value ? left : movableLeft.value;
};
// 处理滑块拖动
const handleDrag = (isVertical: boolean, value: number) => {
  if (isVertical) {
    curTop.value = value;
    // 计算最大可位移的top
    const maxScrollbarMoveTop = contentHeight.value - scrollHeight.value;
    // 反向计算scrollTop
    const scrollTop = (curTop.value / movableTop.value) * maxScrollbarMoveTop;
    // 设置scrollTop
    scrollRef.value!.scrollTop =
      scrollTop >= maxScrollbarMoveTop ? maxScrollbarMoveTop : scrollTop;
  } else {
    curLeft.value = value;
    // 计算最大可位移的left
    const maxScrollbarMoveLeft = contentWidth.value - scrollWidth.value;
    // 反向计算scrollLeft
    const scrollLeft =
      (curLeft.value / movableLeft.value) * maxScrollbarMoveLeft;
    // 设置scrollLeft
    scrollRef.value!.scrollLeft =
      scrollLeft >= maxScrollbarMoveLeft ? maxScrollbarMoveLeft : scrollLeft;
  }
};
// 暴露方法
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
  getScrollRef() {
    return scrollRef.value;
  },
});
</script>

<style lang="less" scoped>
@import './style/scrollbar.less';
</style>
