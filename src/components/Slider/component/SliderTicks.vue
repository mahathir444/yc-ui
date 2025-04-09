<template>
  <div :class="[TICKS_TYPE_MAP[type], TICKS_DIRECTION_MAP[direction]]">
    <span
      v-for="{ label, value } in data"
      :key="value"
      :style="{
        left: direction == 'horizontal' ? getPosition(value) : '',
        bottom: direction == 'vertical' ? getPosition(value) : '',
      }"
      :class="[
        TICK_TYPE_MAP[type],
        type == 'dots' && isInRange(value) ? 'yc-slider-dot-active' : '',
        type == 'ticks' && isInRange(value) ? 'yc-slider-tick-active' : '',
      ]"
      @click="$emit('labelClick', value)"
    >
      {{ type == 'marks' ? label : '' }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, inject } from 'vue';
import { SliderProvide } from '../type';
import {
  TICK_TYPE_MAP,
  TICKS_TYPE_MAP,
  TICKS_DIRECTION_MAP,
} from '@shared/constants/slider';
import { SLIDER_PROVIDE_KEY } from '@shared/constants';

const props = defineProps<{
  type: 'dots' | 'marks' | 'ticks';
  data: Record<string, any>[];
}>();
defineEmits<{
  (e: 'labelClick', value: number): void;
}>();
const { type } = toRefs(props);
// 解构父级属性
const { min, max, startValue, endValue, range, direction, step } =
  inject<SliderProvide>(SLIDER_PROVIDE_KEY, {
    startValue: ref(0),
    endValue: ref(0),
    tempEndValue: ref(0),
    tempStartValue: ref(0),
    min: ref(0),
    max: ref(0),
    step: ref(0),
    range: ref(false),
    direction: ref('horizontal'),
    disabled: ref(false),
    showTooltip: ref(true),
    trackRef: ref(),
  });
// 计算position
const getPosition = (value: number) => {
  if (type.value == 'ticks') {
    return `calc(${value * step.value}% - 0.5px)`;
  } else if (type.value == 'dots') {
    return `calc(${value * step.value}% - 4px)`;
  } else {
    return `calc(${value * step.value}% - 7px)`;
  }
};
// 是否在区间之内
const isInRange = (value: number) => {
  const curValue = value * step.value;
  if (!range.value) {
    return (
      startValue.value >= curValue &&
      curValue >= min.value &&
      curValue <= max.value
    );
  } else {
    const minVal = Math.min(startValue.value, endValue.value);
    const maxVal = Math.max(startValue.value, endValue.value);
    return curValue >= minVal && curValue <= maxVal;
  }
};
</script>

<style lang="less" scoped>
.yc-slider-ticks,
.yc-slider-dots,
.yc-slider-marks {
  z-index: 1;
  position: absolute;
  //   tick
  .yc-slider-tick {
    position: absolute;
    background: rgb(229, 230, 235);
    &.yc-slider-tick-active {
      background-color: rgb(22, 93, 255);
    }
  }
  //   dot
  .yc-slider-dot {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #fff;
    border: 2px solid rgb(229, 230, 235);
    border-radius: 50%;
    &.yc-slider-dot-active {
      background-color: #fff;
      border-color: rgb(22, 93, 255);
    }
  }
  //   mark
  .yc-slider-mark {
    position: absolute;
    cursor: pointer;
    color: rgb(134, 144, 156);
    font-size: 14px;
    line-height: 1;
    user-select: none;
  }
}

// horizontal
.yc-slider-ticks,
.yc-slider-dots,
.yc-slider-marks {
  &.yc-ticks-direction-horizontal {
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    .yc-slider-tick {
      top: -4px;
      width: 1px;
      height: 3px;
      border-top-left-radius: 1px;
      border-top-right-radius: 1px;
    }
    .yc-slider-dot {
      transform: translateY(-50%);
    }
    &.yc-slider-marks {
      transform: translateY(calc(-50% + 10px));
    }
  }
}
// vertical
.yc-slider-ticks,
.yc-slider-dots,
.yc-slider-marks {
  &.yc-ticks-direction-vertical {
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    bottom: 0;
    &.yc-slider-marks {
      transform: translateX(calc(-50% + 10px));
    }

    .yc-slider-tick {
      left: 0;
      width: 3px;
      height: 1px;
      border-top-left-radius: 1px;
      border-top-right-radius: 1px;
    }
    .yc-slider-dot {
      transform: translateX(-50%);
    }
  }
}
</style>
