<template>
  <div
    v-show="filterOption(computedInputValue, props, strict)"
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
      class="yc-select-option-content"
      :model-value="curIndex != -1"
      prevent-focus
      @update:model-value="handleMulti"
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
import { ObjectData } from '@/components/_type';
import { OptionProps, SelectValue, ProvideType } from './type';
import { SELECT_PROVIDE_KEY } from '@/components/_constants';
import { isUndefined } from '@/components/_utils/is';
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
  strict,
  focus,
  blur,
  emits,
  filterOption,
  getValue,
} = inject<ProvideType>(SELECT_PROVIDE_KEY, {
  computedValue: ref(undefined),
  computedInputValue: ref(''),
  multiple: ref(false),
  limit: ref(0),
  strict: ref(false),
  blur: () => {},
  focus: () => {},
  filterOption: () => true,
  getValue: () => {},
  emits: () => {},
});
// 当前value对应的index
const curIndex = computed(() => {
  if (!multiple.value) return -1;
  return (computedValue.value as ObjectData[]).findIndex((item) => {
    return getValue(item) === getValue(optionValue.value);
  });
});
// 处理单选
const handleSingle = () => {
  if (disabled.value || isUndefined(computedValue.value)) return;
  computedValue.value = optionValue.value;
  blur();
};
// 处理单选多选发生改变
const handleMulti = (v: boolean) => {
  const curValue = computedValue.value as SelectValue[];
  const { value } = optionValue;
  if (!v) {
    computedValue.value = curValue.filter((item) => item != value);
  } else {
    if (limit.value > 0 && curValue.length == limit.value) {
      return emits('exceedLimit', value);
    }
    computedValue.value = [...curValue, value];
  }
  focus();
};
</script>

<style lang="less" scoped>
@import './style/option.less';
</style>
