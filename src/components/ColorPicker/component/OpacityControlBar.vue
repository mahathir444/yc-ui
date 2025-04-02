<template>
  <div class="yc-color-picker-control-bar-bg">
    <div
      class="yc-color-picker-control-bar"
      :style="{
        background: `linear-gradient(to right, rgba(0, 0, 0, 0), ${baseColor})`,
      }"
      ref="barRef"
    >
      <div
        class="yc-color-picker-control-bar-handler"
        ref="btnRef"
        :style="{
          color: computedValue,
          left: `${x - range.min}px`,
        }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import { ProvideType } from '../type';
import { COLOR_PICKER_PICKER_KEY } from '@shared/constants';
import { sleep } from '@shared/utils/fn';
import { useDraggable, useEventListener } from '@vueuse/core';
import tinycolor from 'tinycolor2';
// 接受值
const { computedValue, baseColor, opacity, format } = inject<ProvideType>(
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
});
// 处理拖动
useEventListener('mousemove', () => {
  if (!isDragging.value) return;
  const { min, max } = range.value;
  x.value = x.value < min ? min : x.value;
  x.value = x.value > max ? max : x.value;
  opacity.value = Math.floor(((x.value - min) / (max - min)) * 100);
  const a = +(opacity.value / 100).toFixed(2);
  if (format.value == 'hex') {
    const color = tinycolor(computedValue.value).setAlpha(a).toHex8String();
    computedValue.value = color;
    baseColor.value = color;
  } else {
    const color = tinycolor(computedValue.value).setAlpha(a).toRgbString();
    computedValue.value = color;
  }
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
  };
  x.value = left + (opacity.value / 100) * (barWidth - btnWidth);
};
initData();
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
