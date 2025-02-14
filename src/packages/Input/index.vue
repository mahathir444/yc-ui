<template>
  <div
    v-if="$slots.prepend || $slots.append"
    :class="[
      'yc-input-outer',
      OUTER_SIZE_CLASS[size],
      disabled ? 'yc-input-outer-disabled' : '',
    ]"
  >
    <!-- prepend -->
    <div v-if="$slots.prepend" class="yc-input-prepend">
      <slot name="prepend" />
    </div>
    <!-- input -->
    <base-input
      v-bind="props"
      @input="handleInput"
      @change="handleChange"
      @clear="handleClear"
      @focus="(e) => emits('focus', e)"
      @blur="(e) => emits('blur', e)"
      @press-enter="(e) => emits('press-enter', e)"
      ref="baseInputRef"
    >
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix"></slot>
      </template>
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix"></slot>
      </template>
    </base-input>
    <!-- append -->
    <div v-if="$slots.append" class="yc-input-append">
      <slot name="append" />
    </div>
  </div>
  <base-input
    v-else
    v-bind="props"
    @input="handleInput"
    @change="handleChange"
    @clear="handleClear"
    @focus="(e) => emits('focus', e)"
    @blur="(e) => emits('blur', e)"
    @press-enter="(e) => emits('press-enter', e)"
    ref="baseInputRef"
  >
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix"></slot>
    </template>
  </base-input>
</template>

<script lang="ts" setup>
import { ref, useSlots } from 'vue';
import { InputProps } from './type';
import { OUTER_SIZE_CLASS } from './constants';
import BaseInput from './component/BaseInput/index.vue';
const props = withDefaults(defineProps<InputProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  size: 'medium',
  allowClear: true,
  disabled: false,
  readonly: false,
  error: false,
  showWordLimit: false,
  maxLength: 10,
  placeholder: '',
});
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string, ev: Event): void;
  (e: 'change', value: string, ev: Event): void;
  (e: 'press-enter', ev: KeyboardEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
}>();
const baseInputRef = ref<InstanceType<typeof BaseInput>>();
// 处理输入
const handleInput = (value: string, ev: Event) => {
  emits('input', value, ev);
  emits('update:modelValue', value);
};
// 处理改变
const handleChange = (value: string, ev: Event) => {
  emits('change', value, ev);
  emits('update:modelValue', value);
};
// 处理清除
const handleClear = (e: MouseEvent) => {
  emits('clear', e);
  emits('update:modelValue', '');
};

defineExpose({
  focus() {
    baseInputRef.value?.focus();
  },
  blur() {
    baseInputRef.value?.blur();
  },
});
</script>

<style lang="less" scoped>
.yc-input-outer {
  display: flex;
  &.yc-input-outer-disabled {
    cursor: not-allowed;
  }
  .yc-input-wrapper {
    flex: 1;
    border-radius: 0;
  }
  .yc-input-prepend,
  .yc-input-append {
    flex-shrink: 0;
    padding: 0 12px;
    color: rgb(29, 33, 41);
    font-weight: 400;
    white-space: nowrap;
    background-color: rgb(242, 243, 245);
    display: flex;
    align-items: center;

    &.yc-input-prepend {
      border-right: 1px solid rgb(229, 230, 235);
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    &.yc-input-append {
      border-left: 1px solid rgb(229, 230, 235);
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
}

.yc-input-outer-size-mini {
  font-size: 12px;
}
.yc-input-outer-size-small,
.yc-input-outer-size-medium,
.yc-input-outer-size-large {
  font-size: 14px;
}
</style>
