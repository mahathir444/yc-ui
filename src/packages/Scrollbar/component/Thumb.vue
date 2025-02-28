<template>
  <div
    :class="{
      'yc-scrollbar-track': true,
      'yc-scrollbar-track-show': type == 'track',
      'yc-scrollbar-track-direction-vertical': isVertical,
      'yc-scrollbar-track-direction-horizontal': !isVertical,
    }"
    ref="trackRef"
  >
    <div
      :class="{
        'yc-scrollbar-thumb': true,

        'yc-scrollbar-thumb-direction-vertical': isVertical,
        'yc-scrollbar-thumb-direction-horizontal': !isVertical,
      }"
      :style="{
        height: isVertical ? height + 'px' : '',
        top: isVertical ? top + 'px' : '',
        width: !isVertical ? width + 'px' : '',
        left: !isVertical ? left + 'px' : '',
      }"
      ref="dragRef"
    >
      <div
        :class="{
          'yc-scrollbar-thumb-bar': true,
          'is-dragging': isDragging,
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch, computed } from 'vue';
import { useDraggable } from '@vueuse/core';
import {
  useResizeObserver,
  useElementSize,
  useEventListener,
} from '@vueuse/core';
const props = withDefaults(
  defineProps<{
    type?: 'track' | 'embed';
    mode?: 'vertical' | 'horizontal';
    height?: number;
    width?: number;
    top?: number;
    left?: number;
    minTop?: number;
    maxTop?: number;
    minLeft?: number;
    maxLeft?: number;
  }>(),
  {
    mode: 'vertical',
    type: 'embed',
    height: 0,
    width: 0,
    top: 0,
    right: 0,
    minTop: 0,
    maxTop: 0,
    minLeft: 0,
    maxLeft: 0,
  }
);
const emits = defineEmits<{
  (e: 'drag', isVertical: boolean, value: number): void;
  (e: 'resize', width: number, height: number): void;
}>();
const { minLeft, maxLeft, minTop, maxTop, mode } = toRefs(props);
// dargRef
const dragRef = ref<HTMLDivElement>();
// 处理拖动
const { x, y, isDragging } = useDraggable(dragRef);
// 是否是垂直
const isVertical = computed(() => mode.value == 'vertical');
// 计算越界情况
const handleOutOfBound = () => {
  if (!isDragging.value) return;
  if (isVertical.value) {
    y.value = y.value >= maxTop.value ? maxTop.value : y.value;
    y.value = y.value <= minTop.value ? minTop.value : y.value;
    emits('drag', true, y.value - minTop.value);
  } else {
    x.value = x.value >= maxLeft.value ? maxLeft.value : x.value;
    x.value = x.value <= minLeft.value ? minLeft.value : x.value;
    emits('drag', false, x.value - minLeft.value);
  }
};
useEventListener('mousemove', handleOutOfBound);
//轨道实例
const trackRef = ref<HTMLDivElement>();
// 获取bar宽度往外传
const { width: trackWidth, height: trackHeight } = useElementSize(trackRef);
watch(
  trackWidth,
  (v) => {
    emits('resize', v, trackHeight.value);
  },
  {
    immediate: true,
  }
);
watch(
  trackHeight,
  (v) => {
    emits('resize', trackWidth.value, v);
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.yc-scrollbar-track {
  position: absolute;

  .yc-scrollbar-thumb {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    .yc-scrollbar-thumb-bar {
      border-radius: 5px;
      background-color: rgb(201, 205, 212);
      opacity: 0;
      transition: opacity 0.2s ease;
      user-select: none;
      &.is-dragging {
        opacity: 1 !important;
      }
    }
  }
}
.yc-scrollbar-track-show {
  background-color: rgb(247, 248, 250);
  &.yc-scrollbar-track-direction-vertical {
    border-left: 1px solid rgb(229, 230, 235);
    border-right: 1px solid rgb(229, 230, 235);
  }
  &.yc-scrollbar-track-direction-horizontal {
    border-top: 1px solid rgb(229, 230, 235);
    border-bottom: 1px solid rgb(229, 230, 235);

    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      content: '';
      width: 14px;
      height: 14px;
      background-color: rgb(247, 248, 250);
      border-right: 1px solid rgb(229, 230, 235);
    }
  }
}
.yc-scrollbar-track-direction-horizontal {
  left: 0;
  right: 0;
  bottom: 0;
  height: 15px;
  display: flex;
  align-items: center;
}
.yc-scrollbar-track-direction-vertical {
  top: 0;
  bottom: 0;
  right: 0;
  width: 15px;
  display: flex;
  justify-content: center;
}
.yc-scrollbar-thumb-direction-vertical {
  width: 100%;
  .yc-scrollbar-thumb-bar {
    height: 100%;
    width: 9px;
  }
}
.yc-scrollbar-thumb-direction-horizontal {
  height: 100%;
  .yc-scrollbar-thumb-bar {
    height: 9px;
    width: 100%;
  }
}
</style>
