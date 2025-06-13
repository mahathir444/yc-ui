<template>
  <div
    v-show="!allowSearch || filterOption(computedInputValue, props)"
    :class="[
      'yc-select-option',
      {
        'yc-select-option-active': options[curIndex]?.value == optionValue,
        'yc-select-option-disabled': disabled,
      },
    ]"
  >
    <div v-if="$slots.icon" class="yc-select-option-icon">
      <slot name="icon" />
    </div>
    <!-- 多选 -->
    <yc-checkbox
      v-if="multiple"
      :model-value="value"
      :disabled="disabled"
      @update:model-value="handleMuti"
      class="yc-select-option-content"
    >
      <span ref="contentRef">
        <slot>
          {{ label }}
        </slot>
      </span>
    </yc-checkbox>
    <!-- 单选 -->
    <div
      v-else
      class="yc-select-option-content text-ellipsis"
      ref="contentRef"
      @click="handleSingle"
    >
      <slot>
        {{ label }}
      </slot>
    </div>
    <div v-if="$slots.suffix" class="yc-select-option-suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, ref, computed, Ref } from 'vue';
import { OptionProps, OptionSlots, SelectOptionData } from './type';
import { ObjectData } from '@shared/type';
import { isUndefined, getDomText, isBoolean } from '@shared/utils';
import useContext from './hooks/useContext';
import YcCheckbox from '@/components/Checkbox';
defineOptions({
  name: 'Option',
});
defineSlots<OptionSlots>();
const props = withDefaults(defineProps<OptionProps>(), {
  label: '',
  value: '',
  disabled: false,
  isFallbackOption: false,
});
const { label, disabled } = toRefs(props);
// 解构父级provide的属性
const {
  computedValue,
  computedInputValue,
  multiple,
  limit,
  curIndex,
  options,
  allowSearch,
  blur,
  filterOption: _filterOption,
  getValue,
  emits,
  collectOption,
} = useContext().inject();
// optionsValue
const optionValue = computed(() => {
  return `${props.value}`
    ? props.value
    : getDomText(contentRef as Ref<HTMLElement>);
});
// contentRef
const contentRef = ref<HTMLDivElement>();
// value
const value = computed(() => {
  if (!multiple.value) return false;
  const index = (computedValue.value as ObjectData[]).findIndex((item) => {
    return getValue(item) === getValue(optionValue.value);
  });
  return index != -1;
});
const filterOption = (inputValue: string, option: SelectOptionData) => {
  if (isBoolean(_filterOption) || isUndefined(_filterOption)) {
    return !_filterOption ? true : !!option?.label?.includes(inputValue);
  }
  return _filterOption(inputValue, option);
};
// 处理单选
const handleSingle = () => {
  if (disabled.value || isUndefined(computedValue.value)) return;
  computedValue.value = optionValue.value;
  emits('select', optionValue.value);
  blur();
};
// 处理多选
const handleMuti = (v: boolean) => {
  const curValue = computedValue.value as ObjectData[];
  const { value } = optionValue;
  if (!v) {
    computedValue.value = curValue.filter((item) => item != value);
  } else {
    if (limit.value > 0 && curValue.length == limit.value) {
      return emits('exceedLimit', value);
    }
    emits('select', optionValue.value);
    computedValue.value = [...curValue, value];
  }
};
// 收集option
collectOption(props, contentRef);
</script>

<style lang="less" scoped>
@import './style/option.less';
</style>
