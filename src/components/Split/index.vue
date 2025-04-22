<template>
  <div :class="['yc-split', SPLIT_DIRECTION_MAP[direction]]" ref="splitRef">
    <!-- first -->
    <div
      class="yc-split-pane yc-split-pane-first"
      :style="{
        flex: `0 0 calc(${rate} - 3px)`,
      }"
    >
      <slot name="first" />
    </div>
    <!-- tirgger -->
    <div
      class="yc-split-trigger"
      :style="{
        height: direction == 'horizontal' ? `${height}px` : '',
        width: direction == 'vertical' ? `${width}px` : '',
      }"
      @mousedown="$emit('moving-start')"
      @mouseup="$emit('move-end')"
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
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, watch, onMounted } from 'vue';
import { SplitProps } from './type';
import { sleep } from '@shared/utils';
import { SPLIT_DIRECTION_MAP } from '@shared/constants';
import { IconDragDotVertical, IconDragDot } from '@shared/icons';
import { useControlValue } from '@shared/hooks';
import {
  useElementBounding,
  useDraggable,
  useEventListener,
} from '@vueuse/core';
defineOptions({
  name: 'Split',
});
const props = withDefaults(defineProps<SplitProps>(), {
  component: 'div',
  direction: 'horizontal',
  size: undefined,
  defaultSize: 0.5,
  min: 0,
  max: 1,
  disabled: false,
});
const emits = defineEmits<{
  (e: 'update:size', value: number): void;
  (e: 'moving-start'): void;
  (e: 'moving'): void;
  (e: 'move-end'): void;
}>();
const { size, defaultSize, direction, min, max } = toRefs(props);
// 比例模式
let numberType: 'rate' | 'value' = 'rate';
// 容器ref
const splitRef = ref<HTMLDivElement>();
// 触发器
const triggerRef = ref<HTMLDivElement>();
// 容器狂高
const { width, height, left, top } = useElementBounding(splitRef, {
  updateTiming: 'next-frame',
});
// 拖动
const { isDragging, x, y } = useDraggable(triggerRef);
// 受控的size
const computedSize = useControlValue<number>(size, defaultSize.value, (val) => {
  emits('update:size', val);
});
const rate = computed(() => {
  const value =
    numberType == 'rate' ? computedSize.value : getRate(computedSize.value);
  return value * 100 + '%';
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
useEventListener('mousemove', () => {
  if (!isDragging.value) return;
  emits('moving');
  const base = direction.value == 'horizontal' ? left.value : top.value;
  const minValue = base + getValue(min.value);
  const maxValue = base + getValue(max.value);
  if (direction.value == 'horizontal') {
    x.value = x.value < minValue ? minValue : x.value;
    x.value = x.value > maxValue ? maxValue : x.value;
    computedSize.value =
      numberType == 'value'
        ? x.value - left.value
        : getRate(x.value - left.value);
  } else {
    y.value = y.value < minValue ? minValue : y.value;
    y.value = y.value > maxValue ? maxValue : y.value;
    computedSize.value =
      numberType == 'value'
        ? y.value - top.value
        : getRate(y.value - top.value);
  }
});
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
  numberType = computedSize.value > 1 ? 'value' : 'rate';
  x.value = left.value + getValue(computedSize.value);
  y.value = top.value + getValue(computedSize.value);
});
</script>

<style lang="less" scoped>
.yc-split {
  display: flex;
  .yc-split-pane {
    overflow: auto;
  }
  .yc-split-pane-second {
    flex: 1;
  }

  .yc-split-trigger {
    .yc-split-trigger-icon-wrapper {
      color: rgb(29, 33, 41);
      font-size: 12px;
      line-height: 1;
      background-color: rgb(229, 230, 235);
      display: flex;
      align-items: center;
      justify-content: center;

      .yc-split-trigger-icon {
        margin: 0 -3px;
      }
    }
  }
}
// direction
.yc-split-direction-horizontal {
  flex-direction: row;
  .yc-split-trigger {
    cursor: col-resize;
    .yc-split-trigger-icon-wrapper {
      height: 100%;
    }
  }
}
.yc-split-direction-vertical {
  flex-direction: column;
  .yc-split-trigger {
    cursor: row-resize;
    .yc-split-trigger-icon-wrapper {
      width: 100%;
    }
  }
}
</style>
