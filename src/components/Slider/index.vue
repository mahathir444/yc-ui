<template>
  <div
    :class="{
      'yc-slider': true,
      'yc-slider-horizontal': direction == 'horizontal',
      'yc-slider-vertical': direction == 'vertical',
      'yc-slider-disabled': disabled,
    }"
  >
    <div class="yc-slider-track" ref="trackRef">
      <!-- ticks -->
      <yc-ticks v-if="showTicks" type="ticks" :data="ticks" />
      <yc-ticks v-if="marks.length" type="dots" :data="marks" />
      <yc-ticks v-if="marks.length" type="marks" :data="marks" />
      <!-- bar -->
      <div
        class="yc-slider-bar"
        role="slider"
        tabindex="0"
        :aria-disabled="disabled"
        :style="{
          top: direction == 'vertical' ? position.top : '',
          bottom: direction == 'vertical' ? position.bottom : '',
          left: direction == 'horizontal' ? position.left : '',
          right: direction == 'horizontal' ? position.right : '',
        }"
      ></div>
      <!-- start -->
      <yc-slider-btn
        v-model:x="x"
        v-model:y="y"
        v-model:position="startPosition"
        type="start"
      />
      <!-- end  -->
      <yc-slider-btn
        v-if="range"
        v-model:x="x1"
        v-model:y="y1"
        v-model:position="endPosition"
        type="end"
      />
    </div>
    <!-- input -->
    <div v-if="showInput" class="yc-slider-input">
      <yc-input-number
        v-model="tempStartValue"
        :min="min"
        :max="max"
        :disabled="disabled"
        hide-button
        text-center
        style="width: 60px"
        @blur="startValue = tempStartValue"
        @press-enter="startValue = tempStartValue"
      />
      <div v-if="range" class="yc-slider-input-divider"></div>
      <yc-input-number
        v-if="range"
        v-model="tempEndValue"
        :min="min"
        :max="max"
        :disabled="disabled"
        hide-button
        text-center
        style="width: 60px"
        @blur="endValue = tempEndValue"
        @press-enter="endValue = tempEndValue"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, provide } from 'vue';
import { SliderProps, ProvideType, PositionData } from './type';
import { SLIDER_PROVIDE_KEY } from '@shared/constants';
import useSliderValue from '@shared/hooks/useSliderValue';
import YcTicks from './component/Ticks.vue';
import YcSliderBtn from './component/SliderBtn.vue';
import YcInputNumber from '@/components/InputNumber';
defineOptions({
  name: 'Slider',
});
const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: undefined,
  defaultValue: 0,
  step: 1,
  min: 30,
  marks: () => {
    return {};
  },
  max: 100,
  direction: 'vertical',
  disabled: false,
  showTicks: false,
  showInput: false,
  range: true,
  showTooltip: true,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', value: number): void;
}>();
const {
  modelValue,
  defaultValue,
  step,
  min,
  max,
  direction,
  disabled,
  range,
  showTooltip,
  marks: _marks,
} = toRefs(props);
// trackRef
const trackRef = ref<HTMLDivElement>();
// 获取slider的值
const {
  computedValue,
  startValue,
  endValue,
  tempEndValue,
  tempStartValue,
  ticks,
  marks,
} = useSliderValue({
  modelValue,
  defaultValue,
  step,
  range,
  _marks,
  emits,
});
// 提供值
provide<ProvideType>(SLIDER_PROVIDE_KEY, {
  min,
  max,
  step,
  startValue,
  endValue,
  computedValue,
  showTooltip,
  disabled,
  direction,
  trackRef,
});
// 两个按钮的信息
const x = ref(0);
const y = ref(0);
const startPosition = ref<PositionData>({
  bottom: '',
  left: '',
  top: '',
  right: '',
});
const x1 = ref(0);
const y1 = ref(0);
const endPosition = ref<PositionData>({
  bottom: '',
  left: '',
  top: '',
  right: '',
});
// 综合计算position
const position = computed(() => {
  const { left, right, top, bottom } = startPosition.value;
  const {
    left: left1,
    right: right1,
    top: top1,
    bottom: bottom1,
  } = endPosition.value;
  const topVal = top.match(/\d+/g)?.[0] || 0;
  const topVal1 = top1.match(/\d+/g)?.[0] || 0;
  const bottomVal = bottom.match(/\d+/g)?.[0] || 0;
  const bottomVal1 = bottom1.match(/\d+/g)?.[0] || 0;
  return {
    left: range.value ? (x.value < x1.value ? left : left1) : min.value + '%',
    right: range.value ? (x.value < x1.value ? right1 : right) : right,
    top: range.value ? (topVal <= topVal1 ? top : top1) : top,
    bottom: range.value
      ? bottomVal <= bottomVal1
        ? bottom
        : bottom1
      : min.value + '%',
  };
});
</script>

<style lang="less" scoped>
@import './style/slider.less';
</style>
