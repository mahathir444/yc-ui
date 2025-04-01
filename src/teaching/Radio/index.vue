<template>
  <a-radio v-bind="props" v-model="computedValue">
    <template #radio>
      <img :src="icon" />
    </template>
  </a-radio>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue';
import { RadioProps, RadioValue } from './type';
import useControlValue from '../_shared/hooks/useControlValue';
import Checked from '../_shared/icons/radio-checked.svg';
import CheckedDisabled from '../_shared/icons/radio-checked-disabled.svg';
import Uncheck from '../_shared/icons/radio-uncheck.svg';
import UncheckDisabled from '../_shared/icons/radio-uncheck-disabled.svg';
const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: undefined,
  defaultChecked: false,
  disabled: false,
  value: true,
  type: 'radio',
  preventFocus: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean): void;
}>();
const { modelValue, defaultChecked, disabled } = toRefs(props);
// 受控值
const computedValue = useControlValue<RadioValue>(
  modelValue,
  defaultChecked.value,
  (val) => {
    emits('update:modelValue', val);
    emits('change', val);
  }
);
// radio的icon
const icon = computed(() => {
  if (disabled.value) {
    return computedValue.value ? CheckedDisabled : UncheckDisabled;
  } else {
    return computedValue.value ? Checked : Uncheck;
  }
});
</script>

<style lang="less" scoped></style>
