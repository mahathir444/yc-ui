<template>
  <yc-input-number
    v-model="computedValue"
    :min="min"
    :max="max"
    :disabled="disabled"
    hide-button
    text-center
    style="width: 60px"
    @blur="handleSet"
    @press-enter="handleSet"
  />
</template>

<script lang="ts" setup>
import { ref, inject, toRefs, computed } from 'vue';
import { ProvideType } from '../type';
import { SLIDER_PROVIDE_KEY } from '@shared/constants';
import YcInputNumber from '@/components/InputNumber';
const props = defineProps<{
  type: 'start' | 'end';
}>();
const { type } = toRefs(props);
const {
  min,
  max,
  disabled,
  startValue,
  endValue,
  tempStartValue,
  tempEndValue,
} = inject<ProvideType>(SLIDER_PROVIDE_KEY, {
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
});
// 计算值
const computedValue = computed({
  get() {
    return type.value == 'start' ? tempStartValue.value : tempEndValue.value;
  },
  set(val) {
    if (type.value == 'start') {
      tempStartValue.value = val;
    } else {
      tempEndValue.value = val;
    }
  },
});
// 处理设置
const handleSet = () => {
  if (type.value == 'start') {
    startValue.value = computedValue.value;
  } else {
    endValue.value = computedValue.value;
  }
};
</script>
