import {
  ref,
  Ref,
  inject as _inject,
  provide as _provide,
  toRefs,
  computed,
} from 'vue';
import { Direction, Props, RequiredDeep } from '@shared/type';
import {
  FormatTooltip,
  SliderEmits,
  SliderProps as _SliderProps,
  SliderValue,
} from '../type';
import { useControlValue, isArray } from '@shared/utils';

export const SLIDER_CONTEXT_KEY = 'slider-context';

export interface SliderContext {
  startValue: Ref<number>;
  endValue: Ref<number>;
  tempStartValue: Ref<number>;
  tempEndValue: Ref<number>;
  range: Ref<boolean>;
  min: Ref<number>;
  max: Ref<number>;
  step: Ref<number>;
  direction: Ref<Direction>;
  showTooltip: Ref<boolean>;
  disabled: Ref<boolean>;
  trackRef: Ref<HTMLDivElement | undefined>;
  formatTooltip?: FormatTooltip;
  normalizeValue: (value: number) => number;
  denormalizeValue: (value: number) => number;
}

export type SliderProp = RequiredDeep<_SliderProps>;

export default () => {
  const provide = (
    props: Props,
    emits: SliderEmits,
    trackRef: Ref<HTMLDivElement | undefined>
  ) => {
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
    } = toRefs(props as SliderProp);
    const { formatTooltip } = props as SliderProp;
    // 控制值
    const computedValue = useControlValue<SliderValue>(
      modelValue,
      range.value && !isArray(defaultValue.value) ? [0, 0] : defaultValue.value,
      (val) => {
        emits('update:modelValue', val);
        emits('change', val);
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
          value: i * step.value,
          label: i * step.value,
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
    // 获取小数点位数
    function getDecimalPlaces(num: number): number {
      const str = num.toString();
      const decimalIndex = str.indexOf('.');
      return decimalIndex === -1 ? 0 : str.length - decimalIndex - 1;
    }
    // 标准化结果
    function normalizeValue(value: number) {
      const totalSteps = (max.value - min.value) / step.value;
      const currentStep = (value - min.value) / step.value;
      const normalized = (currentStep / totalSteps) * 100;
      return Math.round(normalized);
    }
    // 转化原始结果
    function denormalizeValue(value: number): number {
      const totalSteps = (max.value - min.value) / step.value;
      const stepPosition = (value / 100) * totalSteps;
      const exactValue = min.value + stepPosition * step.value;
      const digit = getDecimalPlaces(step.value);
      return +(Math.round(exactValue / step.value) * step.value).toFixed(digit);
    }
    _provide<SliderContext>(SLIDER_CONTEXT_KEY, {
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
      normalizeValue,
      denormalizeValue,
    });
    return {
      range,
      direction,
      startValue,
      endValue,
      tempStartValue,
      tempEndValue,
      computedValue,
      ticks,
      marks,
      min,
      max,
      normalizeValue,
    };
  };
  const inject = () => {
    return _inject<SliderContext>(SLIDER_CONTEXT_KEY, {
      startValue: ref(0),
      endValue: ref(0),
      tempEndValue: ref(0),
      tempStartValue: ref(0),
      range: ref(false),
      min: ref(0),
      max: ref(0),
      step: ref(0),
      direction: ref('horizontal'),
      disabled: ref(false),
      showTooltip: ref(true),
      trackRef: ref(),
      normalizeValue: (value: number) => {
        return value;
      },
      denormalizeValue: (value: number) => {
        return value;
      },
    });
  };
  return {
    inject,
    provide,
  };
};
