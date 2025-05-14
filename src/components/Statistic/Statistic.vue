<template>
  <div class="yc-statistic yc-statistic-countdown">
    <div v-if="$slots.title || title" class="yc-statistic-title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="yc-statistic-content">
      <div class="yc-statistic-value" :style="valueStyle">
        <span v-if="$slots.prefix" class="yc-statistic-prefix">
          <slot name="prefix" />
        </span>
        <slot name="value">
          <span class="yc-statistic-value-integer" ref="valueRef">
            {{ showValue }}
          </span>
        </slot>
        <span v-if="$slots.suffix" class="yc-statistic-suffix">
          <slot name="suffix" />
        </span>
      </div>
      <div v-if="$slots.extra || extra" class="yc-statistic-extra">
        <slot name="extra">
          {{ extra }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed, watch } from 'vue';
import { isNumber, isUndefined } from '@shared/utils';
import { StatisticProps, StatisticSlots } from './type';
import dayjs from 'dayjs';
import Btween from 'b-tween';
defineOptions({
  name: 'Statistic',
});
defineSlots<StatisticSlots>();
const props = withDefaults(defineProps<StatisticProps>(), {
  title: '',
  value: 0,
  format: 'HH:mm:ss',
  extra: '',
  start: true,
  precision: 0,
  separator: '',
  showGroupSeparator: false,
  animation: false,
  animationDuration: 2000,
  valueFrom: undefined,
  placeholder: '',
  valueStyle: () => {
    return {};
  },
});
const {
  value,
  precision,
  format,
  start,
  valueFrom,
  placeholder,
  animation,
  animationDuration,
} = toRefs(props);
// valueRef
const valueRef = ref<HTMLDivElement>();
// 整数部分
const showValue = computed(() => {
  if (isUndefined(value.value)) return placeholder.value;
  return isNumber(value.value)
    ? value.value.toFixed(precision.value)
    : dayjs(value.value).format(format.value);
});
watch(
  [start, animation, valueFrom, value],
  () => {
    if (
      !start.value ||
      !animation.value ||
      isUndefined(valueFrom.value) ||
      !isNumber(value.value) ||
      valueFrom.value - value.value == 0
    ) {
      return;
    }
    const between = new Btween({
      from: {
        textContent: valueFrom.value,
      },
      to: {
        textContent: value.value,
      },
      duration: animationDuration.value,
      easeing: 'quadOut',
      onUpdate: (current: Record<string, any>) => {
        valueRef.value!.textContent = isNumber(value.value)
          ? current.textContent.toFixed(precision.value)
          : dayjs(current.textContent).format(format.value);
      },
    });
    between.start();
  },
  {
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.yc-statistic {
  color: rgb(78, 89, 105);
  line-height: 1.5715;
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  .yc-statistic-title,
  .yc-statistic-extra {
    color: rgb(78, 89, 105);
    font-size: 14px;
  }
  .yc-statistic-content {
    .yc-statistic-value {
      color: rgb(29, 33, 41);
      font-weight: 500;
      font-size: 26px;
      white-space: nowrap;
      .yc-statistic-prefix,
      .yc-statistic-suffix {
        font-size: 14px;
      }
    }
  }
}
</style>
