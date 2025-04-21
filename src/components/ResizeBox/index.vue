<!-- 伸缩框 -->
<template>
  <component
    :is="component"
    :class="{
      'yc-resizebox': true,
      'no-select': resizingDrigger,
    }"
    ref="boxRef"
    :style="boxStyle"
  >
    <slot />
    <div
      v-for="item in directions"
      :key="item"
      :class="[
        'yc-resizebox-trigger',
        `yc-resizebox-direction-${item}`,
        `direction-${getDir(item)}`,
      ]"
      :id="`direction-${item}`"
      :ref="(el) => setRef(item, el)"
      @mousedown="(e) => hanClickTrigger(item, e)"
    >
      <slot name="resize-trigger" :direction="item">
        <div class="yc-resizebox-trigger-icon-wrapper">
          <slot name="resize-trigger-icon" :direction="item">
            <icon-drag-dot-vertical
              v-if="getDir(item) === 'vertical'"
              :size="6"
            />
            <icon-drag-dot v-else :size="6" />
          </slot>
        </div>
      </slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, toRefs } from 'vue';
import { ResizeBoxProps, DirectionType } from './type';
import { useResizeObserver, useEventListener } from '@vueuse/core';
import { useControlValue } from '@shared/hooks';
import { IconDragDot, IconDragDotVertical } from '@shared/icons';
defineOptions({
  name: 'ResizeBox',
});
const props = withDefaults(defineProps<ResizeBoxProps>(), {
  directions: () => ['right'],
  component: 'div',
});
const emits = defineEmits<{
  (event: 'update:width', val: number): void;
  (event: 'update:height', val: number): void;
  (event: 'moving-start', ev: MouseEvent): void;
  (event: 'moving-end', ev: MouseEvent): void;
  (
    event: 'moving',
    ev: MouseEvent,
    size: { width?: number; height?: number }
  ): void;
}>();
const { width, height } = toRefs(props);
const cWidth = useControlValue(width, width.value, (val) => {
  emits('update:width', val);
});
const cHeight = useControlValue(height, height.value, (val) => {
  emits('update:height', val);
});
const boxRef = ref();
const triggerRefMap: Partial<Record<DirectionType, any>> = {};
const boxPadding = ref<Record<DirectionType, number>>({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});
const resizingDrigger = ref<DirectionType | undefined>();
let oldPos: { x: number; y: number } | null = null;
let defaultCursor = 'auto';
const setRef = (key: DirectionType, el: any) => {
  if (!el) return;
  triggerRefMap[key] = el;
};
const getDir = (dir: DirectionType) => {
  return ['right', 'left'].includes(dir) ? 'vertical' : 'horizontal';
};
const observerTriggerSize = () => {
  useResizeObserver(
    () => {
      return Object.values(triggerRefMap);
    },
    (entries) => {
      entries.forEach((item) => {
        const direction = item.target.id.split(
          'direction-'
        )[1] as DirectionType;
        if (['right', 'left'].includes(direction)) {
          boxPadding.value[direction] = item.contentRect.width;
        } else {
          boxPadding.value[direction] = item.contentRect.height;
        }
      });
    },
    {
      box: 'border-box',
    }
  );
};
const getSize = (v: string): number => {
  if (v.includes('%')) return 0;
  const sizeStr = v.split('px')[0];
  const size = parseFloat(sizeStr);
  return isNaN(size) ? 0 : size;
};
const computedStyle = computed(() => {
  if (boxRef.value) {
    const style = window.getComputedStyle(boxRef.value);
    return {
      width: boxRef.value.offsetWidth,
      height: boxRef.value.offsetHeight,
      minWidth: getSize(style.minWidth),
      maxWidth: getSize(style.maxWidth),
      minHeight: getSize(style.minHeight),
      maxHeight: getSize(style.maxHeight),
    };
  }
  return {
    minWidth: 0,
    maxWidth: 0,
    minHeight: 0,
    maxHeight: 0,
  };
});

const boxStyle = computed(() => {
  return {
    padding: `${boxPadding.value.top ?? 0}px ${boxPadding.value.right ?? 0}px ${boxPadding.value.bottom ?? 0}px ${boxPadding.value.left ?? 0}px`,
    width: cWidth.value + 'px',
    height: cHeight.value + 'px',
  };
});
const hanClickTrigger = (direction: DirectionType, e: MouseEvent) => {
  resizingDrigger.value = direction;
  oldPos = {
    x: e.x,
    y: e.y,
  };
  defaultCursor = window.getComputedStyle(document.body).cursor;
  document.body.style.cursor = ['right', 'left'].includes(resizingDrigger.value)
    ? 'col-resize'
    : 'row-resize';
  emits('moving-start', e);
};

useEventListener('mousemove', (e) => {
  if (!resizingDrigger.value) return;
  if (!oldPos) return;
  if (['right', 'left'].includes(resizingDrigger.value)) {
    const oldWidth = cWidth.value ?? computedStyle.value.width;
    const movementX = e.x - oldPos.x;
    let calcWidth =
      oldWidth + (resizingDrigger.value === 'right' ? movementX : -movementX);
    if (calcWidth < computedStyle.value.minWidth)
      calcWidth = computedStyle.value.minWidth;
    if (
      computedStyle.value.maxWidth !== 0 &&
      calcWidth > computedStyle.value.maxWidth
    )
      calcWidth = computedStyle.value.maxWidth;
    cWidth.value = calcWidth;
  } else {
    const movementY = e.y - oldPos.y;
    const oldHeight = cHeight.value ?? computedStyle.value.height;
    let calcHeight =
      oldHeight + (resizingDrigger.value === 'bottom' ? movementY : -movementY);
    if (calcHeight < computedStyle.value.minHeight)
      calcHeight = computedStyle.value.minHeight;
    if (
      computedStyle.value.maxHeight !== 0 &&
      calcHeight > computedStyle.value.maxHeight
    )
      calcHeight = computedStyle.value.maxHeight;
    cHeight.value = calcHeight;
  }
  oldPos = {
    x: e.x,
    y: e.y,
  };
  emits('moving', e, { width: cWidth.value, height: cHeight.value });
});
useEventListener('mouseup', (e) => {
  if (!resizingDrigger.value) return;
  resizingDrigger.value = undefined;
  document.body.style.cursor = defaultCursor;
  emits('moving-end', e);
});

onMounted(() => {
  observerTriggerSize();
});
</script>
<style scoped lang="less">
.yc-resizebox {
  width: 100%;
  position: relative;
  overflow: hidden;
  &.no-select {
    user-select: none;
  }
  .yc-resizebox-trigger {
    position: absolute;
    width: fit-content;
    .yc-resizebox-trigger-icon-wrapper {
      background-color: rgb(229, 230, 235);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.direction-vertical {
      height: 100%;
      cursor: col-resize;
      .yc-resizebox-trigger-icon-wrapper {
        height: 100%;
      }
    }
    &.direction-horizontal {
      width: 100%;
      cursor: row-resize;
      .yc-resizebox-trigger-icon-wrapper {
        width: 100%;
      }
    }
    &.yc-resizebox-direction-top {
      top: 0;
      left: unset;
    }
    &.yc-resizebox-direction-bottom {
      bottom: 0;
      left: unset;
    }
    &.yc-resizebox-direction-left {
      left: 0;
      top: 0;
    }
    &.yc-resizebox-direction-right {
      right: 0;
      top: 0;
    }
  }
}
</style>
