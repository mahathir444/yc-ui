import { computed, ref, Ref } from 'vue';
import { Fn } from '../type';
import { SliderValue } from '@/components/Slider';
import { isArray } from '@shared/utils';
import { useControlValue } from '@shared/hooks';

export default (params: {
  modelValue: Ref<SliderValue | undefined>;
  defaultValue: Ref<SliderValue>;
  _marks: Ref<Record<number, string>>;
  step: Ref<number>;
  range: Ref<boolean>;
  emits: Fn;
}) => {
  const { modelValue, defaultValue, range, _marks, step, emits } = params;
  // 控制值
  const computedValue = useControlValue<SliderValue>(
    modelValue,
    range.value && !isArray(defaultValue.value) ? [0, 0] : defaultValue.value,
    (val) => {
      emits('update:modelValue', val);
    }
  );
  // 开始值
  const startValue = computed({
    get() {
      return range.value ? computedValue.value[0] : computedValue.value;
    },
    set(val) {
      if (range.value) {
        computedValue.value[0] = val;
      } else {
        computedValue.value = val;
      }
      tempStartValue.value = val;
    },
  });
  // 中间开始值
  const tempStartValue = ref<number>(startValue.value);
  // 结束值
  const endValue = computed({
    get() {
      return range.value ? computedValue.value[1] : computedValue.value;
    },
    set(val) {
      if (range.value) {
        computedValue.value[1] = val;
      } else {
        computedValue.value = val;
      }
      tempEndValue.value = val;
    },
  });
  // 中间结束值
  const tempEndValue = ref<number>(endValue.value);
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
  return {
    startValue,
    endValue,
    tempStartValue,
    tempEndValue,
    computedValue,
    ticks,
    marks,
  };
};
