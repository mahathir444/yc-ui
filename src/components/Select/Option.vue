<template>
  <div
    v-show="filterOption(computedInputValue, props)"
    :class="{
      'yc-select-option': true,
      'yc-select-option-disabled': disabled,
    }"
  >
    <div v-if="$slots.icon" class="yc-select-option-icon">
      <slot name="icon" />
    </div>
    <!-- 多选 -->
    <yc-checkbox
      v-if="multiple"
      v-model="modelValue"
      class="yc-select-option-content"
    >
      {{ label }}
    </yc-checkbox>
    <!-- 单选 -->
    <div
      v-else
      class="yc-select-option-content text-ellipsis"
      @click="handleSingle"
    >
      {{ label }}
    </div>
    <div v-if="$slots.suffix" class="yc-select-option-suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, inject, computed } from 'vue';
import { OptionProps, SelectValue, ProvideType } from './type';
import { ObjectData } from '@shared/type';
import { SELECT_PROVIDE_KEY } from '@shared/constants';
import { isUndefined } from '@shared/utils/is';
import YcCheckbox from '@/components/Checkbox';
defineOptions({
  name: 'Option',
});
const props = withDefaults(defineProps<OptionProps>(), {
  label: '',
  value: '',
  disabled: false,
});
const { label, value: optionValue, disabled } = toRefs(props);
// 解构父级provide的属性
const {
  computedValue,
  computedInputValue,
  multiple,
  limit,
  blur,
  filterOption,
  getValue,
  emits,
} = inject<ProvideType>(SELECT_PROVIDE_KEY, {
  computedValue: ref(undefined),
  computedInputValue: ref(''),
  multiple: ref(false),
  limit: ref(0),
  blur: () => {},
  filterOption: () => true,
  getValue: () => {},
  emits: () => {},
});
//  选项的值
const modelValue = computed({
  get() {
    if (!multiple.value) return false;
    const index = (computedValue.value as ObjectData[]).findIndex((item) => {
      return getValue(item) === getValue(optionValue.value);
    });
    return index != -1;
  },
  set(v) {
    const curValue = computedValue.value as SelectValue[];
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
  },
});
// 处理单选
const handleSingle = () => {
  if (disabled.value || isUndefined(computedValue.value)) return;
  computedValue.value = optionValue.value;
  emits('select', optionValue.value);
  blur();
};
</script>

<style lang="less" scoped>
@import './style/option.less';
</style>
