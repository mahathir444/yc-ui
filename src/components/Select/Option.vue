<template>
  <div
    v-show="filterOption(computedInputValue, option)"
    :class="{
      'yc-select-option': true,
      'yc-select-option-disabled': disabled,
    }"
    @click="handleClick"
  >
    <div v-if="$slots.icon" class="yc-select-option-icon">
      <slot name="icon" />
    </div>
    <div class="yc-select-option-content text-ellipsis">
      {{ label }}
    </div>
    <div v-if="$slots.suffix" class="yc-select-option-suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, toRefs, inject, WritableComputedRef, onMounted } from 'vue';
import { Fn } from '@/components/_type';
import { OptionProps, SelectValue } from './type';
defineOptions({
  name: 'Option',
});
const props = withDefaults(defineProps<OptionProps>(), {
  label: '',
  value: '',
  disabled: false,
});
const { label, value: optionValue, disabled } = toRefs(props);
// 选项
const option = { ...props };
// 父级的emits
const dEmits = inject('emits') as Fn;
// 过滤选项的函数
const filterOption = inject('filterOption') as Fn;
// 是否多选
const multiple = inject('multiple') as Ref<boolean>;
// 多选的限制
const limit = inject('limit') as Ref<number>;
// select的value
const computedValue = inject('computedValue') as WritableComputedRef<
  SelectValue | SelectValue[]
>;
// 输入框的value
const computedInputValue = inject(
  'computedInputValue'
) as WritableComputedRef<string>;
// visible
const computedVisible = inject(
  'computedVisible'
) as WritableComputedRef<boolean>;
// selectOptions
const optionList = inject('optionList') as Ref<OptionProps[]>;
// 处理选择
const handleClick = (ev: MouseEvent) => {
  if (disabled.value) return;
  // 处理多选
  if (multiple.value) {
    const curValue = computedValue.value as SelectValue[];
    const { value } = optionValue;
    if (limit.value > 0 && curValue.length == limit.value) {
      return dEmits('exceed-limit', value, ev);
    }
    const index = curValue.findIndex((item) => item == value);
    if (index != -1) {
      curValue.splice(index, 1);
    } else {
      curValue.push(value);
    }
  }
  // 处理单选
  else {
    computedValue.value = optionValue.value;
    computedVisible.value = false;
  }
};
onMounted(() => {
  optionList.value.push(option);
});
</script>

<style lang="less" scoped>
@import './style/option.less';
</style>
