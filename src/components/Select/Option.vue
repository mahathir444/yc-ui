<template>
  <div
    v-show="showOption"
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
import { computed, Ref, toRefs, inject, WritableComputedRef } from 'vue';
import { SelectOptionProps, SelectValue } from './type';
defineOptions({
  name: 'Option',
});
const props = withDefaults(defineProps<SelectOptionProps>(), {
  label: '',
  value: '',
  disabled: false,
  index: undefined,
});
const { label, value: optionValue, disabled } = toRefs(props);
// select的value
const computedValue = inject(
  'computedValue'
) as WritableComputedRef<SelectValue>;
// 输入框的value
const computedInputValue = inject(
  'computedInputValue'
) as WritableComputedRef<string>;
// visible
const popupVisible = inject('popupVisible') as Ref<boolean>;
// 是否展示Option
const showOption = computed(() => {
  return label.value.includes(computedInputValue.value);
});
// 处理后缀点击
const handleClick = () => {
  if (disabled.value) return;
  computedValue.value = optionValue.value;
  computedInputValue.value = label.value;
  popupVisible.value = false;
};
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
  &.yc-select-option-disabled {
    color: rgb(201, 205, 212);
    background: transparent;
    cursor: not-allowed;
  }
  .yc-select-option-icon,
  .yc-select-option-content,
  .yc-select-option-suffix {
    flex-shrink: 0;
  }
  .yc-select-option-icon {
    margin-right: 8px;
    color: inherit;
  }
  .yc-select-option-suffix {
    color: inherit;
    margin-left: 12px;
  }
  .yc-select-option-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
}
</style>
