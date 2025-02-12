<template>
  <div
    class="yc-input-wrapper"
    :class="{
      'yc-input-disabled': disabled,
      'yc-input-hoverable': !disabled,
      'yc-input-error': error,
    }"
    :style="{
      height: sizeToPx,
    }"
  >
    <!-- prefix-icon -->
    <div v-if="$slots.prefix" class="yc-input-prefix">
      <slot name="prefix" />
    </div>
    <!-- input -->
    <input
      :value="defaultValue || modelValue"
      type="text"
      :class="['yc-input', SIZE_CLASS[size]]"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      v-bind="inputAttrs"
      ref="inputRef"
      @input="handleInput"
      @change="handleChange"
      @focus="(e) => emits('focus', e)"
      @blur="(e) => emits('blur', e)"
      @keydown.enter="(e) => emits('press-enter', e)"
    />
    <!-- clear-btn -->
    <div
      v-if="allowClear && (modelValue.length || defaultValue.length)"
      class="yc-input-clear-button"
      @click="handleClear"
    >
      <svg-icon name="drawerClose" />
    </div>
    <!-- suffix-icon -->
    <div v-if="$slots.suffix" class="yc-input-suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs } from 'vue';
import { ComptSize } from '@/type';
import { SIZE_CLASS } from './index';
import { SIZE_MAP } from '@/constants';
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    defaultValue?: string;
    size?: ComptSize;
    allowClear?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    error?: boolean;
    placeholder?: string;
    inputAttrs?: Record<string, any>;
  }>(),
  {
    modelValue: '',
    defaultValue: '',
    size: 'medium',
    allowClear: true,
    disabled: false,
    readonly: false,
    error: true,
    placeholder: '',
  }
);
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input', value: string, ev: Event): void;
  (e: 'change', value: string, ev: Event): void;
  (e: 'press-enter', ev: KeyboardEvent): void;
  (e: 'clear', ev: MouseEvent): void;
  (e: 'focus', ev: FocusEvent): void;
  (e: 'blur', ev: FocusEvent): void;
}>();
const { size } = toRefs(props);
// 输入实例
const inputRef = ref<HTMLInputElement>();
// size到px
const sizeToPx = computed(() => SIZE_MAP[size.value] + 'px');
// 处理输入
const handleInput = (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  emits('input', value, e);
  emits('update:modelValue', value);
};
// 处理改变
const handleChange = (e: Event) => {
  const { value } = e.target as HTMLInputElement;
  emits('change', value, e);
  emits('update:modelValue', value);
};
// 处理清除
const handleClear = (e: MouseEvent) => {
  emits('update:modelValue', '');
  emits('clear', e);
};

defineExpose({
  focus() {
    inputRef.value?.focus();
  },
  blur() {
    inputRef.value?.blur();
  },
});
</script>

<style lang="less" scoped>
.yc-input-wrapper {
  cursor: text;
  padding: 0 12px;
  background-color: rgb(242, 243, 245);
  border: 1px solid transparent;
  border-radius: 2px;
  transition:
    color 0.1s cubic-bezier(0, 0, 1, 1),
    border-color 0.1s cubic-bezier(0, 0, 1, 1),
    background-color 0.1s cubic-bezier(0, 0, 1, 1);
  color: rgb(29, 33, 41);
  display: flex;
  align-items: center;
  &:focus-within {
    background-color: #fff !important;
    border-color: rgb(22, 93, 255) !important;
    box-shadow: 0 0 0 0 rgb(190, 218, 255);
  }

  .yc-input-prefix,
  .yc-input-suffix {
    flex-shrink: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(78, 89, 105);
    font-size: 14px;

    &.yc-input-prefix {
      padding-right: 12px;
    }
    &.yc-input-suffix {
      padding-left: 12px;
    }
  }

  .yc-input-clear-button {
    cursor: pointer;
    position: relative;
    color: rgb(29, 33, 41);
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    &:hover::before {
      display: block;
    }
    &::before {
      content: '';
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: rgb(242, 243, 245);
      border-radius: 50%;
      display: none;
    }
    .svg-icon {
      position: relative;
      z-index: 10;
    }
  }

  .yc-input {
    flex: 1;
    cursor: inherit;
    outline: none;
    border: none;
    border-radius: 0;
    background-color: transparent;
    color: inherit;
    font-weight: 400;
    &::placeholder {
      color: rgb(134, 144, 156);
    }
  }
}
// hoverable
.yc-input-hoverable {
  &:hover {
    border-color: transparent;
    background-color: rgb(229, 230, 235);
  }
  &:hover .yc-input-clear-button {
    visibility: visible;
  }

  &.yc-input-error {
    &:hover {
      border-color: transparent;
      background-color: rgb(253, 205, 197);
    }
  }
}
// disabled
.yc-input-disabled {
  background-color: rgb(242, 243, 245);
  border-color: transparent;
  cursor: not-allowed;
  color: rgb(201, 205, 212);
}
// error
.yc-input-error {
  background-color: rgb(255, 236, 232);
  &:focus-within {
    border-color: rgb(245, 63, 63) !important;
    box-shadow: 0 0 0 0 rgb(253, 205, 197);
  }
}
//size
.yc-input-size-mini {
  font-size: 12px;
  padding: 1px 0;
  font-size: 12px;
  line-height: 1.667;
}
.yc-input-size-small {
  padding: 2px 0;
  font-size: 14px;
  line-height: 1.5715;
}
.yc-input-size-medium {
  padding: 4px 0;
  font-size: 14px;
  line-height: 1.5715;
}
.yc-input-size-large {
  padding: 6px 0;
  font-size: 14px;
  line-height: 1.5715;
}
</style>
