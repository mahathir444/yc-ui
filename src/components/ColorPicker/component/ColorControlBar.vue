<template>
  <div class="yc-color-picker-control-bar" ref="barRef">
    <div
      class="yc-color-picker-control-bar-handler"
      :style="{
        color: color,
        left: `${x - range.min}px`,
      }"
      ref="btnRef"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, onMounted } from 'vue';
import { sleep } from '@shared/utils/fn';
import { useDraggable, useEventListener } from '@vueuse/core';
defineProps<{
  color: string;
}>();
const emits = defineEmits<{
  (e: 'update:color', value: string): void;
}>();
// btnRef
const btnRef = ref<HTMLDivElement>();
// barRef
const barRef = ref<HTMLDivElement>();
// draggable hook
const { x, isDragging } = useDraggable(btnRef);
// 位移范围
const range = ref<Record<string, number>>({
  min: 0,
  max: 0,
  btnWidth: 0,
  barWidth: 0,
});
// 处理拖动
useEventListener('mousemove', () => {
  if (!isDragging.value) return;
  const { min, max, barWidth, btnWidth } = range.value;
  x.value = x.value < min ? min : x.value;
  x.value = x.value > max ? max : x.value;
  const baseColor = { r: 255, g: 22, b: 22 };
  const ratio = Math.max(
    0,
    Math.min(1, (x.value - min) / (barWidth - btnWidth))
  );
  // 动态调整颜色值
  const newR = Math.round(baseColor.r * (1 - ratio)); // R 从 255 到 0
  const newG = Math.round(baseColor.g + (255 - baseColor.g) * ratio); // G 从 22 到 255
  const newB = Math.round(baseColor.b + (255 - baseColor.b) * ratio); // B 从 22 到 255
  emits('update:color', `rgb(${newR},${newG},${newB})`);
});
// 初始化数据
const initData = async () => {
  await sleep(0);
  const {
    left,
    right,
    width: barWidth,
  } = barRef.value!.getBoundingClientRect();
  const { width: btnWidth } = btnRef.value!.getBoundingClientRect();
  range.value = {
    min: left,
    max: right - btnWidth,
    btnWidth,
    barWidth,
  };
  x.value = left;
};

initData();
</script>

<style lang="less" scoped>
.yc-color-picker-control-bar {
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  width: 182px;
  height: 14px;
  border: 1px solid rgb(229, 230, 235);
  background-image: linear-gradient(
    90deg,
    #f00 0,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00
  );
  .yc-color-picker-control-bar-handler {
    user-select: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    &::before {
      display: block;
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background: currentColor;
      border-radius: 50%;
    }
    &::after {
      display: block;
      content: '';
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 50%;
    }
  }
}
</style>
