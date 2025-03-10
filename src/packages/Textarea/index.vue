<template>
  <div
    :class="{
      'yc-textarea-wrapper': true,
      'yc-textarea-disabled': disabled,
      'yc-textarea-error': error,
      'yc-textarea-hoverable': !disabled,
    }"
  >
    <textarea
      v-model="computedValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      cols="30"
      rows="10"
      class="yc-textarea"
    ></textarea>
    <span v-if="showLimit" class="yc-input-word-limit">
      {{ computedValue.length }}
      /
      {{ maxLength }}
    </span>
    <yc-icon-button
      v-if="showClearBtn"
      name="close"
      class="yc-input-clear-button"
      @click="handleClear"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, computed } from 'vue';
import useControlValue from '../_hooks/useControlValue';
import { TextareaProps } from './type';
import { isNumber } from '@/packages/_utils/is';
import YcIconButton from '@/packages/_components/IconButton/index.vue';
const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: undefined,
  defaultValue: '',
  placeholder: '',
  disabled: false,
  readonly: false,
  error: true,
  maxLength: 10,
  showWordLimit: true,
  allowClear: false,
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
const {
  modelValue,
  defaultValue,
  maxLength,
  showWordLimit,
  allowClear,
  disabled,
  readonly,
} = toRefs(props);
const computedValue = useControlValue<string>(
  modelValue,
  defaultValue,
  (val) => {
    emits('update:modelValue', val);
  }
);
const showLimit = computed(
  () => isNumber(maxLength.value) && showWordLimit.value
);
const showClearBtn = computed(
  () =>
    allowClear.value &&
    !disabled.value &&
    !readonly.value &&
    computedValue.value.length
);
// 处理清除
const handleClear = (e: MouseEvent) => {
  emits('clear', e);
};
</script>

<style lang="less" scoped>
.yc-textarea-wrapper {
  position: relative;
  cursor: text;
  background-color: rgb(242, 243, 245);
  border: 1px solid transparent;
  border-radius: 2px;
  transition:
    color 0.1s cubic-bezier(0, 0, 1, 1),
    border-color 0.1s cubic-bezier(0, 0, 1, 1),
    background-color 0.1s cubic-bezier(0, 0, 1, 1);
  font-size: 14px;
  line-height: 1.5715;
  color: rgb(29, 33, 41);
  &:focus-within {
    background-color: #fff !important;
    border-color: rgb(22, 93, 255) !important;
    box-shadow: 0 0 0 0 rgb(190, 218, 255);
  }
  .yc-input-word-limit {
    position: absolute;
    right: 10px;
    bottom: 6px;
    user-select: none;
    color: rgb(134, 144, 156);
    font-size: 12px;
  }
  .yc-textarea {
    padding: 4px 12px;
    min-height: 32px;
    width: 100%;
    cursor: inherit;
    outline: none;
    border: none;
    border-radius: none;
    background-color: transparent;
    color: inherit;
    font-weight: 400;
    resize: vertical;
    &::placeholder {
      color: rgb(134, 144, 156);
    }
  }
}

// position: absolute;
//     top: 50%;
//     right: 10px;
//     -webkit-transform: translateY(-50%);
//     -ms-transform: translateY(-50%);
//     transform: translateY(-50%);

.yc-textarea-hoverable {
  &:hover {
    background-color: rgb(229, 230, 235);
    border-color: transparent;
  }
  &.yc-textarea-error {
    &:hover {
      background-color: rgb(253, 205, 197);
      border-color: transparent;
    }
  }
}

.yc-textarea-disabled {
  cursor: not-allowed;
  border-color: transparent;
  background-color: rgb(242, 243, 245);
  color: rgb(201, 205, 212);
}
.yc-textarea-error {
  background-color: rgb(255, 236, 232);
  &:focus-within {
    border-color: rgb(245, 63, 63) !important;
    box-shadow: 0 0 0 0 rgb(253, 205, 197);
  }
}
</style>
