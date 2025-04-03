<template>
  <div
    class="yc-color-picker-palette"
    :style="{
      backgroundColor: baseColor,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.8 : 1,
    }"
    ref="paletteRef"
    @click="handleClick"
  >
    <div
      class="yc-color-picker-handler"
      :style="{
        left: `${x - range.left}px`,
        top: `${y - range.top}px`,
      }"
      ref="btnRef"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs } from 'vue';
import { DynamicColorCalculator } from '@shared/utils/color';
import { sleep } from '@shared/utils/fn';
import { useDraggable, useEventListener } from '@vueuse/core';
const props = defineProps<{
  color: string;
  baseColor: string;
  popupVisible: boolean;
  disabled: boolean;
}>();
const emits = defineEmits<{
  (e: 'update:color', value: string): void;
  (e: 'update:baseColor', value: string): void;
}>();
const { popupVisible, baseColor, disabled } = toRefs(props);
// btn实例
const btnRef = ref<HTMLDivElement>();
const paletteRef = ref<HTMLDivElement>();
// dragger
const { x, y, isDragging } = useDraggable(btnRef);
let oldX = 0;
let oldY = 0;
// 范围
const range = ref<Record<string, number>>({
  minLeft: 0,
  maxLeft: 0,
  minTop: 0,
  maxTop: 0,
  paletteWidth: 0,
  paletteHeight: 0,
});
// 处理点击
const handleClick = (e: MouseEvent) => {
  if (disabled.value) return;
  x.value = e.pageX;
  y.value = e.pageY;
  setColor();
};
// 设置颜色
const setColor = () => {
  if (disabled.value) {
    x.value = oldX;
    y.value = oldY;
    return;
  }
  const { minLeft, maxLeft, minTop, maxTop, paletteWidth, paletteHeight } =
    range.value;
  x.value = x.value <= minLeft ? minLeft : x.value;
  x.value = x.value >= maxLeft ? maxLeft : x.value;
  y.value = y.value <= minTop ? minTop : y.value;
  y.value = y.value >= maxTop ? maxTop : y.value;
  const calculator = new DynamicColorCalculator({
    width: paletteWidth,
    height: paletteHeight,
    baseColor: baseColor.value,
    saturationRange: [0.3, 1],
    lightnessRange: [0.2, 0.9],
  });
  const color = calculator.calculateColor(x.value - minLeft, y.value - minTop);
  emits('update:color', color);
  oldX = x.value;
  oldY = y.value;
};
// 处理hanler越界的问题
useEventListener('mousemove', () => {
  if (!isDragging.value) return;
  setColor();
});
// 检测visible
watch(
  () => popupVisible.value,
  async (val) => {
    if (!val) return;
    await sleep(0);
    const {
      left,
      right,
      bottom,
      top,
      height: paletteHeight,
      width: paletteWidth,
    } = paletteRef.value!.getBoundingClientRect();
    const { width: btnWidth, height: btnHeight } =
      btnRef.value!.getBoundingClientRect();
    // 计算范围
    range.value = {
      left,
      top,
      minLeft: left - btnWidth / 2,
      maxLeft: right - btnWidth / 2,
      minTop: top - btnHeight / 2,
      maxTop: bottom - btnHeight / 2,
      paletteHeight,
      paletteWidth,
    };
    x.value = (paletteWidth - btnWidth) / 2 + left;
    y.value = (paletteHeight - btnHeight) / 2 + top;
    oldX = x.value;
    oldY = y.value;
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.yc-color-picker-palette {
  overflow: hidden;
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 178px;
  background-image: linear-gradient(0deg, #000000, transparent),
    linear-gradient(90deg, #ffffff, rgba(255, 255, 255, 0));
  border: 1px solid rgb(229, 230, 235);
  border-bottom: 0;
  .yc-color-picker-handler {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid #fff;
    border-radius: 50%;
    background-color: transparent;
  }
}
</style>
