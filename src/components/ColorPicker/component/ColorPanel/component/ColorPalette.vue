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
        top: `${y * 100}%`,
        left: `${x * 100}%`,
      }"
      ref="btnRef"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs, computed } from 'vue';
import { useDraggable, useEventListener } from '@vueuse/core';
import { sleep } from '@shared/utils/fn';
import { parseColor } from '@shared/utils/color';
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
// 面板实例
const paletteRef = ref<HTMLDivElement>();
// dragger
const { x, y, isDragging } = useDraggable(btnRef);
// hsv
const hsv = computed(() => {
  return parseColor(baseColor.value).toHsv();
});
let oldX = 0;
let oldY = 0;
// 范围
const range = ref<Record<string, number>>({
  left: 0,
  top: 0,
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
  const { left, top, paletteWidth, paletteHeight } = range.value;
  x.value = (x.value - left) / paletteWidth;
  x.value = x.value < 0 ? 0 : x.value;
  x.value = x.value > 1 ? 1 : x.value;
  y.value = (y.value - top) / paletteHeight;
  y.value = y.value < 0 ? 0 : y.value;
  y.value = y.value > 1 ? 1 : y.value;
  const color = parseColor({
    ...hsv.value,
    s: x.value,
    v: 1 - y.value,
  }).toHexString();
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
      top,
      height: paletteHeight,
      width: paletteWidth,
    } = paletteRef.value!.getBoundingClientRect();
    // 计算范围
    range.value = {
      left,
      top,
      paletteHeight,
      paletteWidth,
    };
    x.value = hsv.value.s;
    y.value = 1 - hsv.value.v;
    oldX = x.value;
    oldY = y.value;
  },
  {
    immediate: true,
  }
);

defineExpose({
  setPosition(color: string) {
    const { s, v } = parseColor(color).toHsv();
    x.value = s;
    y.value = 1 - v;
  },
});
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
    transform: translate(-50%, -50%);
  }
}
</style>
