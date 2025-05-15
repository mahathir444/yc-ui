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
        <span class="yc-statistic-value-integer" ref="valueRef">
          <slot name="value">
            {{ showValue }}
          </slot>
        </span>
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
import { StatisticProps, StatisticEmits, StatisticSlots } from './type';
import {
  isNumber,
  formatSeconds,
  isUndefined,
  formatDate,
} from '@shared/utils';
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
  easeing: 'quadOut',
  valueStyle: () => {
    return {};
  },
  isCountdown: false,
});
const emits = defineEmits<StatisticEmits>();
const {
  value,
  precision,
  format,
  start,
  valueFrom,
  placeholder,
  animation,
  animationDuration,
  easeing,
  isCountdown,
} = toRefs(props);
// valueRef
const valueRef = ref<HTMLDivElement>();
// 整数部分
const showValue = computed(() => {
  return isUndefined(value.value)
    ? placeholder.value
    : getFormatValue(value.value);
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
      easeing: easeing.value,
      onUpdate: (current: Record<string, any>) => {
        valueRef.value!.textContent = getFormatValue(current.textContent);
      },
      onFinish() {
        emits('finish');
      },
    });
    between.start();
  },
  {
    immediate: true,
  }
);
// 获取格式化的value
function getFormatValue(value: number | Date) {
  if (isNumber(value) && !isCountdown.value) {
    return value.toFixed(precision.value);
  }
  if (isCountdown.value) {
    return formatSeconds(value as number, format.value);
  }
  return formatDate(value, format.value);
}
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
