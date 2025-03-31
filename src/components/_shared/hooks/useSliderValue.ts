import { computed, ref, Ref } from 'vue';
import { SliderValue } from '@/components/Slider/type';
import { isArray } from '@shared/utils/is';
import useControlValue from '@shared/hooks/useControlValue';
import { Fn } from '../type';

export default (params: {
  modelValue: Ref<SliderValue | undefined>;
  defaultValue: Ref<SliderValue>;
  _marks: Ref<Record<number, string>>;
  step: Ref<number>;
  range: Ref<boolean>;
  emits: Fn;
}) => {
  const {
    range,
    defaultValue: _defaultValue,
    modelValue,
    _marks,
    step,
    emits,
  } = params;
  // 默认值
  const defaultValue = computed(() => {
    if (range.value) {
      return isArray(_defaultValue.value) ? _defaultValue.value : [0, 0];
    } else {
      return _defaultValue.value;
    }
  });
  // 控制值
  const computedValue = useControlValue<SliderValue>(
    modelValue,
    defaultValue.value,
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
  const tempStartValue = ref<number>(0);
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
  const tempEndValue = ref<number>(0);
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
