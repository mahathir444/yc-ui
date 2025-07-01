<template>
  <component
    :is="component"
    :class="['yc-split', `yc-split-direction-${direction}`]"
    ref="splitRef"
  >
    <!-- first -->
    <div
      class="yc-split-pane yc-split-pane-first"
      :style="{
        flex: `0 0 calc(${rate} - ${valueToPx((triggerRef?.offsetWidth || 0) / 2)})`,
      }"
    >
      <slot name="first" />
    </div>
    <!-- tirgger -->
    <div
      class="yc-split-trigger"
      :style="{
        height: direction == 'horizontal' ? valueToPx(height) : '',
        width: direction == 'vertical' ? valueToPx(width) : '',
      }"
      ref="triggerRef"
    >
      <slot name="resize-trigger">
        <div class="yc-split-trigger-icon-wrapper">
          <div class="yc-split-trigger-icon">
            <slot name="resize-trigger-icon">
              <icon-drag-dot-vertical v-if="direction == 'horizontal'" />
              <icon-drag-dot v-else />
            </slot>
          </div>
        </div>
      </slot>
    </div>
    <!-- second -->
    <div class="yc-split-pane yc-split-pane-second">
      <slot name="second" />
    </div>
  </component>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, watch, onMounted } from 'vue';
import { SplitProps, SplitEmits, SplitSlots } from './type';
import { IconDragDotVertical, IconDragDot } from '@shared/icons';
import { useControlValue, sleep, valueToPx } from '@shared/utils';
import { useElementBounding, useDraggable } from '@vueuse/core';
defineOptions({
  name: 'Split',
});
defineSlots<SplitSlots>();
const props = withDefaults(defineProps<SplitProps>(), {
  component: 'div',
  direction: 'horizontal',
  size: undefined,
  defaultSize: 0.5,
  min: 0,
  max: 1,
  disabled: false,
});
const emits = defineEmits<SplitEmits>();
const { size, defaultSize, direction, min, max } = toRefs(props);
// 比例模式
let valueType: string = 'rate';
// 容器ref
const splitRef = ref<HTMLDivElement>();
// 触发器
const triggerRef = ref<HTMLDivElement>();
// 容器狂高
const { width, height, left, top } = useElementBounding(splitRef, {
  updateTiming: 'next-frame',
});
// 受控的size
const computedSize = useControlValue<number>(size, defaultSize.value, (val) => {
  emits('update:size', val);
});
const rate = computed(() => {
  const value =
    valueType == 'rate' ? computedSize.value : getRate(computedSize.value);
  return value * 100 + '%';
});
// 拖动
const { isDragging, x, y } = useDraggable(triggerRef, {
  onMove() {
    emits('moving');
    const { offsetWidth, offsetHeight } = triggerRef.value!;
    const base = direction.value == 'horizontal' ? left.value : top.value;
    const minValue = base + getValue(min.value);
    const maxValue =
      base +
      getValue(max.value) -
      (direction.value == 'horizontal' ? offsetWidth : offsetHeight);
    if (direction.value == 'horizontal') {
      x.value = x.value < minValue ? minValue : x.value;
      x.value = x.value > maxValue ? maxValue : x.value;
      computedSize.value =
        valueType == 'value'
          ? x.value - left.value
          : getRate(x.value - left.value);
    } else {
      y.value = y.value < minValue ? minValue : y.value;
      y.value = y.value > maxValue ? maxValue : y.value;
      computedSize.value =
        valueType == 'value'
          ? y.value - top.value
          : getRate(y.value - top.value);
    }
  },
  onStart() {
    emits('moving-start');
  },
  onEnd() {
    emits('moving-end');
  },
});
// 获取具体的数值
const getValue = (value: number) => {
  const base = direction.value == 'horizontal' ? width.value : height.value;
  return value > 1 ? value : value * base;
};
// 获取比例
const getRate = (value: number) => {
  const base = direction.value == 'horizontal' ? width.value : height.value;
  return value / base;
};
// 检测值的改变
watch(
  () => computedSize.value,
  async (val) => {
    if (isDragging.value) return;
    x.value = left.value + getValue(val);
    y.value = top.value + getValue(val);
  },
  {
    immediate: true,
  }
);
// 计算初始位置
onMounted(async () => {
  await sleep(0);
  x.value = left.value + getValue(computedSize.value);
  y.value = top.value + getValue(computedSize.value);
});
</script>

<style lang="less" scoped>
@import './style/split.less';
</style>
