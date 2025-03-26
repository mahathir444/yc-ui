<template>
  <div
    class="yc-slider"
    :class="{
      'yc-slider-horizontal': direction == 'horizontal',
      'yc-slider-vertical': direction == 'vertical',
    }"
    :style="{
      width: direction == 'vertical' && showInput ? '60px' : '32px',
    }"
  >
    <div class="yc-slider-track" ref="trackRef">
      <!-- ticks -->
      <div v-if="showTicks" class="yc-slider-ticks">
        <span
          v-for="i in ticks"
          :key="i"
          :style="{
            left: direction == 'horizontal' ? i * step + '%' : '',
            bottom: direction == 'vertical' ? i * step + '%' : '',
          }"
          :class="{
            'yc-silder-tick': true,
            'yc-silder-tick-active': computedValue >= i * step,
          }"
        ></span>
      </div>
      <div
        class="yc-slider-bar"
        role="slider"
        tabindex="0"
        :style="{
          top: direction == 'vertical' ? top : '',
          right: direction == 'horizontal' ? right : '',
        }"
      ></div>
      <!-- button -->
      <yc-tooltip
        :popup-visible="popupVisible || isDragging"
        :disabled="!showTooltip"
        :position="direction == 'vertical' ? 'right' : 'bottom'"
        @update:popup-visible="(v) => (popupVisible = v)"
        :content="String(computedValue)"
      >
        <div
          class="yc-slider-btn"
          ref="triggerRef"
          :style="{
            bottom: direction == 'vertical' ? bottom : '',
            left: direction == 'horizontal' ? left : '',
          }"
        ></div>
      </yc-tooltip>
    </div>
    <div style="width: 60px">
      <yc-input-number
        v-if="showInput"
        v-model="computedValue"
        hide-button
        text-center
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, reactive, nextTick, watchEffect } from 'vue';
import { Direction } from '@shared/type';
import { useDraggable, useEventListener } from '@vueuse/core';
import useControlValue from '@shared/hooks/useControlValue';
import YcTooltip from '@/components/Tooltip';
import YcInputNumber from '@/components/InputNumber';
defineOptions({
  name: 'Slider',
});
const props = withDefaults(
  defineProps<{
    modelValue?: number;
    defaultValue?: number;
    step?: number;
    min?: number;
    max?: number;
    direction?: Direction;
    disabled?: boolean;
    showTicks?: boolean;
    showInput?: boolean;
    showTooltip?: boolean;
  }>(),
  {
    modelValue: undefined,
    defaultValue: 0,
    step: 1,
    min: 20,
    max: 80,
    direction: 'vertical',
    disabled: false,
    showTicks: false,
    showInput: true,
    showTooltip: true,
  }
);
const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', value: number): void;
  (e: 'hoverChange', value: number): void;
}>();
const { direction, modelValue, defaultValue, step, min, max, disabled } =
  toRefs(props);
// 控制值
const computedValue = useControlValue<number>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
// 刻度线
const ticks = computed(() => {
  return Math.floor(100 / step.value) - 1;
});
// trackRef
const trackRef = ref<HTMLDivElement>();
// buttonRef
const triggerRef = ref<HTMLDivElement>();
// 处理Button拖动
const { x, y, isDragging } = useDraggable(triggerRef);
// 可见性
const popupVisible = ref<boolean>(false);
// 水平情况下的距离
const left = ref<string>('');
const right = ref<string>('');
// 垂直情况下的距离
const top = ref<string>('');
const bottom = ref<string>('');
// 范围
const range = reactive<Record<string, number>>({});
// 计算value
const calcValueFromPosition = (distance: number) => {
  const {
    left: sliderLeft,
    bottom: sliderBottom,
    width: sliderWidth,
    height: sliderHeight,
  } = trackRef.value!.getBoundingClientRect();
  if (direction.value == 'vertical') {
    // 计算比例
    const rate = ((sliderBottom - distance) / sliderHeight) * 100;
    // 处理步长
    return +(rate / step.value).toFixed(0) * step.value;
  } else {
    // 计算比例
    const rate = ((distance - sliderLeft) / sliderWidth) * 100;
    // 处理步长
    return +(rate / step.value).toFixed(0) * step.value;
  }
};
// 计算position
const calcPositionFromValue = (distance: number) => {
  const {
    left: sliderLeft,
    bottom: sliderBottom,
    width: sliderWidth,
    height: sliderHeight,
  } = trackRef.value!.getBoundingClientRect();
  return direction.value == 'vertical'
    ? sliderBottom - (distance / 100) * sliderHeight
    : (distance / 100) * sliderWidth + sliderLeft;
};
// 设置 位置
const setPositionFromValue = (distance: number) => {
  // button的宽度
  const { offsetHeight: btnHeight, offsetWidth: btnWidth } = triggerRef.value!;
  if (direction.value == 'vertical') {
    top.value = 100 - distance + '%';
    bottom.value = `calc(${distance}% - ${btnHeight / 2}px)`;
  } else {
    left.value = `calc(${distance}% -  ${btnWidth / 2}px)`;
    right.value = 100 - distance + '%';
  }
};
// 设置最初的位置
const setOriginPosition = () => {
  if (computedValue.value > max.value) {
    computedValue.value = max.value;
  } else if (computedValue.value < min.value) {
    computedValue.value = min.value;
  }
  top.value = max.value + '%';
  bottom.value = computedValue.value + '%';
  left.value = computedValue.value + '%';
  right.value = max.value + '%';
};
// 处理越界情况
useEventListener('mousemove', () => {
  if (!isDragging.value) return;
  // 给出范围
  const { minTop, maxTop, minLeft, maxLeft } = range;
  // 处理不同情况的拖动
  if (direction.value == 'vertical') {
    y.value = y.value > minTop ? minTop : y.value;
    y.value = y.value < maxTop ? maxTop : y.value;
    const value = calcValueFromPosition(y.value);
    setPositionFromValue(value);
    computedValue.value = value;
  } else {
    x.value = x.value < minLeft ? minLeft : x.value;
    x.value = x.value > maxLeft ? maxLeft : x.value;
    const value = calcValueFromPosition(x.value);
    setPositionFromValue(value);
    computedValue.value = value;
  }
});
// 检测min,max计算范围
watchEffect(async () => {
  await nextTick();
  range.minTop = calcPositionFromValue(min.value);
  range.maxTop = calcPositionFromValue(max.value);
  range.minLeft = calcPositionFromValue(min.value);
  range.maxLeft = calcPositionFromValue(max.value);
  setOriginPosition();
});
// 检测computedValue的改变重置位置
watchEffect(async () => {
  if (isDragging.value) {
    return;
  }
  await nextTick();
  setPositionFromValue(computedValue.value);
});
</script>

<style lang="less" scoped>
.yc-slider {
  gap: 20px;
  .yc-slider-track {
    flex: 1;
    flex-shrink: 0;
    position: relative;

    &::before {
      display: block;
      content: '';
      position: absolute;
      border-radius: 2px;
      background-color: rgb(229, 230, 235);
    }
    .yc-slider-bar {
      position: absolute;
      border-radius: 2px;
      background-color: rgb(22, 93, 255);
    }
    .yc-slider-ticks {
      position: absolute;
      .yc-silder-tick {
        position: absolute;
        background: rgb(229, 230, 235);
        &.yc-silder-tick-active {
          background-color: rgb(22, 93, 255);
        }
      }
    }
    .yc-slider-btn {
      user-select: none;
      cursor: pointer;
      position: absolute;
      width: 12px;
      height: 12px;
      &:hover::before {
        box-shadow: 0 2px 5px #0000001a;
        transform: scale(1.16666667);
      }
      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
        width: 12px;
        height: 12px;
        border: 2px solid rgb(22, 93, 255);
        border-radius: 50%;
        background: #fff;
        transition: all 0.3s cubic-bezier(0.3, 1.3, 0.3, 1);
      }
    }
  }
}

// direction
.yc-slider-horizontal {
  width: 100%;
  height: 32px;
  display: inline-flex;
  align-items: center;
  .yc-slider-track {
    &::before,
    .yc-slider-bar {
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 2px;
    }
    &::before {
      width: 100%;
      right: 0;
    }
    .yc-slider-ticks {
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      .yc-silder-tick {
        top: -4px;
        width: 1px;
        height: 3px;
        border-top-left-radius: 1px;
        border-top-right-radius: 1px;
      }
    }
    .yc-slider-btn {
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.yc-slider-vertical {
  height: 100%;
  width: 32px;
  display: inline-flex;
  flex-direction: column;

  .yc-slider-track {
    display: flex;
    flex-direction: column;
    justify-content: center;
    &::before,
    .yc-slider-bar {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
    }
    &::before {
      height: 100%;
      bottom: 0;
    }
    .yc-slider-ticks {
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      bottom: 0;

      .yc-silder-tick {
        left: 0px;
        width: 3px;
        height: 1px;
        border-top-left-radius: 1px;
        border-top-right-radius: 1px;
      }
    }
    .yc-slider-btn {
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
