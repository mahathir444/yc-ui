<template>
  <component :is="component" class="yc-resizebox" ref="boxRef">
    <slot />
    <div
      v-for="dir in directions"
      :key="dir"
      :class="[
        'yc-resizebox-trigger',
        `yc-resizebox-direction-${dir}`,
        `yc-resizebox-trigger-${['left', 'right'].includes(dir) ? 'vertical' : 'horizontal'}`,
      ]"
      :dir="dir"
      :ref="(el) => triggerMap.set(dir, el as HTMLDivElement)"
      @mousedown="handleDragStart(dir, $event)"
    >
      <slot name="resize-trigger" :direction="dir">
        <div class="yc-resizebox-trigger-icon-wrapper">
          <slot name="resize-trigger-icon" :direction="dir">
            <icon-drag-dot :rotate="['left', 'right'].includes(dir) ? 90 : 0" />
          </slot>
        </div>
      </slot>
    </div>
  </component>
</template>

<script lang="ts" setup>
import { ref, toRefs, reactive, onMounted, nextTick } from 'vue';
import { useResizeObserver, useEventListener } from '@vueuse/core';
import {
  ResizeBoxProps,
  ResizeBoxEmits,
  ResizeBoxSlots,
  ResizeBoxDirection,
} from './type';
import { IconDragDot } from '@shared/icons';
import { useControlValue, isUndefined, valueToPx } from '@shared/utils';
defineOptions({
  name: 'ResizeBox',
});
const slots = defineSlots<ResizeBoxSlots>();
const props = withDefaults(defineProps<ResizeBoxProps>(), {
  width: undefined,
  height: undefined,
  component: 'div',
  directions: () => ['right'],
});
const emits = defineEmits<ResizeBoxEmits>();
const { width, height } = toRefs(props);
// 计算的宽度
const computedWidth = useControlValue<number>(width, 0, (val) => {
  emits('update:width', val);
});
// 计算的宽度
const computedHeight = useControlValue<number>(height, 0, (val) => {
  emits('update:height', val);
});
// triggerMap
const triggerMap = reactive<Map<string, HTMLDivElement>>(new Map());
// boxPadding
const triggerSize = reactive<Record<string, number>>({});
// boxRef
const boxRef = ref<HTMLDivElement>();
// 当前拖拽状态
const isDragging = ref(false);
// 拖拽方向
const dragDirection = ref<ResizeBoxDirection | null>(null);
// 初始位置和尺寸
const position = ref({
  x: 0,
  y: 0,
});
// 处理拖拽开始
const handleDragStart = (dir: ResizeBoxDirection, e: MouseEvent) => {
  // 防止文本选中等副作用
  e.preventDefault();
  isDragging.value = true;
  dragDirection.value = dir;
  const { width, height } = boxRef.value!.getBoundingClientRect();
  const { clientX, clientY } = e;
  computedWidth.value = width;
  computedHeight.value = height;
  position.value = {
    x: clientX,
    y: clientY,
  };
  emits('moving-start', e);
};
// 处理鼠标移动
useEventListener('mousemove', async (e) => {
  if (!isDragging.value || !dragDirection.value || !boxRef.value) return;
  const dir = dragDirection.value;
  const { clientX, clientY } = e;
  const { x, y } = position.value;
  const movementX = dragDirection.value == 'left' ? x - clientX : clientX - x;
  const movementY = dragDirection.value == 'top' ? y - clientY : clientY - y;
  position.value = {
    x: clientX,
    y: clientY,
  };
  if (['left', 'right'].includes(dragDirection.value)) {
    computedWidth.value += movementX;
    const minWidth = triggerSize.left + triggerSize.right;
    computedWidth.value =
      computedWidth.value <= minWidth ? minWidth : computedWidth.value;
  } else {
    computedHeight.value += movementY;
    const minHeight = triggerSize.top + triggerSize.bottom;
    computedHeight.value =
      computedHeight.value <= minHeight ? minHeight : computedHeight.value;
  }
  if (['left', 'right'].includes(dir)) {
    boxRef.value.style.width = valueToPx(computedWidth.value);
  } else {
    boxRef.value.style.height = valueToPx(computedHeight.value);
  }
  await nextTick();
  const { width, height } = boxRef.value.getBoundingClientRect();
  computedWidth.value =
    width != computedWidth.value ? width : computedWidth.value;
  computedHeight.value =
    height != computedHeight.value ? height : computedHeight.value;
  emits(
    'moving',
    {
      width,
      height,
    },
    e
  );
});
// 处理鼠标抬起
useEventListener('mouseup', (e) => {
  if (!isDragging.value || !dragDirection.value) return;
  isDragging.value = false;
  dragDirection.value = null;
  emits('moving-end', e);
});
// 监听各个trigger的宽高
onMounted(() => {
  useResizeObserver(
    () => {
      return [...triggerMap.values()];
    },
    (entries) => {
      entries.forEach((item) => {
        const direction = item.target.getAttribute('dir') as string;
        const {
          contentRect: { width, height },
        } = item;
        triggerSize[direction] = ['right', 'left'].includes(direction)
          ? width
          : height;
      });
    },
    {
      box: 'border-box',
    }
  );
});
</script>

<style lang="less" scoped>
@import './style/resize-box.less';
</style>
