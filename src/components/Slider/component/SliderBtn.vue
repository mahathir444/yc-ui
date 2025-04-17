<template>
  <!-- start -->
  <yc-tooltip
    :popup-visible="popupVisible || isDragging"
    :disabled="!showTooltip"
    :position="direction == 'vertical' ? 'right' : 'bottom'"
    :content="
      formatTooltip ? formatTooltip(computedValue) : String(computedValue)
    "
    @update:popup-visible="(v) => (popupVisible = v)"
  >
    <div
      class="yc-slider-btn"
      ref="triggerRef"
      :style="{
        transform: position.transform,
      }"
    ></div>
  </yc-tooltip>
</template>

<script lang="ts" setup>
import { ref, inject, computed, watch, toRefs } from 'vue';
import { SLIDER_PROVIDE_KEY } from '@shared/constants';
import { SliderProvide, PositionData } from '../type';
import { useSliderDraggable } from '@shared/hooks';
import YcTooltip from '@/components/Tooltip';
const props = defineProps<{
  type: 'start' | 'end';
  position: PositionData;
}>();
const emits = defineEmits<{
  (e: 'update:position', value: PositionData): void;
}>();
const { type } = toRefs(props);
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
  formatTooltip,
} = inject<SliderProvide>(SLIDER_PROVIDE_KEY, {
  startValue: ref(0),
  endValue: ref(0),
  tempEndValue: ref(0),
  tempStartValue: ref(0),
  range: ref(false),
  min: ref(0),
  max: ref(0),
  step: ref(0),
  direction: ref('horizontal'),
  disabled: ref(false),
  showTooltip: ref(true),
  trackRef: ref(),
});
// 计算值
const computedValue = computed({
  get() {
    return type.value == 'start' ? startValue.value : endValue.value;
  },
  set(val) {
    if (type.value == 'start') {
      startValue.value = val;
    } else {
      endValue.value = val;
    }
  },
});
// 拖动hook
const { position, isDragging } = useSliderDraggable({
  trackRef,
  triggerRef,
  computedValue,
  direction,
  step,
  min,
  max,
  disabled,
});
// 检测位置改变传递
watch(position, () => {
  emits('update:position', position);
});
</script>

<style lang="less" scoped>
@import '../style/slider.less';
</style>
