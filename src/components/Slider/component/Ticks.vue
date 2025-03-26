<template>
  <div
    :class="{
      'yc-slider-ticks': type == 'ticks',
      'yc-slider-dots': type == 'dots',
      'yc-slider-marks': type == 'marks',
      'direction-vertical': direction == 'vertical',
      'direction-horizontal': direction == 'horizontal',
    }"
  >
    <span
      v-for="{ label, value } in data"
      :key="value"
      :style="{
        left: direction == 'horizontal' ? getPosition(value) : '',
        bottom: direction == 'vertical' ? getPosition(value) : '',
      }"
      :class="{
        'yc-slider-tick': type == 'ticks',
        'yc-slider-dot': type == 'dots',
        'yc-slider-mark': type == 'marks',
        'yc-slider-dot-active': type == 'dots' && computedValue >= value * step,
        'yc-slider-tick-active':
          type == 'ticks' && computedValue >= value * step,
      }"
      @click="$emit('labelClick', value)"
    >
      {{ type == 'marks' ? label : '' }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { Direction } from '@shared/type';
const props = defineProps<{
  type: 'dots' | 'marks' | 'ticks';
  data: Record<string, any>[];
  direction: Direction;
  computedValue: number;
  step: number;
}>();
defineEmits<{
  (e: 'labelClick', value: number): void;
}>();
const { type, step } = toRefs(props);
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
  }
}

// horizontal
.yc-slider-ticks,
.yc-slider-dots,
.yc-slider-marks {
  &.direction-horizontal {
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
  &.direction-vertical {
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
