<template>
  <yc-select
    :popup-visible="popupVisible && hasOption"
    :options="data"
    :popup-container="popupContainer"
    :trigger-props="triggerProps"
    :virtual-list-props="vistualListProps"
    v-bind="$attrs"
    @update:popup-visible="(v) => (popupVisible = v)"
    @search="(v) => $emit('search', v)"
    @dropdown-scroll="(ev) => $emit('dropdown-scroll', ev)"
    @select="handleSelect"
    ref="selectRef"
  >
    <template #trigger>
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
    const label = option?.label?.toLowerCase();
    const value = inputValue.toLowerCase();
    return label?.includes(value);
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
const { modelValue, defaultValue, data } = toRefs(props);
const { filterOption } = props;
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
  const inputValue = computedValue.value;
  console.log(inputValue);
  if (!inputValue) return false;
  const result = !!data.value.filter((option) => {
    return filterOption(inputValue, option);
  }).length;
  if (result) {
    popupVisible.value = true;
  } else {
    popupVisible.value = false;
  }
  console.log(result, popupVisible.value);
  return result;
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
