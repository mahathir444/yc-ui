<template>
  <!-- start -->
  <yc-tooltip
    :popup-visible="popupVisible || isDragging"
    :disabled="!showTooltip"
    :position="direction == 'vertical' ? 'right' : 'bottom'"
    :content="type == 'start' ? String(startValue) : String(endValue)"
    @update:popup-visible="(v) => (popupVisible = v)"
  >
    <div
      class="yc-slider-btn"
      ref="triggerRef"
      :style="{
        bottom: direction == 'vertical' ? position.bottom : '',
        left: direction == 'horizontal' ? position.left : '',
      }"
    ></div>
  </yc-tooltip>
</template>

<script lang="ts" setup>
import { ref, inject, watchEffect, onMounted, watch } from 'vue';
import { SLIDER_PROVIDE_KEY } from '@shared/constants';
import { ProvideType, PositionData } from '../type';
import useSliderDraggable from '@shared/hooks/useSliderDraggable';
import YcTooltip from '@/components/Tooltip';
const props = defineProps<{
  type: 'start' | 'end';
  position: PositionData;
  x: number;
  y: number;
}>();
const emits = defineEmits<{
  (e: 'update:x', value: number): void;
  (e: 'update:y', value: number): void;
  (e: 'update:position', value: PositionData): void;
}>();
// 可见性
const popupVisible = ref<boolean>(false);
// 触发dom
const triggerRef = ref<HTMLDivElement>();
// 解构父级属性通用
const {
  trackRef,
  min,
  max,
  direction,
  disabled,
  step,
  showTooltip,
  startValue,
  endValue,
} = inject<ProvideType>(SLIDER_PROVIDE_KEY, {
  min: ref(0),
  max: ref(0),
  step: ref(0),
  startValue: ref(0),
  endValue: ref(0),
  computedValue: ref(0),
  direction: ref('horizontal'),
  disabled: ref(false),
  showTooltip: ref(true),
  trackRef: ref(),
});
// 拖动hook
const { x, y, position, isDragging } = useSliderDraggable({
  trackRef,
  triggerRef,
  computedValue: props.type == 'start' ? startValue : endValue,
  direction,
  step,
  min,
  max,
  disabled,
});
watchEffect(() => {
  emits('update:x', x.value);
  emits('update:y', y.value);
  emits('update:position', position);
});
onMounted(() => {
  const { left, top } = trackRef.value!.getBoundingClientRect();
  x.value = left;
  y.value = top;
  emits('update:x', left);
  emits('update:y', top);
  emits('update:position', position);
});
// 暴露
defineExpose({
  getValue() {
    return {
      x,
      y,
      position,
    };
  },
});
</script>

<style lang="less" scoped>
@import '../style/slider.less';
</style>
