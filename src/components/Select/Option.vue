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
// 过滤选项的函数
const filterOption = inject('filterOption') as Fn;
// select的value
const computedValue = inject(
  'computedValue'
) as WritableComputedRef<SelectValue>;
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
const handleClick = () => {
  if (disabled.value) return;
  computedValue.value = optionValue.value;
  computedVisible.value = false;
};
onMounted(() => {
  optionList.value.push(option);
});
</script>

<style lang="less" scoped>
.yc-select-option {
  padding: 0 12px;
  line-height: 36px;
  font-size: 14px;
  color: rgb(29, 33, 41);
  text-align: left;
  display: flex;
  align-items: center;
  transition: all 0.1s cubic-bezier(0, 0, 1, 1);
  &:hover {
    color: rgb(29, 33, 41);
    background-color: rgb(242, 243, 245);
  }
  .yc-select-option-icon,
  .yc-select-option-content,
  .yc-select-option-suffix {
    flex-shrink: 0;
    color: inherit;
  }
  .yc-select-option-icon {
    margin-right: 8px;
  }
  .yc-select-option-suffix {
    margin-left: 12px;
  }
  .yc-select-option-content {
    flex: 1;
    display: flex;
    align-items: center;
  }
}
.yc-select-option-disabled {
  color: rgb(201, 205, 212);
  background: transparent;
  cursor: not-allowed;
}
</style>
