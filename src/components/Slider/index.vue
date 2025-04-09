<template>
  <div
    :class="[
      'yc-slider',
      SLIDER_DIRECTION_MAP[direction],
      disabled ? 'yc-slider-disabled' : '',
    ]"
  >
    <div class="yc-slider-track" ref="trackRef">
      <!-- ticks -->
      <yc-slider-ticks v-if="showTicks" type="ticks" :data="ticks" />
      <yc-slider-ticks v-if="marks.length" type="dots" :data="marks" />
      <yc-slider-ticks v-if="marks.length" type="marks" :data="marks" />
      <!-- bar -->
      <div
        class="yc-slider-bar"
        role="slider"
        tabindex="0"
        :aria-disabled="disabled"
        :style="
          direction == 'vertical'
            ? {
                top: position.top,
                bottom: position.bottom,
              }
            : {
                left: position.left,
                right: position.right,
              }
        "
      ></div>
      <!-- start -->
      <yc-slider-btn v-model:position="startPosition" type="start" />
      <!-- end  -->
      <yc-slider-btn v-if="range" v-model:position="endPosition" type="end" />
    </div>
    <!-- input -->
    <div v-if="showInput" class="yc-slider-input">
      <yc-slider-input type="start" />
      <div v-if="range" class="yc-slider-input-divider"></div>
      <yc-slider-input v-if="range" type="end" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, provide } from 'vue';
import { SliderProps, SliderProvide, PositionData } from './type';
import { SLIDER_DIRECTION_MAP } from './constants';
import { SLIDER_PROVIDE_KEY } from '@shared/constants';
import useSliderValue from '@shared/hooks/useSliderValue';
import YcSliderTicks from './component/SliderTicks.vue';
import YcSliderBtn from './component/SliderBtn.vue';
import YcSliderInput from './component/SliderInput.vue';
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
  range: false,
  showTooltip: true,
  formatTooltip: (val: number) => {
    return val + '';
  },
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
const { formatTooltip } = props;
// trackRef
const trackRef = ref<HTMLDivElement>();
// 获取slider的值
const { startValue, endValue, tempEndValue, tempStartValue, ticks, marks } =
  useSliderValue({
    modelValue,
    defaultValue,
    step,
    range,
    _marks,
    emits,
  });
// 开始按钮的位置
const startPosition = ref<PositionData>({
  bottom: '',
  left: '',
  top: '',
  right: '',
});
// 结束按钮的位置
const endPosition = ref<PositionData>({
  bottom: '',
  left: '',
  top: '',
  right: '',
});
// 综合计算position
const position = computed(() => {
  const {
    left,
    right,
    top,
    bottom,
    startDis = 0,
    endDis = 0,
  } = startPosition.value;
  if (!range.value) {
    return {
      left: min.value + '%',
      right,
      top,
      bottom: min.value + '%',
    };
  }
  const {
    left: left1,
    right: right1,
    top: top1,
    bottom: bottom1,
    startDis: startDis1 = 0,
    endDis: endDis1 = 0,
  } = endPosition.value;
  return {
    left: startDis < startDis1 ? left : left1,
    right: startDis < startDis1 ? right1 : right,
    top: endDis <= endDis1 ? top : top1,
    bottom: startDis < startDis1 ? bottom : bottom1,
  };
});
// 提供值
provide<SliderProvide>(SLIDER_PROVIDE_KEY, {
  startValue,
  endValue,
  tempStartValue,
  tempEndValue,
  range,
  min,
  max,
  step,
  showTooltip,
  disabled,
  direction,
  trackRef,
  formatTooltip,
});
</script>

<style lang="less" scoped>
@import './style/slider.less';
</style>
