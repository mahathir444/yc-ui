<template>
  <div :class="['yc-checkbox-group', CHECKBOX_DIRECTION_MAP[direction]]">
    <slot />
    <yc-checkbox
      v-for="item in options"
      :key="<string>item.value"
      :value="item.value"
      :disabled="item.disabled"
      :indeterminate="item.indeterminate"
    >
      <!-- checkbox -->
      <template v-if="$slots.checkbox" #checkbox="{ checked, disabled }">
        <slot name="checkbox" :checked="checked" :disabled="disabled" />
      </template>
      <!-- label -->
      <template #default>
        <slot name="label" :data="item">
          {{ item.label }}
        </slot>
      </template>
    </yc-checkbox>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, provide } from 'vue';
import { CheckboxGroupProps, CheckboxValue, CheckboxProvide } from './type';
import {
  CHECKBOX_GROUP_PROVIDE_KEY,
  CHECKBOX_DIRECTION_MAP,
} from '@shared/constants';
import { useControlValue } from '@shared/hooks';
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
// 提供给子组件
provide<CheckboxProvide>(CHECKBOX_GROUP_PROVIDE_KEY, {
  computedValue,
  max,
  disabled,
});
</script>

<style lang="less">
@import './style/checkbox-group.less';
</style>
