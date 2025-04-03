<template>
  <div class="yc-color-picker-control-bar-bg">
    <div
      class="yc-color-picker-control-bar"
      :style="{
        background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${baseColor})`,
      }"
      ref="barRef"
      @click="handleClick"
    >
      <div
        class="yc-color-picker-control-bar-handler"
        ref="btnRef"
        :style="{
          color,
          left: `${x - range.min}px`,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs } from 'vue';
import { sleep } from '@shared/utils/fn';
import { useDraggable, useEventListener } from '@vueuse/core';
import tinycolor from 'tinycolor2';
const props = defineProps<{
  color: string;
  baseColor: string;
  alpha: number;
  popupVisible: boolean;
  disabled: boolean;
}>();
const emits = defineEmits<{
  (e: 'update:color', value: string): void;
  (e: 'update:alpha', value: number): void;
}>();
const { color, baseColor, popupVisible, disabled } = toRefs(props);
// btnRef
const btnRef = ref<HTMLDivElement>();
// barRef
const barRef = ref<HTMLDivElement>();
// draggable hook
const { x, isDragging } = useDraggable(btnRef);
let oldX = 0;
// 位移范围
const range = ref<Record<string, number>>({
  min: 0,
  max: 0,
  barWidth: 0,
});
// 设置位置
const setPosition = (color: string) => {
  const { min, barWidth } = range.value;
  const a = tinycolor(color).getAlpha() * 100;
  emits('update:alpha', a);
  x.value = min + (a / 100) * barWidth;
  oldX = x.value;
};
// 处理点击
const handleClick = (e: MouseEvent) => {
  if (disabled.value) return;
  x.value = e.pageX;
  setColor();
};
// 设置颜色
const setColor = () => {
  if (disabled.value) {
    return (x.value = oldX);
  }
  const { min, max } = range.value;
  x.value = x.value < min ? min : x.value;
  x.value = x.value > max ? max : x.value;
  const a = +((x.value - min) / (max - min)).toFixed(2);
  const resultColor = tinycolor(color.value).setAlpha(a);
  emits('update:alpha', a);
  emits('update:color', resultColor.toRgbString());
  oldX = x.value;
};
// 处理拖动
useEventListener('mousemove', () => {
  if (!isDragging.value) return;
  setColor();
});
// 见面测visible改变
watch(
  () => popupVisible.value,
  async (val) => {
    if (!val) return;
    await sleep(0);
    const { left, right } = barRef.value!.getBoundingClientRect();
    const { width: btnWidth } = btnRef.value!.getBoundingClientRect();
    range.value = {
      min: left,
      max: right - btnWidth,
      barWidth: right - left - btnWidth,
    };
    setPosition(color.value);
  },
  {
    immediate: true,
  }
);
// 暴露方法
defineExpose({
  setPosition,
});
</script>

<style lang="less" scoped>
.yc-color-picker-control-bar-bg {
  width: fit-content;
  height: fit-content;
  background-image: conic-gradient(
    rgba(0, 0, 0, 0.06) 0 25%,
    transparent 0 50%,
    rgba(0, 0, 0, 0.06) 0 75%,
    transparent 0
  );
  background-size: 8px 8px;
  border-radius: 10px;
  .yc-color-picker-control-bar {
    border-radius: 10px;
    cursor: pointer;
    position: relative;
    width: 182px;
    height: 14px;
    border: 1px solid rgb(229, 230, 235);
    .yc-color-picker-control-bar-handler {
      user-select: none;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 1px solid rgb(229, 230, 235);
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
}
</style>
