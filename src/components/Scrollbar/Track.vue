<template>
  <div
    :class="`yc-scrollbar-track yc-scrollbar-track-direction-${direction}`"
    :style="{
      width: isVertical ? `${scrollbarSize.verticalTrack || 15}px` : '',
      height: isVertical ? '' : `${scrollbarSize.horizontalTrack || 15}px`,
    }"
    ref="trackRef"
    @click.self="handleClick"
  >
    <div
      :class="`yc-scrollbar-thumb yc-scrollbar-thumb-direction-${direction}`"
      :style="{
        height: isVertical ? `${thumbHeight}px` : '',
        top: isVertical ? `${curTop}px` : '',
        width: !isVertical ? `${thumbWidth}px` : '',
        left: !isVertical ? `${curLeft}px` : '',
      }"
      ref="dragRef"
    >
      <div
        :class="{
          'yc-scrollbar-thumb-bar': true,
          'is-dragging': isDragging,
        }"
        :style="{
          width: isVertical ? `${scrollbarSize.verticalThumb || 9}px` : '',
          height: isVertical ? '' : `${scrollbarSize.horizontalThumb || 9}px`,
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, inject } from 'vue';
import { SCROLLBAR_PROVIDE_KEY } from '@/components/_constants';
import { ProvideType } from './type';
import { Direction } from '@/components/_type';
import { useDraggable, useEventListener } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    direction?: Direction;
  }>(),
  {
    direction: 'vertical',
  }
);
const emits = defineEmits<{
  (e: 'drag', isVertical: boolean, value: number): void;
  (e: 'resize', width: number, height: number): void;
}>();
const { direction } = toRefs(props);
// 是否是垂直
const isVertical = computed(() => direction.value == 'vertical');
// 接受值
const {
  scrollbarSize,
  minLeft,
  minTop,
  thumbHeight,
  thumbWidth,
  movableLeft,
  movableTop,
  curTop,
  curLeft,
} = inject<ProvideType>(SCROLLBAR_PROVIDE_KEY, {
  minTop: ref(0),
  minLeft: ref(0),
  curTop: ref(0),
  curLeft: ref(0),
  movableLeft: ref(0),
  movableTop: ref(0),
  thumbHeight: ref(0),
  thumbWidth: ref(0),
  scrollbarSize: ref({
    verticalTrack: 15,
    verticalThumb: 9,
    horizontalTrack: 15,
    horizontalThumb: 9,
  }),
});
// dargRef
const dragRef = ref<HTMLDivElement>();
// 处理拖动
const { x, y, isDragging } = useDraggable(dragRef);
// 计算越界情况
useEventListener('mousemove', () => {
  if (!isDragging.value) return;
  const maxLeft = movableLeft.value + minLeft.value;
  const maxTop = movableTop.value + minTop.value;
  if (isVertical.value) {
    y.value = y.value >= maxTop ? maxTop : y.value;
    y.value = y.value <= minTop.value ? minTop.value : y.value;
    curTop.value = y.value - minTop.value;
  } else {
    x.value = x.value >= maxLeft ? maxLeft : x.value;
    x.value = x.value <= minLeft.value ? minLeft.value : x.value;
    curLeft.value = x.value - minLeft.value;
  }
});
// 处理鼠标点击
const handleClick = (e: MouseEvent) => {
  const { offsetX, offsetY } = e;
  if (isVertical.value) {
    // 计算位移的拘留
    const moveDistance =
      curTop.value < offsetY ? movableTop.value / 9 : -movableTop.value / 9;
    // 判断合法性
    let value = +(curTop.value + moveDistance).toFixed(0);
    value = value > movableTop.value ? movableTop.value : value;
    value = value <= 0 ? 0 : value;
    emits('drag', true, value);
  } else {
    // 计算位移的
    const moveDistance =
      curLeft.value < offsetX ? movableLeft.value / 9 : -movableLeft.value / 9;
    let value = +(curLeft.value + moveDistance).toFixed(0);
    // 判断合法性
    value = value > movableLeft.value ? movableLeft.value : value;
    value = value <= 0 ? 0 : value;
    emits('drag', false, value);
  }
};
</script>

<style lang="less" scoped>
@import './style/track.less';
</style>
