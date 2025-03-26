<template>
  <div
    :class="{
      'yc-slider': true,
      'yc-slider-horizontal': direction == 'horizontal',
      'yc-slider-vertical': direction == 'vertical',
      'yc-slider-show-input': direction == 'vertical' && showInput,
    }"
  >
    <div class="yc-slider-track" ref="trackRef">
      <!-- ticks -->
      <yc-ticks
        v-if="showTicks"
        type="ticks"
        :computed-value="computedValue"
        :data="ticks"
        :step="step"
        :direction="direction"
      />
      <yc-ticks
        v-if="marks.length"
        type="dots"
        :computed-value="computedValue"
        :data="marks"
        :step="step"
        :direction="direction"
      />
      <yc-ticks
        v-if="marks.length"
        type="marks"
        :computed-value="computedValue"
        :data="marks"
        :step="step"
        :direction="direction"
        @label-click="(v) => (computedValue = v)"
      />
      <!-- bar -->
      <div
        class="yc-slider-bar"
        role="slider"
        tabindex="0"
        :aria-disabled="disabled"
        :style="{
          top: direction == 'vertical' ? position.top : '',
          right: direction == 'horizontal' ? position.right : '',
        }"
      ></div>
      <!-- button -->
      <yc-tooltip
        :popup-visible="popupVisible || isDragging"
        :disabled="!showTooltip"
        :position="direction == 'vertical' ? 'right' : 'bottom'"
        :content="computedValue + ''"
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
    </div>
    <!-- input -->
    <yc-input-number
      v-if="showInput"
      v-model="tempValue"
      :min="min"
      :max="max"
      hide-button
      text-center
      @blur="computedValue = tempValue"
      @press-enter="computedValue = tempValue"
      style="width: 60px"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  toRefs,
  computed,
  reactive,
  nextTick,
  watch,
  watchEffect,
} from 'vue';
import { SliderProps, PositionData, RangeData, SliderValue } from './type';
import { useDraggable, useEventListener } from '@vueuse/core';
import useControlValue from '@shared/hooks/useControlValue';
import useSliderDraggable from '@shared/hooks/useSliderDraggable';
import YcTicks from './component/Ticks.vue';
import YcTooltip from '@/components/Tooltip';
import YcInputNumber from '@/components/InputNumber';
defineOptions({
  name: 'Slider',
});
const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: undefined,
  defaultValue: 0,
  step: 1,
  min: 0,
  marks: () => {
    return {};
  },
  max: 100,
  direction: 'horizontal',
  disabled: false,
  showTicks: false,
  showInput: false,
  showTooltip: true,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', value: number): void;
  (e: 'hoverChange', value: number): void;
}>();
const {
  direction,
  modelValue,
  defaultValue,
  step,
  min,
  max,
  marks: _marks,
  disabled,
} = toRefs(props);
// 中间值
const tempValue = ref<SliderValue>(0);
// 控制值
const computedValue = useControlValue<SliderValue>(
  modelValue,
  defaultValue.value,
  (val) => {
    tempValue.value = val;
    emits('update:modelValue', val);
  }
);
// 刻度线
const ticks = computed(() => {
  const result = [];
  for (let i = 1; i <= Math.floor(100 / step.value) - 1; i++) {
    result.push({
      value: i,
      label: i,
    });
  }
  return result;
});
// 标注
const marks = computed(() => {
  return Object.entries(_marks.value).map(([key, value]) => {
    return {
      value: +key,
      label: value,
    };
  });
});
// trackRef
const trackRef = ref<HTMLDivElement>();
// buttonRef
const triggerRef = ref<HTMLDivElement>();
// 可见性
const popupVisible = ref<boolean>(false);
// 拖动hook
const { position, isDragging } = useSliderDraggable({
  trackRef,
  triggerRef,
  computedValue,
  direction,
  step,
  min,
  max,
});
</script>

<style lang="less" scoped>
@import './style/slider.less';
</style>
