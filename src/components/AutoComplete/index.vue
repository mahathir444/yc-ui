<template>
  <yc-select
    v-model:input-value="computedValue"
    :popup-visible="popupVisible && !!data.length"
    :disabled="disabled"
    :options="data"
    :popup-container="popupContainer"
    :filter-option="filterOption"
    :trigger-props="triggerProps"
    :allow-clear="allowClear"
    v-bind="$attrs"
    :allow-search="true"
    is-auto-complete-mode
    @update:popup-visible="(v) => (popupVisible = v)"
    @update:model-value="(v) => $emit('select', v as string)"
    @input-value-change="(v) => $emit('change', v)"
    @search="(v) => $emit('search', v)"
    @clear="(ev) => $emit('clear', ev)"
    @dropdown-scroll="(ev) => $emit('dropdown-scroll', ev)"
    ref="selectRef"
  >
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </yc-select>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { AutoCompleteProps } from './type';
import {
  default as YcSelect,
  SelectOptionData,
  SelectInstance,
} from '@/components/Select';
import useControlValue from '@/components/_hooks/useControlValue';
defineOptions({
  name: 'AutoComplete',
});
const props = withDefaults(defineProps<AutoCompleteProps>(), {
  modelValue: undefined,
  defaultValue: '',
  disabled: false,
  data: () => [],
  popupContainer: 'body',
  strict: false,
  filterOption: (inputValue: string, option: SelectOptionData) => {
    return option?.label?.includes(inputValue);
  },
  triggerProps: () => {
    return {};
  },
  allowClear: true,
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
  (e: 'search', value: string): void;
  (e: 'select', value: string): void;
  (e: 'clear', ev?: Event): void;
  (e: 'dropdown-scroll', ev?: Event): void;
}>();
const { modelValue, defaultValue } = toRefs(props);
// selectRef
const selectRef = ref<SelectInstance>();
// visible
const popupVisible = ref<boolean>(false);
// 计算
const computedValue = useControlValue<string>(
  modelValue,
  defaultValue.value,
  (val) => {
    emits('update:modelValue', val);
  }
);
defineExpose({
  focus() {
    selectRef.value?.focus();
  },
  blur() {
    selectRef.value?.blur();
  },
});
</script>
