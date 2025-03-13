<template>
  <div class="yc-checkbox-group">
    <slot />
    <yc-checkbox
      v-for="item in options"
      :key="<string>item.value"
      :value="item.value"
      :disabled="item.disabled"
      :indeterminate="item.indeterminate"
    >
      {{ item.label }}
    </yc-checkbox>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, provide } from 'vue';
import { CheckboxGroupProps, CheckboxValue } from './type';
import useControlValue from '@/components/_hooks/useControlValue';
import YcCheckbox from './Checkbox.vue';
defineOptions({
  name: 'CheckboxGroup',
});
const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: undefined,
  defaultValue: () => [],
  max: undefined,
  options: () => [],
  direction: 'horizontal',
  disabled: false,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: CheckboxValue[]): void;
  (e: 'change', value: CheckboxValue[], ev: Event): void;
}>();

const { modelValue, defaultValue, disabled, max } = toRefs(props);
// 受控值
const computedValue = useControlValue<CheckboxValue[]>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
provide('computedValue', computedValue);
provide('max', max);
provide('disabled', disabled);
</script>

<style lang="less" scoped>
.yc-checkbox-group {
  display: inline-flex;
  align-items: center;
  gap: 16px;
}
</style>
