import { inject, ref } from 'vue';
import { SLIDER_PROVIDE_KEY } from '@shared/constants';
import { SliderProvide } from '../type';
export default () => {
  return inject<SliderProvide>(SLIDER_PROVIDE_KEY, {
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
    handleRangeValue: (value: number) => {
      return value;
    },
  });
};
