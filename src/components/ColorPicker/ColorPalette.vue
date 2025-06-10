<template>
  <div
    class="yc-color-picker-palette"
    :style="{
      backgroundColor: baseColor,
    }"
    ref="paletteRef"
    @click="handleClick"
  >
    <div
      class="yc-color-picker-handler"
      :style="{
        transform: `translate(calc(${numberToPx(x * width)} - 50%),calc(${numberToPx(y * height)} - 50%))`,
      }"
      ref="btnRef"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs, computed } from 'vue';
import { useDraggable, useElementBounding } from '@vueuse/core';
import { sleep, parseColor, numberToPx } from '@shared/utils';
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
// plate的宽高
const { width, height, top, left } = useElementBounding(paletteRef, {
  updateTiming: 'next-frame',
});
// hsv
const hsv = computed(() => {
  return parseColor(baseColor.value).toHsv();
});
let oldX = 0;
let oldY = 0;
// dragger
const { x, y } = useDraggable(btnRef, {
  onMove() {
    setColor();
  },
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
  x.value = (x.value - left.value) / width.value;
  x.value = x.value < 0 ? 0 : x.value;
  x.value = x.value > 1 ? 1 : x.value;
  y.value = (y.value - top.value) / height.value;
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
// 检测visible
watch(
  () => popupVisible.value,
  async (val) => {
    if (!val) return;
    await sleep(0);
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
@import './style/color-picker.less';
</style>
