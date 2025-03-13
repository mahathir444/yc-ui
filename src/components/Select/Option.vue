<template>
  <div
    v-show="filterOption(computedInputValue, option)"
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
import {
  ref,
  Ref,
  toRefs,
  inject,
  WritableComputedRef,
  onMounted,
  computed,
} from 'vue';
import { Fn } from '@/components/_type';
import { OptionProps, SelectValue } from './type';
import YcCheckbox from '@/components/Checkbox/Checkbox.vue';
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
const multiple = inject('multiple', ref(false));
// 多选的限制
const limit = inject('limit', ref(0));
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
// 当前value对应的index
const curIndex = computed(() => {
  return (computedValue.value as SelectValue[]).findIndex(
    (item) => item == optionValue.value
  );
});
// 处理单选
const handleSingle = () => {
  if (disabled.value) return;
  computedValue.value = optionValue.value;
  computedVisible.value = false;
};
// 处理单选多选发生改变
const handleMulti = (v: boolean) => {
  const curValue = computedValue.value as SelectValue[];
  const { value } = optionValue;
  if (!v) {
    computedValue.value = curValue.filter((item) => item != value);
  }
  if (limit.value > 0 && curValue.length == limit.value) {
    return dEmits('exceed-limit', value);
  }
  computedValue.value = [...curValue, value];
};

onMounted(() => {
  const optionList = inject('optionList') as Ref<OptionProps[]>;
  optionList.value.push(option);
});
</script>

<style lang="less" scoped>
@import './style/option.less';
</style>
