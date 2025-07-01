<template>
  <component
    :is="component"
    :style="{
      paddingTop: directions.includes('top') ? '6px' : 0,
      paddingRight: directions.includes('right') ? '6px' : 0,
      paddingBottom: directions.includes('bottom') ? '6px' : 0,
      paddingLeft: directions.includes('left') ? '6px' : 0,
    }"
    class="yc-resizebox"
    ref="boxRef"
  >
    <slot />
    <div
      v-for="dir in directions"
      :key="dir"
      :class="[
        'yc-resizebox-trigger',
        `yc-resizebox-direction-${dir}`,
        `yc-resizebox-trigger-${['left', 'right'].includes(dir) ? 'vertical' : 'horizontal'}`,
      ]"
      :ref="(el) => triggerMap.set(dir, el as HTMLDivElement)"
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
import { toRefs, reactive } from 'vue';
import { ResizeBoxProps, ResizeBoxEmits, ResizeBoxSlots } from './type';
import { IconDragDot } from '@shared/icons';
import { useControlValue } from '@shared/utils';
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
</script>

<style lang="less" scoped>
@import './style/resize-box.less';
</style>
