<template>
  <div
    :class="`yc-scrollbar-track yc-scrollbar-track-direction-${direction}`"
    :style="{
      width: isVertical ? `${verticalThumbWidth}px` : '',
      height: isVertical ? '' : `${horizontalTrackHeight}px`,
    }"
    ref="trackRef"
    @click.self="handleClick"
  >
    <div
      :class="`yc-scrollbar-thumb yc-scrollbar-thumb-direction-${direction}`"
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
        :style="{
          width: isVertical ? `${verticalThumbWidth}px` : '',
          height: isVertical ? '' : `${horizontalTrackHeight}px`,
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue';
import { useDraggable } from '@vueuse/core';
import { useEventListener, useResizeObserver } from '@vueuse/core';
import { TackType } from './type';
const props = withDefaults(
  defineProps<{
    type?: TackType;
    direction?: 'vertical' | 'horizontal';
    height?: number;
    width?: number;
    top?: number;
    left?: number;
    minTop?: number;
    maxTop?: number;
    minLeft?: number;
    maxLeft?: number;
    verticalTrackWidth?: number;
    horizontalTrackHeight?: number;
    verticalThumbWidth?: number;
    verticalThubmHeight?: number;
  }>(),
  {
    direction: 'vertical',
    type: 'embed',
    height: 0,
    width: 0,
    top: 0,
    left: 0,
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
const { minLeft, maxLeft, minTop, maxTop, top, left, direction } =
  toRefs(props);
// dargRef
const dragRef = ref<HTMLDivElement>();
// 处理拖动
const { x, y, isDragging } = useDraggable(dragRef);
// 是否是垂直
const isVertical = computed(() => direction.value == 'vertical');
// 计算越界情况
useEventListener('mousemove', () => {
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
});
// 处理鼠标点击
const handleClick = (e: MouseEvent) => {
  const { offsetX, offsetY } = e;
  if (isVertical.value) {
    const maxMovable = maxTop.value - minTop.value;
    const moveDistance = top.value < offsetY ? maxMovable / 9 : -maxMovable / 9;
    let value = +(top.value + moveDistance).toFixed(0);
    value = value > maxMovable ? maxMovable : value;
    value = value <= 0 ? 0 : value;
    emits('drag', true, value);
  } else {
    const maxMovable = maxLeft.value - minLeft.value;
    const moveDistance =
      left.value < offsetX ? maxMovable / 9 : -maxMovable / 9;
    let value = +(left.value + moveDistance).toFixed(0);
    value = value > maxMovable ? maxMovable : value;
    value = value <= 0 ? 0 : value;
    emits('drag', false, value);
  }
};
</script>

<style lang="less" scoped>
@import './style/track.less';
</style>
