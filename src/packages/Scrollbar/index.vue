<template>
  <div
    :class="[
      'yc-scrollbar',
      type == 'track' ? 'yc-scrollbar-type-track' : 'yc-scrollbar-type-embed',
      outerClass,
    ]"
    :style="outerStyle"
  >
    <div
      :style="<CSSProperties>$attrs.style"
      :class="[
        'yc-scrollbar-container',
        srcollHeight < contentHeight ? 'yc-scrollbar-vertical-track' : '',
        srcollWidth < contentWidth ? 'yc-scrollbar-horizontal-track' : '',
        $attrs.class,
      ]"
      ref="scrollRef"
      @scroll="handleScroll"
    >
      <div class="yc-scrollbar-content" ref="contentRef">
        <slot />
      </div>
    </div>
    <Thumb
      v-if="srcollHeight < contentHeight"
      mode="vertical"
      :height="thumbHeight"
      :top="thumbTop"
      :minTop="offsetTop"
      :maxTop="maxThumbTop + offsetTop"
      @drag="handleDrag"
      @resize="(width) => (trackWidth = width)"
    />
    <Thumb
      v-if="srcollWidth < contentWidth"
      mode="horizontal"
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
import { ref, computed, CSSProperties, useAttrs } from 'vue';
import { useElementBounding, useElementSize } from '@vueuse/core';
import Thumb from './component/Thumb.vue';
withDefaults(
  defineProps<{
    type?: 'track' | 'embed';
    outerClass?: string;
    outerStyle?: CSSProperties;
  }>(),
  {
    type: 'track',
  }
);
const emits = defineEmits<{
  (e: 'scroll', left: number, top: number): void;
}>();
// contentRef
const contentRef = ref<HTMLElement>();
// scrollRef
const scrollRef = ref<HTMLDivElement>();
// 获取内容高度
const { width: contentWidth, height: contentHeight } =
  useElementSize(contentRef);
// 获取滚动容器高度
const {
  top: offsetTop,
  left: offsetLeft,
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
  return (
    srcollHeight.value -
    thumbHeight.value -
    (contentWidth.value <= srcollWidth.value ? 0 : trackWidth.value)
  );
});
const maxThumbLeft = computed(() => {
  return (
    srcollWidth.value -
    thumbWidth.value -
    (contentHeight.value <= srcollWidth.value ? 0 : trackHeight.value)
  );
});
// 计算滚动
const calcScroll = (scrollTop: number, scrollLeft: number) => {
  //计算top
  const top = +(
    (scrollTop / (contentHeight.value - srcollHeight.value)) *
    maxThumbTop.value
  ).toFixed(1);
  // 计算left
  const left = +(
    (scrollLeft / (contentWidth.value - srcollWidth.value)) *
    maxThumbLeft.value
  ).toFixed(1);
  return {
    top: top <= maxThumbTop.value ? top : maxThumbTop.value,
    left: left <= maxThumbLeft.value ? left : maxThumbLeft.value,
  };
};
// 处理容器滚动
const handleScroll = (e: any) => {
  const { scrollTop, scrollLeft } = e.target as HTMLDivElement;
  const { top, left } = calcScroll(scrollTop, scrollLeft);
  thumbTop.value = top;
  thumbLeft.value = left;
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
.yc-scrollbar {
  position: relative;
  overflow: hidden;
  &:hover .yc-scrollbar-track {
    &:deep(.yc-scrollbar-thumb-bar) {
      opacity: 1;
    }
  }
  .yc-scrollbar-container {
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    .yc-scrollbar-content {
      height: fit-content;
      width: fit-content;
    }
  }
}

.yc-scrollbar-type-track {
  .yc-scrollbar-content {
    border-right: 1px solid rgb(229, 230, 235);
    border-bottom: 1px solid rgb(229, 230, 235);
  }
  &:deep(.yc-scrollbar-track) {
    background-color: rgb(247, 248, 250);
    &.yc-scrollbar-track-direction-vertical {
      border-right: 1px solid rgb(229, 230, 235);
    }
    &.yc-scrollbar-track-direction-horizontal {
      border-bottom: 1px solid rgb(229, 230, 235);
    }
  }
}
.yc-scrollbar-vertical-track {
  padding-right: 15px;
}
.yc-scrollbar-horizontal-track {
  padding-bottom: 15px;
}
</style>
