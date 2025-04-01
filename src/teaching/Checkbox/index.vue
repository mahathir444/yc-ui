<template>
  <a-checkbox v-bind="props" v-model="computedValue">
    <template #checkbox>
      <img :src="icon" />
    </template>
  </a-checkbox>
</template>

<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import { CheckboxProps } from './type';
import useControlValue from '../_shared/hooks/useControlValue';
import Checked from '../_shared/icons/checkbox-checked.svg';
import CheckedDisabled from '../_shared/icons/checkbox-checked-disabled.svg';
import Uncheck from '../_shared/icons/checkbox-uncheck.svg';
import UncheckDisabled from '../_shared/icons/checkbox-uncheck-disabled.svg';

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: undefined,
  defaultChecked: false,
  disabled: false,
  value: '',
  indeterminate: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean): void;
}>();
const { modelValue, defaultChecked, disabled } = toRefs(props);
// 受控值
const computedValue = useControlValue<boolean>(
  modelValue,
  defaultChecked.value,
  (val) => {
    emits('update:modelValue', val);
    emits('change', val);
  }
);
// checkbox的icon
const icon = computed(() => {
  if (disabled.value) {
    return computedValue.value ? CheckedDisabled : UncheckDisabled;
  } else {
    return computedValue.value ? Checked : Uncheck;
  }
});
</script>
