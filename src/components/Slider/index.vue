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
        :style="position"
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
import { ref, computed } from 'vue';
import { SliderProps, SliderEmits, PositionData } from './type';
import { SLIDER_DIRECTION_MAP } from '@shared/constants';
import useProvide from './hooks/useProvide';
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
const emits = defineEmits<SliderEmits>();
// trackRef
const trackRef = ref<HTMLDivElement>();
// 注入
const { provide } = useProvide();
const { ticks, marks, range, direction, min, handleRangeValue } = provide(
  props,
  emits,
  trackRef
);
// 开始按钮的位置
const startPosition = ref<PositionData>({
  bottom: 0,
  left: 0,
  top: 0,
  right: 0,
});
// 结束按钮的位置
const endPosition = ref<PositionData>({
  bottom: 0,
  left: 0,
  top: 0,
  right: 0,
});
// 综合计算position
const position = computed(() => {
  const { left, right, top, bottom } = startPosition.value;
  if (!range.value) {
    return direction.value == 'vertical'
      ? {
          top: top + '%',
          bottom: handleRangeValue(min.value) + '%',
        }
      : {
          left: handleRangeValue(min.value) + '%',
          right: right + '%',
        };
  }
  const {
    left: left1,
    right: right1,
    top: top1,
    bottom: bottom1,
  } = endPosition.value;
  return direction.value == 'vertical'
    ? {
        top: `${top < top1 ? top : top1}%`,
        bottom: `${bottom < bottom1 ? bottom : bottom1}%`,
      }
    : {
        left: `${left < left1 ? left : left1}%`,
        right: `${right < right1 ? right : right1}%`,
      };
});
</script>

<style lang="less" scoped>
@import './style/slider.less';
</style>
