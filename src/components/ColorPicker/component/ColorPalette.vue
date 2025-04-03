<template>
  <div
    class="yc-color-picker-palette"
    ref="paletteRef"
    :style="{
      backgroundColor: baseColor,
    }"
  >
    <div
      class="yc-color-picker-handler"
      ref="btnRef"
      :style="{
        left: `${offsetX}px`,
        top: `${offsetY}px`,
      }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject, watch } from 'vue';
import { ProvideType } from '../type';
import {
  DynamicColorCalculator,
  AdvancedColorPicker,
} from '@shared/utils/color';
import { COLOR_PICKER_PICKER_KEY } from '@shared/constants';
import { sleep } from '@shared/utils/fn';
import { useDraggable, useEventListener } from '@vueuse/core';
// 接受值
const { computedValue, baseColor, popupVisible } = inject<ProvideType>(
  COLOR_PICKER_PICKER_KEY,
  {
    computedValue: ref('#FF0000'),
    baseColor: ref('#FF0000'),
    alpha: ref(100),
    format: ref('hex'),
    popupVisible: ref(false),
  }
);
// btn实例
const btnRef = ref<HTMLDivElement>();
const paletteRef = ref<HTMLDivElement>();
// dragger
const { x, y, isDragging } = useDraggable(btnRef);
// 范围
const range = ref<Record<string, number>>({
  minLeft: 0,
  maxLeft: 0,
  minTop: 0,
  maxTop: 0,
  paletteWidth: 0,
  paletteHeight: 0,
  btnWidth: 0,
  btnHeight: 0,
});
// x偏移量
const offsetX = computed(() => x.value - range.value.minLeft);
// y偏移量
const offsetY = computed(() => y.value - range.value.minTop);
// 处理hanler越界的问题
useEventListener('mousemove', () => {
  if (!isDragging.value) return;
  const { minLeft, maxLeft, minTop, maxTop, paletteWidth, paletteHeight } =
    range.value;
  x.value = x.value < minLeft ? minLeft : x.value;
  x.value = x.value > maxLeft ? maxLeft : x.value;
  y.value = y.value < minTop ? minTop : y.value;
  y.value = y.value > maxTop ? maxTop : y.value;
  const colorCalculator = new DynamicColorCalculator({
    width: paletteWidth,
    height: paletteHeight,
    baseColor: baseColor.value, // 主色
    saturationRange: [0.3, 1], // 饱和度变化范围 30%-100%
    lightnessRange: [0.2, 0.9], // 明度变化范围 20%-90%
  });
  const color = colorCalculator.calculateColor(offsetX.value, offsetY.value);
  computedValue.value = color;
});
// 初始化数据
const initData = async () => {
  await sleep(0);
  const {
    left,
    top,
    height: paletteHeight,
    width: paletteWidth,
  } = paletteRef.value!.getBoundingClientRect();
  const { width: btnWidth, height: btnHeight } =
    btnRef.value!.getBoundingClientRect();
  range.value = {
    minLeft: left,
    maxLeft: left + paletteWidth - btnWidth,
    minTop: top,
    maxTop: top + paletteHeight - btnHeight,
    paletteHeight,
    paletteWidth,
    btnWidth,
    btnHeight,
  };
  x.value = (paletteWidth - btnWidth) / 2 + left;
  y.value = (paletteHeight - btnHeight) / 2 + top;
  console.log(x.value, y.value);
};
watch(
  popupVisible,
  () => {
    initData();
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.yc-color-picker-palette {
  position: relative;
  cursor: pointer;
  overflow: hidden;
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
