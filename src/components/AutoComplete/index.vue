<template>
  <yc-select
    :popup-visible="popupVisible && hasOption"
    :options="data"
    :popup-container="popupContainer"
    :trigger-props="triggerProps"
    :strict="strict"
    :virtual-list-props="vistualListProps"
    v-bind="$attrs"
    is-auto-complete-mode
    @update:popup-visible="(v) => (popupVisible = v)"
    @search="(v) => $emit('search', v)"
    @dropdown-scroll="(ev) => $emit('dropdown-scroll', ev)"
    ref="selectRef"
  >
    <template v-if="$slots.trigger" #trigger>
      <slot name="trigger">
        <yc-input
          v-model="computedValue"
          :disabled="disabled"
          :allow-clear="allowClear"
          @change="(v) => $emit('change', v)"
          @clear="
            (ev) => {
              computedValue.value = '';
              $emit('clear', ev);
            }
          "
        />
      </slot>
    </template>
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </yc-select>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue';
import { AutoCompleteProps } from './type';
import {
  default as YcSelect,
  SelectOptionData,
  SelectInstance,
  SelectValue,
} from '@/components/Select';
import YcInput from '@/components/Input';
import useControlValue from '@shared/hooks/useControlValue';
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
const { modelValue, defaultValue, strict, data } = toRefs(props);
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
// 是否为空
const hasOption = computed(() => {
  const value = strict.value
    ? computedValue.value
    : computedValue.value.toLowerCase();
  const result = data.value.filter((item) => {
    const label = (item?.label ?? item) as string;
    return (strict.value ? label : label.toLowerCase()).includes(value);
  }).length;
  return !!result;
});
// 处理选择
const handleSelect = (v: SelectValue) => {
  popupVisible.value = false;
  computedValue.value = v as string;
  emits('select', v as string);
};
defineExpose({
  focus() {
    selectRef.value?.focus();
  },
  blur() {
    selectRef.value?.blur();
  },
});
</script>
