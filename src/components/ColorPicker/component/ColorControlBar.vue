<template>
  <div class="yc-color-picker-control-bar" ref="barRef">
    <div
      class="yc-color-picker-control-bar-handler"
      :style="{
        color: computedValue,
        left: `${x - range.min}px`,
      }"
      ref="btnRef"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import { COLOR_PICKER_PICKER_KEY } from '@shared/constants';
import { ProvideType } from '../type';
import { sleep } from '@shared/utils/fn';
import { useDraggable, useEventListener } from '@vueuse/core';
import { GradientColorCalculator } from '@shared/utils/color';
// 接受值
const { computedValue, baseColor } = inject<ProvideType>(
  COLOR_PICKER_PICKER_KEY,
  {
    computedValue: ref('#FF0000'),
    baseColor: ref('#FF0000'),
    opacity: ref(100),
    format: ref('hex'),
  }
);
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
const calculator = new GradientColorCalculator();
// 处理拖动
useEventListener('mousemove', () => {
  if (!isDragging.value) return;
  const { min, max, barWidth } = range.value;
  x.value = x.value < min ? min : x.value;
  x.value = x.value > max ? max : x.value;
  const color = calculator.getColorAtPosition(x.value - min, barWidth);
  computedValue.value = color;
  baseColor.value = color;
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
