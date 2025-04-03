<template>
  <!-- color -->
  <div
    class="yc-color-picker-control-bar"
    :style="{
      background:
        mode == 'alpha'
          ? `linear-gradient(to right, rgba(0, 0, 0, 0), ${baseColor})`
          : '',
    }"
    ref="barRef"
    @click="handleClick"
  >
    <div
      class="yc-color-picker-control-bar-handler"
      :style="{
        color,
        left: `${x - range.min}px`,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }"
      ref="btnRef"
    ></div>
  </div>
  <!-- alpha -->
</template>

<script lang="ts" setup>
import { ref, watch, toRefs } from 'vue';
import { useDraggable, useEventListener } from '@vueuse/core';
import { sleep } from '@shared/utils/fn';
import { GradientColorCalculator, parseColor } from '@shared/utils/color';
const props = defineProps<{
  color: string;
  baseColor: string;
  popupVisible: boolean;
  disabled: boolean;
  mode: 'alpha' | 'color';
}>();
const emits = defineEmits<{
  (e: 'update:color', value: string): void;
  (e: 'update:alpha', value: number): void;
  (e: 'update:baseColor', value: string): void;
  (e: 'change', value: string): void;
}>();
const { color, mode, popupVisible, disabled } = toRefs(props);
// btnRef
const btnRef = ref<HTMLDivElement>();
// barRef
const barRef = ref<HTMLDivElement>();
// draggable hook
const { x, isDragging } = useDraggable(btnRef);
// 旧的x
let oldX = 0;
// 位移范围
const range = ref<Record<string, number>>({
  min: 0,
  max: 0,
});
// 计算器
const calculator = new GradientColorCalculator();
// 设置position
const setPosition = (color: string) => {
  const { max, min } = range.value;
  if (mode.value == 'alpha') {
    const alpha = parseColor(color).getAlpha() * 100;
    x.value = min + (alpha / 100) * (max - min);
    emits('update:alpha', alpha);
  } else {
    x.value = calculator.getPositionForColor(color, max - min) + min;
  }
  oldX = x.value;
};
// 设置颜色
const setColor = () => {
  if (disabled.value) {
    x.value = oldX;
    return;
  }
  const { min, max } = range.value;
  x.value = x.value < min ? min : x.value;
  x.value = x.value > max ? max : x.value;
  oldX = x.value;
  let tempColor = '';
  if (mode.value == 'alpha') {
    const a = +((x.value - min) / (max - min)).toFixed(2);
    tempColor = parseColor(color.value).setAlpha(a).toRgbString();
    emits('update:alpha', a);
  } else {
    tempColor = calculator.getColorAtPosition(x.value - min, max - min);
    emits('update:baseColor', tempColor);
    emits('change', tempColor);
  }
  emits('update:color', tempColor);
};
// 处理点击
const handleClick = (e: MouseEvent) => {
  if (disabled.value) return;
  x.value = e.pageX;
  setColor();
};
// 处理拖动
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
    const { left, right } = barRef.value!.getBoundingClientRect();
    range.value = {
      min: left,
      max: right,
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
.yc-color-picker-control-bar {
  cursor: pointer;
  position: relative;
  width: 182px;
  height: 14px;
  border-radius: 10px;
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
    transform: translate(-50%, -50%);
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
</style>
