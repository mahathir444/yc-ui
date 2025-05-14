<template>
  <yc-statistic :title="title" :value-style="valueStyle" :start="false">
    <template #value>
      <span ref="valueRef">
        {{ dayjs(value - now).format(format) }}
      </span>
    </template>
  </yc-statistic>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import { isUndefined, sleep } from '@shared/utils';
import { CountdownProps, CountDownEmits, CountdownSlots } from './type';
import YcStatistic from './Statistic.vue';
import Btween from 'b-tween';
import dayjs from 'dayjs';
defineOptions({
  name: 'Countdown',
});
defineSlots<CountdownSlots>();
const props = withDefaults(defineProps<CountdownProps>(), {
  title: '',
  value: undefined,
  now: undefined,
  format: 'HH:mm:ss',
  start: true,
  valueStyle: () => {
    return {};
  },
});
const emits = defineEmits<CountDownEmits>();
const { value: _value, now: _now, format, start } = toRefs(props);
// valueRef
const valueRef = ref<HTMLDivElement>();
// value
const value = ref<number>(0);
// now
const now = ref<number>(0);
// 开始的时候的value
let startValue: number = value.value;
// 开启及时动画
const startCount = () => {
  if (startValue <= now.value) {
    return emits('finish');
  }
  const animation = new Btween({
    from: {
      textContent: startValue,
    },
    to: {
      textContent: startValue - 1000,
    },
    duration: 1000,
    easeing: 'quadOut',
    onUpdate: (current: Record<string, any>) => {
      valueRef.value!.textContent = dayjs(
        current.textContent - now.value
      ).format(format.value);
    },
    onFinish() {
      startCount();
    },
  });
  animation.start();
  startValue -= 1000;
};
// 检测start开启动画
watch(
  () => start.value,
  async (val) => {
    value.value = isUndefined(_value.value)
      ? Date.now() + 5 * 60 * 1000
      : _value.value;
    now.value = isUndefined(_now.value) ? Date.now() : _now.value;
    startValue = value.value;
    await sleep(0);
    if (!val) return;
    startCount();
  },
  {
    immediate: true,
  }
);
</script>
