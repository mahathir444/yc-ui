<template>
  <div
    :class="{
      'yc-scrollbar': true,
      'yc-scrollbar-auto-fill': autoFill,
      'yc-scrollbar-virtual': scrollbarType == 'virtual',
      'yc-scrollbar-both-track':
        thumbHeight &&
        thumbWidth &&
        type == 'track' &&
        scrollbarType == 'virtual',
      'yc-scrollbar-vertical-track':
        thumbHeight && type == 'track' && scrollbarType == 'virtual',
      'yc-scrollbar-horizontal-track':
        thumbWidth && type == 'track' && scrollbarType == 'virtual',
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
  scrollbarType: 'virtual',
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
// 初始化需要计算的属性
const {
  thumbHeight,
  thumbWidth,
  curTop,
  curLeft,
  movableLeft,
  movableTop,
  contentHeight,
  contentWidth,
  scrollHeight,
  scrollWidth,
} = initScrollbar();
// 处理容器滚动
const handleScroll = (e: Event) => {
  const { scrollTop, scrollLeft } = e.target as HTMLDivElement;
  emits('scroll', scrollLeft, scrollTop);
  if (scrollbarType.value != 'virtual') {
    return;
  }
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
// 初始化滚动条
function initScrollbar() {
  // 真实滚动条不需要
  if (scrollbarType.value == 'real') {
    return {
      thumbHeight: ref(0),
      thumbWidth: ref(0),
      curTop: ref(0),
      curLeft: ref(0),
      movableTop: ref(0),
      movableLeft: ref(0),
      contentWidth: ref(0),
      contentHeight: ref(0),
      scrollWidth: ref(0),
      scrollHeight: ref(0),
    };
  }
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
    top: elementTop,
    left: elementLeft,
    width: scrollWidth,
    height: scrollHeight,
  } = useElementBounding(scrollRef);
  // 计算top
  const curTop = ref<number>(0);
  //计算left
  const curLeft = ref<number>(0);
  // 可移动的top
  const movableTop = computed(() => {
    // 横向track的宽度
    const track = thumbWidth.value
      ? scrollbarSize.value?.horizontalTrack || 15
      : 0;
    return scrollHeight.value - thumbHeight.value - track;
  });
  // 可移动的left
  const movableLeft = computed(() => {
    // 纵向track的宽度
    const track = thumbHeight.value
      ? scrollbarSize.value?.verticalTrack || 15
      : 0;
    return scrollWidth.value - thumbWidth.value - track;
  });
  // 计算滚动条高度
  const thumbHeight = computed(() => {
    if (contentHeight.value <= scrollHeight.value) return 0;
    const height = +(
      (scrollHeight.value * scrollHeight.value) /
      contentHeight.value
    ).toFixed(0);
    return height <= 20 ? 20 : height;
  });
  // 计算滚动条宽度
  const thumbWidth = computed(() => {
    if (contentWidth.value <= scrollWidth.value) return 0;
    const width = +(
      (scrollWidth.value * scrollWidth.value) /
      contentWidth.value
    ).toFixed(0);
    return width <= 20 ? 20 : width;
  });

  // 提供数据
  provide<ProvideType>(SCROLLBAR_PROVIDE_KEY, {
    curTop,
    curLeft,
    movableLeft,
    movableTop,
    thumbHeight,
    thumbWidth,
    elementTop,
    elementLeft,
    scrollbarSize,
  });
  return {
    thumbHeight,
    thumbWidth,
    curTop,
    curLeft,
    movableTop,
    movableLeft,
    contentWidth,
    contentHeight,
    scrollWidth,
    scrollHeight,
  };
}

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
